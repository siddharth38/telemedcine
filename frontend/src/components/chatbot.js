import React from "react";
import * as Icon from "react-feather";
import $ from "jquery";
import _ from "lodash";

import Progress from "react-progressbar";

import axios from "axios";
import { BACKEND_URL_DEV, ENDPOINT, languages } from "../config";

import PeerConnection from "./webrtc/PeerConnection";
import CallWindow from "./webrtc/CallWindow";
import CallModal from "./webrtc/CallModal";

const bson = require('bson');
const { commands } = require('../data/commands'); // TODO: Should be fetched from backend or be executed at the backend via APIs
const client = require('socket.io-client');

const TYPE_TEXT = 'text'
const TYPE_BUTTON = 'button'
const TYPE_LIST = 'list'										// checkboxes
const TYPE_SELECT = 'select'
const TYPE_UPLOAD = 'upload'
// const TYPE_MULTI_SELECT = 'multi_select'
const TYPE_NONE = "none"                    // send a message and move to next message. Or run a command
const TYPE_ANALYSE = "analyse"              // complex analyses of user answers on frontend. example cardiac screening

const MUTE_ALL = 'muteall'
const SPEAK_ALL = 'speakall'
const STOP_SPEECH = 'stop'

const INCOMING_MESSAGE = 'incoming'					// sent by bot or doctor
const OUTGOING_MESSAGE = 'outgoing'					// sent by user/patient

//Incoming message : chatbot server to user

export default class Chat extends React.Component {
	state = {
		conversation_session_id: '',
		questions: [],
		answers: {},
		timestamps: {},

		languageSelected: 'hi', // TODO: Save and load from cookie
		helpline: '011-23978046', // TODO: Fetch location specific ambulance numbers

		optionSelected: '0',
		textAnswered: '',
		textOverrideAnswered: '',

		chat: [],
		loadingChat: true,
		requesting: false,

		connectToDoctor: false,

		patientId: null,
		doctor: null,
		incomingTyping: false,

		answerBoxHidden: true,
		answerFormat: {},
		questionDetails: {},

		callWindow: '',
		callModal: '',
		localSrc: null,
		peerSrc: null,

		mute: SPEAK_ALL
	};

	socket = null;
	pc = {};

	componentDidMount() {
		// generate sessionID for mongodb.
		this.state.conversation_session_id = new bson.ObjectId().toString();

		axios
			.get(ENDPOINT + '/api/questions')
			.then((response) => {
				const { questions, incomingChats } = response.data;
				if (questions)
					this.setState(
						{
							questions,
							chat: incomingChats,
							loadingChat: false
						},
						() => {
							this.setQuestion(questions[0]);
						}
					);
			})
			.catch((error) => {
				// this.setState({ loadingChat: false });
				console.log(error);
			});

    navigator.geolocation.getCurrentPosition(
      this.getHelpline.bind(this)
    );

    //In case we need constant viewport height
    //let viewheight = $(window).height();
    //let viewwidth = $(window).width();
    //let viewport = document.querySelector("meta[name=viewport]");
    //viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
	}

  getHelpline(position) {
    const { latitude, longitude } = (position && position.coords) || {};
    axios
			.post(ENDPOINT + '/api/helpline', {
        latitude,
        longitude,
      })
			.then((response) => {
				const { helpline } = response.data;
				if (helpline) {
					this.setState({ helpline });
        }
			})
			.catch((error) => {
				console.error(error);
			});
  }

	componentWillUnmount() {
		if (this.socket) this.socket.disconnect();
	}

	// unused?
  // jumpToNextQuestion = (message) => {
	// 	console.log("jumpToNextQuestion()")
  //   const { optionSelected, answerFormat, questionDetails } = this.state;
  //   const { options } = answerFormat;
  //   const { nextQuestion } = options && options[optionSelected].nextQuestion
  //       ? options[optionSelected] : questionDetails;
  //   if (message) {
  //     this.enterMessageIntoChat(message, 'outgoing');
  //   }
  //   const question = this.getQuestionById(nextQuestion);
  //   this.setQuestion(question);
  // }

  /**
	 * sets different types of questions - configures variables to be used later
   * @param question Either a question object or a question ID
   * @param customOptions Overrides the existing options
	 * Sends information to the backend with every message
	 * Adds the statements in the memory
   */
	setQuestion = (question, customOptions=null) => {
		// if ID, get object
    if (typeof question == "number" || typeof question == "string") {
      question = this.getQuestionById(question);
    }
    const { answers } = this.state;					// contains question ID and value of user input
		let { statement, type: type, options, pattern, id, nextQuestion, paramsFrom, command, branches, loopStart } = question;

		if (customOptions) {
      options = customOptions;
    }

    if (typeof statement != 'string') {
			this.speak(statement[this.state.languageSelected], false)
		// conversation is added in the memory here
      for (let key in statement) {
        statement[key] = this.insertVariables(statement[key]);
			}
    } else {
      statement = this.insertVariables(statement);
    }
    if (typeof options == 'string') {
      // Options generated by a command
      options = commands[options](answers, question, this.setQuestion);
    }
		let tempSelection = this.state.tempSelection;
		if (type === 'list') {
			tempSelection = {};
			for (let i = 0; i < options.length; ++i) {
				tempSelection[i] = false;
			}
		}
		this.enterMessageIntoChat(statement, INCOMING_MESSAGE);
		this.realtime({
			language: this.state.languageSelected,
			statement:statement,
			direction:INCOMING_MESSAGE,
			message_type: type,
			id:id,
			nextQuestion: nextQuestion,
			command:command,
			branches:branches,
			options:options,
			textAnswered: this.answerEntered,
			tempSelection:tempSelection
		})
		this.setState({
			answerBoxHidden: type==='none',
			textAnswered: '',
			optionSelected: '0',
			answerFormat: { type: type, options, pattern },
			questionDetails: { loopStart, statement, id, nextQuestion, paramsFrom, command, branches },
			tempSelection: tempSelection
		});
    if (type === TYPE_NONE && command) {
      commands[command](answers, question, this.setQuestion);
    } else if (type === TYPE_ANALYSE && command) {
			const { questions } = this.state;
			commands[command](answers, question, questions, this.setQuestion);
		} else if (type === 'none' && nextQuestion) {
      // Without delay, the present question may not get rendered
      setTimeout(function() {
        this.setQuestion(nextQuestion);
      }.bind(this), 500)
    }
	};

	/**
	 * formats the data of statement and associated data of message
	 */
  insertVariables(statement) {
    let formattedStatement = statement;
    while (formattedStatement.search('{.*}') !== -1) {
      formattedStatement = this.insertVariable(formattedStatement);
    }
    return formattedStatement;
  };

  insertVariable(statement) {
    let formattedStatement = statement;
    let start = statement.search('{.*}');
    if (start !== -1) {
      let end = statement.search('}');
      formattedStatement = statement.replace(
        statement.substring(start, end+1),
        this.state[statement.substring(start+1, end)]);
    }
    return formattedStatement;
  };

	/**
	 * Add message of any kind to the json and update UI
	 */
	enterMessageIntoChat = (statement, type) => {
		const { chat } = this.state;
		this.setState(
			{
				chat: chat.concat([{ statement, type }])
			},
			this.scrollDown
		);
	};

	/*
	 * Return question object from questions list
	 */
	getQuestionById = (id) => {
		const { questions } = this.state;
		for (let i = 0; i < questions.length; i++) {
			if (questions[i].id === id) return questions[i];
		}
		console.error("failed to search for question with ID = ", id)
		return null;
	};

	/**
	 * UI
	 */
	scrollDown = () => {
		let x = $('#chat-box')
		if (x.length)
			x.animate({ scrollTop: x[0].scrollHeight }, 800);
	};

	/**
	 * Sends on send button press. Attached to form. Uses socket
	 */
	sendMessage = (event) => {
		const { textAnswered, doctor } = this.state;

		if (event && event.preventDefault) event.preventDefault();

		if (textAnswered.length) {
			this.setState({ textAnswered: '' });
			this.socket.emit('message', { message: textAnswered, to: doctor });
			this.enterMessageIntoChat(textAnswered, 'outgoing');
		}
	};

	// used while uploading image
	handleMessageChange = (event) => {
		const { id, value } = event.target;
		const { textAnswered, doctor } = this.state;

		this.setState({
			[id]: value
		});

		if ((value.length === 0) ^ (textAnswered.length === 0)) {
			this.socket.emit('typingChange', { state: value.length > 0, to: doctor });
		}
	};

	/**
	 * For doctor-patient interaction?
	 * For call or only messages?
	 */
	connect = () => {
		const { patientId } = this.state;

		this.setState({ requesting: true });

		// create socket based on environment - dev/prod
		this.socket = client(process.env.NODE_ENV === 'development' ? BACKEND_URL_DEV : '/', {
			path: '/app_chat',
			transports: ['websocket'],
			query: {
				patientId,
				type: 'patient'
			}
		});

		this.socket.on('doctorAlloted', (doctor) => {
			this.setState({
				answerBoxHidden: false,
				requesting: false,
				doctor
			});
		});

		this.socket.on('onlineUsers', (onlineUsers) => {
			this.setState({ onlineUsers });
		});

		this.socket.on('message', ({ message, from }) => {
			if (from === this.state.doctor) {
				this.setState({ incomingTyping: false });
				this.enterMessageIntoChat(message, 'incoming');
			}
		});

		this.socket.on('typingChange', ({ state, from }) => {
			if (from === this.state.doctor) {
				this.setState({ incomingTyping: state });
				this.scrollDown();
			}
		});

		this.socket.on('referUser', (doctor) => {
			this.endCall(false);
			this.setState({ doctor, answerBoxHidden: true });
		});

		this.socket.on('request', (from) => {
			if (from === this.state.doctor) {
				this.setState({ callModal: 'active' });
				this.scrollDown();
			}
		});

		this.socket.on('call', ({ data, from }) => {
			if (from === this.state.doctor) {
				if (data.sdp) {
					this.pc.setRemoteDescription(data.sdp);
					if (data.sdp.type === 'offer') this.pc.createAnswer();
				} else this.pc.addIceCandidate(data.candidate);
			}
		});

		this.socket.on('end', (from) => {
			if (from === this.state.doctor) this.endCall(false);
		});
	};

	startCall = (isCaller, config) => {
		this.config = config;
		this.pc = new PeerConnection(this.socket, this.state.doctor)
			.on('localStream', (src) => {
				const newState = { callWindow: 'active', localSrc: src };
				if (!isCaller) newState.callModal = '';
				this.setState(newState);
			})
			.on('peerStream', (src) => this.setState({ peerSrc: src }))
			.start(isCaller, config);
	};

	rejectCall = () => {
		const { doctor } = this.state;
		this.socket.emit('end', doctor);
		this.setState({ callModal: '' });
	};

	endCall = (isStarter) => {
		if (_.isFunction(this.pc.stop)) {
			this.pc.stop(isStarter);
		}
		this.pc = {};
		this.config = null;
		this.setState(
			{
				callWindow: '',
				callModal: '',
				localSrc: null,
				peerSrc: null
			},
			this.scrollDown
		);
	};

	answer = (event, textOverrides) => {
		const { optionSelected, questionDetails, answerFormat, answers, tempSelection } = this.state;
		const { options, type } = answerFormat;
		// noinspection JSUnusedLocalSymbols
		const { id, paramsFrom, branches, loopStart } = questionDetails;
		let { textAnswered, textOverrideAnswered } = this.state;
		let textTypeAnswer = ['text', 'tel', 'password', 'email', 'date'].includes(type);

		// prevent Default faolowup to the event. No idea when?
		if (event && event.preventDefault) event.preventDefault();

		if (type === TYPE_LIST) {
			// Don't do much other than update things
			textTypeAnswer = true;
			textAnswered = "";
			let savedValues = [];
			for (let i = 0; i < options.length; ++i) {
				let statement = (typeof options[i].statement === "string")
	        ? options[i].statement
	        : options[i].statement[this.state.languageSelected];
				if (tempSelection[i]) {
					textAnswered += statement + ", ";
					savedValues.push(options[i].dbValue);
				}
			}
			if (textAnswered === "") textAnswered = "None"
			else textAnswered = textAnswered.substring(0, textAnswered.length-2);
			this.enterMessageIntoChat(
				textTypeAnswer ? textAnswered : options[optionSelected].statement,
				'outgoing'
			);
			this.setState(
				{answers: {
						...this.state.answers,
						[id]: savedValues
					},
					answerBoxHidden: true,
					timestamps: {
						...this.state.timestamps,
						[id]: Date.now()
					}
				},
				this.answerEntered
			);
		} else if (this.state.reset){
			console.log('reset')
			this.realtime()
			this.setState(this.state, this.answerEntered)
		} else if ((!textTypeAnswer || textAnswered) && (!textOverrides)) {
			// accept as an answer if type is not text.
			console.log('textOverrides = ', textOverrides)

    	this.realtime()

			if (type === 'password') {
    	    this.enterMessageIntoChat('****', 'outgoing');
		  } else if (type !== 'none') {
    	    this.enterMessageIntoChat(
   	       textTypeAnswer ? textAnswered : options[optionSelected].statement,
  	        'outgoing'
  	      );
  	    }
  		let value = textTypeAnswer ? textAnswered : options[optionSelected].value;
  		if (loopStart) {
  			value = [value];
  			if (answers[id]) {
  				value = [...answers[id], ...value];
			  }
  		}
			this.setState(
				{answers: {
						...this.state.answers,
						[id]: value
					},
					answerBoxHidden: true,
					timestamps: {
						...this.state.timestamps,
						[id]: Date.now()
					}
				},
				this.answerEntered
			);
		}
	};

	/*
	 * called when bot completes questionnaire and is passed in user's physical location
	 */
	completedChatbot = (position) => {
		const { latitude, longitude } = (position && position.coords) || {};
		const { chat, answers, timestamps, conversation_session_id } = this.state;

		this.setState({ requesting: true });

    // Save the statements in the selected language.
		const chatToSave = this.saveChatStatements(chat);

		/*
		 * send the chat to the server and push into DB.
		 * run the assessment code
		 */
		axios
			.post(ENDPOINT + '/api/assessment', {
				answers,
				timestamps,
				latitude,
				longitude,
				chat: chatToSave,
				conversation_session_id
			})
			.then((response) => {
				console.log("api/assessment contacted")
				const { incomingChats, connectToDoctor, patientId, question } = response.data;		// messages fetched here
				if (connectToDoctor) {
					console.log('connectToDoctor = ', connectToDoctor)
					this.setState(
						{
							connectToDoctor,
							patientId,
							chat: chat.concat(incomingChats)
						},
						this.scrollDown
					);
					this.setQuestion(question);
					console.log('scrolledDown()')

				} else {
					console.log("not connect to doctor")
					if (incomingChats) {
						// bot to user
						console.log("incoming chats")
						this.setState(
							{
								chat: chat.concat(incomingChats)																	// This is where chat content is updated
							},
							this.scrollDown
						);
					}
				}
				this.setState({ requesting: false });
			})
			.catch((error) => {
				this.setState({ requesting: false });
				console.log(error);
			});
	};

	saveChatStatements(chat) {
		const chatToSave = [];
		for (let i = 0; i < chat.length; ++i) {
			let statement = (typeof chat[i].statement === "string")
				? chat[i].statement
				: chat[i].statement[this.state.languageSelected];
			let type = chat[i].type;
			chatToSave.push({ statement, type });
		}
		return chatToSave;
	}

	/*
	 * Runs after answer is entered by the user.
	 * Sets up command execution
	 * Calls setQuestion()
	 * Will update server
	 * Before endchatbotsequence()
	 */
	answerEntered = () => {
		console.log("answerEntered() entered")
		// noinspection JSUnusedLocalSymbols
		const { answers, connectToDoctor, optionSelected,
			answerFormat, questionDetails, tempSelection} = this.state;
		const { type, options } = answerFormat;
		//const textTypeAnswer = ['text', 'tel', 'password', 'email', 'date', 'list'].includes(type);
		let { nextQuestion } = options && typeof options[optionSelected].nextQuestion != 'undefined'
        ? options[optionSelected] : questionDetails;
		const { command } = questionDetails;

		if (this.state.reset){
			nextQuestion = 1.0
			this.state.reset = false
			this.setState(this.state)
		}

		if (typeof nextQuestion === 'undefined' && command) {
			// Next question to be set by command logic
			console.log(answers)
			commands[command](answers, questionDetails, this.setQuestion, tempSelection);
		} else if (type === TYPE_ANALYSE && command) {
			// focus on analysing
			const { questions } = this.state;
			commands[command](answers, questionDetails, questions, this.setQuestion);
		} else if (nextQuestion === 0) {
			this.endChatbotSequence();
		} else {
			// nextQuestion has been provided
			const question = this.getQuestionById(nextQuestion);
			this.setQuestion(question);
		}
	};

	/**
	 * End of flow.
	 */
	endChatbotSequence = () => {
		console.log("endChatbotSequence()")
		const { connectToDoctor, optionSelected} = this.state;
		if (connectToDoctor) {
			const lastMessage = {
				en: 'Please look after your health.',
				hi: 'कृपया अपनी सेहत का ख़याल रखें।',
				bn: 'আপনার স্বাস্থ্যের যত্ন নিন'
			};
			if (optionSelected === '0') this.connect();
			else this.enterMessageIntoChat(lastMessage[this.state.languageSelected], 'incoming');
		} else {
			navigator.geolocation.getCurrentPosition(
				this.completedChatbot.bind(this),
				this.completedChatbot.bind(this)
			);
			console.log("got current user location")
		}
	};

	/**
	 * Called on UI, state, etc changes on frontend
	 * Redirects to URLs if needed
	 * Most frequently called
	 * Best for tracking of user behavior
	 * Updates state
	 */
	handleChange = (event) => {
		const { id, value } = event.target;
		const { type } = this.state.answerFormat;

		if (type === TYPE_LIST) {
			this.setState({
				tempSelection: {
					...this.state.tempSelection,
					[id]: !this.state.tempSelection[id]
				}
			});
		} else if (event.target.id === 'textOverrideAnswered') {
			// text message overrides other ui inputs
			console.log('textOverrideAnswered')
			this.setState(
				{
					[id]: value
				},
				() => {
					this.answer(null, true);
				}
			);
		} else {
			// everything default behavior, update things

			// external site
			let redirectUrl = event.target.getAttribute("data-url")

			this.setState(
				{
					[id]: value
				},
				() => {
					if (type === TYPE_BUTTON) {

						// open external site
						if (redirectUrl) window.open(redirectUrl)

						this.answer();
					}
				}
			);
		}
	};

	handleLanguageChange = (event) => {
    const { id, value } = event.target;
    this.setState(
			{
				[id]: value
			},
			() => {
				// const { languageSelected } = this.state.languageSelected;
				this.scrollDown();
			}
		);
  };

	/*
	 * live chat-bot text communication with server
	 */
	realtime = () => {
		console.log("realtime()")
		const { optionSelected, answerFormat, questionDetails, textAnswered, conversation_session_id, answers, patientId } = this.state;
		const { options } = answerFormat;
		const { nextQuestion } = options && options[optionSelected].nextQuestion
			? options[optionSelected] : questionDetails;
		const question = this.getQuestionById(nextQuestion);

		// console.log("questionDetails = ", questionDetails)
		console.log(textAnswered)
		console.log(optionSelected)

		axios
			.post(ENDPOINT + '/api/realtime', {
				optionSelected: optionSelected,
				answerFormat: answerFormat,
				options: options,
				nextQuestion: nextQuestion,
				conversation_session_id,
				answers: answers,
				patient_id: patientId
			})
			.then((response) => {
				// TODO: nothing happens here. Will need to override others
				// this.setQuestion()
				this.scrollDown()
			})
			.catch((error) => {
				console.error('realtime post error - ', error)
			});
	}

	imageUpload = (event) => {
		const { questionDetails } = this.state;
		const nextQuestion = questionDetails ? questionDetails.nextQuestion : null;
		const file = event.target.files[0];
		if (!file) return;
		if (!this.socket) console.log("Not connected to doctor's chat");
		this.setState({ uploadingImage: 0.01 });
		const { doctor } = this.state;

		const formData = new FormData();
		formData.append('image', file);

		axios
			.post('/api/image', formData, {
				onUploadProgress: (progressEvent) => {
					this.setState({
						uploadingImage: progressEvent.loaded / progressEvent.total
					});
				}
			})
			.then((response) => {
				const { image } = response.data;
				this.enterMessageIntoChat('chat-img-' + image.filename, 'outgoing');
				if (this.socket) {
					this.socket.emit('message', { message: 'chat-img-' + image.filename, to: doctor });
				} else if (nextQuestion) {
					this.setQuestion(nextQuestion);
				} else if (nextQuestion === 0) {
					this.endChatbotSequence();
				}
				this.setState({ uploadingImage: 0, ...(image ? { image } : {}) });
			})
			.catch((err) => {
				console.log(err);
				if (nextQuestion) {
					this.setQuestion(nextQuestion);
				}
				this.setState({ uploadingImage: 0 });
			});
	};

	/* Chat history box */
	renderChat = () => {
		const {
			callModal,
			chat,
			answerBoxHidden,
			incomingTyping,
			loadingChat,
			requesting,
			mute
		} = this.state;

		if (loadingChat) return null;

		return (
			<div id="chat-box" className="chat-box" style={answerBoxHidden ? { marginBottom: 0 } : {}}>
				{chat.map(({ statement, type }) => {
					// latest message render
          const chatStatement = (typeof statement === 'string') ? statement : statement[this.state.languageSelected];
					return (
						<p
							className={`${type}-message ${type === 'outgoing' ? 'fadeInUp' : 'fadeInRight'}`}
							style={{ animationDelay: type === 'incoming' ? '0.6s' : '0.2s' }}
							onMouseEnter={() => {if (mute === SPEAK_ALL) this.speak(chatStatement, true)}}
							onTouchStart={() => {if (mute === SPEAK_ALL) this.speak(chatStatement, true)}}
							onMouseLeave={() => window.speechSynthesis.cancel()}
						>
							{(typeof statement === 'string') && statement.startsWith('chat-img') ? (
								<img src={'/api/images/' + statement.split('-')[2]} />
							) : (chatStatement)}
							{statement.description_image && <img src={require("../data/" + statement.description_image)}/>}
						</p>
					);
				})}
				{incomingTyping || requesting ? (
					<p className="incoming-message">
						<div class="dots">
							<div class="dot"/>
							<div class="dot"/>
							<div class="dot"/>
						</div>
					</p>
				) : null}
				<CallModal status={callModal} startCall={this.startCall} rejectCall={this.rejectCall} />
			</div>
		);
	};

	speak(chatStatement, stopOldSpeach=true) {
		// console.log("speaking ", chatStatement)
		if (stopOldSpeach) window.speechSynthesis.cancel()
		const msg = new SpeechSynthesisUtterance()
		msg.text = chatStatement.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
		// msg.volume = 1;
		msg.lang = this.state.languageSelected
		window.speechSynthesis.speak(msg);
		// console.log("speechSynthesis.speaking = ", window.speechSynthesis.speaking, "stopSpeaking = ", stopOldSpeach)
		window.speechSynthesis.resume()
	}

	textAnswerOverrides = (event) => {
		const answerFormat = this.state.answerFormat;
		answerFormat.type = TYPE_TEXT
		this.setState({answerFormat})
		this.state.textAnswered = this.state.textOverrideAnswered
		this.state.textOverrideAnswered = ''
		this.setState(this.state)
		this.answer(event)
	};

	/*
	 * Create UI for when user wants to text instead of button, etc.
	 * Used in TYPE_LIST, TYPE_BUTTON, TYPE_SELECT, TYPE_UPLOAD
	 */
	renderTextOverrideMessage = () => {
		const { textOverrideAnswered } = this.state;
		const { pattern } = this.state.answerFormat;

		return (
			<div className="answer-box text-row fadeInUp" style={{ animationDelay: '1s' }}>
				<form onSubmit={this.textAnswerOverrides} className="message-form">
					<input
						id="textOverrideAnswered"
						value={textOverrideAnswered}
						onChange={this.handleChange}
						type={TYPE_TEXT}
						pattern={pattern}
						autoComplete="off"
						autoCorrect="off"
						spellCheck="false"
						onFocus={this.scrollDown}
					/>
					<button type="submit" className="send">
						<Icon.Send />
					</button>
				</form>
			</div>
		)
	}

	/* User inputs */
	renderAnswers = () => {
		const {
			optionSelected,
			textAnswered,
			answerBoxHidden,
			doctor,
			loadingChat,
			uploadingImage
		} = this.state;
		const { options, type, pattern } = this.state.answerFormat;

		const callWithVideo = (video) => {
			const config = { audio: true, video };
			return () => this.startCall(true, config);
		};
		/* no answers allowed */
		if (answerBoxHidden || loadingChat) return null;
		/* chatting with a doctor, so different set of functions */
		else if (uploadingImage) {
			return (
				<div className="answer-box text-row fadeInUp" style={{ animationDelay: '1s' }}>
					<Progress completed={Math.floor(uploadingImage * 100)} />
				</div>
			);
		} else if (doctor) {
			return (
				<div className="answer-box text-row fadeInUp" style={{ animationDelay: '1s' }}>
					<form onSubmit={this.sendMessage} className="message-form">
						<input
							id="textAnswered"
							value={textAnswered}
							onChange={this.handleMessageChange}
							type="text"
							autoComplete="off"
							autoCorrect="off"
							spellCheck="false"
							onFocus={this.scrollDown}
						/>
						{textAnswered ? (
							<button type="submit" className="send">
								<Icon.Send />
							</button>
						) : null}
						{!textAnswered ? (
							<button type="button" onClick={callWithVideo(true)} className="send">
								<Icon.Video />
							</button>
						) : null}
						{!textAnswered ? (
							<button type="button" onClick={callWithVideo(false)} className="send">
								<Icon.PhoneCall />
							</button>
						) : null}
						{!textAnswered ? (
							<button
								type="button"
								onClick={() => {
									$('#imageInput').click();
								}}
								className="send"
							>
								<Icon.Image />
							</button>
						) : null}
						<div style={{ width: 0, height: 0, overflow: 'hidden' }}>
							<input
								type="file"
								id="imageInput"
								name="imageInput"
								onChange={this.imageUpload}
								accept="image/*"
							/>
						</div>
					</form>
				</div>
			);
		} else if (type === TYPE_BUTTON) {
			/* different types of answer*/
			// User answer buttons
			return (
				<div>
					<div className="answer-box button-row">
						{options.map(({ value, statement, url }, index) => {
							const chatStatement = (typeof statement === 'string') ? statement : statement[this.state.languageSelected];
							// noinspection HtmlRequiredAltAttribute
							return (
								<button
									value={value}
									data-url={url}
									id="optionSelected"
									onClick={this.handleChange}
									className="fadeInUp"
									style={{ animationDelay: `1.${index}s`, background: '#CCCCFF', color: '#111111', fontSize: 'large' }}
									onMouseEnter={() => this.speak(chatStatement, false)}
									onTouchStart={() => this.speak(chatStatement, true)}
								>
									{chatStatement}
									{statement.description_image && <img src={require("../data/" + statement.description_image)} style={{
										width: '100%', height: undefined, aspectRatio: 1,  pointerEvents: "none" }}/>}
								</button>
							);
						})}
					</div>
					{this.renderTextOverrideMessage()}
				</div>
			);
		} else if (type === TYPE_LIST) {
			 console.log("renderAnswers list")
			return (
				<div>
				<div style={{ display:"flex", "flexDirection":"column" }}>
					<div className="answer-box button-row" style={{ "flexWrap":"wrap" }}>
						{options.map(({ value, statement }, index) => {
	            const chatStatement = (typeof statement === 'string') ? statement : statement[this.state.languageSelected];
							return (
								<label style={{ animationDelay: `1.${index}s`, background: '#CCCCFF', color: '#111111', fontSize: 'large' }}>
									<input type="checkbox"
										id={value}
										onChange={this.handleChange}
										className="fadeInUp"
										style={{ marginRight: "10px", background: '#CCCCFF', color: '#111111', fontSize: 'large' }}
										onMouseEnter={() => this.speak(chatStatement, false)}
										onTouchStart={() => this.speak(chatStatement, true)}
									/>
										{chatStatement}
								</label>
							);
						})}
					</div>
					<button
						onClick={this.answer}
						className="fadeInUp"
						style={{ animationDelay: `2.0s`, background: '#CCCCFF', color: '#111111', fontSize: 'large', position:'relative', whiteSpace:'nowrap' }}
					>
						<object>
						{ this.state.languageSelected==='hi' ? "भेजें" : "SUBMIT" }
							<object hspace="5"/>
							<Icon.Send/>
						</object>
					</button>
				</div>
					{this.renderTextOverrideMessage()}
				</div>
			);
		} else if (type === TYPE_SELECT) {
			 // spinner
			console.log("renderAnswers select")
			return (
				<div>
				<div className="answer-box select-row fadeInUp" style={{ animationDelay: '1s' }}>
					<select id="optionSelected" value={optionSelected} onChange={this.handleChange}>
						{options && options.map(({ value, statement }) => {
              const chatStatement = (typeof statement === 'string') ? statement : statement[this.state.languageSelected];
							return <option value={value}>{chatStatement}</option>;
						})}
					</select>
					<button onClick={this.answer} className="send">
						<Icon.Send />
					</button>
				</div>
					{this.renderTextOverrideMessage()}
				</div>
			);
		} else if (type === TYPE_UPLOAD) {
			// Media upload
			console.log("renderAnswers upload")
      return (
				<div>
        <div className="answer-box text-row fadeInUp" style={{ animationDelay: '1s' }}>
          <form className="message-form">
            <button
              type="button"
              onClick={() => {
                $('#imageInput').click();
              }}
              className="send"
            >
              <Icon.File />
            </button>
            <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
              <input
                type="file"
                id="imageInput"
                name="imageInput"
                onChange={this.imageUpload}
                accept="*/*"
              />
            </div>
          </form>
        </div>
					{this.renderTextOverrideMessage()}
				</div>
			);
		} else {
			 // text field updated but message not sent. send button is to be pressed
			return (
				<div className="answer-box text-row fadeInUp" style={{ animationDelay: '1s' }}>
					<form onSubmit={this.answer} className="message-form">
						<input
							id="textAnswered"
							value={textAnswered}
							onChange={this.handleChange}
							type={type}
							pattern={pattern}
							autoComplete="off"
							autoCorrect="off"
							spellCheck="false"
							onFocus={this.scrollDown}
						/>
						<button type="submit" className="send">
							<Icon.Send />
						</button>
					</form>
				</div>
			);
		}
	};

	resetConversation = (event) => {
		this.state.reset = true
		// this.state.nextQuestion = 1.0
		// this.state.type = 'none'
		this.setState(this.state)
		this.handleChange(event)
	}

	// needs to be implemented properly using speach state and event
	toggleMuter = (event) => {
		const muter = document.getElementById("muter");
		 // TODO : Use set on progress listener
		 if (this.state.mute === MUTE_ALL){
			this.state.mute = SPEAK_ALL
			 const muted = document.getElementById('muted')
			 muted.style.visibility = 'hidden'
			 const speaks = document.getElementById('speaks')
			 speaks.style.visibility = 'visible'
			this.setState(this.state)
		} else if (this.state.mute === SPEAK_ALL){
			this.state.mute = MUTE_ALL
			 window.speechSynthesis.cancel()
			 const muted = document.getElementById('muted')
			 muted.style.visibility = 'visible'
			 const speaks = document.getElementById('speaks')
			 speaks.style.visibility = 'hidden'
			this.setState(this.state)
		}
	}

	/*
	 * Render language selector and chat refresher
	 */
  renderLanguageSelect = () => {
    const {
			languageSelected
		} = this.state;

		return (
      <div className="select-row fadeInUp" style={{ animationDelay: '0.2s' }}>
				<label>Language:</label>
				<select id="languageSelected" value={languageSelected} onChange={this.handleLanguageChange}>
					{languages.map(({ code, name }) => {
						return <option value={code}>{name}</option>;
					})}
				</select>
				<object hspace="30"/>
				<Icon.VolumeX id={"muted"} onClick={this.toggleMuter} alt={Icon.Volume} style={{ visibility: "hidden" }}/>
				<Icon.Volume2 id={"speaks"} onClick={this.toggleMuter} alt={Icon.Volume}/>
				<object hspace="30"/>
				<Icon.Repeat onClick={this.resetConversation}/>
				<object hspace="5"/>
      </div>
    );
  };

	render() {
		const { loadingChat } = this.state;
		const { callWindow, localSrc, peerSrc } = this.state;

		if (!_.isEmpty(this.config)) {
			return (
				<CallWindow
					status={callWindow}
					localSrc={localSrc}
					peerSrc={peerSrc}
					config={this.config}
					mediaDevice={this.pc.mediaDevice}
					endCall={this.endCall}
				/>
			);
		}

		return (
    <>
      <div className="chat-options expand">
        {this.renderLanguageSelect()}
      </div>
      <div className="Chat fadeInUp" style={{ animationDelay: '0.7s' }}>
        {loadingChat && <div className="lds-dual-ring"/>}
        {this.renderChat()}
        {this.renderAnswers()}
      </div>
    </>
		);
	}
}
