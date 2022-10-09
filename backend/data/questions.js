const QUESTIONS = "questions"
const ID = "id";
const OPTIONS = "options"
const NEXT_QUESTION = "nextQuestion"
const STATEMENT = "statement"
const VALUE = "value"
const TYPE = "type"
const CARDIAC_SCORE = "cardiac_score"
const DB_VALUE = "dbValue"
const DESCRIPTION_IMAGE = "description_image"
const BRANCHES = "branches"
const COMMAND = "command"                   // handled by commands.js
const URL = "url"
const PARAMS_FORM = "paramsFrom"            // support commands

// interaction types
const TYPE_NONE = "none"                    // send a message and move to next message. Or run a command
const TYPE_INCOMING = "incoming"            // send a message and move to next message. Probably
const TYPE_BUTTON = "button"                // choose option from text buttons
const TYPE_LIST = "list"                    // checkboxes
const TYPE_SELECT = "select"                // spinner
const TYPE_UPLOAD = "upload"                // upload
const TYPE_TEXT = "text"                    // text
const TYPE_ANALYSE = "analyse"              // complex analyses of user answers on frontend across multiple questions. example cardiac screening

// LANGUAGES
const LANG_ENGLISH = "en"
const LANG_HINDI = "hi"
const LANG_BANGLA = "bn"

//DB_VALUES
const DB_VALUE_0 = 0
const DB_VALUE_1 = 1
const DB_VALUE_2 = 2
const DB_VALUE_3 = 3
const DB_VALUE_4 = 4
const DB_VALUE_5 = 5
const DB_VALUE_6 = 6
const DB_VALUE_7 = 7
const DB_VALUE_8 = 8
const DB_VALUE_OPD = "OPD"
const DB_VALUE_YES = "Yes"
const DB_VALUE_NO = "No"
const DB_VALUE_RESTART = "Restart"
const DB_VALUE_END = "End"
const DB_VALUE_AIIMSJ = "AIIMS Jodhpur"

// common values
const STATEMENT_YES = {
    [LANG_ENGLISH]: "Yes",
    [LANG_HINDI]: "हाँ",
    [LANG_BANGLA]: 'হ্যাঁ'
}
const STATEMENT_NO = {
    [LANG_ENGLISH]: "No",
    [LANG_HINDI]: "नहीं",
    [LANG_BANGLA]: 'না'
}

module.exports = {
    [QUESTIONS]: [
        {
            [ID]: 1.0,
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: 23.0,
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Consultation",
                        [LANG_HINDI]: "परामर्श"
                    },
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: "71.0 Cardiac screening",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Self assessment for chest pain",
                        [LANG_HINDI]: "सीने के दर्द के लिए स्व-मूल्यांकन"
                    },
                    [VALUE]: 1
                },
                {
                    [NEXT_QUESTION]: "90.0 Cardiac education",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Information about the heart and blood",
                        [LANG_HINDI]: "हृदय और रक्त के बारे में जानकारी"
                    },
                    [VALUE]: 2
                },
                {
                    [NEXT_QUESTION]: 70.0,
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Other",
                        [LANG_HINDI]: "अन्य"
                    },
                    [VALUE]: 3
                },
                // test
                // {
                //     [NEXT_QUESTION]: "83.0 Cardiac fatigue",
                //     [STATEMENT]: {
                //         [LANG_ENGLISH]: "Jump to test",
                //         [LANG_HINDI]: "Jump to test"
                //     },
                //     [VALUE]: 4
                // },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Choose your option for further interaction",
                [LANG_HINDI]: "आगे की बातचीत के लिए अपना विकल्प चुनें"
            },
            [TYPE]: TYPE_BUTTON
        },

        {
            [ID]: "90.0 Cardiac education",
            [NEXT_QUESTION]: "90.1 Cardiac status",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Did you know Cardiovascular diseases are the leading cause of death globally?",
                [LANG_HINDI]: "क्या आप जानते हैं कि हृदय रोग विश्व स्तर पर मौत का प्रमुख कारण हैं?"
            },
            [TYPE]: TYPE_NONE
        },

        {
            [ID]: "90.1 Cardiac status",
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "94.0 What would you like to know",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No, I have never been to the cardiologist/heart specialist",
                        [LANG_HINDI]: "नहीं, मैं कभी हृदय रोग विशेषज्ञ/हृदय रोग विशेषज्ञ के पास नहीं गया"
                    },
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: "92.0 Cardiac medicine patient",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes, I am on medication - (blood thinner/BP)",
                        [LANG_HINDI]: "हाँ, मैं दवा ले रहा हूँ - (ब्लड थिनर/बीपी)"
                    },
                    [VALUE]: 1
                },
                {
                    [NEXT_QUESTION]: "93.0 Cardiac surgery patient",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes, I have had surgery/will be having heart surgery/angioplasty",
                        [LANG_HINDI]: "हां, मेरी सर्जरी हो चुकी है / होने वाली है हृदय शल्य चिकित्सा/एंजियोप्लास्टी"
                    },
                    [VALUE]: 2
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Are you a cardiac patient?",
                [LANG_HINDI]: "क्या आप दिल के मरीज हैं?"
            },
            [TYPE]: TYPE_BUTTON
        },

        {
            [ID]: "92.0 Cardiac medicine patient. Taking meds",
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "94.0 What would you like to know",
                    [STATEMENT]: STATEMENT_YES,
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: "92.2 Why not taking medications regularly?",
                    [STATEMENT]: STATEMENT_NO,
                    [VALUE]: 1
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Are you taking your medicines regularly?",
                [LANG_HINDI]: "क्या आप अपनी दवाएं नियमित रूप से ले रहे हैं?"
            },
            [TYPE]: TYPE_BUTTON
        },

        {
            [ID]: "92.2 Why not taking medications regularly?",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Why not?",
                [LANG_HINDI]: "क्यूँ नहीं?"
            },
            [TYPE]: TYPE_BUTTON
        },

        {
            [ID]: "94.0 What would you like to know",
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "94.0 Non-cardiac patient",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No, I have never been to the cardiologist/heart specialist",
                        [LANG_HINDI]: "नहीं, मैं कभी हृदय रोग विशेषज्ञ/हृदय रोग विशेषज्ञ के पास नहीं गया"
                    },
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: "92.0 Cardiac medicine patient",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes, I am on medication - (blood thinner/BP)",
                        [LANG_HINDI]: "हाँ, मैं दवा ले रहा हूँ - (ब्लड थिनर/बीपी)"
                    },
                    [VALUE]: 1
                },
                {
                    [NEXT_QUESTION]: "93.0 Cardiac surgery patient",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes, I have had surgery/will be having heart surgery/angioplasty",
                        [LANG_HINDI]: "हां, मेरी सर्जरी हो चुकी है / होने वाली है हृदय शल्य चिकित्सा/एंजियोप्लास्टी"
                    },
                    [VALUE]: 2
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "What would you like to know??",
                [LANG_HINDI]: "आप क्या जानना चाहेंगे?"
            },
            [TYPE]: TYPE_BUTTON
        },

        {
            [ID]: "71.0 Cardiac screening",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Do you have pain in your chest?",
                [LANG_HINDI]: "क्या आपके सीने में दर है?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "72.0 Cardiac point pain",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ"
                    },
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: "73.0 Cardiac giddiness",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No",
                        [LANG_HINDI]: "नहीं"
                    },
                    [VALUE]: 1
                }
            ],
            [TYPE]: TYPE_BUTTON
        },

        {
            [ID]: "71.1 Cardiac pain middle of chest pain",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Is the pain in the middle of the chest",
                [LANG_HINDI]: "क्या सीने के बीच में दर्द होता है?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "72.0 Cardiac point pain",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ"
                    },
                    [CARDIAC_SCORE]: 1,
                    [DB_VALUE]: "Yes",
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: "72.0 Cardiac point pain",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No",
                        [LANG_HINDI]: "नहीं"
                    },
                    [DB_VALUE]: "No",
                    [VALUE]: 1
                }
            ],
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "72.0 Cardiac point pain",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Is it point pain?  (You can tell the location with tip of the finger)",
                [LANG_HINDI]: "क्या आप उंगली से बता सकते हैं की दर्द कहा पे है?",
                [DESCRIPTION_IMAGE]: "anginavspointchestpain.jpg"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "74.0 Cardiac left arm pain",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ",
                        [DESCRIPTION_IMAGE]: "point-chest-pain.jpg"
                    },
                    [VALUE]: 0,
                    [DB_VALUE]: "Point chest pain",
                    [CARDIAC_SCORE]: -1
                },
                {
                    [NEXT_QUESTION]: "74.0 Cardiac left arm pain",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No, the pain is diffused",
                        [LANG_HINDI]: "नहीं, दर्द फैल हुआ है",
                        [DESCRIPTION_IMAGE]: "angina.jpg"
                    },
                    [CARDIAC_SCORE]: 0.5,
                    [DB_VALUE]: "Diffused chest pain",
                    [VALUE]: 1
                }
            ],
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "74.0 Cardiac left arm pain",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Is there pain in the left arm?",
                [LANG_HINDI]: "क्या बाएँ हाथ में दर्द है ?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "74.1 Cardiac inner side left arm pain",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ"
                    },
                    [VALUE]: 0,
                    [DB_VALUE]: "Yes",
                    [CARDIAC_SCORE]: 1
                },
                {
                    [NEXT_QUESTION]: "73.1 Pain on arm movement",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No",
                        [LANG_HINDI]: "नहीं"
                    },
                    [DB_VALUE]: "No",
                    [VALUE]: 1
                }
            ],
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "74.1 Cardiac inner side left arm pain",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Is there pain on the inner side of the left arm?",
                [LANG_HINDI]: "क्या बाएँ हाथ के अंदरूनी भाग में दर्द है?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "73.1 Pain on arm movement",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ"
                    },
                    [VALUE]: 0,
                    [DB_VALUE]: "Yes",
                    [CARDIAC_SCORE]: 1
                },
                {
                    [NEXT_QUESTION]: "73.1 Pain on arm movement",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No",
                        [LANG_HINDI]: "नहीं"
                    },
                    [DB_VALUE]: "No",
                    [VALUE]: 1
                }
            ],
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "73.1 Pain on arm movement",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Does the pain increase or decrease when you move the arm?",
                [LANG_HINDI]: "क्या हाथ हिलाने पे दर्द घटता / बढ़त है?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "73.2 Cardiac pain on squeezing",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ"
                    },
                    [VALUE]: 0,
                    [CARDIAC_SCORE]: -1,
                    [DB_VALUE]: "Pain on movement",
                },
                {
                    [NEXT_QUESTION]: "73.2 Cardiac pain on squeezing",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No",
                        [LANG_HINDI]: "नहीं"
                    },
                    [VALUE]: 1,
                    [CARDIAC_SCORE]: 0.5,
                    [DB_VALUE]: "Pain unaffected by movement",
                }
            ],
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "73.2 Cardiac pain on squeezing",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Does the pain increase or decrease when you when you press?",
                [LANG_HINDI]: "क्या दबाने पे दर्द होता है?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "80.0 Cardiac associated symptoms",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ"
                    },
                    [VALUE]: 0,
                    [DB_VALUE]: "Yes",
                    [CARDIAC_SCORE]: -1
                },
                {
                    [NEXT_QUESTION]: "80.0 Cardiac associated symptoms",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No",
                        [LANG_HINDI]: "नहीं"
                    },
                    [VALUE]: 1,
                    [DB_VALUE]: "Yes",
                    [CARDIAC_SCORE]: 0.5
                }
            ],
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "80.0 Cardiac associated symptoms",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Are there any associated symptoms?",
                [LANG_HINDI]: "क्या कोई संबद्ध लक्षण हैं?"
            },
            [NEXT_QUESTION]: "81.0 Cardiac assessment",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Sweating",
                        [LANG_HINDI]: "पसीना आना"
                    },
                    [CARDIAC_SCORE]: 1,
                    [VALUE]: 0,
                    [DB_VALUE]: "Sweating"
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Difficulty in breathing",
                        [LANG_HINDI]: "सांस लेने में परेशानी"
                    },
                    [CARDIAC_SCORE]: 1,
                    [VALUE]: 1,
                    [DB_VALUE]: "Breathlessness"
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Fatigue",
                        [LANG_HINDI]: "थकान"
                    },
                    [CARDIAC_SCORE]: 1,
                    [VALUE]: 2,
                    [DB_VALUE]: "Fatigue"
                }
            ],
            [TYPE]: TYPE_LIST
        },
        {
            [ID]: "81.0 Cardiac assessment",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Assessing your responses...",
                [LANG_HINDI]: "आपकी प्रतिक्रियाओं का आकलन......"
            },
            [TYPE]: TYPE_ANALYSE,
            [COMMAND]: "anginaselfevaluation",
            [PARAMS_FORM]: {
                "ChestMiddlePain": "71.1 Cardiac pain middle of chest pain",
                "CardiacPointPain": "72.0 Cardiac point pain",
                "CardiacLeftArmPain": "74.0 Cardiac left arm pain",
                "CardiacInnerLeftArmPain": "74.1 Cardiac inner side left arm pain",
                "CardiacArmMovementPain": "73.1 Pain on arm movement",
                "CardiacPressurePain": "73.2 Cardiac pain on squeezing",
                "AssociatedSymptoms": "80.0 Cardiac associated symptoms"
            },
            [BRANCHES]: {
                "non_cardiac_chest_pain": "83.0 Not angina",
                "probable_angina": "84.0 Probable angina"
            }
        },
        {
            [ID]: "83.0 Not angina",
            [NEXT_QUESTION]: 1.0,
            [STATEMENT]: {
                [LANG_ENGLISH]: "You seem to be suffering from non-cardiac chest pain",
                [LANG_HINDI]: "यह दर्द हृदय संबंधित नहीं लगता है"
            },
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "84.0 Probable angina",
            [NEXT_QUESTION]: "85.0 Cardiac impact of exertion and rest",
            [STATEMENT]: {
                [LANG_ENGLISH]: "This pain seems to be due to angina (cardiac chest pain)",
                [LANG_HINDI]: "यह दर्द हृदय संबंधित लगता है"
            },
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "85.0 Cardiac impact of exertion and rest",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Does the chest pain increases with exertion and relieves with rest?",
                [LANG_HINDI]: "क्या छाती का दर्द परिश्रम से बढ़ता है और आराम करने से ठीक हो जाता है?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "86.0 Consult your doctor",
                    [DB_VALUE]: "Stable angina",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ"
                    },
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: "87.0 Unstable angina?",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No",
                        [LANG_HINDI]: "नहीं"
                    },
                    [DB_VALUE]: "No",
                    [VALUE]: 1
                }
            ],
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "86.0 Consult your doctor",
            [NEXT_QUESTION]: 9999,
            [STATEMENT]: {
                [LANG_ENGLISH]: "Consult your doctor",
                [LANG_HINDI]: "अपने डॉक्टर से सलाह करें"
            },
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "87.0 Unstable angina?",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Chest pain occurs on and off and is present even at rest in frequent episodes in less last 48 hours?",
                [LANG_HINDI]: "सीने में दर्द चालू और बंद होता है और पिछले 48 घंटों से कम समय में लगातार एपिसोड में आराम करने पर भी मौजूद होता है?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "89.0 Emergency. Immediately consult doctor", // TODO: repeatable message
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ"
                    },
                    [DB_VALUE]: "Unstable angina",
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: "86.0 Consult your doctor",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No",
                        [LANG_HINDI]: "नहीं"
                    },
                    [DB_VALUE]: "Stable angina",
                    [VALUE]: 1
                }
            ],
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "89.0 Emergency. Immediately consult doctor",
            [NEXT_QUESTION]: 9999,
            [STATEMENT]: {
                [LANG_ENGLISH]: "IMMEDIATELY CONSULT YOUR DOCTOR!",
                [LANG_HINDI]: "तुरंत अपने डॉक्टर से सलाह लें!"
            },
            [TYPE]: TYPE_NONE
        },

//////////////////////////////////////////

        {
            [ID]: "73.0 Cardiac giddiness",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Does the world spin or does it turn black?",
                [LANG_HINDI]: "क्या दुनिया घूमती दिखती है या काली होती है?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: 9998,
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ"
                    },
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: 9998,
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No",
                        [LANG_HINDI]: "नहीं"
                    },
                    [CARDIAC_SCORE]: "0.5",
                    [VALUE]: 1
                }
            ],
            [TYPE]: TYPE_BUTTON
        },

        {
            [ID]: 70.0,
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: 2.0,
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Self assessment for Blackfungus (mucormycosis)",
                        [LANG_HINDI]: "ब्लैकफंगस (म्यूकोर्मिकोसिस) के लिए स्व-मूल्यांकन"
                    },
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: 12.0,
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Information about Blackfungus (mucormycosis)",
                        [LANG_HINDI]: "ब्लैकफंगस (म्यूकोर्मिकोसिस) के बारे में जानकारी"
                    },
                    [VALUE]: 1
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Choose your option for further interaction",
                [LANG_HINDI]: "आगे की बातचीत के लिए अपना विकल्प चुनें"
            },
            [TYPE]: TYPE_BUTTON
        },

        {
            [ID]: 2.0,
            [NEXT_QUESTION]: 3.0,
            [STATEMENT]: {
                [LANG_ENGLISH]: "Follow the steps given in the upcoming statements",
                [LANG_HINDI]: "आगामी कथनों में दिए गए चरणों का पालन करें"
            },
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: 3.0,
            [NEXT_QUESTION]: 4.0,
            [STATEMENT]: {
                [LANG_ENGLISH]: "Close your eyes and try to touch your nose or cheek",
                [LANG_HINDI]: "अपनी आँखें बंद करें और अपनी नाक या गाल को छूने की कोशिश करें"
            },
            [TYPE]: TYPE_NONE
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
			      [ID]: 9.1,
		        [STATEMENT]: {
                [LANG_ENGLISH]: "Assessing your responses...",
                [LANG_HINDI]: "आपकी प्रतिक्रियाओं का आकलन......"
            },
            [TYPE]: TYPE_NONE,
            [COMMAND]: "selfevaluation",
            [PARAMS_FORM]: {
                "Sensation": 4,
			          "Eye_Control": 6,
			          "Palette1": 8,
			          "Palette2": 9
            },
            [BRANCHES]: {
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
                "hi": "आपमें mucormycosis के कोई लक्षण दिखाई नही देते हैं। कृपया अपना और विकल्प चुनें",
                "en": "You don't appear to have any signs and symptoms of mucormycosis. Please select your further option"
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
/////////////////////////////////////////////////
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
                    "nextQuestion": 1.0,
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
            [ID]: 23.0,
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: 28.0,
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "New consultation",
                        [LANG_HINDI]: "नया परामर्श"
                    },
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: 24.0,
                    [STATEMENT]: {
                        [LANG_HINDI]: "पिछला परामर्श",
                        [LANG_ENGLISH]: "Previous consultation"
                    },
                    [VALUE]: 1
                },
                {
                    [NEXT_QUESTION]: "9997.0 Redirecting",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "AIIMS portal",
                        [LANG_HINDI]: "एम्स पोर्टल"
                    },
                    [VALUE]: 2,
                    [URL]: "https://www.aiimsjodhpur.edu.in/Patient_Portal/"
                }
            ],
            [STATEMENT]: {
                [LANG_HINDI]: "परामर्श के लिए अपना विकल्प चुनें",
                [LANG_ENGLISH]: "Choose your option for counseling"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            "id": 24.0,
            "nextQuestion": 25.0,
            "statement": {
                "hi": "आपका नाम? पहले परामर्श के लिए प्रयुक्त Used",
                "en": "Your name? Used for the earlier consultation"
            },
            [TYPE]: TYPE_TEXT
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
            "nextQuestion": 26.1,
            "statement": {
                "hi": "एम्स के मरीज की आईडी?",
                "en": "AIIMS patient's ID?"
            },
            "type": "text"
        },
        {
            "id": 26.1,
            "options": [
                {
                    "nextQuestion": 26.2,
                    "statement": {
                        "hi": "रसीद अपलोड करें",
                        "en": "Upload receipt"
                    },
                    "value": 0
                },
                {
                    "nextQuestion": 0,
                    "statement": {
                        "hi": "छोड़ें",
                        "en": "Skip"
                    },
                    "value": 1
                }
            ],
            "statement": {
                "hi": "कृपया यूपीआई आईडी पर शुल्क का भुगतान करें और रसीद या स्क्रीनशॉट अपलोड करें। पिछले मैसेज में UPI और फीस लिखी हुई है। अगर नहीं लिखा है तो कृपया स्किप करें।",
                "en": "Please pay the fees on the UPI ID and upload the receipt or screenshot. UPI and fees are written in the previous message. Please skip if not written."
            },
            "type": "button"
        },
        {
            "id": 26.2,
            "nextQuestion": 0,
            "statement": {
                "hi": "कृपया अपलोड करने के लिए एक तस्वीर का चयन करें",
                "en": "Please select an image to upload"
            },
            "type": "upload"
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
            [ID]: 50.0,
            [NEXT_QUESTION]: 51.0,
            [OPTIONS]: [

				        {
                    [DB_VALUE]: "Diabetes",

                    [STATEMENT]: {
                        [LANG_HINDI]: "मधुमेह",
                        [LANG_ENGLISH]: "Diabetes"
                    },
                    [VALUE]: 0
                },
                {
                    [DB_VALUE]: "Hypertension (High Blood Pressure)",

                    [STATEMENT]: {
                        [LANG_HINDI]: "उच्च रक्तचाप (उच्च BP)",
                        [LANG_ENGLISH]: "Hypertension (High Blood Pressure)"
                    },
                    [VALUE]: 1
                },
                {
                    [DB_VALUE]: "Asthma",

                    [STATEMENT]: {
                        [LANG_HINDI]: "दमा",
                        [LANG_ENGLISH]: "Asthma"
                    },
                    [VALUE]: 2
                },
                {
                    [DB_VALUE]: "On Chemotherapy?",

                    [STATEMENT]: {
                        [LANG_HINDI]: "कीमोथेरेपी पर?",
                        [LANG_ENGLISH]: "On Chemotherapy?"
                    },
                    [VALUE]: 3
                },
                {
                    [DB_VALUE]: "Tuberculosis (TB)",

                    [STATEMENT]: {
                        [LANG_HINDI]: "क्षय रोग (TB)",
                        [LANG_ENGLISH]: "Tuberculosis (TB)"
                    },
                    [VALUE]: 4
                },
                {
                    [DB_VALUE]: "Anaemia",

                    [STATEMENT]: {
                        [LANG_HINDI]: "एनीमिया",
                        [LANG_ENGLISH]: "Anaemia"
                    },
                    [VALUE]: 5
                }
            ],
            [STATEMENT]: {
                [LANG_HINDI]: "उन स्थितियों की सूची बनाएं जिनके लिए आप दवाएं ले रहे हैं",
                [LANG_ENGLISH]: "List the conditions you are taking medications for"
            },
            [TYPE]: TYPE_LIST
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
            [ID]: 59.0,
            [NEXT_QUESTION]: 62.0,
            [OPTIONS]: [

				        {
                    [DB_VALUE]: "Dental Pain",

                    [STATEMENT]: {
                        [LANG_HINDI]: "दांत का दर्द",
                        [LANG_ENGLISH]: "Dental Pain"
                    },
                    [VALUE]: 0
                },
                {
                    [DB_VALUE]: "Numbness of Face",

                    [STATEMENT]: {
                        [LANG_HINDI]: "चेहरे का सुन्न होना",
                        [LANG_ENGLISH]: "Numbness of Face"
                    },
                    [VALUE]: 1
                },
                {
                    [DB_VALUE]: "Bulging of the eye",

                    [STATEMENT]: {
                        [LANG_HINDI]: "आँख का फड़कना",
                        [LANG_ENGLISH]: "Bulging of the eye"
                    },
                    [VALUE]: 2
                },
                {
                    [DB_VALUE]: "Restricted movement of the eye",

                    [STATEMENT]: {
                        [LANG_HINDI]: "आँख की प्रतिबंधित गति",
                        [LANG_ENGLISH]: "Restricted movement of the eye"
                    },
                    [VALUE]: 3
                },
                {
                    [DB_VALUE]: "Runny Nose",

                    [STATEMENT]: {
                        [LANG_HINDI]: "बहती नाक",
                        [LANG_ENGLISH]: "Runny Nose"
                    },
                    [VALUE]: 4
                },
                {
                    [DB_VALUE]: "Nose Block",

                    [STATEMENT]: {
                        [LANG_HINDI]: "नाक ब्लॉक",
                        [LANG_ENGLISH]: "Nose Block"
                    },
                    [VALUE]: 5
                },
                {
                    [DB_VALUE]: "Foul Smell",

                    [STATEMENT]: {
                        [LANG_HINDI]: "दुर्गंध आना",
                        [LANG_ENGLISH]: "Foul Smell"
                    },
                    [VALUE]: 6
                },
                {
                    [DB_VALUE]: "None of the listed",

                    [STATEMENT]: {
                        [LANG_HINDI]: "सूचीबद्ध में से कोई नहीं",
                        [LANG_ENGLISH]: "None of the listed"
                    },
                    [VALUE]: 7
                }
            ],
            [STATEMENT]: {
                [VALUE]: "निम्नलिखित लक्षणों का चयन करें जो आप अनुभव कर रहे हैं",
                [VALUE]: "Select the following symptoms you are experiencing"
            },
            [TYPE]: TYPE_LIST
        },
        {
            [ID]: 60.0,
            [NEXT_QUESTION]: 62.0,
            [OPTIONS]: [

				        {
                    [DB_VALUE]: "Loss of smell",

                    [STATEMENT]: {
                        [LANG_HINDI]: "गंध की हानि",
                        [LANG_ENGLISH]: "Loss of smell"
                    },
                    [VALUE]: 0
                },
                {
                    [DB_VALUE]: "Loss of taste",

                    [STATEMENT]: {
                        [LANG_HINDI]: "स्वाद की हानि",
                        [LANG_ENGLISH]: "Loss of taste"
                    },
                    [VALUE]: 1
                },
                {
                    [DB_VALUE]: "Body ache",

                    [STATEMENT]: {
                        [LANG_HINDI]: "शरीर में दर्द",
                        [LANG_ENGLISH]: "Body ache"
                    },
                    [VALUE]: 2
                },
                {
                    [DB_VALUE]: "Heaviness in breathing",

                    [STATEMENT]: {
                        [LANG_HINDI]: "सांस लेने में भारीपन",
                        [LANG_ENGLISH]: "Heaviness in breathing"
                    },
                    [VALUE]: 3
                },
                {
                    [DB_VALUE]: "None of the listed",

                    [STATEMENT]: {
                        [LANG_HINDI]: "सूचीबद्ध में से कोई नहीं",
                        [LANG_ENGLISH]: "None of the listed"
                    },
                    [VALUE]: 4
                }
            ],
            [STATEMENT]: {
                [LANG_HINDI]: "निम्नलिखित लक्षणों का चयन करें जो आप अनुभव कर रहे हैं",
                [LANG_ENGLISH]: "Select the following symptoms you are experiencing"
            },
            [TYPE]: TYPE_LIST
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
            [TYPE]: TYPE_LIST
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
            [ID]: "9997.0 Redirecting",
            [STATEMENT]: {
                [LANG_ENGLISH]: 'Redirecting',
                [LANG_HINDI]: 'पुन: निर्देशित',
            },
            [TYPE]: TYPE_NONE
        },
        {
    			[ID]: 9998,
          [STATEMENT]: {
            en: 'You have asked something I am yet to learn. We will figure it out shortly. Did you enjoy the experience?',
            hi: 'आपने कुछ पूछा है जो मुझे अभी सीखना बाकी है। हम जल्द ही इसका पता लगा लेंगे। क्या आपने अनुभव का आनंद लिया?',
          },
    			[TYPE]: [TYPE_BUTTON],
    			[OPTIONS]: [
    				{
    					[NEXT_QUESTION]: 0,
    					[VALUE]: 0,
              [STATEMENT]: STATEMENT_YES,
    					[DB_VALUE]: DB_VALUE_YES
    				},
    				{
    					[NEXT_QUESTION]: 0,
    					[VALUE]: 1,
              [STATEMENT]: STATEMENT_NO,
    				}
    			]
    		},
        {
    			  [ID]: 9999,
            [STATEMENT]: {
                [LANG_ENGLISH]: 'Begin online consultation?',
                [LANG_HINDI]: 'ऑनलाइन परामर्श शुरू करें?',
            },
    			  [TYPE]: TYPE_BUTTON,
    			  [OPTIONS]: [
    				{
    					[NEXT_QUESTION]: 0,
    					[VALUE]: 0,
              [STATEMENT]: {
                [LANG_ENGLISH]: 'Yes',
                [LANG_HINDI]: 'हाँ',
                [LANG_BANGLA]: 'হ্যাঁ',
              },
    					[DB_VALUE]: DB_VALUE_YES
    				},
    				{
    					[NEXT_QUESTION]: 1.0,
    					[VALUE]: 1,
              [STATEMENT]: {
                [LANG_ENGLISH]: 'No',
                [LANG_HINDI]: 'नहीं',
                [LANG_BANGLA]: 'না',
              },
    				}
    			]
    		}
    ]
}
