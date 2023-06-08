const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const client = require("socket.io-client");
const { BACKEND_URL_DEV } = require("../../config");
const PeerConnection = require("../webrtc/PeerConnection");
const _ = require("lodash");

export default class Chat extends React.Component {

  componentDidMount() {

}  

  getLastUsedId = async () => {
    try {
      const lastDocument = await Feedbackt2.findOne({}, "_id")
        .sort({ _id: -1 })
        .lean()
        .exec();

      return lastDocument;
    } catch (error) {
      console.error("Error retrieving last used _id:", error);
    }
  }

  return_data = async () => {
    const data = await Feedbackt2.find();
    console.log(data);
    return data;
  }

  componentWillUnmount() {
    if (this.socket) this.socket.disconnect();
  }

  connect = () => {
    const { patientId } = this.state;

    this.setState({ requesting: true });

    // create socket based on environment - dev/prod
    this.socket = client(process.env.NODE_ENV === 'development' ? BACKEND_URL_DEV : '/', {
      path: '/doctor/persona',
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

}