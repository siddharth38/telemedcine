module.exports = {
    "questions": [
        {
            "id": 1.0,
            "options": [
                {
                    "nextQuestion": 23.0,
                    "statement": {
                        "hi": "परामर्श",
                        "en": "Consultation"
                    },
                    "value": 0
                },
                {
                    "nextQuestion": 2.0,
                    "statement": {
                        "hi": "ब्लैकफंगस (म्यूकोर्मिकोसिस) के लिए स्व-मूल्यांकन",
                        "en": "Self assessment for Blackfungus (mucormycosis)"
                    },
                    "value": 1
                },
                {
                    "nextQuestion": 12.0,
                    "statement": {
                        "hi": "ब्लैकफंगस (म्यूकोर्मिकोसिस) के बारे में जानकारी",
                        "en": "Information about Blackfungus (mucormycosis)"
                    },
                    "value": 2
                }
            ],
            "statement": {
                "hi": "आगे की बातचीत के लिए अपना विकल्प चुनें",
                "en": "Choose your option for further interaction"
            },
            "type": "button"
        },
        {
            "id": 2.0,
            "nextQuestion": 3.0,
            "statement": {
                "hi": "आगामी कथनों में दिए गए चरणों का पालन करें",
                "en": "Follow the steps given in the upcoming statements"
            },
            "type": "none"
        },
        {
            "id": 3.0,
            "nextQuestion": 4.0,
            "statement": {
                "hi": "अपनी आँखें बंद करें और अपनी नाक या गाल को छूने की कोशिश करें",
                "en": "Close your eyes and try to touch your nose or cheek"
            },
            "type": "none"
        },
        {
            "id": 4.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 5.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 5.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आप इसे महसूस कर पा रहे हैं?",
                "en": "Can you feel it?"
            },
            "type": "button"
        },
        {
            "id": 5.0,
            "nextQuestion": 6.0,
            "statement": {
                "hi": "अपनी आँखें बंद करें।",
                "en": "Close your eyes."
            },
            "type": "none"
        },
        {
            "id": 6.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 7.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 7.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आप उन्हें पूरी तरह बंद कर पा रहे हैं?",
                "en": "Can you close them completely?"
            },
            "type": "button"
        },
        {
            "id": 7.0,
            "nextQuestion": 8.0,
            "statement": {
                "hi": "ऊपरी दांतों के पीछे मुंह के अंदर का ऊपरी भाग देखें",
                "en": "See the upper part inside the mouth behind the upper teeth"
            },
            "type": "none"
        },
        {
            "id": 8.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 9.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 9.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या कोई सूजन है?",
                "en": "Is there any swelling?"
            },
            "type": "button"
        },
        {
            "id": 9.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 9.1,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 9.1,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या ऊपरी हिस्से में कोई मलिनकिरण है?",
                "en": "Is there any discoloration in the upper part?"
            },
            "type": "button"

        },
          {
			  "id": 9.1,
		"statement": {
		"en": "Assesing your responses...",
		 "hi": "आपकी प्रतिक्रियाओं का आकलन......"
	},
    "type": "none",
    "command": "selfevaluation",
           "paramsFrom": {
              "Sensation": 4,
			  "Eye_Control": 6,
			  "Palette1": 8,
			  "Palette2": 9
            },
            "branches": {
              "doing_fine": 11.0,
              "Redirecting_for_consultation": 22.0
            },
  },
		{
            "id": 11.0,
            "options": [
                {
                    "dbValue": "Restart",
                    "nextQuestion": 1.0,
                    "statement": {
                        "hi": "चैटबॉट के साथ बातचीत को फिर से शुरू करें",
                        "en": "Restart the interaction with the Chatbot"
                    },
                    "value": 0
                },
                {
                    "dbValue": "End",
                    "nextQuestion": 11.1,
                    "statement": {
                        "hi": "बातचीत समाप्त करें",
                        "en": "End the interaction"
                    },
                    "value": 1
                }
            ],

            "statement": {
                "hi": "आप स्वस्थ हैं।",
                "en": "You are doing fine."
            },
            "type": "button"
        },
        {
            "id": 11.1,
            "nextQuestion": 0,
            "statement": {
                "hi": "आपका दिन शुभ हो",
                "en": "Have a nice day."
            },
            "type": "none"
        },
        {
            "id": 12.0,
            "options": [
                {
                    "dbValue": 0,
                    "nextQuestion": 13.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस क्या है?",
                        "en": "What is Mucormycosis?"
                    },
                    "value": 0
                },
                {
                    "dbValue": 1,
                    "nextQuestion": 14.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस के संभावित कारण क्या हैं?",
                        "en": "What are potential causes of Mucormycosis?"
                    },
                    "value": 1
                },
                {
                    "dbValue": 2,
                    "nextQuestion": 15.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस के पैथोफिज़ियोलॉजी के बारे में जानकारी",
                        "en": "Information about pathophysiology of Mucormycosis"
                    },
                    "value": 2
                },
                {
                    "dbValue": 3,
                    "nextQuestion": 16.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस के लक्षण",
                        "en": "Symptoms of Mucormycosis"
                    },
                    "value": 3
                },
                {
                    "dbValue": 4,
                    "nextQuestion": 17.0,
                    "statement": {
                        "hi": "डॉक्टर से कब संपर्क करें?",
                        "en": "When to contact Doctor?"
                    },
                    "value": 4
                },
                {
                    "dbValue": 5,
                    "nextQuestion": 18.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस का निदान",
                        "en": "Diagnosis of Mucormycosis"
                    },
                    "value": 5
                },
                {
                    "dbValue": 6,
                    "nextQuestion": 19.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस का इलाज",
                        "en": "Treatment of Mucormycosis"
                    },
                    "value": 6
                },
                {
                    "dbValue": 7,
                    "nextQuestion": 20.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस के मिथक",
                        "en": "Myths around Mucormycosis"
                    },
                    "value": 7
                },
                {
                    "dbValue": 8,
                    "nextQuestion": 1,
                    "statement": {
                        "hi": "चैटबॉट से बाहर निकलें और पुनः आरंभ करें",
                        "en": "Exit and restart the Chatbot"
                    },
                    "value": 8
                }
            ],
            "statement": {
                "hi": "जानकारी जो आप जानना चाहते हैं",
                "en": "Information you want to know"
            },
            "type": "button"
        },
        {
            "id": 13.0,
            "options": [
                {
                    "dbValue": 0,
                    "nextQuestion": 21.0,
                    "statement": {
                        "hi": "आगे बढे",
                        "en": "Next"
                    },
                    "value": 0
                },
              ],

            "statement": {
                "hi": "म्यूकोर्मिकोसिस (कभी-कभी जाइगोमाइकोसिस कहा जाता है) एक गंभीर लेकिन दुर्लभ फंगस संक्रमण है जो जाइगोमाइसीट्स नामक मोल्डों के समूह के कारण होता है। ये फंगस (म्यूकोरल) पूरे वातावरण में रहते हैं, विशेष रूप से मिट्टी में और सड़ने वाले कार्बनिक पदार्थों, जैसे पत्तियों, खाद के ढेर, या सड़ी हुई लकड़ी में। म्यूकोर्मिकोसिस पैदा करने वाले फंगस को ब्लैक फंगस भी कहा जाता है लेकिन यह ब्लैक फंगस नहीं है।",
                "en": "Mucormycosis (sometimes called zygomycosis) is a serious but rare fungal infection caused by a group of molds called zygomycetes.  These fungi (mucorals) live throughout the environment, particularly in soil and in decaying organic matter, such as leaves, compost piles, or rotten wood. The Fungus causing Mucormycosis is also referred to Black Fungus but it is not Black Fungus."
            },
            "type": "button"
        },
        {
            "id": 21.0,
            "options": [
                {
                    "dbValue": 0,
                    "nextQuestion": 13.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस क्या है?",
                        "en": "What is Mucormycosis?"
                    },
                    "value": 0
                },
                {
                    "dbValue": 1,
                    "nextQuestion": 14.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस के संभावित कारण क्या हैं?",
                        "en": "What are potential causes of Mucormycosis?"
                    },
                    "value": 1
                },
                {
                    "dbValue": 2,
                    "nextQuestion": 15.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस के पैथोफिज़ियोलॉजी के बारे में जानकारी",
                        "en": "Information about pathophysiology of Mucormycosis"
                    },
                    "value": 2
                },
                {
                    "dbValue": 3,
                    "nextQuestion": 16.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस के लक्षण",
                        "en": "Symptoms of Mucormycosis"
                    },
                    "value": 3
                },
                {
                    "dbValue": 4,
                    "nextQuestion": 17.0,
                    "statement": {
                        "hi": "डॉक्टर से कब संपर्क करें?",
                        "en": "When to contact Doctor?"
                    },
                    "value": 4
                },
                {
                    "dbValue": 5,
                    "nextQuestion": 18.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस का निदान",
                        "en": "Diagnosis of Mucormycosis"
                    },
                    "value": 5
                },
                {
                    "dbValue": 6,
                    "nextQuestion": 19.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस का इलाज",
                        "en": "Treatment of Mucormycosis"
                    },
                    "value": 6
                },
                {
                    "dbValue": 7,
                    "nextQuestion": 20.0,
                    "statement": {
                        "hi": "म्यूकोर्मिकोसिस के आसपास के मिथक",
                        "en": "Myths around Mucormycosis"
                    },
                    "value": 7
                },
                {
                    "dbValue": 8,
                    "nextQuestion": 1,
                    "statement": {
                        "hi": "चैटबॉट से बाहर निकलें और पुनः आरंभ करें",
                        "en": "Exit and restart the Chatbot"
                    },
                    "value": 8
                }
            ],
            "statement": {
                "hi": "अन्य जानकारी जो आप जानना चाहेंगे",
                "en": "Other information you may want to know"
            },
            "type": "button"
        },
        {
            "id": 14.0,
            "nextQuestion": 14.1,
            "statement": {
                "hi": "यह वातावरण में मौजूद फंगस बीजाणुओं के संपर्क में आने से होता है।",
                "en": "It is caused by coming in contact with the fungal spores present in the environment."
            },
            "type": "none"
        },
        {
            "id": 14.1,
            "nextQuestion": 14.2,
            "statement": {
                "hi": "निम्नलिखित स्थितियों में म्यूकोर्मिकोसिस संक्रमण का खतरा बढ़ जाता है: \n 1. अनियंत्रित मधुमेह! \n 2. स्टेरॉयड के उपयोग के कारण प्रतिरक्षा प्रणाली का कमजोर होना! \n 3. लंबे समय तक आईसीयू/अस्पताल में रहना! \n 4. सह-रुग्णता / अंग प्रत्यारोपण के बाद / कैंसर!",
                "en": "Following conditions increase the risk of mucormycosis infection: \n 1. Uncontrolled/Undiagnosed diabetes. \n 2. Weakening of immune system due to use of steroids. \n 3. Prolonged ICU/hospital stay. \n 4. Co-morbidities / post organ transplant / cancer"
            },
            "type": "none"
        },
        {
            "id": 14.2,
            "options": [
                {
                    "dbValue": 0,
                    "nextQuestion": 21.0,
                    "statement": {
                        "hi": "आगे बढे",
                        "en": "Next"
                    },
                    "value": 0
                },
              ],
            "statement": {
                "hi": "जानकारी: मधुमेह के रोगियों के लिए हर 3 महीने में HbA1C के स्तर की निगरानी करनी चाहिए और यह म्यूकोर्मिकोसिस के जोखिम को कम करने में मदद कर सकता है।",
                "en": "Information: Monitoring of HbA1C levels every 3 months for diabetic patients is recommended and that may help to reduce the risk of Mucormycosis"
            },
            "type": "button"
        },
        {
            "id": 20.0,
            "nextQuestion": 20.1,
            "statement": {
                "hi": "म्यूकोर्मिकोसिस संक्रमण का फंगस समूह जाइगोमाइसीट्स है और यह एक काला फंगस  नहीं है।",
                "en": "The Fungi group of Mucormycosis infection is Zygomycetes and it is not a Black Fungus"
            },
            "type": "none"
        },
        {
            "id": 20.1,
            "nextQuestion": 20.2,
            "statement": {
                "hi": "म्यूकोर्मिकोसिस संक्रामक नहीं है और वेन्टिलेटर द्वारा दिया गया ऑक्सीजन या पानी से नहीं फैलता है।",
                "en": "Mucormycosis is not contagious and does not spread by oxygenation, humidifiers and water."
            },
            "type": "none"
        },
        {
            "id": 20.2,
            "options": [
                {
                    "dbValue": 0,
                    "nextQuestion": 21.0,
                    "statement": {
                        "hi": "आगे बढे",
                        "en": "Next"
                    },
                    "value": 0
                },
              ],
            "statement": {
                "hi": "संक्रमण होने से पहले म्यूकोर्मिकोसिस के इलाज से कोई फायदा नहीं, डॉक्टर से सलाह लें।",
                "en": "No use of taking Mucormycosis treatment before getting infection, consult a Doctor."
            },
            "type": "button"
        },
        {
            "id": 15.0,
            "options": [
                {
                    "dbValue": 0,
                    "nextQuestion": 21.0,
                    "statement": {
                        "hi": "आगे बढे",
                        "en": "Next"
                    },
                    "value": 0
                },
              ],
            "statement": {
                "hi": "ऊतकों के इस्किमिया (रक्त की आपूर्ति में कमी जिससे ऑक्सीजन में कमी आती है) जिसके परिणामस्वरूप संक्रमित भाग का परिगलन होता है",
                "en": "Ischemia (decrease in blood supply leading to decrease in oxygen) of tissues resulting to necrosis of infected part"
            },
            "type": "button"
        },
        {
            "id": 16.0,
            "options": [
                {
                    "dbValue": 0,
                    "nextQuestion": 21.0,
                    "statement": {
                        "hi": "आगे बढे",
                        "en": "Next"
                    },
                    "value": 0
                },
              ],
            "statement": {
                "hi": "धुंधली दृष्टि, चेहरे की सूजन, नाक में जमाव, दुर्गंध, आंखों में लाली, त्वचा का काला पड़ना, सिरदर्द, संवेदना में कमी,मुंह के अंदर कालापन आना",
                "en": "Blurred Vision, Facial Swelling, Nasal Congestion, Foul smell, Redness in the eyes, Skin blackening, Headache, loss of sensation, blackish discoloration in the oral cavity"
            },
            "type": "button"
        },
        {
            "id": 17.0,
            "options": [
                {
                    "dbValue": 0,
                    "nextQuestion": 21.0,
                    "statement": {
                        "hi": "आगे बढे",
                        "en": "Next"
                    },
                    "value": 0
                },
              ],
            "statement": {
                "hi": "नाक के आसपास की त्वचा का काला पड़ना / मलिनकिरण, दृष्टि की हानि, नाक बंद होना, चेहरे की संवेदना में कमी और चेहरे का दर्द खतरनाक लक्षण हैं और इन स्थितियों में तुरंत डॉक्टर से संपर्क करना चाहिए।",
                "en": "Blackening/discoloration of skin around Nose, loss of vision, Nasal congestion, loss of facial sensation and Facial pain are the alarming  symptoms and one must immediately contact Doctor in these situations"
            },
            "type": "button"
        },
        {
            "id": 18.0,
            "nextQuestion": 18.1,
            "statement": {
                "hi": "प्रयोगशाला निदान: 1. ऊतक बायोप्सी की माइक्रोस्कोपी और कल्चर। 2. संदिग्ध संक्रमण क्षेत्र का सीटी स्कैन।",
                "en": "Laboratory Diagnosis: 1. Microscopy and culture of tissue biopsy. 2. CT scan of the suspected infection area."
            },
            "type": "none"
        },
        {
            "id": 18.1,
            "options": [
                {
                    "dbValue": 0,
                    "nextQuestion": 21.0,
                    "statement": {
                        "hi": "आगे बढे",
                        "en": "Next"
                    },
                    "value": 0
                },
              ],
            "statement": {
                "hi": "नैदानिक ​​निदान: चेहरे की सूजन, चेहरे की संवेदना में कमी, चेहरे का टेढ़ापन, नाक के आसपास की त्वचा का काला पड़ना नैदानिक ​​निदान का कारण हो सकता है। नाक की दूरबीन से जांच करना ज़रूरी है। पूर्ण निदान केवल एक अस्पताल में ही किया जा सकता है",
                "en": "Clinical Diagnosis: Facial swelling, decrease in sensation of facial, facial palsy, blackening of skin around nose may lead to clinical diagnosis. Diagnostic nasal endoscopy is required. Full diagnosis can be only be done in a hospital setup"
            },
            "type": "button"
        },
        {
            "id": 19.0,
            "options": [
                {
                    "dbValue": 0,
                    "nextQuestion": 21.0,
                    "statement": {
                        "hi": "आगे बढे",
                        "en": "Next"
                    },
                    "value": 0
                },
              ],
            "statement": {
                "hi": "शल्य चिकित्सा के माध्यम से संक्रमित ऊतक को हटाया जाता है और दवा सख्त निगरानी में चिकित्सक द्वारा निर्धारित उपयुक्त फंगस को मारने वाली दी जाती हैै",
                "en": "Removal of infected tissue through surgery and Medication: Appropriate anti-fungals to be prescribed by the Physician under strict monitoring"
            },
            "type": "button"
        },
        {
            "id": 22.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 23,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 0.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आप परामर्श के लिए जाना चाहेंगे?",
                "en": "Would you like to go for consultation?"
            },
            "type": "button"
        },
        {
            "id": 23.0,
            "options": [
                {
                    "nextQuestion": 28.0,
                    "statement": {
                        "hi": "नया परामर्श",
                        "en": "New consultation"
                    },
                    "value": 0
                },
                {
                    "nextQuestion": 24.0,
                    "statement": {
                        "hi": "पिछला परामर्श",
                        "en": "Previous consultation"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "परामर्श के लिए अपना विकल्प चुनें",
                "en": "Choose your option for counseling"
            },
            "type": "button"
        },
        {
            "id": 24.0,
            "nextQuestion": 25.0,
            "statement": {
                "hi": "आपका नाम? पहले परामर्श के लिए प्रयुक्त Used",
                "en": "Your name? Used for the earlier consultation"
            },
            "type": "text"
        },
        {
            "id": 25.0,
            "nextQuestion": 26,
            "pattern": "[0-9]{10}",
            "statement": {
                "hi": "आपका संपर्क नंबर? जिसे आपने पहले पंजीकृत किया था",
                "en": "Your contact number? Which you registered previously"
            },
            "type": "tel"
        },
        {
            "id": 26.0,
            "options": [
                {
                    "dbValue": "AIIMS Jodhpur",
                    "nextQuestion": 27.0,
                    "statement": {
                        "hi": "एम्स जोधपुर",
                        "en": "AIIMS Jodhpur"
                    },
                    "value": 0
                }
            ],
            "statement": {
                "hi": "डॉक्टर या अस्पताल चुनकर जांच शुरू करें",
                "en": "Start the investigation by choosing a doctor or hospital"
            },
            "type": "select"
        },
        {
            "id": 27.0,
            "nextQuestion": 0,
            "statement": {
                "hi": "एम्स के मरीज की आईडी?",
                "en": "AIIMS patient's ID?"
            },
            "type": "text"
        },
        {
            "id": 28.0,
            "options": [
                {
                    "dbValue": "OPD",
                    "nextQuestion": 2.5,
                    "statement": {
                        "hi": "ओ.पी.डी / सामान्य परामर्श",
                        "en": "O.P.D / General counseling"
                    },
                    "value": 0
                },
                {
                    "dbValue": "COVID-19",
                    "nextQuestion": 29.0,
                    "statement": {
                        "hi": "COVID-19 या ब्लैक फंगस संबंधित परामर्श",
                        "en": "COVID-19 or Black Fungus related counseling"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "अपना विकल्प चुनें",
                "en": "Choose your option"
            },
            "type": "button"
        },
        {
            "id": 29.0,
            "nextQuestion": 30.0,
            "statement": {
                "hi": "आपका नाम क्या हे?",
                "en": "What is your name?"
            },
            "type": "text"
        },
        {
            "id": 30.0,
            "nextQuestion": 31.0,
            "pattern": "[0-9]{10}",
            "statement": {
                "hi": "आपका संपर्क नंबर? भविष्य में यदि आवश्यक हो तो संपर्क करने के लिए",
                "en": "Your contact number? To contact in the future if required"
            },
            "type": "tel"
        },
        {
            "id": 31.0,
            "nextQuestion": 32.0,
            "pattern": "[0-9]{1,3}",
            "statement": {
                "hi": "आपकी उम्र क्या हैं?",
                "en": "What is your age?"
            },
            "type": "tel"
        },
        {
            "id": 32.0,
            "options": [
                {
                    "dbValue": "Male",
                    "nextQuestion": 33.0,
                    "statement": {
                        "hi": "पुरुष",
                        "en": "Male"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Female",
                    "nextQuestion": 33.0,
                    "statement": {
                        "hi": "महिला",
                        "en": "Female"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Other",
                    "nextQuestion": 33.0,
                    "statement": {
                        "hi": "अन्य",
                        "en": "Other"
                    },
                    "value": 2
                }
            ],
            "statement": {
                "hi": "आपका लिंग क्या है?",
                "en": "What is your gender?"
            },
            "type": "button"
        },
        {
            "id": 33.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 34.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 34.1,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आपके पास ईमेल आईडी है? नवीनतम जानकारी प्रदान करना चाहते हैं?",
                "en": "Do you have an email ID? Want to provide for latest information?"
            },
            "type": "button"
        },
        {
            "id": 34.0,
            "nextQuestion": 34.1,
            "statement": {
                "hi": "आपकी ईमेल आईडी?",
                "en": "Your Email ID?"
            },
            "type": "text"
        },
        {
            "id": 35.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 46.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 36.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आपको पहले भी COVID-19 का निदान हुआ है?",
                "en": "Have you been diagnosed with COVID-19 before?"
            },
            "type": "button"
        },
        {
            "id": 36.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 37.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 38.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आपके पास रक्तचाप (BP) मापने का यंत्र है?",
                "en": "Do you have a Blood Pressure measuring instrument?"
            },
            "type": "button"
        },
        {
            "id": 37.0,
            "nextQuestion": 38.0,
            "statement": {
                "hi": "अपना वर्तमान रक्तचाप (BP) प्रदान करें",
                "en": "Provide your current Blood Pressure"
            },
            "type": "text"
        },
        {
            "id": 38.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 39.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 41.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आपके पास पल्स ऑक्सीमीटर है?",
                "en": "Do you have Pulse Oximeter?"
            },
            "type": "button"
        },
        {
            "id": 39.0,
            "nextQuestion": 40.0,
            "statement": {
                "hi": "अपना SPO2 स्तर प्रदान करें",
                "en": "Provide your SPO2 level"
            },
            "type": "text"
        },
        {
            "id": 40.0,
            "nextQuestion": 41.0,
            "statement": {
                "hi": "पल्स ऑक्सीमीटर से अपनी हृदय गति प्रदान करें",
                "en": "Provide your Heart rate from pulse oximeter"
            },
            "type": "text"
        },
        {
            "id": 41.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 42.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 43.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आपके पास थर्मामीटर है?",
                "en": "Do you have thermometer?"
            },
            "type": "button"
        },
        {
            "id": 42.0,
            "nextQuestion": 43.0,
            "pattern": "[0-9]{2,3}",
            "statement": {
                "hi": "अपने शरीर का तापमान प्रदान करें",
                "en": "Provide your body temperature"
            },
            "type": "tel"
        },
        {
            "id": 43.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 44.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 50,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आपका ग्लूकोज स्तर पिछले 5 दिनों में मापा गया है?",
                "en": "Do you have glucose level measured in last 5 days?"
            },
            "type": "button"
        },
        {
            "id": 44.0,
            "options": [
                {
                    "dbValue": "Before Breakfast",
                    "nextQuestion": 45.0,
                    "statement": {
                        "hi": "नाश्ते से पहले",
                        "en": "Before Breakfast"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Between Breakfast and lunch",
                    "nextQuestion": 45.0,
                    "statement": {
                        "hi": "नाश्ते और दोपहर के भोजन के बीच",
                        "en": "Between Breakfast and lunch"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Any other time",
                    "nextQuestion": 45,
                    "statement": {
                        "hi": "किसी और समय",
                        "en": "Any other time"
                    },
                    "value": 2
                }
            ],
            "statement": {
                "hi": "आपने ग्लूकोज का स्तर किस समय मापा?",
                "en": "At what time did you measured the glucose level?"
            },
            "type": "button"
        },
        {
            "id": 45.0,
            "nextQuestion": 50,
            "pattern": "[0-9]{2,3}",
            "statement": {
                "hi": "ग्लूकोज स्तर प्रदान करें",
                "en": "Provide the glucose level"
            },
            "type": "tel"
        },
        {
            "id": 46.0,
            "options": [
                {
                    "dbValue": "With in a month",
                    "nextQuestion": 47.0,
                    "statement": {
                        "hi": "एक महीने के अंदर",
                        "en": "With in a month"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Before 1 month",
                    "nextQuestion": 47.0,
                    "statement": {
                        "hi": "1 महीने से पहले",
                        "en": "Before 1 month"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Before 2 months",
                    "nextQuestion": 47.0,
                    "statement": {
                        "hi": "2 महीने पहले",
                        "en": "Before 2 months"
                    },
                    "value": 2
                }
            ],
            "statement": {
                "hi": "आपको COVID-19 कब निदान हुआ?",
                "en": "When did you get diagnosed for COVID-19?"
            },
            "type": "button"
        },
        {
            "id": 47.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 67.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 48.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आप अस्पताल में भर्ती थे COVID-19 के लिए?",
                "en": "Were you hospitalised for COVID-19?"
            },
            "type": "button"
        },
        {
            "id": 48.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 49.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 49.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Don't know",
                    "nextQuestion": 49.0,
                    "statement": {
                        "hi": "पता नहीं",
                        "en": "Don't know"
                    },
                    "value": 2
                }
            ],
            "statement": {
                "hi": "क्या आपने स्टेरॉयड को दवा के रूप में लिया?",
                "en": "Did you take steroids as medication?"
            },
            "type": "button"
        },
        {
            "id": 49.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 36,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 36,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Don't know",
                    "nextQuestion": 37,
                    "statement": {
                        "hi": "पता नहीं",
                        "en": "Don't know"
                    },
                    "value": 2
                }
            ],
            "statement": {
                "hi": "क्या आप ऑक्सीजन सपोर्ट पर थे?",
                "en": "Were you on Oxygen Support?"
            },
            "type": "button"
        },
        {
            "id": 50.0,
            "nextQuestion": 51.0,
            "options": [

				{
                    "dbValue": "Diabetes",

                    "statement": {
                        "hi": "मधुमेह",
                        "en": "Diabetes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Hypertension (High Blood Pressure)",

                    "statement": {
                        "hi": "उच्च रक्तचाप (उच्च BP)",
                        "en": "Hypertension (High Blood Pressure)"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Asthma",

                    "statement": {
                        "hi": "दमा",
                        "en": "Asthma"
                    },
                    "value": 2
                },
                {
                    "dbValue": "On Chemotherapy?",

                    "statement": {
                        "hi": "कीमोथेरेपी पर?",
                        "en": "On Chemotherapy?"
                    },
                    "value": 3
                },
                {
                    "dbValue": "Tuberculosis (TB)",

                    "statement": {
                        "hi": "क्षय रोग (TB)",
                        "en": "Tuberculosis (TB)"
                    },
                    "value": 4
                },
                {
                    "dbValue": "Anaemia",

                    "statement": {
                        "hi": "एनीमिया",
                        "en": "Anaemia"
                    },
                    "value": 5
                }
            ],
            "statement": {
                "hi": "उन स्थितियों की सूची बनाएं जिनके लिए आप दवाएं ले रहे हैं",
                "en": "List the conditions you are taking medications for"
            },
            "type": "list"
        },
        {
            "id": 51.0,
            loopStart: true,
            "options": [
                {
                    "dbValue": "HRCT scan ",
                    "nextQuestion": 52.0,
                    "statement": {
                        "hi": "HRCT स्कैन रिपोर्ट",
                        "en": "HRCT scan report"
                    },
                    "value": 0
                },
                {
                    "dbValue": "CRP test ",
                    "nextQuestion": 52.0,
                    "statement": {
                        "hi": "CRP परीक्षण रिपोर्ट",
                        "en": "CRP test report"
                    },
                    "value": 1
                },
                {
                    "dbValue": "IL6 test ",
                    "nextQuestion": 52.0,
                    "statement": {
                        "hi": "IL6 परीक्षण रिपोर्ट",
                        "en": "IL6 test report"
                    },
                    "value": 2
                },
                {
                    "dbValue": "D-dimer test ",
                    "nextQuestion": 52.0,
                    "statement": {
                        "hi": "D-dimer परीक्षण रिपोर्ट",
                        "en": "D-dimer test report"
                    },
                    "value": 3
                },
                {
                    "dbValue": "Ferritin test ",
                    "nextQuestion": 52.0,
                    "statement": {
                        "hi": "Ferritin परीक्षण रिपोर्ट",
                        "en": "Ferritin test report"
                    },
                    "value": 4
                },
                {
                    "dbValue": "Procalcitonin test ",
                    "nextQuestion": 52.0,
                    "statement": {
                        "hi": "Procalcitonin परीक्षण रिपोर्ट",
                        "en": "Procalcitonin test report"
                    },
                    "value": 5
                },
                {
                    "dbValue": "KFT",
                    "nextQuestion": 52.0,
                    "statement": {
                        "hi": "KFT रिपोर्ट",
                        "en": "KFT report"
                    },
                    "value": 6
                },
                {
                    "dbValue": "None available/All uploaded",
                    "nextQuestion": 53.0,
                    "statement": {
                        "hi": "कोई उपलब्ध नहीं/सभी अपलोड किए गए",
                        "en": "None available/All uploaded"
                    },
                    "value": 7
                }
            ],
            "statement": {
                "hi": "एक-एक करके लैब रिपोर्ट चुनें जो आपके पास वर्तमान में है",
                "en": "Select one by one the lab report you currently have with you"
            },
            "type": "button"
        },
        {
            "id": 52.0,
            "nextQuestion": 51.0,
            "statement": {
                "hi": "कृपया रिपोर्ट अपलोड कर (चित्र)",
                "en": "Please upload the report (as an image file)"
            },
            "type": "upload"
        },
        {
            "id": 53.0,
            "options": [
                {
                    "dbValue": "Fever",

                    "statement": {
                        "hi": "बुखार",
                        "en": "Fever"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Sore Throat",

                    "statement": {
                        "hi": "गले में खराश",
                        "en": "Sore Throat"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Cough",

                    "statement": {
                        "hi": "खांसी",
                        "en": "Cough"
                    },
                    "value": 2
                },
                {
                    "dbValue": "Diarehea",

                    "statement": {
                        "hi": "दस्त",
                        "en": "Diarrhea"
                    },
                    "value": 3
                },
                {
                    "dbValue": "Blackening of Skin",

                    "statement": {
                        "hi": "त्वचा का काला पड़ना / मलिनकिरण",
                        "en": "Blackening/discoloration of Skin"
                    },
                    "value": 4
                },
                {
                    "dbValue": "Facial Swelling",

                    "statement": {
                        "hi": "चेहरे पर सूजन",
                        "en": "Swelling on face"
                    },
                    "value": 5
                },
                {
                    "dbValue": "Lethargic",

                    "statement": {
                        "hi": "सुस्ती",
                        "en": "Lethargic"
                    },
                    "value": 6
                },
                {
                    "dbValue": "None of the listed",

                    "statement": {
                        "hi": "सूचीबद्ध में से कोई नहीं",
                        "en": "None of the listed"
                    },
                    "value": 7
                }
            ],
            "statement": {
                "hi": "निम्नलिखित लक्षणों का चयन करें जो आप अनुभव कर रहे हैं",
                "en": "Select the following symptoms you are experiencing"
            },
            "type": "list",
			 "command": "firstassessement",
            "paramsFrom": {
              "symptoms": 53.0,
            },
            "branches": {
              "for_mucormycosis": 55.0,
              "for_covid19": 56.0,
			  "still_not_confirmed": 57.0
            },
        },
        {
            "id": 55.0,
            "nextQuestion": 62.0,
            "options": [

				{
                    "dbValue": "Foul Smell",

                    "statement": {
                        "hi": "दुर्गंध आना",
                        "en": "Foul Smell"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Nose Block",

                    "statement": {
                        "hi": "नाक ब्लॉक",
                        "en": "Nose Block"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Runny Nose",

                    "statement": {
                        "hi": "बहती नाक",
                        "en": "Runny Nose"
                    },
                    "value": 2
                },
                {
                    "dbValue": "Facial Numbness",

                    "statement": {
                        "hi": "चेहरे पर सुन्नपन",
                        "en": "Numbness on Face"
                    },
                    "value": 3
                },
                {
                    "dbValue": "Dental Pain",

                    "statement": {
                        "hi": "दांत का दर्द",
                        "en": "Dental Pain"
                    },
                    "value": 4
                },
                {
                    "dbValue": "Loss or Blurring of Vision",

                    "statement": {
                        "hi": "दृष्टि में हानि या धुंधलापन",
                        "en": "Loss or Blurring of Vision"
                    },
                    "value": 5
                },
                {
                    "dbValue": "Bulging of the eye",

                    "statement": {
                        "hi": "आँख का फड़कना",
                        "en": "Bulging of the eye"
                    },
                    "value": 6
                },
                {
                    "dbValue": "Restricted movement of the eye",

                    "statement": {
                        "hi": "आँख की प्रतिबंधित गति",
                        "en": "Restricted movement of the eye"
                    },
                    "value": 7
                },
                {
                    "dbValue": "Weakness on face",

                    "statement": {
                        "hi": "चेहरे पर कमजोरी",
                        "en": "Weakness on face"
                    },
                    "value": 8
                },
                {
                    "dbValue": "Headache",

                    "statement": {
                        "hi": "सरदर्द",
                        "en": "Headache"
                    },
                    "value": 9
                },
                {
                    "dbValue": "None of the listed",

                    "statement": {
                        "hi": "सूचीबद्ध में से कोई नहीं",
                        "en": "None of the listed"
                    },
                    "value": 10
                }
            ],
            "statement": {
                "hi": "निम्नलिखित लक्षणों का चयन करें जो आप अनुभव कर रहे हैं",
                "en": "Select the following symptoms you are experiencing"
            },
            "type": "list"
        },
        {
            "id": 56.0,
            "nextQuestion": 62.0,
            "options": [

				{
                    "dbValue": "Headache",

                    "statement": {
                        "hi": "सरदर्द",
                        "en": "Headache"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Loss of smell",

                    "statement": {
                        "hi": "गंध की हानि",
                        "en": "Loss of smell"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Loss of taste",

                    "statement": {
                        "hi": "स्वाद की हानि",
                        "en": "Loss of taste"
                    },
                    "value": 2
                },
                {
                    "dbValue": "Giddiness",

                    "statement": {
                        "hi": "चक्कर",
                        "en": "Giddiness"
                    },
                    "value": 3
                },
                {
                    "dbValue": "Body ache",

                    "statement": {
                        "hi": "शरीर में दर्द",
                        "en": "Body ache"
                    },
                    "value": 4
                },
                {
                    "dbValue": "None of the listed",

                    "statement": {
                        "hi": "सूचीबद्ध में से कोई नहीं",
                        "en": "None of the listed"
                    },
                    "value": 5
                }
            ],
            "statement": {
                "hi": "निम्नलिखित लक्षणों का चयन करें जो आप अनुभव कर रहे हैं",
                "en": "Select the following symptoms you are experiencing"
            },
            "type": "list"
        },
        {
            "id": 57.0,
            "options": [
                {
                    "dbValue": "Headache",

                    "statement": {
                        "hi": "सरदर्द",
                        "en": "Headache"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Loss or Blurring of Vision",

                    "statement": {
                        "hi": "दृष्टि में हानि या धुंधलापन",
                        "en": "Loss or Blurring of Vision"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Weakness on face",

                    "statement": {
                        "hi": "चेहरे पर कमजोरी",
                        "en": "Weakness on face"
                    },
                    "value": 2
                },
                {
                    "dbValue": "Giddiness",

                    "statement": {
                        "hi": "चक्कर",
                        "en": "Giddiness"
                    },
                    "value": 3
                },
                {
                    "dbValue": "Pain on the Face",

                    "statement": {
                        "hi": "चेहरे पर दर्द",
                        "en": "Pain on the Face"
                    },
                    "value": 4
                },
                {
                    "dbValue": "None of the listed",

                    "statement": {
                        "hi": "सूचीबद्ध में से कोई नहीं",
                        "en": "None of the listed"
                    },
                    "value": 5
                }
            ],
            "statement": {
                "hi": "निम्नलिखित लक्षणों का चयन करें जो आप अनुभव कर रहे हैं",
                "en": "Select the following symptoms you are experiencing"
            },
            "type": "list",
			"command": "secondassessement",
            "paramsFrom": {
              "symptoms": 57.0,
            },
            "branches": {
              "for_mucormycosis": 59.0,
              "for_covid19": 60.0,
			  "still_not_confirmed": 61.0,
            },
        },

        {
            "id": 59.0,
            "nextQuestion": 62.0,
            "options": [

				{
                    "dbValue": "Dental Pain",

                    "statement": {
                        "hi": "दांत का दर्द",
                        "en": "Dental Pain"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Numbness of Face",

                    "statement": {
                        "hi": "चेहरे का सुन्न होना",
                        "en": "Numbness of Face"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Bulging of the eye",

                    "statement": {
                        "hi": "आँख का फड़कना",
                        "en": "Bulging of the eye"
                    },
                    "value": 2
                },
                {
                    "dbValue": "Restricted movement of the eye",

                    "statement": {
                        "hi": "आँख की प्रतिबंधित गति",
                        "en": "Restricted movement of the eye"
                    },
                    "value": 3
                },
                {
                    "dbValue": "Runny Nose",

                    "statement": {
                        "hi": "बहती नाक",
                        "en": "Runny Nose"
                    },
                    "value": 4
                },
                {
                    "dbValue": "Nose Block",

                    "statement": {
                        "hi": "नाक ब्लॉक",
                        "en": "Nose Block"
                    },
                    "value": 5
                },
                {
                    "dbValue": "Foul Smell",

                    "statement": {
                        "hi": "दुर्गंध आना",
                        "en": "Foul Smell"
                    },
                    "value": 6
                },
                {
                    "dbValue": "None of the listed",

                    "statement": {
                        "hi": "सूचीबद्ध में से कोई नहीं",
                        "en": "None of the listed"
                    },
                    "value": 7
                }
            ],
            "statement": {
                "hi": "निम्नलिखित लक्षणों का चयन करें जो आप अनुभव कर रहे हैं",
                "en": "Select the following symptoms you are experiencing"
            },
            "type": "list"
        },
        {
            "id": 60.0,
            "nextQuestion": 62.0,
            "options": [

				{
                    "dbValue": "Loss of smell",

                    "statement": {
                        "hi": "गंध की हानि",
                        "en": "Loss of smell"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Loss of taste",

                    "statement": {
                        "hi": "स्वाद की हानि",
                        "en": "Loss of taste"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Body ache",

                    "statement": {
                        "hi": "शरीर में दर्द",
                        "en": "Body ache"
                    },
                    "value": 2
                },
                {
                    "dbValue": "Heaviness in breathing",

                    "statement": {
                        "hi": "सांस लेने में भारीपन",
                        "en": "Heaviness in breathing"
                    },
                    "value": 3
                },
                {
                    "dbValue": "None of the listed",

                    "statement": {
                        "hi": "सूचीबद्ध में से कोई नहीं",
                        "en": "None of the listed"
                    },
                    "value": 4
                }
            ],
            "statement": {
                "hi": "निम्नलिखित लक्षणों का चयन करें जो आप अनुभव कर रहे हैं",
                "en": "Select the following symptoms you are experiencing"
            },
            "type": "list"
        },
        {
            "id": 61.0,
            "nextQuestion": 62.0,
            "options": [

				{
                    "dbValue": "Foul Smell",

                    "statement": {
                        "hi": "दुर्गंध आना",
                        "en": "Foul Smell"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Loss of smell",

                    "statement": {
                        "hi": "गंध की हानि",
                        "en": "Loss of smell"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Loss of taste",

                    "statement": {
                        "hi": "स्वाद की हानि",
                        "en": "Loss of taste"
                    },
                    "value": 2
                },
                {
                    "dbValue": "Numbness of face",

                    "statement": {
                        "hi": "चेहरे का सुन्न होना",
                        "en": "Numbness of face"
                    },
                    "value": 3
                },
                {
                    "dbValue": "Bulging of the eye",

                    "statement": {
                        "hi": "आँख का फूलना",
                        "en": "Bulging of the eye"
                    },
                    "value": 4
                },
                {
                    "dbValue": "Restricted movement of the eye",

                    "statement": {
                        "hi": "आँख की प्रतिबंधित गति",
                        "en": "Restricted movement of the eye"
                    },
                    "value": 5
                },
				{
                    "dbValue": "None of the listed",

                    "statement": {
                        "hi": "सूचीबद्ध में से कोई नहीं",
                        "en": "None of the listed"
                    },
                    "value": 6
                }
            ],
            "statement": {
                "hi": "निम्नलिखित लक्षणों का चयन करें जो आप अनुभव कर रहे हैं",
                "en": "Select the following symptoms your are experiencing"
            },
            "type": "list"
        },
        {
            "id": 62.0,
            "nextQuestion": 64.0,
            "statement": {
                "hi": "किसी अन्य लक्षण का उल्लेख करें",
                "en": "Mention any other symptoms"
            },
            "type": "text"
        },

        {
            "id": 64.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 65.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 26.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आपको COVID-19 का टीका लगाया गया है?",
                "en": "Have you been vaccinated for COVID-19?"
            },
            "type": "button"
        },
        {
            "id": 65.0,
            "options": [
                {
                    "dbValue": "1 time",
                    "nextQuestion": 26,
                    "statement": {
                        "hi": "एक बार",
                        "en": "Once"
                    },
                    "value": 0
                },
                {
                    "dbValue": "2 times",
                    "nextQuestion": 26,
                    "statement": {
                        "hi": "दोनों समय",
                        "en": "both times"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "आपको कितनी बार टीका लगाया गया है?",
                "en": "How many times have you been vaccinated?"
            },
            "type": "button"
        },
        // {
        //     "id": 66.0,
        //     "options": [
        //         {
        //             "dbValue": "Yes",
        //             "nextQuestion": 0.0,
        //             "statement": {
        //                 "hi": "हाँ",
        //                 "en": "Yes"
        //             },
        //             "value": 0
        //         },
        //         {
        //             "dbValue": "No",
        //             "nextQuestion": 26,
        //             "statement": {
        //                 "hi": "नहीं",
        //                 "en": "No"
        //             },
        //             "value": 1
        //         }
        //     ],
        //     "statement": {
        //         "hi": "क्या आप डॉक्टर से परामर्श करने के लिए तैयार हैं?",
        //         "en": "Are you ready to consult with the doctor?"
        //     },
        //     "type": "button"
        // },
        {
            "id": 67.0,
            "options": [
                {
                    "dbValue": "less than 10 days",
                    "nextQuestion": 68.0,
                    "statement": {
                        "hi": "10 दिनों से कम",
                        "en": "less than 10 days"
                    },
                    "value": 0
                },
                {
                    "dbValue": "more than 10 days",
                    "nextQuestion": 68.0,
                    "statement": {
                        "hi": "10 दिनों से अधिक",
                        "en": "more than 10 days"
                    },
                    "value": 1
                },
                {
                    "dbValue": "more than 1 month ",
                    "nextQuestion": 68.0,
                    "statement": {
                        "hi": "1 महीने से अधिक",
                        "en": "more than 1 month"
                    },
                    "value": 2
                }
            ],
            "statement": {
                "hi": "आप कितने समय से अस्पताल में भर्ती थे?",
                "en": "For how long you were hospitalised?"
            },
            "type": "button"
        },
        {
            "id": 68.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 69.0,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 69.0,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Don't know",
                    "nextQuestion": 69.0,
                    "statement": {
                        "hi": "पता नहीं",
                        "en": "Don't know"
                    },
                    "value": 2
                }
            ],
            "statement": {
                "hi": "क्या आपके प्रवास के दौरान आपको स्टेरॉयड दिए गए थे?",
                "en": "Were steroids given to you during your stay?"
            },
            "type": "button"
        },
        {
            "id": 69.0,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 36,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 36,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Don't know",
                    "nextQuestion": 36,
                    "statement": {
                        "hi": "पता नहीं",
                        "en": "Don't know"
                    },
                    "value": 2
                }
            ],
            "statement": {
                "hi": "क्या आप ऑक्सीजन सपोर्ट पर थे?",
                "en": "Were you on oxygen support?"
            },
            "type": "button"
        },
        {
            "id": 34.1,
            "options": [
                {
                    "dbValue": "Office",
                    "nextQuestion": 35.0,
                    "statement": {
                        "hi": "कार्यालय",
                        "en": "Office"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Field",
                    "nextQuestion": 35.0,
                    "statement": {
                        "hi": "फील्ड",
                        "en": "Field"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Industrial",
                    "nextQuestion": 35.0,
                    "statement": {
                        "hi": "औद्योगिक",
                        "en": "Industrial"
                    },
                    "value": 2
                },
                {
                    "dbValue": "Other",
                    "nextQuestion": 35.0,
                    "statement": {
                        "hi": "अन्य",
                        "en": "Other"
                    },
                    "value": 3
                }
            ],
            "statement": {
                "hi": "आपका पेशा क्या है?",
                "en": "What type of Job/Profession you have?"
            },
            "type": "button"
        },
        {
            "id": 2.5,
            "nextQuestion": 2.6,
            "statement": {
                "hi": "आपका नाम क्या हे?",
                "en": "What is your name?"
            },
            "type": "text"
        },
        {
            "id": 2.6,
            "nextQuestion": 2.7,
            "pattern": "[0-9]{1,3}",
            "statement": {
                "hi": "आपकी उम्र क्या हैं?",
                "en": "What is your age?"
            },
            "type": "tel"
        },
        {
            "id": 2.7,
            "options": [
                {
                    "dbValue": "Male",
                    "nextQuestion": 2.8,
                    "statement": {
                        "hi": "पुरुष",
                        "en": "Male"
                    },
                    "value": 0
                },
                {
                    "dbValue": "Female",
                    "nextQuestion": 2.8,
                    "statement": {
                        "hi": "महिला",
                        "en": "Female"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Other",
                    "nextQuestion": 2.8,
                    "statement": {
                        "hi": "अन्य",
                        "en": "Other"
                    },
                    "value": 2
                }
            ],
            "statement": {
                "hi": "आपका लिंग क्या है?",
                "en": "What is your gender?"
            },
            "type": "button"
        },
        {
            "id": 2.8,
            "nextQuestion": 2.9,
            "pattern": "[0-9]{10}",
            "statement": {
                "hi": "आपका संपर्क नंबर? भविष्य में आपसे संपर्क करने के लिए",
                "en": "Your contact number? To contact you in the future"
            },
            "type": "tel"
        },
        {
            "id": 2.9,
            "options": [
                {
                    "dbValue": "Yes",
                    "nextQuestion": 2.91,
                    "statement": {
                        "hi": "हाँ",
                        "en": "Yes"
                    },
                    "value": 0
                },
                {
                    "dbValue": "No",
                    "nextQuestion": 2.4,
                    "statement": {
                        "hi": "नहीं",
                        "en": "No"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "क्या आपके पास ईमेल आईडी है? नवीनतम जानकारी प्रदान करना चाहते हैं?",
                "en": "Do you have an email ID? Want to provide for latest information?"
            },
            "type": "button"
        },
        {
            "id": 2.91,
            "nextQuestion": 2.4,
            "statement": {
                "hi": "आपकी ईमेल आईडी?",
                "en": "Your Email ID?"
            },
            "type": "text"
        },
        {
            "id": 2.4,
            "nextQuestion": 2.41,
            "statement": {
                "hi": "अपनी समस्याओं/दृश्यमान लक्षणों का उल्लेख करें",
                "en": "Mention your problems / visible symptoms"
            },
            "type": "text"
        },
        {
            "id": 2.41,
            "nextQuestion": 26,
            "statement": {
                "hi": "आपको यह समस्या कब से है?",
                "en": "How long have you had this problem?"
            },
            "type": "text"
        },
        {
    			id: 9999,
          statement: {
            en: 'Are you ready to consult with the doctor?',
            hi: 'क्या आप डॉक्टर के परामर्श के लिए तैयार हैं?',
          },
    			type: 'button',
    			options: [
    				{
    					nextQuestion: 0,
    					value: 0,
              statement: {
                en: 'Yes',
                hi: 'हाँ',
                bn: 'হ্যাঁ',
              },
    					dbValue: 'Yes'
    				},
    				{
    					nextQuestion: 0,
    					value: 1,
              statement: {
                en: 'No',
                hi: 'नहीं',
                bn: 'না',
              },
    				}
    			]
    		}
    ]
  }
