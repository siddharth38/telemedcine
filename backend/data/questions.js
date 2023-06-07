const QUESTIONS = "questions"
const ID = "id";
const OPTIONS = "options"
const NEXT_QUESTION = "nextQuestion"
const NEXT_QUESTION_LIST = "next_question_list"
const NEXT_QUESTION_OBJECT = "next_question_object"
const NEXT_QUESTION_VARIANTS = "next_question_variants"
const DEFAULT_ASK = "default_ask"
const USUAL_ASK = "usual_ask"
const VARIANT_PROBABILITY = "variant_probability"
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
const PATTERN = "pattern"            // support commands
const CONTENT_VARIANTS = "content_variants"
const NEXT_MESSAGE_VARIANTS = "next_message_variants"
const CONTENT_VARIANT_NAME = "content_variant_name"
const OPTIONS_VARIANT_NAME = "options_variant_name"
const OPTION_VARIANT_NAME = "option_variant_name"
const OPTION_STATEMENT_VARIANTS = "option_statement_variants"
const OPTION_NAME = "option_name"
const ALWAYS_SHOW_OPTION = "always_show_option"
const FACT = "fact"
const SKIP_PROBABILITY = "skip_probability"

// interaction types
const TYPE_NONE = "none"                    // send a message and move to next message. Or run a command
// const TYPE_INCOMING = "incoming"            // send a message and move to next message. Probably
const TYPE_BUTTON = "button"                // choose option from text buttons
const TYPE_LIST = "list"                    // checkboxes
// const TYPE_SELECT = "select"                // spinner
// const TYPE_UPLOAD = "upload"                // upload
const TYPE_TEXT = "text"                    // text
const TYPE_ANALYSE = "analyse"              // complex analyses of user answers on frontend across multiple questions. example cardiac screening
const TYPE_TELEPHONE = "tel"                // complex telephone and age

// LANGUAGES
const LANG_ENGLISH = "en"
const LANG_HINDI = "hi"
const LANG_BANGLA = "bn"

//DB_VALUES
// const DB_VALUE_0 = 0
// const DB_VALUE_1 = 1
// const DB_VALUE_2 = 2
// const DB_VALUE_3 = 3
// const DB_VALUE_4 = 4
// const DB_VALUE_5 = 5
// const DB_VALUE_6 = 6
// const DB_VALUE_7 = 7
// const DB_VALUE_8 = 8
// const DB_VALUE_OPD = "OPD"
const DB_VALUE_YES = "Yes"
const DB_VALUE_NO = "No"
// const DB_VALUE_RESTART = "Restart"
// const DB_VALUE_END = "End"
// const DB_VALUE_AIIMSJ = "AIIMS Jodhpur"

// common values
const STATEMENT_YES = {
    [LANG_ENGLISH]: "Yes✔️",
    [LANG_HINDI]: "हाँ✔️",
    [LANG_BANGLA]: 'হ্যাঁ✔️'
}
const STATEMENT_NO = {
    [LANG_ENGLISH]: "No ❌",
    [LANG_HINDI]: "नहीं ❌",
    [LANG_BANGLA]: 'না ❌'
}
// const STATEMENT_CORRECT = {
//     [LANG_ENGLISH]: "Correct answer!",
//     [LANG_HINDI]: "सही जवाब!",
// }
// const STATEMENT_WRONG = {
//     [LANG_ENGLISH]: "Wrong answer",
//     [LANG_HINDI]: "गलत जवाब"
// }
const STATEMENT_TRUE = {
    [LANG_ENGLISH]: "True",
    [LANG_HINDI]: "सत्य",
}
const STATEMENT_FALSE = {
    [LANG_ENGLISH]: "False",
    [LANG_HINDI]: "असत्य"
}
const STATEMENT_WHY_NOT = {
    [LANG_ENGLISH]: "Why not",
    [LANG_HINDI]: "क्यों नहीं"
}
const CARDIAC_CURIOSITY = "111.0 Still curious"
const NEXT_QUESTION_ENDS_FLOW = 0                   // end chatbot. sometimes communicate with doctor

module.exports = {
    [QUESTIONS]: [
        // {
        //     [ID]: "-1.0 Consent message",
        //     [OPTIONS]: [
        //         {
        //             [NEXT_QUESTION]: 1.0,
        //             [STATEMENT]: STATEMENT_YES,
        //             [VALUE]: 0
        //         },
        //         {
        //             [NEXT_QUESTION]: "-1.1 Why no consent",
        //             [STATEMENT]: STATEMENT_NO,
        //             [VALUE]: 1
        //         },
        //         {
        //             [NEXT_QUESTION]: "9997.0 Redirecting",
        //             [STATEMENT]: {
        //                 [LANG_ENGLISH]: "AIIMS portal",
        //                 [LANG_HINDI]: "एम्स पोर्टल"
        //             },
        //             [VALUE]: 2,
        //             [URL]: "https://www.aiimsjodhpur.edu.in/Patient_Portal/"
        //         }
        //         // test
        //         // {
        //         //     [NEXT_QUESTION]: "83.0 Cardiac fatigue",
        //         //     [STATEMENT]: {
        //         //         [LANG_ENGLISH]: "Jump to test",
        //         //         [LANG_HINDI]: "Jump to test"
        //         //     },
        //         //     [VALUE]: 4
        //         // },
        //     ],
        //     [STATEMENT]: {
        //         [LANG_ENGLISH]: "By continuing, you agree to take part in the testing of this chat-bot 🤖 and your data being collected and used for research purposes. 📝\n" +
        //         "It will be kept securely 🛡️ and will not be shared with any third parties.",
        //         [LANG_HINDI]: "बातें जारी रखकर, आप इस चैट-बॉट 🤖 के परीक्षण में भाग लेने के लिए सहमत हैं। आपका डेटा एकत्रित किया जाएगा और शोध उद्देश्यों के लिए उपयोग किया जाएगा। 📝\n" +
        //         "इसे सुरक्षित रखा जाएगा 🛡️ और किसी तीसरे पक्ष के साथ साझा नहीं किया जाएगा।"
        //     },
        //     [TYPE]: TYPE_BUTTON
        // },
        {
            [ID]: "-1.0 Consent message",
            [NEXT_QUESTION]: 1.0,
            [CONTENT_VARIANTS]: [
                {
                    [CONTENT_VARIANT_NAME]: "Consent message short emojis",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "By continuing, you agree to take part in the testing of this chat-bot 🤖 and your data being collected and used for research purposes. 📝\n" +
                        "It will be kept securely 🛡️ and will not be shared with any third parties.",
                        [LANG_HINDI]: "बातें जारी रखकर, आप इस चैट-बॉट 🤖 के परीक्षण में भाग लेने के लिए सहमत हैं। आपका डेटा एकत्रित किया जाएगा और शोध उद्देश्यों के लिए उपयोग किया जाएगा। 📝\n" +
                        "इसे सुरक्षित रखा जाएगा 🛡️ और किसी तीसरे पक्ष के साथ साझा नहीं किया जाएगा।"
                    },
                    [VARIANT_PROBABILITY]: 0.1
                },
                {
                    [CONTENT_VARIANT_NAME]: "Consent message short no emojis",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "By continuing, you agree to take part in the testing of this chat-bot and your data being collected and used for research purposes. \n" +
                        "It will be kept securely and will not be shared with any third parties.",
                        [LANG_HINDI]: "बातें जारी रखकर, आप इस चैट-बॉट के परीक्षण में भाग लेने के लिए सहमत हैं। आपका डेटा एकत्रित किया जाएगा और शोध उद्देश्यों के लिए उपयोग किया जाएगा।\n" +
                        "इसे सुरक्षित रखा जाएगा और किसी तीसरे पक्ष के साथ साझा नहीं किया जाएगा।"
                    },
                    [VARIANT_PROBABILITY]: 0.2
                },
                {
                    [CONTENT_VARIANT_NAME]: "Consent message original from telemedicine",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Disclaimer: We collect your personal information like name, age, phone number for registration purposes. We do not share this information with any other third parties nor do we use it for commercial purposes. We may use your information for the purpose of our research and to create innovative and enhanced services. We also use third party web analytical services such as Google Analytics which may collect information relating to your use of this website.",
                        [LANG_HINDI]: "अस्वीकरण: हम आपकी व्यक्तिगत जानकारी जैसे नाम, आयु, फोन नंबर पंजीकरण के प्रयोजनों के लिए एकत्र करते हैं। हम इस जानकारी को किसी अन्य तीसरे पक्ष के साथ साझा नहीं करते हैं और न ही हम इसका उपयोग व्यावसायिक उद्देश्यों में करते हैं। हम आपकी जानकारी का उपयोग हमारे शोध के उद्देश्य और नवीन और उन्नत सेवाओं को बनाने के लिए कर सकते हैं। हम गूगल एनालिटिक्स जैसी थर्ड पार्टी वेब विश्लेषणात्मक सेवाओं का भी उपयोग करते हैं जो इस वेबसाइट के आपके उपयोग से संबंधित जानकारी एकत्र कर सकती हैं।"
                    },
                    [VARIANT_PROBABILITY]: 0.3
                }
                // ,
                // {
                //     [CONTENT_VARIANT_NAME]: "just link",
                //     [STATEMENT]: {
                //         [LANG_ENGLISH]: "By continuing, you agree with <u>the study and the privacy policy</u>",
                //         [LANG_HINDI]: "बातें जारी रखकर, आप <u>स्टडी एवं प्राइवसी पॉलिसी से सहमत हैं</u>",
                //         [URL]: "https://www.aiimsjodhpur.edu.in/Patient_Portal/"
                //     },
                // }
            ],
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "-1.1 Why no consent",
            [STATEMENT]: STATEMENT_WHY_NOT,
            [NEXT_QUESTION]: "-1.2 Disclaimer",
            [TYPE]: TYPE_TEXT
        },
        {
            [ID]: "-1.2 Disclaimer",
            [STATEMENT]: {
                en: 'Disclaimer: We collect your personal information such as name, age, phone number for registration purposes. We do not share this information with any other third party nor do we use it for commercial purposes. We may use your information for the purpose of our research and to create innovative and advanced services. We also use third party web analytics services such as Google Analytics which may collect information related to your use of this website.',
                hi: 'अस्वीकरण: हम आपकी व्यक्तिगत जानकारी जैसे नाम, आयु, फोन नंबर पंजीकरण के प्रयोजनों के लिए एकत्र करते हैं। हम इस जानकारी को किसी अन्य तीसरे पक्ष के साथ साझा नहीं करते हैं और न ही हम इसका उपयोग व्यावसायिक उद्देश्यों में करते हैं। हम आपकी जानकारी का उपयोग हमारे शोध के उद्देश्य और नवीन और उन्नत सेवाओं को बनाने के लिए कर सकते हैं। हम गूगल एनालिटिक्स जैसी थर्ड पार्टी वेब विश्लेषणात्मक सेवाओं का भी उपयोग करते हैं जो इस वेबसाइट के आपके उपयोग से संबंधित जानकारी एकत्र कर सकती हैं।',
                bn: 'দাবি অস্বীকার: আমরা আপনার ব্যক্তিগত তথ্য যেমন নাম, বয়স, নাম্বার জন্য ফোন নম্বর সংগ্রহ করি। আমরা এই তথ্যটি অন্য কোনও তৃতীয় পক্ষের সাথে ভাগ করি না বা আমরা বাণিজ্যিক উদ্দেশ্যে এটি ব্যবহার করি না। আমরা আপনার তথ্য আমাদের গবেষণার উদ্দেশ্যে এবং উদ্ভাবনী এবং উন্নত পরিষেবা তৈরি করতে ব্যবহার করতে পারি। আমরা তৃতীয় পক্ষের ওয়েব অ্যানালিটিক্স পরিষেবাদি যেমন গুগল অ্যানালিটিক্স ব্যবহার করি যা আপনার ওয়েবসাইটের ব্যবহার সম্পর্কিত তথ্য সংগ্রহ করতে পারে।'
            },
            [NEXT_QUESTION]: 1.0,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: 1.0,
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: 23.0,
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Consultation👨‍⚕️",
                        [LANG_HINDI]: "डॉक्टर से बात👨‍⚕️"
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
                        [LANG_ENGLISH]: "Information about the heart❤️",
                        [LANG_HINDI]: "हृदय के बारे में जानकारी❤️"
                    },
                    [VALUE]: 2
                },
                {
                    [NEXT_QUESTION]: 70.0,
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Other",
                        [LANG_HINDI]: "अन्य"
                    },
                    [VALUE]: 3,
                    [SKIP_PROBABILITY]: 0.7
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

////////////////////////////////////////////////////////////////////////////////

        {
            [ID]: "90.0 Cardiac education",
            [NEXT_QUESTION_LIST]: [
                {
                    // [DEFAULT_ASK]: true,
                    [NEXT_QUESTION]: "90.1 Cardiac status",
                    [VARIANT_PROBABILITY]: 0.5
                },
                {
                    [NEXT_QUESTION]: "94.0 What would you like to know (heart)",
                    [VARIANT_PROBABILITY]: 0.5
                }
            ],
            [CONTENT_VARIANTS]: [
                {
                    [CONTENT_VARIANT_NAME]: "cardio death fun fact question",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Did you know Cardiovascular diseases are the leading cause of death globally?☠️",
                        [LANG_HINDI]: "क्या आप जानते हैं कि हृदय रोग विश्व स्तर पर मौत का प्रमुख कारण हैं?☠️"
                    },
                },
                {
                    [CONTENT_VARIANT_NAME]: "cardio death fun fact",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Cardiovascular diseases are the leading cause of death globally?☠️",
                        [LANG_HINDI]: "हृदय रोग विश्व स्तर पर मौत का प्रमुख कारण हैं?☠️"
                    },
                }
            ],
            [TYPE]: TYPE_NONE
        },

        {
            [ID]: "90.1 Cardiac status",
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "94.0 What would you like to know (heart)",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No, I have never been to the cardiologist / heart specialist",
                        [LANG_HINDI]: "नहीं, मैं कभी दिल के डॉक्टर के पास नहीं गया/गई"
                    },
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: "92.0 Cardiac medicine patient. Taking meds",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes, I am on medication - (blood thinner / BP)💊",
                        [LANG_HINDI]: "हाँ, मैं दवा ले रहा हूँ - (ब्लड थिनर / बीपी)💊"
                    },
                    [VALUE]: 1
                },
                {
                    [NEXT_QUESTION]: "93.0 Cardiac surgery patient. Laminated?",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes, I have had surgery / will be having heart surgery / angioplasty🏥",
                        [LANG_HINDI]: "हां, मेरी सर्जरी हो चुकी है / होने वाली है हृदय शल्य चिकित्सा / एंजियोप्लास्टी🏥"
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
                    [NEXT_QUESTION]: "94.0 What would you like to know (heart)",
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
                [LANG_ENGLISH]: "Are you taking your medicines regularly?🕝",
                [LANG_HINDI]: "क्या आप अपनी दवाएं नियमित रूप से ले रहे हैं?🕝"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "92.2 Why not taking medications regularly?",
            [NEXT_QUESTION]: "94.0 What would you like to know (heart)",
            [STATEMENT]: STATEMENT_WHY_NOT,
            [TYPE]: TYPE_TEXT
        },

        {
            [ID]: "93.0 Cardiac surgery patient. Laminated?",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Laminated👌",
                        [LANG_HINDI]: "लैमिनेटेड👌"
                    },
                    [NEXT_QUESTION]: "92.0 Cardiac medicine patient. Taking meds",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Not laminated",
                        [LANG_HINDI]: "लैमिनेटेड नहीं है "
                    },
                    [NEXT_QUESTION]: "93.1 Get Laminated",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No procedure performed yet",
                        [LANG_HINDI]: "अभी ऑपरेशन नहीं हुआ"
                    },
                    [NEXT_QUESTION]: "93.2 Procedure",
                    [VALUE]: 2
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Is your heart document laminated?",
                [LANG_HINDI]: "क्या आपका दिल के पेपर लैमिनेटेड है?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "93.1 Get Laminated",
            [STATEMENT]: {
                [LANG_ENGLISH]: "You should get it done at the earliest. ⌛💨 The document must last longer than you∞",
                [LANG_HINDI]: "आपको इसे जल्द से जल्द करवाना चाहिए। ⌛💨 आपके दस्तावेज़ आपसे अधिक समय तक चलना चाहिए∞"
            },
            [NEXT_QUESTION]: "92.0 Cardiac medicine patient. Taking meds"
        },
        {
            [ID]: "93.2 Procedure",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Which procedure will you be going through?",
                [LANG_HINDI]: "आप किस प्रक्रिया से गुजरेंगे?"
            },
            [NEXT_QUESTION]: "9998 dead end"
        },

        {
            [ID]: "94.0 What would you like to know (heart)",
            [OPTIONS]: [
                {
                    [OPTION_NAME]: "cardiac tests",
                    [OPTION_STATEMENT_VARIANTS]: [
                        {
                            [OPTION_VARIANT_NAME]: "long version with examples",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Cardiac tests - ECG / ECHO / TMT / Holter / ABP",
                                [LANG_HINDI]: "दिल के टेस्ट ईसईगी / एको / टीमटी / ऐबीपी "
                            },
                            [VARIANT_PROBABILITY]:0.3
                        },
                        {
                            [OPTION_VARIANT_NAME]: "short version",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Cardiac tests",
                                [LANG_HINDI]: "दिल के टेस्ट"
                            },
                            [VARIANT_PROBABILITY]:0.7
                        }
                    ],
                    [NEXT_QUESTION_LIST]: [
                        {
                            [DEFAULT_ASK]: true,
                            [NEXT_QUESTION]: "95.0 Which cardiac test",
                        },
                    ],
                    [VALUE]: 0,
                    [SKIP_PROBABILITY]:0.3
                    // [ALWAYS_SHOW_OPTION]: false
                },
                {
                    [OPTION_NAME]: "Tobacco cardiac info",
                    [OPTION_STATEMENT_VARIANTS]: [
                        {
                            [OPTION_VARIANT_NAME]: "long version",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Smoking 🚬 / Gutka / Khaini",
                                [LANG_HINDI]: "धूम्रपान / गुटका / खैनी"
                            },
                            [VARIANT_PROBABILITY]:0.6
                        } ,
                        {
                            [OPTION_VARIANT_NAME]: "short version",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Smoking 🚬",
                                [LANG_HINDI]: "बीड़ी🚬"
                            },
                            [VARIANT_PROBABILITY]:0.4
                        } ,
                    ],
                    [NEXT_QUESTION]: "101.0 Tobacco",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Exercise for heart🤾‍♀️",
                        [LANG_HINDI]: "दिल के लिए कसरत"
                    },
                    [NEXT_QUESTION]: "105.1 Heart exercise",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Coronary artery disease",
                        [LANG_HINDI]: "दिल की धमनी का रोग"
                    },
                    [NEXT_QUESTION]: "113.0 CAD",
                    [VALUE]: 3,
                    [SKIP_PROBABILITY]:0.3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart attack",
                        [LANG_HINDI]: "दिल का दौरा"
                    },
                    [NEXT_QUESTION]: "117.0 Info about heart attack",
                    [VALUE]: 4,
                    [SKIP_PROBABILITY]:0.3
                },
                {
                    [OPTION_NAME]: "Blood pressure info",
                    [OPTION_STATEMENT_VARIANTS]: [
                        {
                            [OPTION_VARIANT_NAME]: "long version with examples",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Blood pressure🤯",
                                [LANG_HINDI]: "बी पी / ब्लड प्रेशर / रक्त चाप🤯"
                            },
                            [VARIANT_PROBABILITY]:0.3
                        },
                        {
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Blood pressure🤯",
                                [LANG_HINDI]: "बी पी 🤯",
                            },
                            [VARIANT_PROBABILITY]:0.7
                        }
                      ],
                    [NEXT_QUESTION]: "121.0 BP information",
                    [VALUE]: 5
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Cholestrol / Triglyceride",
                        [LANG_HINDI]: "कोलेस्ट्रॉल / ट्रिगलीकेरिडेस"
                    },
                    [NEXT_QUESTION]: "183.0 Cholesterol",
                    [VALUE]: 6
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Diet🍔",
                        [LANG_HINDI]: "खान पीन🍔"
                    },
                    [NEXT_QUESTION]: "189.0 Cardiac Diet",
                    [VALUE]: 7
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart failure",
                        [LANG_HINDI]: "हार्ट फैल्यर "
                    },
                    [NEXT_QUESTION]: "196.0 HF",
                    [VALUE]: 8,
                    [SKIP_PROBABILITY]:0.3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Stent / Bypass",
                        [LANG_HINDI]: "स्टेंट / बाइपैस"
                    },
                    [NEXT_QUESTION]: "232.0 Stent / Bypass",
                    [VALUE]: 9,
                    [SKIP_PROBABILITY]:0.3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Angiography / Angioplasty",
                        [LANG_HINDI]: "एंजियोग्राफी / एंजियोप्लास्टी"
                    },
                    [NEXT_QUESTION]: "240.0 Angio",
                    [VALUE]: 10,
                    [SKIP_PROBABILITY]:0.3
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "What would you like to know??",
                [LANG_HINDI]: "आप क्या जानना चाहेंगे?"
            },
            [TYPE]: TYPE_BUTTON
        },

        // tests
        {
            [ID]: "95.0 Which cardiac test",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "ECG",
                        [LANG_HINDI]: "ईसीजी"
                    },
                    [NEXT_QUESTION]: "96.0 ECG",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "ECHO",
                        [LANG_HINDI]: "एको"
                    },
                    [NEXT_QUESTION]: "97.0 Echo",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "TMT",
                        [LANG_HINDI]: "टी एम टी"
                    },
                    [NEXT_QUESTION]: "98.0 TMT",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Holter",
                        [LANG_HINDI]: "हॉलटेर"
                    },
                    [NEXT_QUESTION]: "99.0 Holter",
                    [VALUE]: 3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "ABP",
                        [LANG_HINDI]: "ऐ बी पी"
                    },
                    [NEXT_QUESTION]: "100.0 ABP",
                    [VALUE]: 4
                },
            ],
             [STATEMENT]: {
                [LANG_ENGLISH]: "What do you want to know about?",
                [LANG_HINDI]: "आप किसके बारे में जानना चाहते हैं?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "96.0 ECG",
            [STATEMENT]: {
                [LANG_ENGLISH]: "An electrocardiogram (ECG) is a simple test that can be used to check your heart's rhythm and electrical activity⚡. Sensors attached to the skin are used to detect the electrical signals produced by your heart each time it beats.",
                [LANG_HINDI]: "एक इलेक्ट्रोकार्डियोग्राम (ईसीजी) एक सरल परीक्षण है जिसका उपयोग आपके दिल की लय और विद्युत गतिविधि की जांच के लिए किया जा सकता है⚡। त्वचा से जुड़े सेंसर हर बार धड़कने पर आपके दिल द्वारा उत्पादित विद्युत संकेतों का पता लगाने के लिए उपयोग किए जाते हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "97.0 Echo",
            [STATEMENT]: {
                [LANG_ENGLISH]: "An echocardiogram uses sound waves to produce images of your heart. 🔊 This common test allows your doctor to see your heart beating and pumping blood. Your doctor can use the images from an echocardiogram to identify heart disease.",
                [LANG_HINDI]: "एक इकोकार्डियोग्राम आपके दिल की छवियों को बनाने के लिए ध्वनि तरंगों का उपयोग करता है। 🔊 यह सामान्य परीक्षण आपके डॉक्टर को आपके दिल की धड़कन और रक्त पंप करते हुए देखने की अनुमति देता है। हृदय रोग की पहचान करने के लिए आपका डॉक्टर एक इकोकार्डियोग्राम से छवियों का उपयोग कर सकता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "98.0 TMT",
            [STATEMENT]: {
                [LANG_ENGLISH]: "A treadmill test (TMT) or cardiac stress test helps determine how far your heart can go before an abnormal rhythm or blood flow to the heart muscle drops🏃. It helps your doctor know how your heart responds on being pushed. You will be asked to walk on a treadmill, and the difficulty level will be gradually increased.",
                [LANG_HINDI]: "ट्रेडमिल टेस्ट (टीएमटी) या कार्डियक स्ट्रेस टेस्ट यह निर्धारित करने में मदद करता है कि हृदय की मांसपेशियों में असामान्य लय या रक्त के प्रवाह से पहले आपका दिल कितनी मेहनत सकता है🏃। यह आपके डॉक्टर को यह जानने में मदद करता है कि धक्का दिए जाने पर आपका दिल कैसे प्रतिक्रिया करता है। आपको ट्रेडमिल पर चलने के लिए कहा जाएगा, और कठिनाई का स्तर धीरे-धीरे बढ़ जाएगा।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "99.0 Holter",
            [STATEMENT]: {
                [LANG_ENGLISH]: "In medicine, a Holter monitor is a type of ambulatory electrocardiography device, a portable device for cardiac monitoring for at least 24 hours. The Holter's most common use is for monitoring ECG heart activity",
                [LANG_HINDI]: "चिकित्सा में, होल्टर मॉनिटर एक प्रकार का एम्बुलेटरी इलेक्ट्रोकार्डियोग्राफी डिवाइस है, जो कम से कम 24 घंटों के लिए कार्डियक मॉनिटरिंग के लिए एक पोर्टेबल डिवाइस है। ईसीजी हृदय गतिविधि की निगरानी के लिए होल्टर का सबसे आम उपयोग है"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "100.0 ABP",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Ambulatory Blood Pressure (ABP) monitoring is a diagnostic tool designed to monitor the blood pressure over 24 hours and thus gain an overall profile of variation in a day. It is a portable test undertaken in the course of a normal day.",
                [LANG_HINDI]: "चलते फिरते ब्लड प्रेशर (एबीपी) में 24 घंटे से अधिक ब्लड प्रेशर की निगरानी करी जाती है और इस प्रकार एक दिन में आने वाले अंतर पता चल जाते हैं। यह एक सामान्य दिन के दौरान किया जाने वाला एक पोर्टेबल परीक्षण है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        // smoking
        {
            [ID]: "101.0 Tobacco",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Ischemia",
                        [LANG_HINDI]: "इस्केमिया"
                    },
                    [NEXT_QUESTION]: "102.0 Ischemia",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "How to quit tobacco",
                        [LANG_HINDI]: "तंबाकू कैसे छोड़ें"
                    },
                    [NEXT_QUESTION]: "104.0 De-addiction",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "I can't / don't want to quit tobacco🚫",
                        [LANG_HINDI]: "मैं तंबाकू छोड़ना नहीं चाहता / नहीं कर सकता / सकती🚫"
                    },
                    [NEXT_QUESTION]: "103.0 Why can't quit tobacco?",
                    [VALUE]: 2
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Tobacco not only causes cancer, but is also the biggest enemy of the heart💔. It causes atherosclerosis which is the narrowing of arteries. The narrowing of arteries leads to -\n" +
                "1. Reduced stamina\n" +
                "2. Hypertension - High blood pressure\n" +
                "3. Angina - chest pain due to heart\n" +
                "4. Peripheral artery disease - low blood supply to arms and limbs - can lead to amputation and impotence\n" +
                "5. Ischemia",
                [LANG_HINDI]: "तंबाकू न सिर्फ कैंसर का कारण बनता है, बल्कि दिल का सबसे बड़ा दुश्मन भी है💔। यह एथेरोस्क्लेरोसिस का कारण बनता है जो धमनियों में जमावट है। धमनियों के सिकुड़ने से होता है -\n" +
                "1. कम आंतरिक बल\n" +
                "2. उच्च रक्तचाप\n" +
                "3. एनजाइना - दिल के कारण सीने में दर्द\n" +
                "4. परिधीय धमनी रोग - बाहों और अंगों को कम रक्त की आपूर्ति - विच्छेदन और नपुंसकता का कारण बन सकती है\n" +
                "5. इस्किमिया"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "102.0 Ischemia",
            [STATEMENT]: {
                [LANG_ENGLISH]: "When a part of your body doesn't get the necessary blood supply, it is considered ischemic.  This often happens when a clot forms inside an artery blocking the blood flow.\n" +
                "\n" +
                "Ischemia can lead to tissue death called infarction.\n" +
                "\n" +
                "A heart attack happens happens when the heart gets ischemic and a stroke happens when the same happens in the brain. Brain stroke leads to paralysis or disability♿.\n",
                [LANG_HINDI]: "जब आपके शरीर के किसी हिस्से को खून की कमी होती है, तो इसे इस्केमिक माना जाता है। यह अक्सर तब होता है जब धमनी के अंदर एक थक्का बन जाता है।\n" +
                "\n" +
                "इस्किमिया से दिल या दिमाग का हिस्सा मार सकता है।\n" +
                "\n" +
                "दिल का दौरा तब होता है जब दिल इस्केमिक हो जाता है और स्ट्रोक तब होता है जब दिमाग में ऐसा ही होता है। स्ट्रोक से लकवा या विकलांगता हो जाती है♿।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "103.0 Why can't quit tobacco?",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Why is it so?",
                [LANG_HINDI]: "ऐसा क्यूँ?"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_TEXT
        },                      //TODO
        {
            [ID]: "104.0 De-addiction",
            [OPTIONS]: [
                {
                    [STATEMENT]: STATEMENT_YES,
                    [NEXT_QUESTION]: 23.0,
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: STATEMENT_NO,
                    [NEXT_QUESTION]: 1.0,
                    [VALUE]: 1
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "A doctor can help in de-addiction. Ready to begin consultation?👨‍⚕️",
                [LANG_HINDI]: "एक डॉक्टर नशामुक्ति में मदद कर सकता है। परामर्श शुरू करने के लिए तैयार हैं?👨‍⚕️"
            },
            [TYPE]: TYPE_BUTTON
        },

        // Exercise for heart
        {
            [ID]: "105.1 Heart exercise",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Let me gather my thoughts🤔",
                [LANG_HINDI]: "एक सेकंड सोचने दी जिए🤔"
            },
            [TYPE]: TYPE_ANALYSE,
            [COMMAND]: "iscardiacpatient",
            [BRANCHES]: {
                "cardiac_patient": "106.0 Cardiac patient description",
                "non_cardiac_patient": "105.0 Heart exercise"
            }
        },
        {
            [ID]: "105.0 Heart exercise",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I have arthritis🦵",
                        [LANG_HINDI]: "लेकिन मुझे गठिया है🦵"
                    },
                    [NEXT_QUESTION]: "112.0 Arthritis patient non-cardiac",
                    [VALUE]: 0,
                    // [FACT_PATH]: "patient/{patient}/arthritis/has_arthritis",
                    [FACT]: {
                        'category': 'patient',
                        'type': 'disease',
                        'group': 'arthritis',
                        'state': 'hasArthritis',
                        'value': true
                    }
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I am visually impaired👨‍🦯",
                        [LANG_HINDI]: "पर मुझे दिखता नहीं👨‍🦯"
                    },
                    [NEXT_QUESTION]: "112.1 Blind patient non-cardiac",
                    [VALUE]: 1,
                    // [FACT_PATH]: "patient/{patient}/visual_impairment/has_visual_impairment",
                    [FACT]: {
                        'category': 'patient',
                        'type': 'disease',
                        'group': 'visual_impairment',
                        'value': true
                    }
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I am disabled♿",
                        [LANG_HINDI]: "लेकिन मैं विकलांग हूँ♿"
                    },
                    [NEXT_QUESTION]: "110.0 Arthritis / disabled patient hydrotherapy",
                    [VALUE]: 2
                },
                {
                    [OPTION_STATEMENT_VARIANTS]:[
                        {
                            [OPTION_NAME]:"Reset",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Reset",
                                [LANG_HINDI]: "रेसेट"
                            },
                            [VARIANT_PROBABILITY]:0.3
                        },
                        {
                            [OPTION_NAME]:"Okay",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Okay",
                                [LANG_HINDI]: "ठीक है"
                            },
                            [VARIANT_PROBABILITY]:0.7
                        }
                    ],
                    [COMMAND]: 'selectNewFlow',
                    [VALUE]: 3
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Because the heart is a muscle💪, it is necessary to give is a good work out. The simplest rule is to exercise as much as possible unless there is discomfort. It doesn't matter what your age is, you should run 🏃 a couple of kilometres daily.",
                [LANG_HINDI]: "क्यूंकी हृदय एक मांसपेशी है💪, इसलिए इसकों कसरत देना आवश्यक है। सबसे आसान नियम यह है कि जब तक कोई असुविधा न हो तब तक जितना हो सके व्यायाम करें। इससे कोई फर्क नहीं पड़ता कि आपकी उम्र क्या है, आपको रोजाना कुछ किलोमीटर दौड़ना चाहिए 🏃।"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "106.0 Cardiac patient description",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Stent / Bypass",
                        [LANG_HINDI]: "स्टेंट / बाईपास"
                    },
                    [NEXT_QUESTION]: "107.0 Stent patient exercise",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart failure / Heart attack",
                        [LANG_HINDI]: "दिल का दौरा या पुंपिनग काम होना"
                    },
                    [NEXT_QUESTION]: "108.0 Heart failure and surgery exercise",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart surgery",
                        [LANG_HINDI]: "दिल का ऑपरेशन हो रखा है"
                    },
                    [NEXT_QUESTION]: "108.0 Heart failure and surgery exercise",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Hypertension",
                        [LANG_HINDI]: "बी पी"
                    },
                    [NEXT_QUESTION]: "109.0 BP patient",
                    [VALUE]: 3
                },
                {
                    [OPTION_STATEMENT_VARIANTS]:[
                        {
                            [OPTION_NAME]:"Reset",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Reset",
                                [LANG_HINDI]: "रेसेट"
                            },
                            [VARIANT_PROBABILITY]:0.3
                        },
                        {
                            [OPTION_NAME]:"Okay",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Okay",
                                [LANG_HINDI]: "ठीक है"
                            },
                            [VARIANT_PROBABILITY]:0.7
                        }
                    ],
                    [COMMAND]: 'selectNewFlow',
                    [VALUE]: 3
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Which best describes you?",
                [LANG_HINDI]: "इनमें से क्या आपका सबसे अच्छा वर्णन करता है?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "107.0 Stent patient exercise",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Since you now have a stent, you can lead the normal lifestyle. but not a bad lifestyle. You must walk at least 4 km daily and light jogging and light swimming can also be considered depending.",
                [LANG_HINDI]: "चूंकि अब आपके पास एक स्टेंट है, आप सामान्य जीवन शैली जी सकते हैं। लेकिन खराब जीवनशैली नहीं। आपको रोजाना कम से कम 4 किमी पैदल चलना चाहिए और इसके आधार पर हल्की जॉगिंग और हल्की तैराकी पर भी विचार किया जा सकता है।"
            },
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I have arthritis",
                        [LANG_HINDI]: "लेकिन मुझे गठिया है",
                    },
                    [NEXT_QUESTION]: "110.0 Arthritis / disabled patient hydrotherapy",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I am disabled",
                        [LANG_HINDI]: "लेकिन मैं विकलांग हूँ",
                    },
                    [NEXT_QUESTION]: "110.0 Arthritis / disabled patient hydrotherapy",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I am visually impaired",
                        [LANG_HINDI]: "लेकनी मुझे दिखता नहीं",
                    },
                    [NEXT_QUESTION]: "112.1 Blind patient non-cardiac",
                    [VALUE]: 2
                },
                {
                    [OPTION_STATEMENT_VARIANTS]:[
                        {
                            [OPTION_NAME]:"Reset",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Reset",
                                [LANG_HINDI]: "रेसेट"
                            },
                            [VARIANT_PROBABILITY]:0.3
                        },
                        {
                            [OPTION_NAME]:"Okay",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Okay",
                                [LANG_HINDI]: "ठीक है"
                            },
                            [VARIANT_PROBABILITY]:0.7
                        }
                    ],
                    [COMMAND]: 'selectNewFlow',
                    [VALUE]: 3
                }
            ],
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "108.0 Heart failure and surgery exercise",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Light exercise, and walking for a couple of kilometres is recommended.🚶",
                [LANG_HINDI]: "हल्का व्यायाम और कुछ किलोमीटर चलने की सलाह दी जाती है।🚶"
            },
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I have arthritis",
                        [LANG_HINDI]: "लेकिन मुझे गठिया है",
                    },
                    [NEXT_QUESTION]: "110.0 Arthritis / disabled patient hydrotherapy",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I am disabled",
                        [LANG_HINDI]: "लेकिन मैं विकलांग हूँ",
                    },
                    [NEXT_QUESTION]: "110.0 Arthritis / disabled patient hydrotherapy",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I am visually impaired",
                        [LANG_HINDI]: "लेकनी मुझे दिखता नहीं",
                    },
                    [NEXT_QUESTION]: "112.1 Blind patient non-cardiac",
                    [VALUE]: 2
                },
                {
                    [OPTION_STATEMENT_VARIANTS]:[
                        {
                            [OPTION_NAME]:"Reset",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Reset",
                                [LANG_HINDI]: "रेसेट"
                            },
                            [VARIANT_PROBABILITY]:0.3
                        },
                        {
                            [OPTION_NAME]:"Okay",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Okay",
                                [LANG_HINDI]: "ठीक है"
                            },
                            [VARIANT_PROBABILITY]:0.7
                        }
                    ],
                    [COMMAND]: 'selectNewFlow',
                    [VALUE]: 3
                }
            ],
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "109.0 BP patient",
            [STATEMENT]: {
                [LANG_ENGLISH]: "You must exercise as much as possible and you should stop when the pressure reaches 170.",
                [LANG_HINDI]: "आपको जितना हो सके व्यायाम करना चाहिए और जब बी पी 170 तक पहुंच जाए तो आपको रुक जाना चाहिए।"
            },
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I have arthritis🦵",
                        [LANG_HINDI]: "लेकिन मुझे गठिया है🦵",
                    },
                    [NEXT_QUESTION]: "110.0 Arthritis / disabled patient hydrotherapy",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I am disabled♿",
                        [LANG_HINDI]: "लेकिन मैं विकलांग हूँ♿",
                    },
                    [NEXT_QUESTION]: "110.0 Arthritis / disabled patient hydrotherapy",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "But I am visually impaired👨‍🦯",
                        [LANG_HINDI]: "लेकनी मुझे दिखता नहीं👨‍🦯",
                    },
                    [NEXT_QUESTION]: "112.1 Blind patient non-cardiac",
                    [VALUE]: 2
                },
                {
                    [OPTION_STATEMENT_VARIANTS]:[
                        {
                            [OPTION_NAME]:"Reset",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Reset",
                                [LANG_HINDI]: "रेसेट"
                            },
                            [VARIANT_PROBABILITY]:0.3
                        },
                        {
                            [OPTION_NAME]:"Okay",
                            [STATEMENT]: {
                                [LANG_ENGLISH]: "Okay",
                                [LANG_HINDI]: "ठीक है"
                            },
                            [VARIANT_PROBABILITY]:0.7
                        }
                    ],
                    [COMMAND]: 'selectNewFlow',
                    [VALUE]: 3
                }
            ],
            [TYPE]: TYPE_BUTTON
        },

        {
            [ID]: "110.0 Arthritis / disabled patient hydrotherapy",
            [STATEMENT]: {
                [LANG_ENGLISH]: "You may consider physiotherapy and hydrotherapy in that case",
                [LANG_HINDI]: "आप उस मामले में फिजियोथेरेपी और हाइड्रोथेरेपी पर विचार कर सकते हैं"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "112.0 Arthritis patient non-cardiac",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Swimming is the best exercise overall. Since you are unable to run, swimming is a good idea",
                [LANG_HINDI]: "तैरना सबसे अच्छा व्यायाम है। चूंकि आप दौड़ने में असमर्थ हैं, इसलिए आपके लिए तैरना अच्छा उपाय है"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "112.1 Blind patient non-cardiac",
            [STATEMENT]: {
                [LANG_ENGLISH]: "You may consider walking on a treadmill with some inclination. It would significantly increase your confidence also",
                [LANG_HINDI]: "आप कुछ झुकाव के साथ ट्रेडमिल पर चलने पर विचार कर सकते हैं। यह आपके आत्मविश्वास में भी काफी वृद्धि करेगा"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        // CAD
        {
            [ID]: "113.0 CAD",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What is CAD",
                        [LANG_HINDI]: "यह क्या है"
                    },
                    [NEXT_QUESTION]: "114.0 What is CAD",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What causes CAD",
                        [LANG_HINDI]: "इसका क्या कारण होता है"
                    },
                    [NEXT_QUESTION]: "115.0 CAD cause",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What is the best treatment for CAD",
                        [LANG_HINDI]: "इसका सबसे अच्छा इलाज क्या है"
                    },
                    [NEXT_QUESTION]: "116.0 CAD treatment",
                    [VALUE]: 2
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "What do you want to know about?",
                [LANG_HINDI]: "आप किसके बारे में जानना चाहते हैं?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "114.0 What is CAD",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Damage or disease in the heart's major blood vessels.\n" +
                "\n" +
                "The usual cause is the build-up of plaque. This causes coronary arteries to narrow, limiting blood flow to the heart.\n" +
                "Coronary artery disease can range from no symptoms, to chest pain, to a heart attack.",
                [LANG_HINDI]: "हृदय की प्रमुख रक्त वाहिकाओं में रोग⚠️।\n" +
                "\n" +
                "ईसक कारण है प्लैक का जमाव। इससे दिल की पतली हो जाती हैं, जिससे हृदय में खून का प्रवाह सीमित हो जाता है।\n" +
                "कोरोनरी धमनी की बीमारी बिना किसी लक्षण के, सीने में दर्द से लेकर दिल के दौरे तक हो सकती है⚠️।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "115.0 CAD cause",
            [STATEMENT]: {
                [LANG_ENGLISH]: "1. Smoking / tobacco use🚬\n" +
                "2. Hypertension / High blood pressure\n" +
                "3. High cholestrol\n" +
                "4. High lipoprotein\n" +
                "5. Lack of exercise\n" +
                "6. Diabetes / Sugar\n" +
                "7. Thrombosis\n",
                [LANG_HINDI]: "1. धूम्रपान / तंबाकू का सेवन🚬\n" +
                "2. उच्च रक्तचाप / बी पी \n" +
                "3. उच्च कोलेस्ट्रॉल\n" +
                "4. उच्च लिपोप्रोटीन\n" +
                "5. व्यायाम की कमी\n" +
                "6. मधुमेह / शुगर \n" +
                "7. खून का थक्का "
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "116.0 CAD treatment",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Treatments include lifestyle changes☺️, medication💊, angioplasty and surgery😔.",
                [LANG_HINDI]: "उपचार में जीवनशैली में बदलाव☺️, दवाएं💊, एंजियोप्लास्टी और सर्जरी शामिल हैं😔।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        // Heart attack
        {
            [ID]: "117.0 Info about heart attack",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What is a heart attack",
                        [LANG_HINDI]: "दिल का दौरा / हार्ट अटैक  क्या है"
                    },
                    [NEXT_QUESTION]: "119.0 What is heart attack",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart attack symptoms",
                        [LANG_HINDI]: "हार्ट अटैक के लक्षण"
                    },
                    [NEXT_QUESTION]: "120.0 Heart attack symptoms",
                    [VALUE]: 1
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "What else do you want to know about?",
                [LANG_HINDI]: "आप किसके बारे में जानना चाहते हैं?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "119.0 What is heart attack",
            [STATEMENT]: {
                [LANG_ENGLISH]: "A heart attack (myocardial infarction or MI) is a serious medical emergency in which the supply of blood to the heart is suddenly blocked, usually by a blood clot",
                [LANG_HINDI]: "दिल का दौरा (मायोकार्डियल इंफार्क्शन या एमआई) एक गंभीर चिकित्सा आपात स्थिति है जिसमें हृदय को रक्त की आपूर्ति अचानक अवरुद्ध हो जाती है, आमतौर पर रक्त के थक्के द्वारा"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "120.0 Heart attack symptoms",
            [STATEMENT]: {
                [LANG_ENGLISH]: "1. Chest pain that may feel like pressure, tightness, pain, squeezing or aching.\n" +
                "2. Pain or discomfort that spreads to the shoulder, arm, back, neck, jaw, teeth or sometimes the upper belly.\n" +
                "3. Cold sweat.\n" +
                "4.Fatigue.\n" +
                "5. Heartburn or indigestion.\n" +
                "6. Lightheadedness or sudden dizziness.\n" +
                "7. Nausea.",
                [LANG_HINDI]: "1. सीने में दर्द जो दबाव, जकड़न, दर्द, निचोड़ने या दर्द जैसा महसूस हो सकता है\n" +
                "2. दर्द या बेचैनी जो कंधे, हाथ, पीठ, गर्दन, जबड़े, दांत या कभी-कभी ऊपरी पेट तक फैल जाती है\n" +
                "3. पसीना आना \n" +
                "4. थकान\n" +
                "5. अपच\n" +
                "6. आलस्य या अचानक चक्कर आना\n" +
                "7. मतली"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        // Blood pressure
        {
            [ID]: "121.0 BP information",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Quiz",
                        [LANG_HINDI]: "क्विज़"
                    },
                    [NEXT_QUESTION]: "132.0 Q No exercise in BP",
                    [VALUE]: 0,
                    [SKIP_PROBABILITY]:0.7
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What is good blood pressure?",
                        [LANG_HINDI]: "अच्छा रक्त रक्तचाप क्या है?"
                    },
                    [NEXT_QUESTION]: "131.0 Good BP",
                    [VALUE]: 1,
                    [SKIP_PROBABILITY]:0.4
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What is Hypertensio / High BP",
                        [LANG_HINDI]: "उच्च रक्तचाप / बीपी क्या है?"
                    },
                    [NEXT_QUESTION]: "130.0 What is hypertension",
                    [VALUE]: 2,
                    [SKIP_PROBABILITY]:0.5
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "At what blood pressure should I stop exercise",
                        [LANG_HINDI]: "मुझे किस रक्तचाप पर व्यायाम बंद करना चाहिए"
                    },
                    [NEXT_QUESTION]: "129.0 Exercise stop in BP",
                    [VALUE]: 3,
                    [SKIP_PROBABILITY]:0.3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Are hypertension medications lifelong?",
                        [LANG_HINDI]: "क्या बी पी  की दवाएं आजीवन होती हैं?"
                    },
                    [NEXT_QUESTION]: "128.0 BP meds lifelong",
                    [VALUE]: 4,
                    [SKIP_PROBABILITY]:0.5
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What Health Problems Are Associated With High Blood Pressure?",
                        [LANG_HINDI]: "उच्च रक्तचाप से कौन सी स्वास्थ्य समस्याएं जुड़ी हैं?"
                    },
                    [NEXT_QUESTION]: "127.0 BP associated problems",
                    [VALUE]: 5,
                    [SKIP_PROBABILITY]:0.5
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What causes high blood pressure?",
                        [LANG_HINDI]: "उच्च रक्तचाप का क्या कारण है?"
                    },
                    [NEXT_QUESTION]: "126.0 BP cause",
                    [VALUE]: 6,
                    [SKIP_PROBABILITY]:0.3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What Are Systolic and Diastolic Blood Pressure?",
                        [LANG_HINDI]: "सिस्टोलिक और डायस्टोलिक रक्तचाप क्या हैं?"
                    },
                    [NEXT_QUESTION]: "125.0 Systole and diastole",
                    [VALUE]: 7,
                    [SKIP_PROBABILITY]:0.7
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "How Do I Know If I Have High Blood Pressure?",
                        [LANG_HINDI]: "मुझे कैसे पता चलेगा कि मुझे उच्च रक्तचाप है?"
                    },
                    [NEXT_QUESTION]: "124.0 Hypertension symptoms",
                    [VALUE]: 8,
                    [SKIP_PROBABILITY]:0.3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What Is the Treatment for High Blood Pressure",
                        [LANG_HINDI]: "उच्च रक्तचाप का इलाज क्या है"
                    },
                    [NEXT_QUESTION]: "123.0 BP treatment",
                    [VALUE]: 9,
                    [SKIP_PROBABILITY]:0.4
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Side Effects of High Blood Pressure Drugs?",
                        [LANG_HINDI]: "उच्च रक्तचाप की दवाओं के दुष्प्रभाव क्या हैं?"
                    },
                    [NEXT_QUESTION]: "122.0 Side effects BP meds",
                    [VALUE]: 10,
                    [SKIP_PROBABILITY]:0.4
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Choose your preference",
                [LANG_HINDI]: "अपनी पसंद चुनें"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "122.0 Side effects BP meds",
            [STATEMENT]: {
                [LANG_ENGLISH]: "As is true with any medication, high blood pressure drugs have side effects. Among the most common are the following:\n" +
                "\n" +
                "        Diuretics: headache, weakness, low potassium blood levels\n" +
                "\n" +
                "        ACE inhibitors: dry and persistent cough, headache, diarrhea, high potassium blood levels\n" +
                "\n" +
                "        Angiotensin receptor blockers: fatigue, dizziness or fainting, diarrhea, congestion, high potassium blood levels\n" +
                "        \n" +
                "        Calcium channel blockers: dizziness, heart rhythm problems, ankle swelling, constipation\n" +
                "\n" +
                "        Beta-blockers: dizziness or lightheadedness, decreased sexual ability, drowsiness, fatigue, low heart rate\n" +
                "\n" +
                "        Alpha-blockers: dizziness, headache, pounding heartbeat, nausea, weakness, weight gain\n",
                [LANG_HINDI]: "जैसा कि किसी भी दवा के साथ होता है, उच्च रक्तचाप की दवाओं के दुष्प्रभाव होते हैं। सबसे आम में निम्नलिखित हैं:\n" +
                "\n" +
                "        मूत्रवर्धक: सिरदर्द, कमजोरी, कम पोटेशियम रक्त स्तर\n" +
                "\n" +
                "        एसीई अवरोधक: सूखी और लगातार खांसी, सिरदर्द, दस्त, उच्च पोटेशियम रक्त स्तर\n" +
                "\n" +
                "        एंजियोटेंसिन रिसेप्टर ब्लॉकर्स: थकान, चक्कर आना या बेहोशी, दस्त, भीड़, उच्च पोटेशियम रक्त स्तर\n" +
                "        \n" +
                "        कैल्शियम चैनल ब्लॉकर्स: चक्कर आना, हृदय ताल की समस्या, टखने में सूजन, कब्ज\n" +
                "\n" +
                "        बीटा-ब्लॉकर्स: चक्कर आना या हल्कापन, यौन क्षमता में कमी, उनींदापन, थकान, कम हृदय गति\n" +
                "\n" +
                "        अल्फा-ब्लॉकर्स: चक्कर आना, सिरदर्द, तेज़ दिल की धड़कन, मतली, कमजोरी, वजन बढ़ना"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "123.0 BP treatment",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Quit smoking🚬",
                        [LANG_HINDI]: "धूम्रपान छोड़ने🚬"
                    },
                    [NEXT_QUESTION]: "168.0 BP treatment smoking",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Lose weight",
                        [LANG_HINDI]: "वजन कम करना"
                    },
                    [NEXT_QUESTION]: "169.0 BP Treatment weight",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Diet🍔",
                        [LANG_HINDI]: "खान पीन🍔"
                    },
                    [NEXT_QUESTION]: "170.0 BP treatment diet",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Salt🧂",
                        [LANG_HINDI]: "नमक🧂"
                    },
                    [NEXT_QUESTION]: "171.0 BP treatment salt",
                    [VALUE]: 3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Exercise🏃",
                        [LANG_HINDI]: "कसरत 🏃"
                    },
                    [NEXT_QUESTION]: "172.0 BP treatment exercise",
                    [VALUE]: 4
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Alcohol🍺",
                        [LANG_HINDI]: "दारू🍺"
                    },
                    [NEXT_QUESTION]: "173.0 BP treatment alcohol",
                    [VALUE]: 5
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Reduce stress",
                        [LANG_HINDI]: "तनाव लेना कम करें "
                    },
                    [NEXT_QUESTION]: "174.0 BP treatment stress",
                    [VALUE]: 6
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Women : Birth control pills",
                        [LANG_HINDI]: "महिलाएं : गर्भनिरोधक गोलियां"
                    },
                    [NEXT_QUESTION]: "175.0 BP treatment women",
                    [VALUE]: 7
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Medication 💊",
                        [LANG_HINDI]: "दवाइयाँ 💊"
                    },
                    [NEXT_QUESTION]: "176.1 BP basic medication",
                    [VALUE]: 8
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Lifestyle changes 🧘 are key to keeping normal blood pressure. In fact, most doctors will suggest them before prescribing drugs. Lifestyle changes are also the recommended treatment for elevated blood pressure, a condition in which blood pressure readings are higher than 120 (systolic) over 80 (diastolic) and regularly over 130 / 80.\n" +
                "\n" +
                "The things that you need to take into consideration are: \n" +
                "\n" +
                "1. Quit smoking 🚬 \n" +
                "2. Lose weight\n" +
                "3. Diet 😋\n" +
                "4. Reduce salt 🧂\n" +
                "5. Exercise 🚲\n" +
                "6. Limit alcohol 🍺\n" +
                "7. Reduce stress\n" +
                "8. Birth control pills\n" +
                "9. Medicines 💊\n" +
                "\n" +
                "        \n" +
                "        If lifestyle changes aren’t enough to lower your blood pressure, your doctor might recommend medication.\n" +
                "\n" +
                "        Blood pressure medications do not cure hypertension but help keep it in a healthier range. Medicines usually need to be taken for life. A number of drugs can be used alone or in combination to treat high blood pressure:",
                [LANG_HINDI]: "जीवनशैली में बदलाव 🧘 सामान्य रक्तचाप को बनाए रखने की कुंजी है। वास्तव में, अधिकांश डॉक्टर दवाओं को निर्धारित करने से पहले उन्हें सुझाव देंगे। जीवनशैली में बदलाव भी उच्च रक्तचाप के लिए सही उपचार हैं। उच्च रक्तचाप यानि एक ऐसी स्थिति जिसमें रक्तचाप की रीडिंग 120 (सिस्टोलिक) से 80 (डायस्टोलिक) से अधिक और नियमित रूप से 130 / 80 से अधिक होती है।\n" +
                "\n" +
                "जिन बातों पर आपको ध्यान देने की आवश्यकता है वे हैं:\n" +
                "\n" +
                "1. धूम्रपान छोड़ो 🚬\n" +
                "2. वजन कम करें\n" +
                "3. आहार 😋\n" +
                "4. नमक कम करें 🧂\n" +
                "5. व्यायाम 🚲\n" +
                "6. शराब सीमित करें 🍺\n" +
                "7. तनाव कम करें\n" +
                "8. गर्भनिरोधक गोलियां\n" +
                "9. दवाएं 💊\n" +
                "\n" +
                "        \n" +
                "        यदि जीवनशैली में बदलाव आपके रक्तचाप को कम करने के लिए पर्याप्त नहीं हैं, तो आपका डॉक्टर दवा की सिफारिश कर सकता है। ☺️\n" +
                "\n" +
                "        रक्तचाप की दवाएं उच्च रक्तचाप का इलाज नहीं करती हैं, लेकिन इसे स्वस्थ श्रेणी में रखने में मदद करती हैं। दवाओं को आमतौर पर जीवन के लिए लेने की आवश्यकता होती है। उच्च रक्तचाप के इलाज के लिए कई दवाओं का अकेले या संयोजन में उपयोग किया जा सकता है:"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "124.0 Hypertension symptoms",
            [STATEMENT]: {
                [LANG_ENGLISH]: "High blood pressure often doesn't have any symptoms, so you usually don't feel it. For that reason, hypertension is usually diagnosed by a health care professional during a routine checkup. If you have a close relative with hypertension, or other risk factors, it is especially important to pay attention to your blood pressure reading.\n" +
                "    \n" +
                "        In order to diagnose high blood pressure, your doctor will check your blood pressure with a blood pressure cuff. It's important to pay attention to both the higher (systolic) and the lower (diastolic) numbers in your blood pressure readings.\n" +
                "    \n" +
                "        If your blood pressure is extremely high, you may have unusually strong headaches, chest pain, difficulty breathing, or poor exercise tolerance. If you have any of these symptoms, seek an evaluation promptly",
                [LANG_HINDI]: "उच्च रक्तचाप के अक्सर कोई लक्षण नहीं होते हैं, इसलिए आप आमतौर पर इसे महसूस नहीं करते हैं। इस कारण से, नियमित जांच के दौरान आमतौर पर स्वास्थ्य देखभाल पेशेवर द्वारा उच्च रक्तचाप का निदान किया जाता है। यदि आपके पास उच्च रक्तचाप, या अन्य जोखिम वाले कारकों के साथ एक करीबी रिश्तेदार है, तो अपने रक्तचाप पढ़ने पर ध्यान देना विशेष रूप से महत्वपूर्ण है।\n" +
                "    \n" +
                "        उच्च रक्तचाप चेक करने के लिए, आपका डॉक्टर ब्लड प्रेशर कफ के साथ आपके रक्तचाप की जाँच करेगा। अपने रक्तचाप रीडिंग में उच्च (सिस्टोलिक) और निम्न (डायस्टोलिक) दोनों संख्याओं पर ध्यान देना महत्वपूर्ण है।\n" +
                "    \n" +
                "        यदि आपका रक्तचाप बहुत अधिक है, तो आपको असामान्य रूप से तेज सिरदर्द, सीने में दर्द, सांस लेने में कठिनाई, या खराब व्यायाम सहनशीलता हो सकती है। यदि आपके पास इनमें से कोई भी लक्षण है, तो तुरंत मूल्यांकन करवाएं"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "125.0 Systole and diastole",
            [STATEMENT]: {
                [LANG_ENGLISH]: "The blood pressure reading is measured in millimeters of mercury (mmHg) and is written as systolic pressure (upper), the force of the blood against the artery walls as your heart beats, over diastolic pressure, the blood pressure between heartbeats. For example, a blood pressure reading is written as 120/80 mmHg, or \"120 over 80\". The systolic pressure is 120 and the diastolic pressure is 80.",
                [LANG_HINDI]: "रक्तचाप रीडिंग को पारा के मिलीमीटर (एमएमएचजी) में मापा जाता है और इसे सिस्टोलिक (ऊपर वाला ) दबाव के रूप में लिखा जाता है, धमनी की दीवारों के खिलाफ रक्त का बल जैसे आपका दिल धड़कता है, डायस्टोलिक दबाव पर, दिल की धड़कन के बीच रक्तचाप। उदाहरण के लिए, रक्तचाप की रीडिंग को 120/80 mmHg, या \"120 बटा 80\" के रूप में लिखा जाता है। सिस्टोलिक दबाव 120 है और डायस्टोलिक दबाव 80 है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "126.0 BP cause",
            [STATEMENT]: {
                [LANG_ENGLISH]: "While the cause of high blood pressure in most people remains unclear, inactivity, poor diet, obesity, older age, and genetics -- can all contribute to the development of hypertension.",
                [LANG_HINDI]: "अधिकांश लोगों में उच्च रक्तचाप का कारण स्पष्ट नहीं है, निष्क्रियता, खराब आहार, मोटापा, वृद्धावस्था और आनुवंशिकी - ये सभी उच्च रक्तचाप के विकास में योगदान कर सकते हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "127.0 BP associated problems",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Eye Disease 👀",
                        [LANG_HINDI]: "नेत्र रोग"
                    },
                    [NEXT_QUESTION]: "177.0 BP eye damage",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Stroke 🧠",
                        [LANG_HINDI]: "स्ट्रोक / लक़वा 🧠"
                    },
                    [NEXT_QUESTION]: "178.0 BP stroke",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Kidney Disease",
                        [LANG_HINDI]: "गुर्दे की बीमारी"
                    },
                    [NEXT_QUESTION]: "179.0 BP renal damage",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart Disease ❤️",
                        [LANG_HINDI]: "दिल की बीमारी ❤️"
                    },
                    [NEXT_QUESTION]: "180.0 BP heart damage",
                    [VALUE]: 3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Atherosclerosis: Damage to arteries",
                        [LANG_HINDI]: "नसों / धमनियों को नुकसान"
                    },
                    [NEXT_QUESTION]: "181.0 BP atherosclerosis",
                    [VALUE]: 4
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Several potentially serious health conditions are linked to high blood pressure, including:\n" +
                "\n" +
                "1. Damage to arteries\n" +
                "2. Damage to heart\n" +
                "3. Damage to brain\n" +
                "4. Damage to kidneys\n" +
                "5. Damage to eyes\n" +
                "6. Impotence",
                [LANG_HINDI]: "कई संभावित गंभीर स्वास्थ्य स्थितियां उच्च रक्तचाप से जुड़ी हैं, जिनमें शामिल हैं:\n" +
                "1. धमनियों को नुकसान\n" +
                "2. दिल को नुकसान\n" +
                "3. मस्तिष्क को नुकसान\n" +
                "4. किडनी को नुकसान\n" +
                "5. आंखों को नुकसान\n" +
                "6. नपुंसकता"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "128.0 BP meds lifelong",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Yes. Hypertension medication is lifelong and stopping them can have fatal consequences. ⚠️💊",
                [LANG_HINDI]: "हाँ। उच्च रक्तचाप की दवा आजीवन होती है और इसे रोकना जानलेवा हो सकता है। ⚠️💊"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "129.0 Exercise stop in BP",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Although exercise reduces blood pressure, it is recommended that exercise should be stopped once it reaches 170 mmHG and resumed after rest",
                [LANG_HINDI]: "हालांकि व्यायाम रक्तचाप को कम करता है, यह अनुशंसा की जाती है कि 170 mmHG तक पहुंचने के बाद व्यायाम बंद कर दिया जाए और आराम के बाद फिर से शुरू कर सकते हैं "
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "130.0 What is hypertension",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Hypertension is when blood pressure is too high",
                [LANG_HINDI]: "उच्च रक्तचाप तब होता है जब रक्तचाप बहुत अधिक होता है।"
            },
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What is normal blood pressure?",
                        [LANG_HINDI]: "सामान्य रक्त चाप क्या है?"
                    },
                    [NEXT_QUESTION]: "182.0 Normal BP",
                    [VALUE]: 0
                }
            ],
            [TYPE]: TYPE_BUTTON,
            [NEXT_QUESTION]: "130.1 What is normal BP"
        },
        {
            [ID]: "131.0 Good BP",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Systolic pressure (upper) of less than 120 and a diastolic pressure (लोअर) of less than 80. The first (systolic) number\n" +
                "represents the pressure in blood vessels when the heart contracts or\n" +
                "beats. The second (diastolic) number represents the pressure in the\n" +
                "vessels when the heart rests between beats",
                [LANG_HINDI]: "120 से कम का सिस्टोलिक (ऊपरी ) दबाव और 80 से कम का डायस्टोलिक (नीचे वाला) दबाव| पहला (सिस्टोलिक) नंबर\n" +
                "रक्त वाहिकाओं में दबाव का प्रतिनिधित्व करता है जब दिल सिकुड़ता है या\n" +
                "धड़कता है। दूसरी (डायस्टोलिक) संख्या में दबाव का प्रतिनिधित्व करती है\n" +
                "वाहिकाओं जब दिल धड़कनों के बीच आराम करता है|"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        // Quiz
        // TODO: Incomplete implementation
        {
            [ID]: "132.0 Q No exercise in BP",
            [OPTIONS]:[
                {
                    [STATEMENT]: STATEMENT_TRUE,
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: STATEMENT_FALSE,
                    [VALUE]: 1
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "You shouldn't exercise if you have hypertension",
                [LANG_HINDI]: "यदि आपको उच्च रक्तचाप है तो आपको व्यायाम नहीं करना चाहिए"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "133.0 A No exercise in BP",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Regular moderate exercise not only helps bring down your blood pressure; it strengthens your heart, zaps stress, and helps you stay at a healthy weight. If you have high blood pressure, ask your doctor what kind of exercise to do and how much.\n" +
                "A brisk half-hour walk 5 days a week is a good routine, but starting with even 10 minutes a day helps. How brisk? If you can walk and sing at the same time, you need to work a little harder. If you can walk and talk, you're moving at a good pace",
                [LANG_HINDI]: "नियमित मध्यम व्यायाम न केवल आपके रक्तचाप को कम करने में मदद करता है; यह आपके दिल को मजबूत करता है, तनाव को कम करता है, और आपको स्वस्थ वजन पर रहने में मदद करता है। यदि आपको उच्च रक्तचाप है, तो अपने डॉक्टर से पूछें कि किस प्रकार का व्यायाम करना है और कितना करना है।\n" +
                "                सप्ताह में 5 दिन आधे घंटे की तेज चलना एक अच्छी दिनचर्या है, लेकिन दिन में 10 मिनट से भी शुरुआत करने से मदद मिलती है। कितना तेज? यदि आप एक ही समय पर चल सकते हैं और गा सकते हैं, तो आपको थोड़ी अधिक मेहनत करने की आवश्यकता है। यदि आप चल सकते हैं और बात कर सकते हैं, तो आप अच्छी गति से आगे बढ़ रहे हैं"
            },
            [NEXT_QUESTION]: "134.0 Q Stress and BP",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "134.0 Q Stress and BP",
            [OPTIONS]:[
                {
                    [STATEMENT]: STATEMENT_TRUE,
                },
                {
                    [STATEMENT]: STATEMENT_FALSE,
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "You get high blood pressure from stress",
                [LANG_HINDI]: "तनाव से आपको हाई ब्लड प्रेशर हो जाता है"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "135.0 A Stress and BP",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Your blood pressure may go up for a while when you're under stress, but stress by itself doesn't cause long-term high blood pressure. Of course, if you're under a lot of stress all the time, this can still affect your health.\n" +
                "                Smoking, drinking too much alcohol, being obese, and not being physically active do raise your chance of high blood pressure. If it runs in your family, or if you're African-American, your risk is also higher. Blood pressure also tends to go up as we age",
                [LANG_HINDI]: "जब आप तनाव में होते हैं तो आपका रक्तचाप कुछ समय के लिए बढ़ सकता है, लेकिन तनाव अपने आप में लंबे समय तक उच्च रक्तचाप का कारण नहीं बनता है। बेशक, यदि आप हर समय बहुत अधिक तनाव में रहते हैं, तब भी यह आपके स्वास्थ्य को प्रभावित कर सकता है।\n" +
                "                धूम्रपान, बहुत अधिक शराब पीना, मोटा होना और शारीरिक रूप से सक्रिय न होना आपके उच्च रक्तचाप की संभावना को बढ़ाता है। यदि यह आपके परिवार में चलता है, या यदि आप अफ्रीकी-अमेरिकी हैं, तो आपका जोखिम भी अधिक है। उम्र बढ़ने के साथ रक्तचाप भी बढ़ने लगता है"
            },
            [NEXT_QUESTION]: "136.0 Q Feel BP",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "136.0 Q Feel BP",
            [OPTIONS]:[
                {
                    [STATEMENT]: STATEMENT_TRUE,
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: STATEMENT_FALSE,
                    [VALUE]: 1
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "You can feel it when your blood pressure starts to go up",
                [LANG_HINDI]: "आप महसूस कर सकते हैं जब आपका रक्तचाप बढ़ना शुरू हो जाता है"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "137.0 A Feel BP",
            [STATEMENT]: {
                [LANG_ENGLISH]: "You can have high blood pressure for years without knowing it. In fact, about 1 in 5 Americans with high blood pressure doesn't know it. Even if you feel fine, it can damage your heart and other organs. Get your blood pressure checked by your doctor once a year to make sure your numbers are good.",
                [LANG_HINDI]: "बिना जाने आपको सालों तक हाई ब्लड प्रेशर हो सकता है। वास्तव में, उच्च रक्तचाप वाले 5 में से 1 अमेरिकी इसे नहीं जानता है। अगर आप ठीक महसूस करते हैं, तो भी यह आपके दिल और अन्य अंगों को नुकसान पहुंचा सकता है। यह सुनिश्चित करने के लिए कि आपकी संख्या अच्छी है, वर्ष में एक बार अपने डॉक्टर से अपने रक्तचाप की जाँच करवाएँ।"
            },
            [NEXT_QUESTION]: "138.0 Q Important no. BP",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "138.0 Q Important no. BP",
            [OPTIONS]:[
                {
                    [STATEMENT]: STATEMENT_TRUE,
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: STATEMENT_FALSE,
                    [VALUE]: 1
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "The bottom number is the only one that matters in high blood pressure",
                [LANG_HINDI]: "नीचे की संख्या केवल वही है जो उच्च रक्तचाप में मायने रखती है"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "139.0 A Important no. BP",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Both numbers in your blood pressure reading count. A reading below 120/80 is normal. \n" +
                "                If your top number is 120 to 129 and your bottom number is 80 or less, you have prehypertension. It means you could end up with high blood pressure unless you take steps to prevent it. \n" +
                "                If your top number is 130 or above and your bottom number is 80 or above, you have high blood pressure. The higher the number, the greater your health risks.",
                [LANG_HINDI]: "आपके ब्लड प्रेशर रीडिंग काउंट में दोनों नंबर। 120/80 से नीचे पढ़ना सामान्य है। \n" +
                "                अगर आपका टॉप नंबर 120 से 129 है और आपका निचला नंबर 80 या उससे कम है, तो आपको प्रीहाइपरटेंशन है। इसका मतलब है कि जब तक आप इसे रोकने के लिए कदम नहीं उठाते हैं, तब तक आपको उच्च रक्तचाप हो सकता है। \n" +
                "                अगर आपका टॉप नंबर 130 या उससे ज्यादा है और आपका निचला नंबर 80 या इससे ज्यादा है, तो आपको हाई ब्लड प्रेशर है। संख्या जितनी अधिक होगी, आपके स्वास्थ्य जोखिम उतने ही अधिक होंगे।"
            },
            [NEXT_QUESTION]: "140.0 Q BP Med compulsory",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "140.0 Q BP Med compulsory",
            [OPTIONS]:[
                {
                    [STATEMENT]: STATEMENT_TRUE,
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: STATEMENT_FALSE,
                    [VALUE]: 1
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "If you have high blood pressure, you have to take medication",
                [LANG_HINDI]: "यदि आपको उच्च रक्तचाप है, तो आपको दवा लेनी होगी"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "141.0 A BP Med compulsory",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Lifestyle changes are the first step for blood pressure that's a little high. You may not need medicine if you exercise, eat healthy, lose weight or quit smoking if you need to, limit alcohol, and cut salt.\n" +
                "                If that doesn't work, your doctor will likely prescribe medication. If medicine brings your blood pressure down to normal, don't stop taking it. And do keep the healthy lifestyle habits. You need both to lower your chances of having a stroke or other serious health problem.",
                [LANG_HINDI]: "जीवनशैली में बदलाव रक्तचाप के लिए पहला कदम है जो थोड़ा अधिक है। यदि आप व्यायाम करते हैं, स्वस्थ भोजन करते हैं, वजन कम करते हैं या यदि आपको धूम्रपान छोड़ने, शराब सीमित करने और नमक काटने की आवश्यकता है तो आपको दवा की आवश्यकता नहीं हो सकती है।\n" +
                "                यदि वह काम नहीं करता है, तो आपका डॉक्टर संभवतः दवा लिखेगा। यदि दवा आपके रक्तचाप को सामान्य कर देती है, तो इसे लेना बंद न करें। और स्वस्थ जीवन शैली की आदतें रखें। आपको स्ट्रोक या अन्य गंभीर स्वास्थ्य समस्या होने की संभावना कम करने के लिए दोनों की आवश्यकता है।"
            },
            [NEXT_QUESTION]: "142.0 Q BP Kidney",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "142.0 Q BP Kidney",
            [OPTIONS]:[
                {
                    [STATEMENT]: STATEMENT_TRUE,
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: STATEMENT_FALSE,
                    [VALUE]: 1
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "High blood pressure causes kidney disease",
                [LANG_HINDI]: "हाई ब्लड प्रेशर से होती है किडनी की बीमारी"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "143.0 A BP Kidney",
            [STATEMENT]: {
                [LANG_ENGLISH]: "High blood pressure is the second leading cause of kidney failure. It can make your kidneys work harder and, eventually, stop working well. This can raise your blood pressure even more. If you are African-American, your chances of having kidney failure are much higher, even if your blood pressure is only a little high. If you have high blood pressure, talk to your doctor about your kidneys.\n" +
                "                If you have chronic kidney disease, keep your blood pressure below 130/80 with lifestyle changes and medicine",
                [LANG_HINDI]: "उच्च रक्तचाप गुर्दे की विफलता का दूसरा प्रमुख कारण है। यह आपके गुर्दे को कठिन काम कर सकता है और अंत में, अच्छी तरह से काम करना बंद कर सकता है। इससे आपका ब्लड प्रेशर और भी ज्यादा बढ़ सकता है। यदि आप अफ़्रीकी-अमरीकी हैं, तो आपके गुर्दे खराब होने की संभावना बहुत अधिक है, भले ही आपका रक्तचाप थोड़ा अधिक ही क्यों न हो। यदि आपको उच्च रक्तचाप है, तो अपने डॉक्टर से अपनी किडनी के बारे में बात करें।\n" +
                "                यदि आपको गुर्दे की पुरानी बीमारी है, तो जीवनशैली में बदलाव और दवा के साथ अपना रक्तचाप 130/80 से नीचे रखें"
            },
            [NEXT_QUESTION]: "144.0 Q BP table salt",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "144.0 Q BP table salt",
            [OPTIONS]:[
                {
                    [STATEMENT]: STATEMENT_TRUE,
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: STATEMENT_FALSE,
                    [VALUE]: 1
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Cutting back on table salt is the best way to cut sodium",
                [LANG_HINDI]: "फीका खान नामक / सोडियम काम करने का सबसे अच्छा तरीका है"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "145.0 A BP table salt",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Processed food is probably where you get most of your salt. Foods don't have to taste salty to be high in sodium. Some bread and rolls, soups, frozen pizza, and cold cuts are all high.\n" +
                "                Read labels. You may be shocked at how much sodium is in your food. Make sure you know how much one serving is. If you eat two servings, you'll get twice as much sodium.\n" +
                "                If your blood pressure is even a little above normal, use the American Heart Association's guidelines for how much sodium you get each day. That is 2,300 mg should  be your absolute daily maximum, but limiting yourself to no more than 1,500 mg is ideal.",
                [LANG_HINDI]: "प्रसंस्कृत भोजन शायद वह जगह है जहाँ आपको अपना अधिकांश नमक मिलता है। सोडियम में उच्च होने के लिए खाद्य पदार्थों को नमकीन स्वाद की आवश्यकता नहीं होती है। कुछ ब्रेड और रोल, सूप, फ्रोज़न पिज़्ज़ा, और कोल्ड कट सभी अधिक हैं।\n" +
                "                लेबल पढ़ें। आपके खाने में सोडियम की मात्रा कितनी है, यह जानकर आप हैरान हो सकते हैं। सुनिश्चित करें कि आप जानते हैं कि एक सेवारत कितना है। यदि आप दो सर्विंग्स खाते हैं, तो आपको दोगुना सोडियम मिलेगा।\n" +
                "                यदि आपका रक्तचाप सामान्य से थोड़ा अधिक है, तो अमेरिकन हार्ट एसोसिएशन के दिशानिर्देशों का उपयोग करें कि आपको प्रत्येक दिन कितना सोडियम मिलता है। यानी 2,300 मिलीग्राम आपका पूर्ण दैनिक अधिकतम होना चाहिए, लेकिन अपने आप को 1,500 मिलीग्राम से अधिक नहीं तक सीमित करना आदर्श है।"
            },
            [NEXT_QUESTION]: "146.0 Q BP meditation",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "146.0 Q BP meditation",
            [OPTIONS]:[
                {
                    [STATEMENT]: STATEMENT_TRUE,
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: STATEMENT_FALSE,
                    [VALUE]: 1
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Meditating can lower your blood pressure",
                [LANG_HINDI]: "ध्यान करने से आपका रक्तचाप कम हो सकता है"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "147.0 A BP meditation",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Studies show that doing Transcendental Meditation (TM) can lower your blood pressure a bit. TM involves focusing on a sound or phrase to get to a relaxed state of mind. But medication is still more effective. So if you have high blood pressure, meditate along with medicating -- not instead of it.\n" +
                "                There's no proof that yoga or other meditation or relaxation practices lower long-term blood pressure. But they do ease stress, which can spike your blood pressure.",
                [LANG_HINDI]: "अध्ययनों से पता चलता है कि ट्रान्सेंडैंटल मेडिटेशन (टीएम) करने से आपका रक्तचाप थोड़ा कम हो सकता है। टीएम में मन की आराम की स्थिति प्राप्त करने के लिए ध्वनि या वाक्यांश पर ध्यान केंद्रित करना शामिल है। लेकिन दवा अभी भी अधिक प्रभावी है। इसलिए यदि आपको उच्च रक्तचाप है, तो दवा के साथ-साथ ध्यान करें - इसके बजाय नहीं।\n" +
                "                कोई सबूत नहीं है कि योग या अन्य ध्यान या विश्राम अभ्यास लंबे समय तक रक्तचाप को कम करते हैं। लेकिन वे तनाव को कम करते हैं, जो आपके रक्तचाप को बढ़ा सकते हैं।"
            },
            [NEXT_QUESTION]: "148.0 Q BP age",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "148.0 Q BP age",
            [OPTIONS]:[
                {
                    [STATEMENT]: 16,
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: 18,
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: 30,
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: 50,
                    [VALUE]: 3
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "At what age should you have your first screening for high blood pressure?",
                [LANG_HINDI]: "उच्च रक्तचाप के लिए आपको पहली बार किस उम्र में जांच करवानी चाहिए?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "149.0 A BP age",
            [STATEMENT]: {
                [LANG_ENGLISH]: "The U.S. Preventive Services Task Force recommends that a healthy adult get a first blood pressure check at age 18. If your blood pressure is normal at that time, and you do not have diabetes or other risk factors, you should then get your blood pressure checked every year. You should also be checked more often if you are at risk for high blood pressure. Your healthcare provider may suggest a different screening schedule if you have other health conditions.",
                [LANG_HINDI]: "यू.एस. प्रिवेंटिव सर्विसेज टास्क फोर्स की सिफारिश है कि एक स्वस्थ वयस्क को 18 साल की उम्र में पहली बार रक्तचाप की जांच करवानी चाहिए। यदि उस समय आपका रक्तचाप सामान्य है, और आपको मधुमेह या अन्य जोखिम कारक नहीं हैं, तो आपको अपने रक्तचाप की जांच करवानी चाहिए। प्रत्येक वर्ष। यदि आपको उच्च रक्तचाप का खतरा है तो आपको अधिक बार जांच करानी चाहिए। यदि आपके पास अन्य स्वास्थ्य स्थितियां हैं, तो आपका स्वास्थ्य सेवा प्रदाता एक अलग स्क्रीनिंग शेड्यूल सुझा सकता है।"
            },
            [NEXT_QUESTION]: "150.0 Q BP values variation",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "150.0 Q BP values variation",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Vary, depending on the time of day your blood pressure is checked",
                        [LANG_HINDI]: "अलग-अलग, दिन के समय के आधार पर आपके रक्तचाप की जाँच की जाती है"
                    },
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Get lower with high levels of stress",
                        [LANG_HINDI]: "तनाव के उच्च स्तर के साथ कम हो जाओ"
                    },
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Are the same for people of the same age and weight",
                        [LANG_HINDI]: "समान उम्र और वजन के लोगों के लिए समान हैं"
                    },
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Stay the same throughout the day",
                        [LANG_HINDI]: "दिन भर ऐसे ही रहें"
                    },
                    [VALUE]: 3
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "The numbers in a blood pressure reading:",
                [LANG_HINDI]: "रक्तचाप पढ़ने में संख्याएँ:"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "151.0 A BP values variation",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Blood pressure readings measure the force of blood pushing against blood vessel (artery) walls as your heart pumps blood. They can change when you are dehydrated, nervous, or stressed. They can also change when you sleep, and when you wake up. They also change when you are active. Blood pressure goes up as you get older. It is also related to your body size. When blood pressure stays high over time, it can cause damage to different parts of the body. It can cause serious long-term problems.",
                [LANG_HINDI]: "जब आपका हृदय रक्त पंप करता है तो रक्तचाप की रीडिंग रक्त वाहिका (धमनी) की दीवारों के खिलाफ रक्त के दबाव को मापती है। जब आप निर्जलित, नर्वस या तनावग्रस्त होते हैं तो वे बदल सकते हैं। जब आप सोते हैं, और जब आप जागते हैं तो वे भी बदल सकते हैं। जब आप सक्रिय होते हैं तो वे भी बदल जाते हैं। जैसे-जैसे आप बड़े होते जाते हैं रक्तचाप बढ़ता जाता है। यह आपके शरीर के आकार से भी संबंधित है। जब रक्तचाप समय के साथ उच्च रहता है, तो यह शरीर के विभिन्न हिस्सों को नुकसान पहुंचा सकता है। यह गंभीर दीर्घकालिक समस्याएं पैदा कर सकता है।"
            },
            [NEXT_QUESTION]: "152.0 Q BP symptom",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "152.0 Q BP symptom",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Racing heartbeat",
                        [LANG_HINDI]: "रेसिंग दिल की धड़कन"
                    },
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "High body temperature",
                        [LANG_HINDI]: "उच्च शरीर का तापमान"
                    },
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Fatigue",
                        [LANG_HINDI]: "थकान"
                    },
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "It has no symptoms that you notice",
                        [LANG_HINDI]: "इसका कोई लक्षण नहीं है जो आप नोटिस करते हैं"
                    },
                    [VALUE]: 3
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "What is the most common symptom of high blood pressure?",
                [LANG_HINDI]: "उच्च रक्तचाप का सबसे आम लक्षण क्या है?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "153.0 A BP symptom",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Because it usually has no obvious symptoms, high blood pressure (hypertension) is called the silent killer.",
                [LANG_HINDI]: "क्योंकि इसके आमतौर पर कोई स्पष्ट लक्षण नहीं होते हैं, उच्च रक्तचाप (उच्च रक्तचाप) को साइलेंट किलर कहा जाता है।"
            },
            [NEXT_QUESTION]: "154.0 Q BP risk cause",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "154.0 Q BP risk cause",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Obesity",
                        [LANG_HINDI]: "मोटापा"
                    },
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "A family history of high blood pressure",
                        [LANG_HINDI]: "उच्च रक्तचाप का पारिवारिक इतिहास"
                    },
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Smoking",
                        [LANG_HINDI]: "धूम्रपान"
                    },
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "All of the these",
                        [LANG_HINDI]: "सभी"
                    },
                    [VALUE]: 3
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Which of these can increase your risk of high blood pressure?",
                [LANG_HINDI]: "इनमें से कौन आपके उच्च रक्तचाप के जोखिम को बढ़ा सकता है?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "155.0 A BP risk cause",
            [STATEMENT]: {
                [LANG_ENGLISH]: "A direct cause isn't known in most cases, however.",
                [LANG_HINDI]: "हालांकि, ज्यादातर मामलों में प्रत्यक्ष कारण का पता नहीं चलता है।"
            },
            [NEXT_QUESTION]: "156.0 Q High BP",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "156.0 Q High BP",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "120 over 80",
                        [LANG_HINDI]: "120 बटा 80"
                    },
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "130 over 80",
                        [LANG_HINDI]: "130 बटा 80"
                    },
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "140 over 90",
                        [LANG_HINDI]: "140 बटा 90"
                    },
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "210 over 120",
                        [LANG_HINDI]: "210 बटा 120"
                    },
                    [VALUE]: 3
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "At what point is blood pressure considered \"high\"?",
                [LANG_HINDI]: "किस बिंदु पर रक्तचाप को \"उच्च\" माना जाता है?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "157.0 A High BP",
            [STATEMENT]: {
                [LANG_ENGLISH]: "You have high blood pressure when your blood pressure is 130/80 mmHg on several separate occasions. Blood pressure can be normal, elevated, or stage 1 or stage 2 high blood pressure:\n" +
                "1. Normal blood pressure is 120/80. This means a systolic reading of less than 120 and a diastolic reading of less than 80.\n" +
                " 2. Elevated blood pressure is a systolic reading of 120 to 129 and a diastolic reading of less than 80.\n" +
                " 3.  Stage 1 high blood pressure is a systolic reading of 130 to 139 or a diastolic reading between 80 and 89.\n" +
                "4.  Stage 2 high blood pressure is a systolic reading of 140 or higher or a diastolic reading of 90 or higher.",
                [LANG_HINDI]: "जब आपका रक्तचाप कई अलग-अलग अवसरों पर 130/80 mmHg होता है तो आपको उच्च रक्तचाप होता है। रक्तचाप सामान्य, ऊंचा, या चरण 1 या चरण 2 उच्च रक्तचाप हो सकता है:\n" +
                "1. सामान्य रक्तचाप 120/80 है। इसका अर्थ है 120 से कम की सिस्टोलिक रीडिंग और 80 से कम की डायस्टोलिक रीडिंग।\n" +
                " 2. ऊंचा रक्तचाप 120 से 129 का सिस्टोलिक रीडिंग और 80 से कम का डायस्टोलिक रीडिंग है।\n" +
                " 3. स्टेज 1 हाई ब्लड प्रेशर 130 से 139 का सिस्टोलिक रीडिंग या 80 और 89 के बीच डायस्टोलिक रीडिंग है।\n" +
                "4. स्टेज 2 उच्च रक्तचाप 140 या उससे अधिक का सिस्टोलिक रीडिंग या 90 या उससे अधिक का डायस्टोलिक रीडिंग है।"
            },
            [NEXT_QUESTION]: "158.0 Q High BP leads to",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "158.0 Q High BP leads to",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Cancer",
                        [LANG_HINDI]: "कैंसर"
                    },
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Strokes",
                        [LANG_HINDI]: "लक़वा"
                    },
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Diabetes",
                        [LANG_HINDI]: "मधुमेह / डाइबीटीज़ / शुगर"
                    },
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Congestive heart failure",
                        [LANG_HINDI]: "कंजेस्टिव हार्ट फैल्यर"
                    },
                    [VALUE]: 3
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "High blood pressure is the main cause of which of these?",
                [LANG_HINDI]: "उच्च रक्तचाप इनमें से किसका मुख्य कारण है?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "159.0 A High BP leads to",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Over time, high blood pressure damages blood vessels. This damage is called arteriosclerosis and atherosclerosis. These conditions increase your risk not only for stroke, but also heart attacks and kidney disease.",
                [LANG_HINDI]: "समय के साथ, उच्च रक्तचाप रक्त वाहिकाओं को नुकसान पहुंचाता है। इस क्षति को धमनीकाठिन्य और एथेरोस्क्लेरोसिस कहा जाता है। ये स्थितियां न केवल स्ट्रोक के लिए, बल्कि दिल के दौरे और गुर्दे की बीमारी के लिए भी आपके जोखिम को बढ़ाती हैं।"
            },
            [NEXT_QUESTION]: "160.0 Q High BP contributing factors",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "160.0 Q High BP contributing factors",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Getting a lot of vitamin C",
                        [LANG_HINDI]: "बहुत सारा विटामिन सी प्राप्त करना"
                    },
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Drinking a lot of alcohol",
                        [LANG_HINDI]: "बहुत अधिक शराब पीना"
                    },
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Getting a lot of calcium",
                        [LANG_HINDI]: "बहुत सारा कैल्शियम लेना"
                    },
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "All of the above",
                        [LANG_HINDI]: "सभी"
                    },
                    [VALUE]: 3
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Which of these contribute to high blood pressure?",
                [LANG_HINDI]: "इनमें से कौन उच्च रक्तचाप में योगदान देता है?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "161.0 A High BP contributing factors",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Excessive drinking increases heart rate. This puts pressure on vessel walls. Three to five drinks a day over a long period can cause high blood pressure.",
                [LANG_HINDI]: "अत्यधिक शराब पीने से हृदय गति बढ़ जाती है। यह पोत की दीवारों पर दबाव डालता है। लंबे समय तक दिन में तीन से पांच पेय उच्च रक्तचाप का कारण बन सकते हैं।"
            },
            [NEXT_QUESTION]: "162.0 Q High BP age",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "162.0 Q High BP age",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "40 to 49",
                        [LANG_HINDI]: "40 से 49"
                    },
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "50 to 59",
                        [LANG_HINDI]: "50 से 59"
                    },
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "60 to 69",
                        [LANG_HINDI]: "60 से 69"
                    },
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "70 to 79",
                        [LANG_HINDI]: "70 से 79"
                    },
                    [VALUE]: 3
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "In which age group of men does the risk for high blood pressure go up?",
                [LANG_HINDI]: "पुरुषों के किस आयु वर्ग में उच्च रक्तचाप का खतरा बढ़ जाता है?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "163.0 A High BP age",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Aging directly relates to an increase in risk. Men tend to see their blood pressure go up in their 50s. Women's blood pressure tends to increase in their 60s",
                [LANG_HINDI]: "उम्र बढ़ने का सीधा संबंध जोखिम में वृद्धि से है। पुरुष 50 के दशक में अपने रक्तचाप को ऊपर जाते हुए देखते हैं। महिलाओं का रक्तचाप उनके 60 के दशक में बढ़ जाता है"
            },
            [NEXT_QUESTION]: "164.0 Q BP and salt",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "164.0 Q BP and salt",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "It reduces fluid buildup in the body",
                        [LANG_HINDI]: "यह शरीर में द्रव निर्माण को कम करता है"
                    },
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "It allows vessels to relax",
                        [LANG_HINDI]: "नसों को आराम करने को मिलता है"
                    },
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "It raises levels of HDL (\"good\") cholesterol",
                        [LANG_HINDI]: "यह एचडीएल (\"अच्छा\") कोलेस्ट्रॉल के स्तर को बढ़ाता है"
                    },
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "It helps keep your heartbeat steady",
                        [LANG_HINDI]: "यह आपके दिल की धड़कन को स्थिर रखने में मदद करता है"
                    },
                    [VALUE]: 3
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Why does reducing how much salt you eat help prevent high blood pressure?",
                [LANG_HINDI]: "खाने में नमक कम करने से उच्च रक्तचाप को रोकने में मदद क्यों मिलती है?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "165.0 A BP and salt",
            [STATEMENT]: {
                [LANG_ENGLISH]: "People who are very sensitive to salt have blood pressure that reacts a lot to salt. Experts advise that adults--no matter what age, ethnic background, or health conditions--consume no more than 2,300 mg of sodium a day. In some cases, your healthcare provider may tell you to cut your sodium intake even more.",
                [LANG_HINDI]: "जो लोग नमक के प्रति बहुत संवेदनशील होते हैं उन्हें रक्तचाप होता है जो नमक के प्रति बहुत अधिक प्रतिक्रिया करता है। विशेषज्ञ सलाह देते हैं कि वयस्क - चाहे कोई भी उम्र, जातीय पृष्ठभूमि या स्वास्थ्य की स्थिति हो - एक दिन में 2,300 मिलीग्राम से अधिक सोडियम का सेवन न करें। कुछ मामलों में, आपका स्वास्थ्य सेवा प्रदाता आपको अपने सोडियम सेवन में और भी अधिक कटौती करने के लिए कह सकता है।"
            },
            [NEXT_QUESTION]: "166.0 Q BP control",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "166.0 Q BP control",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Get to and stay at a healthy weight",
                        [LANG_HINDI]: "स्वस्थ वजन पर पहुंचें और बने रहें"
                    },
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Exercise regularly",
                        [LANG_HINDI]: "नियमित रूप से व्यायाम करें"
                    },
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Take the blood pressure medicine prescribed by your doctor",
                        [LANG_HINDI]: "अपने चिकित्सक द्वारा निर्धारित रक्तचाप की दवा लें"
                    },
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "All of the above",
                        [LANG_HINDI]: "सभी"
                    },
                    [VALUE]: 3
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "What can you do to control high blood pressure?",
                [LANG_HINDI]: "उच्च रक्तचाप को नियंत्रित करने के लिए आप क्या कर सकते हैं?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "167.0 A BP control",
            [STATEMENT]: {
                [LANG_ENGLISH]: "People who are very sensitive to salt have blood pressure that reacts a lot to salt. Experts advise that adults--no matter what age, ethnic background, or health conditions--consume no more than 2,300 mg of sodium a day. In some cases, your healthcare provider may tell you to cut your sodium intake even more.",
                [LANG_HINDI]: "जो लोग नमक के प्रति बहुत संवेदनशील होते हैं उन्हें रक्तचाप होता है जो नमक के प्रति बहुत अधिक प्रतिक्रिया करता है। विशेषज्ञ सलाह देते हैं कि वयस्क - चाहे कोई भी उम्र, जातीय पृष्ठभूमि या स्वास्थ्य की स्थिति हो - एक दिन में 2,300 मिलीग्राम से अधिक सोडियम का सेवन न करें। कुछ मामलों में, आपका स्वास्थ्य सेवा प्रदाता आपको अपने सोडियम सेवन में और भी अधिक कटौती करने के लिए कह सकता है।"
            },
            [TYPE]: TYPE_NONE
        },
        // BP treatment
        {
            [ID]: "168.0 BP treatment smoking",
            [STATEMENT]: {
                [LANG_ENGLISH]: "This might be the most important step you can take to improve health.\n" +
                "\n" +
                "Stop smoking cigarettes! 🛑🚬🛑",
                [LANG_HINDI]: "स्वास्थ्य में सुधार के लिए यह सबसे महत्वपूर्ण कदम हो सकता है।\n" +
                "\n" +
                "बीड़ी, सिगरेट पीना बंद करें| खैनी गुटका तंबाकू बंद करें! 🛑🚬🛑"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "169.0 BP Treatment weight",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Keeping a healthy weight can help lower your blood pressure. If you're overweight, work with your doctor to design a safe weight loss plan to get closer to your ideal weight.",
                [LANG_HINDI]: "स्वस्थ वजन रखने से आपके रक्तचाप को कम करने में मदद मिल सकती है। यदि आप अधिक वजन वाले हैं, तो अपने आदर्श वजन के करीब पहुंचने के लिए एक सुरक्षित वजन घटाने की योजना तैयार करने के लिए अपने डॉक्टर के साथ काम करें।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "170.0 BP treatment diet",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Eat a healthy diet, such as the DASH diet, which is high in seasonal fruits🥝, vegetables🥑, lean protein🍛 and whole grains and low in salt and fat. Also make sure you get enough vitamins and minerals. Some studies show that having the recommended daily amounts of vitamin C, vitamin E, potassium, magnesium, and calcium can improve heart health. There is no real evidence regarding the benefits of multivitamins. Getting your vitamins through your food is a better alternative." +
                "Eat the following - lemon, orange, apple, mango, watermelon, papaya, pear, tomato, cucumber, black berries, high fiber fruits like plums. Green leafy vegetables like spinach, bottle gourd, tori (zucchini), ladyfinger, greens, fenugreek, bitter gourd, cabbage, mustard.",
                [LANG_HINDI]: "एक स्वस्थ आहार खाएं, जैसे डीएएसएच आहार, जो मौसम के फलों🥝, सब्जियों🥑, दुबला प्रोटीन🍛 और साबुत अनाज में उच्च और नमक और वसा में कम है। यह भी सुनिश्चित करें कि आपको पर्याप्त विटामिन और खनिज मिले। कुछ अध्ययनों से पता चलता है कि अनुशंसित दैनिक मात्रा में विटामिन सी, विटामिन ई, पोटेशियम, मैग्नीशियम और कैल्शियम हृदय स्वास्थ्य में सुधार कर सकते हैं। मल्टीविटामिन के लाभों के संबंध में कोई वास्तविक प्रमाण नहीं है। अपने भोजन के माध्यम से अपने विटामिन प्राप्त करना एक बेहतर विकल्प है।" +
                "नींबू, संतरा, सेब, आम, तरबूज, पपीता, नाशपाती, टमाटर, खीरा, खीरा और केल उच्च फाइबर वाले फल जैसे आलूबुखारा खाएं। हरी पत्तेदार सब्जियां जैसे पालक, लौकी, तोरी, भिंडी, साग, मेथी, करेला, पत्ता गोभी, हरी सरसों का सेवन करें।",
                [DESCRIPTION_IMAGE]: "fruits_and_vegetables.png"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "171.0 BP treatment salt",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Lower the amount of salt in your diet. Don't add it separately.\n" +
                "You may also shift to rock salt.",
                [LANG_HINDI]: "अपने आहार में नमक की मात्रा कम करें। इसे अलग से न डालें ।\n" +
                "आप सफेद की बदले सेंधा नमक भी ले सकते हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "172.0 BP treatment exercise",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Regular aerobic activity, such as brisk walking 🚶 on most days of the week, can lower blood pressure. Regularity ⌚ of exercise is as important as intensity. 🏃 🏋️‍♀️️",
                [LANG_HINDI]: "नियमित एरोबिक गतिविधि, जैसे सप्ताह के अधिकांश दिनों में तेज चलना, रक्तचाप को कम कर सकता है। व्यायाम की नियमितता उतनी ही महत्वपूर्ण है जितनी तीव्रता।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "173.0 BP treatment alcohol",
            [STATEMENT]: {
                [LANG_ENGLISH]: "If you drink, women should drink no more than one 1️⃣ alcoholic drink per day; men should limit intake to two 2️⃣ drinks. 'One drink' means 5 ounces of wine, 12 ounces of beer, or 1.5 ounces of hard liquor.",
                [LANG_HINDI]: "यदि आप पीते हैं, तो महिलाओं को प्रति दिन एक 1️⃣ से अधिक नहीं पीना चाहिए; पुरुषों को दो 2️⃣ के सेवन पे सीमित करना चाहिए। 'एक ड्रिंक' का अर्थ है 5 औंस वाइन, 12 औंस बीयर या 1.5 औंस हार्ड शराब।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "174.0 BP treatment stress",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Emotional factors play a role in blood pressure. Studies show that relaxation techniques such as meditation, yoga, or therapy may reduce blood pressure.",
                [LANG_HINDI]: "भावनात्मक कारक रक्तचाप में भूमिका निभाते हैं। अध्ययनों से पता चलता है कि ध्यान, योग या चिकित्सा जैसी विश्राम तकनीकें रक्तचाप को कम कर सकती हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "175.0 BP treatment women",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Women should talk with a doctor about the the higher risk of high blood pressure from taking birth control pills, especially if they're over 35 and overweight.",
                [LANG_HINDI]: "महिलाओं को गर्भनिरोधक गोलियां लेने से उच्च रक्तचाप के उच्च जोखिम के बारे में डॉक्टर से बात करनी चाहिए, खासकर यदि वे 35 से अधिक और अधिक वजन वाले हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "176.1 BP basic medication",
            [STATEMENT]: {
                [LANG_ENGLISH]: "BP / Hypertension medication is often lifelong. If you have been prescribed medication for blood pressure, never stop them without consulting your doctor first.\n" +
                " Even if your BP drops below 110! Systole (higher) should be between 90 and 120 and the lower (diastolic) should be between 60 and 90",
                [LANG_HINDI]: "बीपी की दवा आजीवन लेनी पड़ सकती है। यदि आपको बीपी के लिए निर्धारित दवाएं दी गई हैं, तो पहले अपने चिकित्सक से परामर्श किए बिना उन्हें कभी भी बंद न करें। बीपी 110 के नीचे आने पे भी दवाएं लेते रहें!\n" +
                "ऊपरी बीपी 90 से 120 के बीच में होना चाहिए और नीचे वाला 90 से 60 के बीच में होना चाहिए!"
            },
            [NEXT_QUESTION]: "176.0 BP treatment medication",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "176.0 BP treatment medication",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Diuretics, or \"water pills,\" rid the body of salt and excess fluids.\n" +
                "\n" +
                "        Beta-blockers make the heart beat more slowly and with less force. These are particularly effective in people with heart disease.\n" +
                "\n" +
                "        Calcium-channel blockers reduce blood pressure by dilating blood vessels.\n" +
                "\n" +
                "        Angiotensin-converting enzyme (ACE) inhibitors block factors that cause blood vessels to constrict, which makes vessels dilate and thus reduces blood pressure. These drugs can decrease the risk of kidney disease, heart disease, and stroke, and are especially useful in people with heart disease or diabetes.\n" +
                "\n" +
                "        Angiotensin II receptor blockers (ARBs) work in a similar way to ACE inhibitors.\n" +
                "        \n" +
                "        Alpha1-adrenergic blockers and centrally acting agents lower blood pressure by relaxing and dilating arteries.\n" +
                "\n" +
                "        Alpha-beta blockers have the combined effects of relaxing arteries, slowing the heartbeat, and reducing the force of the heartbeat.\n" +
                "\n" +
                "        Centrally acting agents prevent your brain from sending signals to your nervous system to increase your heart rate and narrow your blood vessels.\n" +
                "\n" +
                "        Vasodilators prevent arteries from narrowing by a direct action on the muscles in the walls of the arteries.",
                [LANG_HINDI]: "मूत्रवर्धक, या \"पानी की गोलियाँ\", नमक और अतिरिक्त तरल पदार्थों के शरीर से छुटकारा दिलाता है।\n" +
                "\n" +
                "        बीटा-ब्लॉकर्स दिल की धड़कन को अधिक धीरे-धीरे और कम बल के साथ बनाते हैं। ये हृदय रोग वाले लोगों में विशेष रूप से प्रभावी हैं।\n" +
                "\n" +
                "        कैल्शियम-चैनल ब्लॉकर्स रक्त वाहिकाओं को फैलाकर रक्तचाप को कम करते हैं।\n" +
                "\n" +
                "        एंजियोटेंसिन-परिवर्तित एंजाइम (एसीई) अवरोधक उन कारकों को रोकते हैं जो रक्त वाहिकाओं को संकुचित करते हैं, जिससे वाहिकाओं का विस्तार होता है और इस प्रकार रक्तचाप कम हो जाता है। ये दवाएं गुर्दे की बीमारी, हृदय रोग और स्ट्रोक के जोखिम को कम कर सकती हैं और विशेष रूप से हृदय रोग या मधुमेह वाले लोगों के लिए उपयोगी हैं।\n" +
                "\n" +
                "        एंजियोटेंसिन II रिसेप्टर ब्लॉकर्स (एआरबी) एसीई इनहिबिटर के समान काम करते हैं।\n" +
                "        \n" +
                "        अल्फा 1-एड्रीनर्जिक ब्लॉकर्स और केंद्रीय रूप से अभिनय करने वाले एजेंट धमनियों को शिथिल और फैलाकर रक्तचाप को कम करते हैं।\n" +
                "\n" +
                "        अल्फा-बीटा ब्लॉकर्स में धमनियों को आराम देने, दिल की धड़कन को धीमा करने और दिल की धड़कन की शक्ति को कम करने का संयुक्त प्रभाव होता है।\n" +
                "\n" +
                "        केंद्रीय रूप से कार्य करने वाले एजेंट आपके मस्तिष्क को आपकी हृदय गति बढ़ाने और आपकी रक्त वाहिकाओं को संकीर्ण करने के लिए आपके तंत्रिका तंत्र को संकेत भेजने से रोकते हैं।\n" +
                "\n" +
                "        वासोडिलेटर्स धमनियों की दीवारों में मांसपेशियों पर सीधी क्रिया करके धमनियों को संकुचित होने से रोकते हैं।मूत्रवर्धक, या \"पानी की गोलियाँ\", नमक और अतिरिक्त तरल पदार्थों के शरीर से छुटकारा दिलाता है।\n" +
                "\n" +
                "        बीटा-ब्लॉकर्स दिल की धड़कन को अधिक धीरे-धीरे और कम बल के साथ बनाते हैं। ये हृदय रोग वाले लोगों में विशेष रूप से प्रभावी हैं।\n" +
                "\n" +
                "        कैल्शियम-चैनल ब्लॉकर्स रक्त वाहिकाओं को फैलाकर रक्तचाप को कम करते हैं।\n" +
                "\n" +
                "        एंजियोटेंसिन-परिवर्तित एंजाइम (एसीई) अवरोधक उन कारकों को रोकते हैं जो रक्त वाहिकाओं को संकुचित करते हैं, जिससे वाहिकाओं का विस्तार होता है और इस प्रकार रक्तचाप कम हो जाता है। ये दवाएं गुर्दे की बीमारी, हृदय रोग और स्ट्रोक के जोखिम को कम कर सकती हैं और विशेष रूप से हृदय रोग या मधुमेह वाले लोगों के लिए उपयोगी हैं।\n" +
                "\n" +
                "        एंजियोटेंसिन II रिसेप्टर ब्लॉकर्स (एआरबी) एसीई इनहिबिटर के समान काम करते हैं।\n" +
                "        \n" +
                "        अल्फा 1-एड्रीनर्जिक ब्लॉकर्स और केंद्रीय रूप से अभिनय करने वाले एजेंट धमनियों को शिथिल और फैलाकर रक्तचाप को कम करते हैं।\n" +
                "\n" +
                "        अल्फा-बीटा ब्लॉकर्स में धमनियों को आराम देने, दिल की धड़कन को धीमा करने और दिल की धड़कन की शक्ति को कम करने का संयुक्त प्रभाव होता है।\n" +
                "\n" +
                "        केंद्रीय रूप से कार्य करने वाले एजेंट आपके मस्तिष्क को आपकी हृदय गति बढ़ाने और आपकी रक्त वाहिकाओं को संकीर्ण करने के लिए आपके तंत्रिका तंत्र को संकेत भेजने से रोकते हैं।\n" +
                "\n" +
                "        वासोडिलेटर्स धमनियों की दीवारों में मांसपेशियों पर सीधी क्रिया करके धमनियों को संकुचित होने से रोकते हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        // BP associated problems
        {
            [ID]: "177.0 BP eye damage",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Hypertension can damage the very small blood vessels in the retina",
                [LANG_HINDI]: "उच्च रक्तचाप रेटिना में बहुत छोटी रक्त वाहिकाओं को नुकसान पहुंचा सकता है"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "178.0 BP stroke",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Hypertension can lead to stroke, either by contributing to the process of atherosclerosis (which can lead to blockages and / or clots), or by weakening the blood vessel wall and causing it to rupture.",
                [LANG_HINDI]: "उच्च रक्तचाप स्ट्रोक का कारण बन सकता है, या तो एथेरोस्क्लेरोसिस की प्रक्रिया में योगदान करके (जो रुकावट और / या थक्के का कारण बन सकता है), या रक्त वाहिका की दीवार को कमजोर करके और इसके टूटने का कारण बन सकता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "179.0 BP renal damage",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Hypertension can damage the blood vessels and filters in the kidneys, so that the kidneys cannot excrete waste properly. Kidney disease can also cause high blood pressure, when electrolytes (including sodium) cannot be adequately secreted from the body",
                [LANG_HINDI]: "उच्च रक्तचाप गुर्दे में रक्त वाहिकाओं और फिल्टर को नुकसान पहुंचा सकता है, जिससे कि गुर्दे ठीक से अपशिष्ट का उत्सर्जन नहीं कर सकते हैं। गुर्दे की बीमारी भी उच्च रक्तचाप का कारण बन सकती है, जब शरीर से इलेक्ट्रोलाइट्स (सोडियम सहित) को पर्याप्त रूप से नहीं निकाल पाता"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "180.0 BP heart damage",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Heart failure (the heart is not strong enough to pump blood adequately), ischemic heart disease (the heart tissue doesn't get enough blood and oxygen), and hypertensive cardiomyopathy (thickened, abnormally functioning heart muscle) are all associated with high blood pressure.",
                [LANG_HINDI]: "हार्ट फैल्यर (हृदय पर्याप्त रूप से रक्त पंप करने के लिए पर्याप्त मजबूत नहीं है), इस्केमिक हृदय रोग (हृदय के ऊतकों/टिशू को पर्याप्त रक्त और ऑक्सीजन नहीं मिलता है), और उच्च रक्तचाप से ग्रस्त कार्डियोमायोपैथी (मोटी, असामान्य रूप से काम करने वाली हृदय की मांसपेशी) सभी उच्च रक्तचाप से जुड़े हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "181.0 BP atherosclerosis",
            [STATEMENT]: {
                [LANG_ENGLISH]: "A disease of the arteries caused by a buildup of plaque, or fatty material, on the inside walls of the blood vessels; hypertension contributes to this buildup by putting added stress and force on the artery walls.",
                [LANG_HINDI]: "रक्त वाहिकाओं की अंदरूनी दीवारों पर पट्टिका/प्लैक, या वसायुक्त पदार्थ (चर्बी) के निर्माण के कारण होने वाली धमनियों की बीमारी; धमनी की दीवारों पर अतिरिक्त तनाव और बल लगाकर उच्च रक्तचाप इस निर्माण में योगदान देता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        {
            [ID]: "182.0 Normal BP",
            [STATEMENT]: {
                [LANG_ENGLISH]: "The Joint National Committee on Prevention, Detection, Evaluation, and Treatment of High Blood Pressure has classified blood pressure measurements into several categories:\n" +
                "\n" +
                "        Normal blood pressure is systolic pressure less than 120 and diastolic pressure less than 80.\n" +
                "\n" +
                "        Elevated is systolic pressure of 120-129 and diastolic pressure less than 80.\n" +
                "        \n" +
                "        Stage 1 hypertension is systolic pressure of 130-139 or diastolic pressure of 80-89.\n" +
                "        \n" +
                "        Stage 2 hypertension is systolic pressure of 140 or greater or diastolic pressure of 90 or greater.",
                [LANG_HINDI]: "उच्च रक्तचाप की रोकथाम, पता लगाने, मूल्यांकन और उपचार पर संयुक्त राष्ट्रीय समिति ने रक्तचाप माप को कई श्रेणियों में वर्गीकृत किया है:\n" +
                "\n" +
                "        सामान्य रक्तचाप 120 से कम सिस्टोलिक दबाव और 80 से कम डायस्टोलिक दबाव है।\n" +
                "\n" +
                "        ऊंचा सिस्टोलिक दबाव 120-129 और डायस्टोलिक दबाव 80 से कम है।\n" +
                "        \n" +
                "        स्टेज 1 उच्च रक्तचाप 130-139 का सिस्टोलिक दबाव या 80-89 का डायस्टोलिक दबाव है।\n" +
                "        \n" +
                "        स्टेज 2 उच्च रक्तचाप 140 या उससे अधिक का सिस्टोलिक दबाव या 90 या उससे अधिक का डायस्टोलिक दबाव है।",
                [DESCRIPTION_IMAGE]: "normalBP.png"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        // Cholestrol
        {
            [ID]: "183.0 Cholesterol",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What is cholesterol?",
                        [LANG_HINDI]: "कोलेस्ट्रॉल क्या है?"
                    },
                    [NEXT_QUESTION]: "184.0 What's Cholesterol",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Problem with cholesterol",
                        [LANG_HINDI]: "कोलेस्ट्रॉल की समस्या"
                    },
                    [NEXT_QUESTION]: "185.0 Cholesterol problem",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What are HDL, LDL, and VLDL?",
                        [LANG_HINDI]: "एचडीएल (HDL), एलडीएल(LDL) और\n" +
                        "वीएलडीएल(VLDL) क्या हैं?"
                    },
                    [NEXT_QUESTION]: "186.0 Cholesterol HD, LD, L",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What causes high cholesterol?",
                        [LANG_HINDI]: "कोलेस्ट्रॉल बढ़ने का क्या कारण है?"
                    },
                    [NEXT_QUESTION]: "187.0 Cholesterol cause",
                    [VALUE]: 3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "How can I lower my cholesterol?",
                        [LANG_HINDI]: "मैं अपना कोलेस्ट्रॉल कैसे कम कर सकता हूं?"
                    },
                    [NEXT_QUESTION]: "188.0 Cholesterol cure",
                    [VALUE]: 4
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Triglycerides",
                        [LANG_HINDI]: "ट्राइग्लिसराइड्"
                    },
                    [NEXT_QUESTION]: "183.1 Triglycerides",
                    [VALUE]: 5
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Choose your preference",
                [LANG_HINDI]: "अपनी पसंद चुनें"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "184.0 What's Cholesterol",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Cholesterol is a waxy, fat-like substance that's found in all the cells in your body. Your body needs some cholesterol to make hormones, vitamin D, and substances that help you digest foods. Your body makes all the cholesterol it needs. Cholesterol is also found in foods from animal sources, such as egg yolks, meat, and cheese.",
                [LANG_HINDI]: "कोलेस्ट्रॉल एक मोम जैसा, वसा जैसा पदार्थ है जो आपके शरीर की सभी कोशिकाओं में पाया जाता है। आपके शरीर को हार्मोन, विटामिन डी और पदार्थ बनाने के लिए कुछ कोलेस्ट्रॉल की आवश्यकता होती है जो खाद्य पदार्थों को पचाने में आपकी मदद करते हैं। आपका शरीर वह सभी कोलेस्ट्रॉल बनाता है जिसकी उसे आवश्यकता होती है। अंडे की जर्दी, मांस और पनीर जैसे पशु स्रोतों से खाद्य पदार्थों में भी कोलेस्ट्रॉल पाया जाता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "185.0 Cholesterol problem",
            [STATEMENT]: {
                [LANG_ENGLISH]: "If you have too much cholesterol in your blood, it can combine with other substances in the blood to form plaque. Plaque sticks to the walls of your arteries. This buildup of plaque is known as atherosclerosis. It can lead to coronary artery disease, where your coronary arteries become narrow or even blocked.\n" +
                "\n" +
                "If you have large deposits of plaque in your arteries, an area of plaque can rupture (break open). This can cause a blood clot to form on the surface of the plaque. If the clot becomes large enough, it can mostly or completely block blood flow in a coronary artery.\n" +
                "If the flow of oxygen-rich blood to your heart muscle is reduced or blocked, it can cause angina (chest pain) or a heart attack.\n" +
                "Plaque also can build up in other arteries in your body, including the arteries that bring oxygen-rich blood to your brain and limbs. This can lead to problems such as carotid artery disease, stroke, and peripheral arterial disease.",
                [LANG_HINDI]: "यदि आपके रक्त में बहुत अधिक कोलेस्ट्रॉल है, तो यह रक्त में अन्य पदार्थों के साथ मिलकर प्लाक बना सकता है। प्लाक आपकी धमनियों की दीवारों से चिपक जाता है। पट्टिका के इस निर्माण को एथेरोस्क्लेरोसिस के रूप में जाना जाता है। यह कोरोनरी धमनी की बीमारी का कारण बन सकता है, जहां आपकी कोरोनरी धमनियां संकीर्ण या अवरुद्ध हो जाती हैं।\n" +
                "\n" +
                "यदि आपकी धमनियों में बड़ी मात्रा में प्लाक जमा है, तो पट्टिका/प्लैक का एक क्षेत्र टूट सकता है (खुला हो सकता है)। इससे प्लाक की सतह पर रक्त का थक्का बन सकता है। यदि थक्का काफी बड़ा हो जाता है, तो यह कोरोनरी धमनी में रक्त के प्रवाह को अधिकतर या पूरी तरह से अवरुद्ध कर सकता है।\n" +
                "\n" +
                "यदि आपके हृदय की मांसपेशियों में ऑक्सीजन युक्त रक्त का प्रवाह कम या अवरुद्ध हो जाता है, तो इससे एनजाइना (सीने में दर्द) या दिल का दौरा पड़ सकता है।\n" +
                "\n" +
                "प्लाक आपके शरीर में अन्य धमनियों में भी बन सकता है, जिसमें धमनियां भी शामिल हैं जो आपके मस्तिष्क और अंगों में ऑक्सीजन युक्त रक्त लाती हैं। इससे कैरोटिड धमनी रोग, स्ट्रोक और परिधीय धमनी रोग जैसी समस्याएं हो सकती हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "186.0 Cholesterol HD, LD, L",
            [STATEMENT]: {
                [LANG_ENGLISH]: "HDL, LDL, and VLDL are lipoproteins. They are a combination of fat (lipid) and protein. The lipids need to be attached to the proteins so they can move through the blood. Different types of lipoproteins have different purposes:\n" +
                "HDL stands for high-density lipoprotein. It is sometimes called \"good\" cholesterol because it carries cholesterol from other parts of your body back to your liver. Your liver then removes the cholesterol from your body.LDL stands for low-density lipoprotein. It is sometimes called \"bad\" cholesterol because a high LDL level leads to the buildup of plaque in your arteries.VLDL stands for very low-density lipoprotein. Some people also call VLDL a \"bad\" cholesterol because it too contributes to the buildup of plaque in your arteries. But VLDL and LDL are different; VLDL mainly carries triglycerides and LDL mainly carries cholesterol.",
                [LANG_HINDI]: "एचडीएल, एलडीएल और वीएलडीएल लिपोप्रोटीन हैं। वे वसा (लिपिड) और प्रोटीन का एक संयोजन हैं। लिपिड को प्रोटीन से जोड़ा जाना चाहिए ताकि वे रक्त के माध्यम से आगे बढ़ सकें। विभिन्न प्रकार के लिपोप्रोटीन के अलग-अलग उद्देश्य होते हैं:\n" +
                "HDL,उच्च घनत्व वाले लिपोप्रोटीन के लिए खड़ा है। इसे कभी-कभी \"अच्छा\" कोलेस्ट्रॉल कहा जाता है क्योंकि यह आपके शरीर के अन्य हिस्सों से कोलेस्ट्रॉल को आपके यकृत में वापस ले जाता है। आपका लीवर तब आपके शरीर से कोलेस्ट्रॉल को हटा देता है। एलडीएल का मतलब कम घनत्व वाले लिपोप्रोटीन है। इसे कभी-कभी \"खराब\" कोलेस्ट्रॉल कहा जाता है क्योंकि एक उच्च एलडीएल स्तर आपकी धमनियों में प्लाक के निर्माण की ओर जाता है। वीएलडीएल बहुत कम घनत्व वाले लिपोप्रोटीन के लिए खड़ा है। कुछ लोग वीएलडीएल को \"खराब\" कोलेस्ट्रॉल भी कहते हैं क्योंकि यह भी आपकी धमनियों में प्लाक के निर्माण में योगदान देता है। लेकिन वीएलडीएल और एलडीएल अलग हैं; वीएलडीएल मुख्य रूप से ट्राइग्लिसराइड्स वहन करता है और एलडीएल मुख्य रूप से कोलेस्ट्रॉल वहन करता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "187.0 Cholesterol cause",
            [STATEMENT]: {
                [LANG_ENGLISH]: "The most common cause of high cholesterol is an unhealthy lifestyle. This can include:\n" +
                "Unhealthy eating habits, such as eating lots of bad fats. One type, saturated fat, is found in some meats, dairy products, chocolate, baked goods, and deep-fried and processed foods. Another type, trans fat, is in some fried and processed foods. Eating these fats can raise your LDL (bad) cholesterol.Lack of physical activity, with lots of sitting and little exercise. This lowers your HDL (good) cholesterol.Smoking, which lowers HDL cholesterol, especially in women. It also raises your LDL cholesterol.\n" +
                "Genetics may also cause people to have high cholesterol. For example, familial hypercholesterolemia (FH) is an inherited form of high cholesterol. Other medical conditions and certain medicines may also cause high cholesterol.",
                [LANG_HINDI]: "उच्च कोलेस्ट्रॉल का सबसे आम कारण एक अस्वास्थ्यकर जीवनशैली है। इसमें शामिल हो सकते हैं:\n" +
                "अस्वास्थ्यकर खाने की आदतें, जैसे बहुत अधिक खराब वसा खाना। एक प्रकार, संतृप्त वसा, कुछ मीट, डेयरी उत्पाद, चॉकलेट, पके हुए माल और गहरे तले और प्रसंस्कृत खाद्य पदार्थों में पाया जाता है। एक अन्य प्रकार, ट्रांस वसा, कुछ तले हुए और प्रसंस्कृत खाद्य पदार्थों में होता है। इन वसाओं को खाने से आपका एलडीएल (खराब) कोलेस्ट्रॉल बढ़ सकता है। शारीरिक गतिविधि की कमी, बहुत अधिक बैठने और थोड़ा व्यायाम करने से। यह आपके एचडीएल (अच्छे) कोलेस्ट्रॉल को कम करता है। धूम्रपान, जो एचडीएल कोलेस्ट्रॉल को कम करता है, खासकर महिलाओं में। यह आपके एलडीएल कोलेस्ट्रॉल को भी बढ़ाता है।\n" +
                "आनुवंशिकी भी लोगों को उच्च कोलेस्ट्रॉल का कारण बन सकती है। उदाहरण के लिए, पारिवारिक हाइपरकोलेस्ट्रोलेमिया (एफएच) उच्च कोलेस्ट्रॉल का विरासत में मिला रूप है। अन्य चिकित्सीय स्थितियां और कुछ दवाएं भी उच्च कोलेस्ट्रॉल का कारण बन सकती हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "188.0 Cholesterol cure",
            [STATEMENT]: {
                [LANG_ENGLISH]: "You can lower your cholesterol through heart-healthy lifestyle changes. They include a heart-healthy eating plan, weight management, and regular physical activity.\n" +
                "If the lifestyle changes alone do not lower your cholesterol enough, you may also need to take medicines. There are several types of cholesterol-lowering drugs available, including statins. If you take medicines to lower your cholesterol, you still should continue with the lifestyle changes.\n" +
                "Some people with familial hypercholesterolemia (FH) may receive a treatment called lipoprotein apheresis. This treatment uses a filtering machine to remove LDL cholesterol from the blood. Then the machine returns the rest of the blood back to the person.",
                [LANG_HINDI]: "आप हृदय-स्वस्थ जीवनशैली में बदलाव के माध्यम से अपने कोलेस्ट्रॉल को कम कर सकते हैं। इनमें हृदय-स्वस्थ भोजन योजना, वजन प्रबंधन और नियमित शारीरिक गतिविधि शामिल हैं।\n" +
                "\n" +
                "यदि केवल जीवनशैली में बदलाव से आपका कोलेस्ट्रॉल पर्याप्त रूप से कम नहीं होता है, तो आपको दवाएँ लेने की भी आवश्यकता हो सकती है। स्टैटिन सहित कई प्रकार की कोलेस्ट्रॉल कम करने वाली दवाएं उपलब्ध हैं। यदि आप अपने कोलेस्ट्रॉल को कम करने के लिए दवाएं लेते हैं, तो भी आपको जीवनशैली में बदलाव जारी रखना चाहिए।\n" +
                "\n" +
                "पारिवारिक हाइपरकोलेस्ट्रोलेमिया (एफएच) वाले कुछ लोग लिपोप्रोटीन एफेरेसिस नामक उपचार प्राप्त कर सकते हैं। यह उपचार रक्त से एलडीएल कोलेस्ट्रॉल को हटाने के लिए एक फ़िल्टरिंग मशीन का उपयोग करता है। फिर मशीन शेष रक्त व्यक्ति को वापस लौटा देती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "183.1 Triglycerides",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Just like cholesterol, triglycerides are a type of fats.\n" +
                    "Triglycerides are an energy reserve while cholesterol are used as building material for cells.\n" +
                    "Fatty foods and milk products are high in triglycerides.\n" +
                    "Excess triglycerides are managed in a way similar to cholesterol.",
                [LANG_HINDI]: "कोलेस्ट्रॉल की तरह ही, ट्राइग्लिसराइड्स भी एक प्रकार का वसा होता है।\n" +
                    "ट्राइग्लिसराइड्स एक ऊर्जा आरक्षित हैं जबकि कोलेस्ट्रॉल का उपयोग कोशिकाओं के निर्माण सामग्री के रूप में किया जाता है।\n" +
                    "वसायुक्त खाद्य पदार्थ और दुग्ध उत्पाद ट्राइग्लिसराइड्स में उच्च होते हैं।\n" +
                    "अतिरिक्त ट्राइग्लिसराइड्स को कोलेस्ट्रॉल के समान तरीके से प्रबंधित किया जाता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        // Diet
        {
            [ID]: "189.0 Cardiac Diet",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Healthy food that tastes good",
                        [LANG_HINDI]: "स्वस्थ भोजन जिसका स्वाद अच्छा हो"
                    },
                    [NEXT_QUESTION]: "190.0 Health and taste",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Food for hypertension",
                        [LANG_HINDI]: "बीपी / उच्च रक्तचाप के लिए भोजन"
                    },
                    [NEXT_QUESTION]: "191.0 BP diet",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Food after heart attack",
                        [LANG_HINDI]: "दिल के दौरे के बाद के लिए खाना"
                    },
                    [NEXT_QUESTION]: "192.0 heart attack diet",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Food for weight loss",
                        [LANG_HINDI]: "वजन घटाने के लिए भोजन"
                    },
                    [NEXT_QUESTION]: "193.0 Weight loss diet",
                    [VALUE]: 3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Diet for stent / bypass",
                        [LANG_HINDI]: "स्टेंट / बाईपास के लिए आहार"
                    },
                    [NEXT_QUESTION]: "194.0 Stent diet",
                    [VALUE]: 4
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Diet for heart failure",
                        [LANG_HINDI]: "हार्ट फैल्यर के लिए आहार"
                    },
                    [NEXT_QUESTION]: "195.0 HF diet",
                    [VALUE]: 5
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Choose your preference",
                [LANG_HINDI]: "अपनी पसंद चुनें"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "190.0 Health and taste",
            [STATEMENT]: {
                [LANG_ENGLISH]: "1. Instead of white salt, use rock salt because it is better.\n" +
                "2. Use cow milk instead of buffalo milk because it is healthier as it contains less fat and TGC.\n" +
                "3. Eat carbohydrates (honey, fruits and grain) instead of sugar (candy, chocolate, tea, glucose) because they are more tasty. Use artificial sweeteners also because they are sweeter. Sugar makes you drowsy after a while and also leads to many other problems like diabetes, weight gain, high BP.\n" +
                "4. Use barley, corn, rye, oats, etc. instead of  wheat and rice because they contain more flavour and are better for health.\n" +
                "5. Instead of buying fast food, make tasty food at home because it is more exciting. Food meant to sell is always contains excess sugar, salt, spices, and oil.\n" +
                "6. Don't eat too much of spicy food",
                [LANG_HINDI]: "1. सफेद नमक की जगह सेंधा नमक का इस्तेमाल करें क्योंकि यह बेहतर होता है।\n" +
                "2. भैंस के दूध के बजाय गाय के दूध का प्रयोग करें क्योंकि यह स्वास्थ्यवर्धक होता है क्योंकि इसमें वसा और टीजीसी कम होता है।\n" +
                "3. चीनी (टॉफी, चॉकलेट, चाय, ग्लूकोज) के बजाय कार्बोहाइड्रेट (शहद, फल और अनाज) खाएं क्योंकि वे अधिक स्वादिष्ट होते हैं। कृत्रिम मिठास का भी प्रयोग करें क्योंकि वे मीठे होते हैं। चीनी आपको थोड़ी देर बाद मदहोश कर देती है और मधुमेह, वजन बढ़ना, हाई बीपी जैसी कई अन्य समस्याओं को भी जन्म देती है।\n" +
                "4. गेहूं और चावल की जगह जौ, मक्का, राई, जई आदि का प्रयोग करें क्योंकि इनमें स्वाद अधिक होता है और यह स्वास्थ्य के लिए बेहतर होते हैं।\n" +
                "5. फ़ास्ट फ़ूड ख़रीदने की बजाय घर पर ही स्वादिष्ट खाना बनाएँ क्योंकि यह ज़्यादा रोमांचक होता है। बेचने के लिए भोजन में हमेशा अतिरिक्त चीनी, नमक, मसाले और तेल होता है।\n" +
                "6. ज्यादा मसालेदार खाना न खाएं"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "191.0 BP diet",
            [STATEMENT]: {
                [LANG_ENGLISH]: "1. Eat healthy food that tastes good because it exists for you.\n" +
                "2. Reduce salt because it leads to excess water in your blood. Don't add it to your food separately. It is okay to have some salt in your flour if you have been doing so.\n" +
                "3. Avoid eating street / outside food as it contains excess salt, oil, spices and fat / oil.\n" +
                "4. Reduce milk and milk product consumption because it contains triglycerides and fats which cause atherosclerosis, which is a direct cause of hypertension.\n" +
                "5. Reduce sugar because it is a can increase blood pressure, weight and cholesterol.\n" +
                "6. Reduce red meat\n" +
                "\n" +
                "Eat everything else and maintain this habit throughout your life.",
                [LANG_HINDI]: "1. स्वस्थ भोजन खाएं जिसका स्वाद अच्छा हो क्योंकि यह आपके लिए मौजूद है।\n" +
                "2. नमक कम करें क्योंकि इससे आपके खून में पानी की अधिकता हो जाती है। इसे अपने खाने में अलग से शामिल न करें। अगर आप ऐसा कर रहे हैं तो आपके आटे में थोड़ा नमक होना ठीक है।\n" +
                "3. सड़क / बाहर का खाना खाने से बचें क्योंकि इसमें नमक, तेल, मसाले और वसा / तेल अधिक होता है।\n" +
                "4. दूध और दूध से बनी चीजों की खपत कम करें क्योंकि इसमें ट्राइग्लिसराइड्स  और फैट होते हैं जो एथेरोस्क्लेरोसिस का कारण बनते हैं, जो उच्च रक्तचाप का प्रत्यक्ष कारण है।\n" +
                "5. शुगर कम करें क्योंकि यह ब्लड प्रेशर, वजन और कोलेस्ट्रॉल को बढ़ा सकता है।\n" +
                "6. रेड मीट कम करें \n" +
                "\n" +
                "बाकी सब कुछ खाएं और इस आदत को जीवन भर बनाए रखें।",
                [DESCRIPTION_IMAGE]: "fruits_and_vegetables.png"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "192.0 heart attack diet",
            [STATEMENT]: {
                [LANG_ENGLISH]: "1. Eat healthy food that tastes good because it exists for you.\n" +
                "2. Reduce salt because it leads to excess water in your blood which cause stress for heart. Don't add it to your food separately. It is okay to have some salt in your flour if you have been doing so.\n" +
                "3. Avoid eating street / outside food as it contains excess salt, oil, spices and fat / oil.\n" +
                "4. Reduce milk and milk product consumption because it contains triglycerides and fat which cause atherosclerosis which causes heart attacks and strokes.\n" +
                "5. Reduce sugar because it is a can increase blood pressure, weight and cholesterol.\n" +
                "6. Reduce red meat \n" +
                "\n" +
                "Eat everything else and maintain this habit throughout your life.",
                [LANG_HINDI]: "1. स्वस्थ भोजन खाएं जिसका स्वाद अच्छा हो क्योंकि यह आपके लिए मौजूद है।\n" +
                "2. नमक कम करें क्योंकि इससे आपके रक्त में पानी की अधिकता हो जाती है जिससे हृदय पर दबाव पड़ता है। इसे अपने खाने में अलग से शामिल न करें। अगर आप ऐसा कर रहे हैं तो आपके आटे में थोड़ा नमक होना ठीक है।\n" +
                "3. सड़क / बाहर का खाना खाने से बचें क्योंकि इसमें नमक, तेल, मसाले और वसा / तेल अधिक होता है।\n" +
                "4. दूध और दूध से बनी चीजों की खपत कम करें क्योंकि इसमें ट्राइग्लिसराइड्स  और फैट होते हैं जो एथेरोस्क्लेरोसिस का कारण बनते हैं जो दिल के दौरे और स्ट्रोक का कारण बनते हैं।\n" +
                "5. चीनी कम करें क्योंकि यह रक्तचाप, वजन और कोलेस्ट्रॉल को बढ़ा सकता है।\n" +
                "6. रेड मीट कम करें\n" +
                "\n" +
                "बाकी सब कुछ खाएं और इस आदत को जीवन भर बनाए रखें।",
                [DESCRIPTION_IMAGE]: "fruits_and_vegetables.png"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "193.0 Weight loss diet",
            [STATEMENT]: {
                [LANG_ENGLISH]: "1. Eat healthy food that tastes good because it exists for you.\n" +
                "2. Reduce salt because it is a factor in weight gain. Don't add it to your food separately. It is okay to have some salt in your flour if you have been doing so.\n" +
                "3. Avoid eating street / outside food as it contains excess salt, oil, spices and fat / oil all of which lead to weight gain.\n" +
                "4. Reduce milk and milk products consumption because it contains triglycerides and fat which cause atherosclerosis, which lead to weight gain.\n" +
                "5. Reduce sugar because it gets stored as fat readily. Prefer carbohydrates.\n" +
                "6. Reduce red meat \n" +
                "7. Proteins in food suppress hunger so it is a good idea to replace sugars, carbs and fat with proteins. Protein rich food will also contain sugars and carbohydrates so be sure to limit the overall consumption of food.\n" +
                "\n" +
                "Eat everything else and maintain this habit throughout your life.",
                [LANG_HINDI]: "1. स्वस्थ भोजन खाएं जिसका स्वाद अच्छा हो क्योंकि यह आपके लिए मौजूद है।\n" +
                "2. नमक कम करें क्योंकि यह वजन बढ़ाने का कारक है। इसे अपने खाने में अलग से शामिल न करें। अगर आप ऐसा कर रहे हैं तो आपके आटे में थोड़ा नमक होना ठीक है।\n" +
                "3. बाहर का खाना खाने से बचें क्योंकि इसमें नमक, तेल, मसाले और वसा / तेल की अधिकता होती है, जिससे वजन बढ़ता है।\n" +
                "4. दूध और दूध से बनी चीजों का सेवन कम करें क्योंकि इसमें ट्राइग्लिसराइड्स और वसा होता है जो एथेरोस्क्लेरोसिस का कारण बनता है, जिससे वजन बढ़ता है।\n" +
                "5. चीनी कम करें क्योंकि यह आसानी से वसा के रूप में जमा हो जाती है। कार्बोहाइड्रेट को प्राथमिकता दें।\n" +
                "6. रेड मीट कम करें\n" +
                "7. भोजन में प्रोटीन भूख को दबाते हैं इसलिए शर्करा, कार्ब्स और वसा को प्रोटीन से बदलना एक अच्छा विचार है। प्रोटीन युक्त भोजन में शर्करा और कार्बोहाइड्रेट भी शामिल होंगे इसलिए भोजन की समग्र खपत को सीमित करना सुनिश्चित करें।\n" +
                "\n" +
                "बाकी सब कुछ खाएं और इस आदत को जीवन भर बनाए रखें।",
                [DESCRIPTION_IMAGE]: "fruits_and_vegetables.png"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "194.0 Stent diet",
            [STATEMENT]: {
                [LANG_ENGLISH]: "1. Eat healthy food that tastes good because it exists for you.\n" +
                "2. Reduce salt because it leads to excess water in your blood which cause stress for heart. Don't add it to your food separately. It is okay to have some salt in your flour if you have been doing so.\n" +
                "3. Avoid eating street / outside food as it contains excess salt, oil, spices and fat / oil.\n" +
                "4. Reduce milk and milk product consumption because it contains triglycerides and fat which cause atherosclerosis which causes heart attacks and strokes.\n" +
                "5. Reduce sugar because it is a can increase blood pressure, weight and cholesterol.\n" +
                "6. Reduce red meat \n" +
                "\n" +
                "Eat everything else and maintain this habit throughout your life.",
                [LANG_HINDI]: "1. स्वस्थ भोजन खाएं जिसका स्वाद अच्छा हो क्योंकि यह आपके लिए मौजूद है।\n" +
                "2. नमक कम करें क्योंकि इससे आपके रक्त में पानी की अधिकता हो जाती है जिससे हृदय पर दबाव पड़ता है। इसे अपने खाने में अलग से शामिल न करें। अगर आप ऐसा कर रहे हैं तो आपके आटे में थोड़ा नमक होना ठीक है।\n" +
                "3. सड़क / बाहर का खाना खाने से बचें क्योंकि इसमें नमक, तेल, मसाले और वसा / तेल अधिक होता है।\n" +
                "4. दूध और दूध से बनी चीजों की खपत कम करें क्योंकि इसमें ट्राइग्लिसराइड्स और फैट होते हैं जो एथेरोस्क्लेरोसिस का कारण बनते हैं जो दिल के दौरे और स्ट्रोक का कारण बनते हैं।\n" +
                "5. चीनी कम करें क्योंकि यह रक्तचाप, वजन और कोलेस्ट्रॉल को बढ़ा सकता है।\n" +
                "6. रेड मीट कम करें\n" +
                "\n" +
                "बाकी सब कुछ खाएं और इस आदत को जीवन भर बनाए रखें।",
                [DESCRIPTION_IMAGE]: "fruits_and_vegetables.png"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "195.0 HF diet",
            [STATEMENT]: {
                [LANG_ENGLISH]: "1. Make sure that your water intake is less than water output because you will see the results.  \n" +
                "2. Eat healthy food that tastes good because it exists for you.\n" +
                "3. Reduce salt because it leads to excess water in your blood which cause stress for heart. Don't add it to your food separately. It is okay to have some salt in your flour if you have been doing so.\n" +
                "4. Avoid eating street / outside food as it contains excess salt, oil, spices and fat / oil.\n" +
                "5. Reduce milk and milk product consumption because it contains triglycerides and fat which cause atherosclerosis which causes heart attacks and strokes.\n" +
                "6. Reduce sugar because it is a can increase blood pressure, weight and cholesterol.\n" +
                "7. Reduce red meat \n" +
                "\n" +
                "Eat everything else and maintain this habit throughout your life.",
                [LANG_HINDI]: "1. सुनिश्चित करें कि आपके पानी का सेवन पानी के उत्पादन से कम है क्योंकि आप परिणाम देखेंगे।\n" +
                "2. स्वस्थ भोजन खाएं जिसका स्वाद अच्छा हो क्योंकि यह आपके लिए मौजूद है।\n" +
                "3. नमक कम करें क्योंकि इससे आपके रक्त में पानी की अधिकता हो जाती है जिससे हृदय पर दबाव पड़ता है। इसे अपने खाने में अलग से शामिल न करें। अगर आप ऐसा कर रहे हैं तो आपके आटे में थोड़ा नमक होना ठीक है।\n" +
                "4. सड़क / बाहर का खाना खाने से बचें क्योंकि इसमें नमक, तेल, मसाले और वसा / तेल अधिक होता है।\n" +
                "5. दूध और दूध से बनी चीजों का सेवन कम करें क्योंकि इसमें ट्राइग्लिसराइड्स और वसा होता है जो एथेरोस्क्लेरोसिस का कारण बनता है जो दिल के दौरे और स्ट्रोक का कारण बनता है।\n" +
                "6. चीनी कम करें क्योंकि यह रक्तचाप, वजन और कोलेस्ट्रॉल बढ़ा सकता है।\n" +
                "7. रेड मीट कम करें\n" +
                "\n" +
                "बाकी सब कुछ खाएं और इस आदत को जीवन भर बनाए रखें।",
                [DESCRIPTION_IMAGE]: "fruits_and_vegetables.png"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        // HF
        {
            [ID]: "196.0 HF",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What is heart failure",
                        [LANG_HINDI]: "हार्ट फैल्यर क्या है"
                    },
                    [NEXT_QUESTION]: "197.0 What's HF",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart failure symptoms",
                        [LANG_HINDI]: "हार्ट फैल्यर के लक्षण"
                    },
                    [NEXT_QUESTION]: "198.0 HF symptoms",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart failure cure",
                        [LANG_HINDI]: "हार्ट फैल्यर का इलाज"
                    },
                    [NEXT_QUESTION]: "210.0 HF cure",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What causes heart failure",
                        [LANG_HINDI]: "हार्ट फैल्यर का क्या कारण है"
                    },
                    [NEXT_QUESTION]: "213.0 HF causes",
                    [VALUE]: 3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart failure lifestyle",
                        [LANG_HINDI]: "हार्ट फैल्यर जीवन शैली"
                    },
                    [NEXT_QUESTION]: "224.0 HF lifestyle",
                    [VALUE]: 4
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What's EF",
                        [LANG_HINDI]: "इजेक्शन फ्रैक्शन क्या है"
                    },
                    [NEXT_QUESTION]: "196.1 What's EF",
                    [VALUE]: 5
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "How is heart failure diagnosed",
                        [LANG_HINDI]: "हार्ट फैल्यर का पता कैसे लगाया जाए"
                    },
                    [NEXT_QUESTION]: "196.2 HF diagnosis",
                    [VALUE]: 6
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart failure precautions",
                        [LANG_HINDI]: "हार्ट फैल्यर की सावधानियाँ"
                    },
                    [NEXT_QUESTION]: "196.3 HF precautions",
                    [VALUE]: 7
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Record sheet",
                        [LANG_HINDI]: "रिकार्ड शीट"
                    },
                    [NEXT_QUESTION]: "196.4 HF record sheet",
                    [VALUE]: 8
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Choose your preference",
                [LANG_HINDI]: "अपनी पसंद चुनें"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "197.0 What's HF",
            [STATEMENT]: {
                // [LANG_ENGLISH]: "When you have this condition your heart works less efficiently. When that happens, it can't pump enough blood that you need.\n" +
                // "The chambers of your heart can respond by stretching to hold more blood to pump. This helps to keep the blood moving, but in time, your heart muscle walls may weaken and won't be able to pump as strongly.\n" +
                // "Your kidneys may react to all this by causing your body to hold on to fluid and salt. The fluid may build up in your arms, legs, ankles, feet, lungs or other organs.",
                // [LANG_HINDI]: "हार्ट फैल्यर में आपका दिल कम कुशलता से काम करता है। जब ऐसा होता है, तो यह पर्याप्त रक्त पंप नहीं कर पाता है जिसकी आपको आवश्यकता होती है।\n" +
                // "आपके हृदय के कक्ष अधिक रक्त पंप करने के लिए खींचकर प्रतिक्रिया कर सकते हैं। यह रक्त को गतिमान रखने में मदद करता है, लेकिन समय के साथ, आपके हृदय की मांसपेशियों की दीवारें कमजोर हो सकती हैं और उतनी मजबूती से पंप नहीं कर पाएंगी।\n" +
                // "आपके गुर्दे इस सब पर प्रतिक्रिया कर सकते हैं, जिससे आपका शरीर तरल पदार्थ और नमक को रोक कर रख सकता है। तरल पदार्थ आपके हाथ, पैर, टखनों, पैरों, फेफड़ों या अन्य अंगों में जमा हो सकता है।"
                [LANG_ENGLISH]: "Heart failure is a serious condition in which our heart is not able to pump enough blood to make other parts of the body work. This happens because our heart muscles become weak and they are unable to fill the heart with blood.",
                [LANG_HINDI]: "हार्ट फैल्यर एक गंभीर स्थिति है, जिसमें हमारा दिल रक्त को शरीर के दूसरे अंगों को काम करने के लिए पर्याप्त मातत्रा में  पम्प नहीं कर पाता है। ऐसा इसिलए होता क्योंकि हमारे हृदय की मासपेशियाँ कमजोर हो जाती हैं और वो दिल  में खुद रकत को भरने देने में असमर्थ होती हैं।"
            },
            [NEXT_QUESTION]: "196.0 HF",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "196.1 What's EF",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Ejection is an important parameter to determine how hard your heart is pumping blood. The normal value of the ejection fraction is 55-65%. \n" +
                "If the ejection fraction is less than 55%, it means that the patient is suffering from heart failure.",
                [LANG_HINDI]: "आपका दिल रक्त को कितनी अच्छी तरह से पम्प कर रहा है यह निर्धारित करने में इजेक्शन फ्रैक्शन एक महत्वपूर्ण मॅप है| इजेक्शन फ्रैक्शन  55-65% है, होना चाहिए \n" +
                "अगर इजेक्शन िीोमूगदल 55% से कम है, तो इसका मतलब है कि व्यक्ति हार्ट फैल्यर से पीड़ित है।"
            },
            [NEXT_QUESTION]: "196.0 HF",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "196.2 HF diagnosis",
            [STATEMENT]: {
                [LANG_ENGLISH]: "1. ECG" +
                "2. Echocardiography" +
                "3. Blood tests",
                [LANG_HINDI]: "1. ई सी जी " +
                "2. एकोकार्डियोग्राफी " +
                "3. खून की जाँचें"
            },
            [NEXT_QUESTION]: "95.0 Which cardiac test",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "196.3 HF precautions",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Take medicines as prescribed by your doctor.\n" +
                "Don't smoke.\n" +
                "Get regular exercise.\n" +
                "Take healthy diet and consume minimum quantity of salt, sugar and oil.\n" +
                "Take only 1.5 liters of fluid throughout the day.\n" +
                "Charting the daily input output.\n" +
                "Weigh yourself at the same time every morning and track it regularly.\n" +
                "Keep the joke.\n" +
                "Eat 5 to 6 small portions throughout the day.\n" +
                "Stay away from stress.\n" +
                " Wear a mask in a crowded places.\n" +
                "Get regular vaccinations for flu and influenza vaccines.",
                [LANG_HINDI]: "1. अपने चिकित्सक के आदेश के अनुसार दवाइयोंका सेवन करें।\n" +
                " धूम्रपान ना करें।\n" +
                " नियिमत व्यायाम करें।\n" +
                " स्वस्थ आहार लें एवं नमक, चीनी व तेल का कम से कम मात्रा में सेवन करें।\n" +
                " पूरे दिन में केवल 1.5 लीटर तरल पदाथŊ लें।\n" +
                " रोज़ पानी के इनपुट-आउटपुट की छारतींग करें।\n" +
                " प्रत्येक सुबह एक ही समय पर अपना वजन करें व नियिमत रूप से उसका लेखा जोखा रखेँ।\n" +
                " पूरे दिन में 5 से 6 छोटे छोटे भागों में भोजन करें।\n" +
                " तनाव से दूर रहें।\n" +
                " भीड़भाड़ वाली जगह पर मास्क लगाएं ।\n" +
                " न्यूमोकोकल और इंफ्लुएंजा टीके का नियमित रूप से टीकाकरण करवाएं।",
                [DESCRIPTION_IMAGE]: "fruits_and_vegetables.png"
            },
            [NEXT_QUESTION]: "196.0 HF",
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "196.3 HF precautions",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Please fill this record sheet before every test",
                [LANG_HINDI]: "कृपया हर जाँच तिथि पर इस फोरम को भरें",
                [DESCRIPTION_IMAGE]: "HF_record_sheet.png"
            },
            [NEXT_QUESTION]: "196.0 HF",
            [TYPE]: TYPE_NONE
        },
        // symptoms
        {
            [ID]: "198.0 HF symptoms",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Congested lungs",
                        [LANG_HINDI]: "भरे हुए फेफड़े",
                    },
                    [NEXT_QUESTION]: "199.0 HF lungs",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Fluid and water build up",
                        [LANG_HINDI]: "आधिक पानी",
                    },
                    [NEXT_QUESTION]: "200.0 HF fluid",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Dizziness, fatigue, and weakness",
                        [LANG_HINDI]: "चक्कर आना, थकान, और कमजोरी",
                    },
                    [NEXT_QUESTION]: "201.0 HF dizzy",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Rapid or irregular heartbeats",
                        [LANG_HINDI]: "तेज़ या अनियमित दिल की धड़कन",
                    },
                    [NEXT_QUESTION]: "202.0 HF arrhythmia",
                    [VALUE]: 3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Trouble breathing or shortness of breath",
                        [LANG_HINDI]: "सांस लेने में तकलीफ या सांस लेने में कठिनाई",
                    },
                    [NEXT_QUESTION]: "203.0 HF breathlessness",
                    [VALUE]: 4
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Fatigue",
                        [LANG_HINDI]: "थकान",
                    },
                    [NEXT_QUESTION]: "204.0 HF fatigue",
                    [VALUE]: 5
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Persistent cough",
                        [LANG_HINDI]: "ठीक न होने वाली खासी",
                    },
                    [NEXT_QUESTION]: "205.0 HF cough",
                    [VALUE]: 6
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Weight gain or swelling",
                        [LANG_HINDI]: "वजन बढ़ना या सूजन",
                    },
                    [NEXT_QUESTION]: "206.0 HF swelling",
                    [VALUE]: 7
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Lack of appetite or nausea",
                        [LANG_HINDI]: "भूख न लगना या जी मिचलाना",
                    },
                    [NEXT_QUESTION]: "207.0 HF appetite",
                    [VALUE]: 8
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Increased heart rate",
                        [LANG_HINDI]: "बढ़ी हृदय की दर",
                    },
                    [NEXT_QUESTION]: "208.0 HF tachycardia",
                    [VALUE]: 9
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Confusion, trouble thinking",
                        [LANG_HINDI]: "भ्रम, सोचने में परेशानी",
                    },
                    [NEXT_QUESTION]: "209.0 HF confusion",
                    [VALUE]: 10
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Heart failure symptoms may be mild, moderate, or severe, and can include things like:\n" +
                "1. Congested lungs.\n" +
                "2. Fluid and water build up\n" +
                "3. Dizziness, fatigue, and weakness\n" +
                "4. Rapid or irregular heartbeats\n" +
                "\n" +
                "If you have heart failure, you may have one or all of these symptoms, or you may have none of them.\n" +
                "Your symptoms may not be related to how weak your heart is.\n" +
                "\n" +
                "1. Trouble breathing or shortness of breath\n" +
                "2. Fatigue\n" +
                "3. Persistent cough\n" +
                "4. Weight gain\n" +
                "5. Lack of appetite or nausea\n" +
                "6. Increased or irregular heart rate\n" +
                "7. Confusion, trouble thinking\n" +
                "8. Swelling in legs or abdomen\n" +
                "If you’ve seen any of these seven red flags, get medical help right away. Waiting for symptoms to get worse can be dangerous. With the right care, you can keep things under control.",
                [LANG_HINDI]: "हार्ट फैल्यर के लक्षण हल्के, मध्यम या गंभीर हो सकते हैं, और इसमें निम्न चीज़ें शामिल हो सकती हैं:\n" +
                "1. भरे हुए फेफड़े।\n" +
                "2. द्रव और पानी का निर्माण\n" +
                "3. चक्कर आना, थकान और कमजोरी\n" +
                "4. तेज या अनियमित दिल की धड़कन\n" +
                "\n" +
                "यदि आपको हार्ट फैल्यर है, तो आपको इनमें से एक या सभी लक्षण हो सकते हैं, या आपको इनमें से कोई भी नहीं हो सकता है।\n" +
                "हो सकता है कि आपके लक्षण इस बात से संबंधित न हों कि आपका दिल कितना कमजोर है।\n" +
                "\n" +
                "1. सांस लेने में तकलीफ या सांस लेने में तकलीफ\n" +
                "2. थकान\n" +
                "3. लगातार खांसी\n" +
                "4. वजन बढ़ना\n" +
                "5. भूख न लगना या जी मिचलाना\n" +
                "6. बढ़ी हुई या अनियमित हृदय गति\n" +
                "7. भ्रम, सोचने में परेशानी\n" +
                "8. टांगों या पेट में सूजन\n" +
                "यदि आपने इन सात लाल झंडों में से कोई भी देखा है, तो तुरंत चिकित्सा सहायता प्राप्त करें। लक्षणों के खराब होने की प्रतीक्षा करना खतरनाक हो सकता है। सही देखभाल से आप चीजों को नियंत्रण में रख सकते हैं।"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "199.0 HF lungs",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Fluid backup in your lungs can make you short of breath when you exercise or have trouble breathing while you rest. Air is often harder to get when you're lying flat in bed. You may also wheeze or get a dry, hacking cough.",
                [LANG_HINDI]: "जब आप व्यायाम करते हैं या आराम करते समय सांस लेने में परेशानी होती है, तो आपके फेफड़ों में अतिरिक्त तरल पदार्थ का बनना आपको सांस लेने में तकलीफ दे सकता है। जब आप बिस्तर पर सपाट लेटे होते हैं तो अक्सर हवा मिलना कठिन होता है। आपको घरघराहट भी हो सकती है या सूखी खांसी हो सकती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "200.0 HF fluid",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Less blood to your kidneys causes you to hang on to fluid. That means your ankles, legs, and belly may swell. You may hear your doctor call that swelling edema.\n" +
                "The extra fluid can also make you gain weight, and you may need to pee more during the night. It may also cause bloating, which can make you nauseated and less hungry.",
                [LANG_HINDI]: "आपके गुर्दे को कम रक्त आपको तरल पदार्थ पर लटकने का कारण बनता है। इसका मतलब है कि आपकी टखनों, पैरों और पेट में सूजन हो सकती है। आप अपने डॉक्टर को यह कहते हुए सुन सकते हैं कि सूजन शोफ है।\n" +
                "अतिरिक्त तरल पदार्थ से आपका वजन भी बढ़ सकता है, और आपको रात में अधिक पेशाब करने की आवश्यकता हो सकती है। यह सूजन का कारण भी बन सकता है, जिससे आपको मिचली आ सकती है और भूख कम लग सकती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "201.0 HF dizzy",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Less blood to your major organs and muscles makes you feel tired and weak. Less blood to the brain can bring dizziness or confusion.",
                [LANG_HINDI]: "आपके प्रमुख अंगों और मांसपेशियों में कम रक्त आपको थका हुआ और कमजोर महसूस कराता है। मस्तिष्क में कम रक्त चक्कर आना या भ्रम पैदा कर सकता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "202.0 HF arrhythmia",
            [STATEMENT]: {
                [LANG_ENGLISH]: "This happens because your heart beats faster to pump enough blood.",
                [LANG_HINDI]: "ऐसा इसलिए होता है क्योंकि आपका दिल पर्याप्त रक्त पंप करने के लिए तेजी से धड़कता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "203.0 HF breathlessness",
            [STATEMENT]: {
                [LANG_ENGLISH]: "When your heart can’t properly fill and empty, blood backs up in your veins. This causes fluid to leak into your lungs. Your doctor may call it pulmonary edema. This can make it hard to breathe during activities, rest, or even sleep. A sudden lack of breath might wake you up. You may need to prop yourself up with extra pillows to breathe easier. This constant search for air can leave you tired and anxious.",
                [LANG_HINDI]: "जब आपका दिल ठीक से नहीं भर खाली हो जाता है, तो रक्त आपकी नसों में वापस आ जाता है। इससे आपके फेफड़ों में तरल पदार्थ रिसने लगता है। आपका डॉक्टर इसे पल्मोनरी एडिमा कह सकता है। इससे गतिविधियों, आराम, या यहां तक ​​कि सोने के दौरान सांस लेना मुश्किल हो सकता है। सांस की अचानक कमी आपको जगा सकती है। आपको आसानी से सांस लेने के लिए अतिरिक्त तकियों के साथ खुद को ऊपर उठाने की आवश्यकता हो सकती है। हवा की यह निरंतर खोज आपको थका और चिंतित कर सकती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "204.0 HF fatigue",
            [STATEMENT]: {
                [LANG_ENGLISH]: "When your heart doesn’t pump right, the body starts to move blood from less vital parts like your arms and legs to the centers for survival -- the heart and brain. This can leave you feeling exhausted after everyday activities.",
                [LANG_HINDI]: "जब आपका दिल सही तरीके से पंप नहीं करता है, तो शरीर आपके हाथों और पैरों जैसे कम महत्वपूर्ण हिस्सों से रक्त को जीवित रहने के केंद्रों - हृदय और मस्तिष्क में ले जाना शुरू कर देता है। यह आपको रोजमर्रा की गतिविधियों के बाद थकावट महसूस कर सकता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "205.0 HF cough",
            [STATEMENT]: {
                [LANG_ENGLISH]: "An ongoing wheeze or cough that brings up white or slightly blood-colored mucus can signal fluid building up in your lungs. Call the doctor if you notice it.",
                [LANG_HINDI]: "एक चल रही घरघराहट या खांसी जो सफेद या थोड़े खून के रंग का बलगम लाती है, आपके फेफड़ों में तरल पदार्थ के निर्माण का संकेत दे सकती है। अगर आप इसे नोटिस करते हैं तो डॉक्टर को बुलाएं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "206.0 HF swelling",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Fluid can build up in your tissues just like it does in your lungs. As a result, your feet, ankles, legs, or belly may swell. Your shoes and socks may feel tight. You might notice a sudden weight gain.",
                [LANG_HINDI]: "द्रव आपके ऊतकों में ठीक वैसे ही बन सकता है जैसे आपके फेफड़ों में होता है। नतीजतन, आपके पैर, टखने, पैर या पेट सूज सकते हैं। आपके जूते और मोज़े तंग महसूस कर सकते हैं। आपको अचानक वजन बढ़ने की सूचना हो सकती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "207.0 HF appetite",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Because blood is being moved away from your digestive system, your appetite may not be as big as it usually is. You might also feel sick to your stomach.",
                [LANG_HINDI]: "चूंकि रक्त आपके पाचन तंत्र से दूर जा रहा है, इसलिए हो सकता है कि आपकी भूख उतनी न हो जितनी आमतौर पर होती है। आप अपने पेट के लिए भी बीमार महसूस कर सकते हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "208.0 HF tachycardia",
            [STATEMENT]: {
                [LANG_ENGLISH]: "When your heart struggles to pump the right amount of blood, it may speed up 💓 to make up for it. This can lead to palpitations, which could cause your heart to race or feel like it’s fluttering or throbbing.",
                [LANG_HINDI]: "जब आपका दिल सही मात्रा में रक्त पंप करने के लिए संघर्ष करता है, तो यह इसकी भरपाई के लिए तेजी से धडक 💓 सकता है। इससे धड़कन बढ़ सकती है, जिससे आपका दिल दौड़ सकता है या ऐसा महसूस हो सकता है कि यह फड़फड़ा रहा है या धड़क रहा है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "209.0 HF confusion",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Unusual amounts of things like sodium in your blood can bring disorientation, confusion 🤔, or memory loss.",
                [LANG_HINDI]: "आपके रक्त में सोडियम जैसी असामान्य मात्रा में भ्रम 🤔, दुश भ्रम 😵 या स्मृति हानि ला सकती हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        // cure
        {
            [ID]: "210.0 HF cure",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Medication",
                        [LANG_HINDI]: "दवाएं",
                    },
                    [NEXT_QUESTION]: "211.0 HF medication",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Surgery",
                        [LANG_HINDI]: "ऑपरेशन",
                    },
                    [NEXT_QUESTION]: "212.0 HF surgery",
                    [VALUE]: 1
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Heart failure is a lifelong condition. The most important way of dealing with it is to improve the lifestyle 🧘.\n" +
                "The lifestyle changes often need to be augmented with medication or surgeries.",
                [LANG_HINDI]: "हार्ट फैल्यर एक आजीवन स्थिति है। इससे निपटने का सबसे महत्वपूर्ण तरीका है जीवनशैली में सुधार लाना। 🧘\n" +
                "जीवनशैली में बदलाव को अक्सर दवा या सर्जरी के साथ बढ़ाने की आवश्यकता होती है।"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "211.0 HF medication",
            [STATEMENT]: {
                [LANG_ENGLISH]: "It's important to keep up with your medications and take them the way your doctor tells you to❗ Common types of drugs that treat heart failure are:\n" +
                "Aldosterone antagonist, ACE inhibitors, ARBs (angiotensin II receptor blockers), ARNIs (angiotensin receptor-neprilysin inhibitors), Beta-blockers, Blood vessel dilators, Calcium channel blockers (unless you have systolic heart failure), Digoxin, Diuretics, Heart pump medication , Potassium or magnesium, Selective sinus node inhibitors, Soluble Guanylate Cyclase (sGC) stimulator",
                [LANG_HINDI]: "अपनी दवाएं सही समय पर लेते रहना और उन्हें वैसे ही लेना जैसे डॉक्टर आपको बताता है महत्वपूर्ण है❗ हार्ट फैल्यर का इलाज करने वाली सामान्य प्रकार की दवाएं हैं:\n" +
                "एल्डोस्टेरोन प्रतिपक्षी, एसीई अवरोधक, एआरबी (एंजियोटेंसिन II रिसेप्टर ब्लॉकर्स), एआरएनआई (एंजियोटेंसिन रिसेप्टर-नेप्रिलिसिन अवरोधक), बीटा-ब्लॉकर्स, रक्त वाहिका dilators, कैल्शियम चैनल ब्लॉकर्स (जब तक कि आपको सिस्टोलिक हार्ट फैल्यर नहीं है), डिगॉक्सिन, मूत्रवर्धक, हृदय पंप दवा , पोटेशियम या मैग्नीशियम, चयनात्मक साइनस नोड अवरोधक, घुलनशील गनीलेट साइक्लेज (sGC) उत्तेजक"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "212.0 HF surgery",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Surgery and Medical Device Options\n" +
                "The goal of surgery is to make your heart work better.\n" +
                "Bypass surgery - Routes blood around a blocked artery. Learn more about heart bypass surgery.\n" +
                "Cardiac resynchronization therapy (CRT) - When your heartbeat is strange, it can make heart failure worse. This treatment uses a pacemaker that sends timed electrical impulses to both of your heart's lower chambers (the left and right ventricles) so they pump better and more in sync. Your doctor may call it a biventricular pacemaker.\n" +
                "Heart transplant - This is done when heart failure is so severe that it doesn't respond to any other treatments.\n" +
                "Heart valve surgery - If a faulty heart valve causes your heart failure, your doctor may recommend repairing or replacing it. A surgeon can repair or replace the valves.\n" +
                "Implantable cardioverter-defibrillator (ICD). This device is similar to a pacemaker. It's put under your skin in your chest. Wires lead through your veins and into your heart to keep track of your heart rhythm. If your heart starts to beat at a dangerous rhythm, or if it stops, the ICD tries to pace your heart or shock it back into normal rhythm. An ICD can also act as a pacemaker and speed your heart up if it's going too slow.\n" +
                "Infarct exclusion surgery (modified Dor or Dor procedure). When a heart attack happens in the left ventricle (the lower left chamber of your heart), a scar forms. The scarred area is thin and can bulge out with each beat, forming what's called an aneurysm. A heart surgeon can remove it.\n" +
                "Ventricular assist device. The doctor puts it into the abdomen or chest and attaches it to your heart to help it pump blood to the rest of your body. VADs are most often used in the heart's left ventricle, but they can also be used in the right ventricle or in both ventricles.",
                [LANG_HINDI]: "सर्जरी और मेडिकल उपकरण का विकल्प\n" +
                "सर्जरी का लक्ष्य आपके दिल को बेहतर तरीके से काम कराना है।\n" +
                "बाईपास सर्जरी - एक अवरुद्ध धमनी के बाहर से रक्त के लिए रास्ता बनती है। हार्ट बाईपास सर्जरी के बारे में और जानें।\n" +
                "कार्डिएक रीसिंक्रनाइज़ेशन थेरेपी (CRT) - जब आपके दिल की धड़कन गड़बड़ होती है, तो यह हार्ट फेल्यर को और भी खराब कर सकता है। इस में एक पेसमेकर का उपयोग होता है जो आपके दिल के दोनों निचले कक्षों (बाएं और दाएं वेंट्रिकल) को समयबद्ध सिग्नल भेजता है ताकि वे सही तालमेल में पंप कर सकें।\n" +
                "हृदय ट्रांसप्लांट - यह तब किया जाता है जब हार्ट फैल्यर इतनी गंभीर होती है कि यह किसी अन्य उपचार का जवाब नहीं देती है।\n" +
                "हार्ट वाल्व सर्जरी - यदि एक दोषपूर्ण हृदय वाल्व आपके हार्ट फैल्यर का कारण बनता है, तो आपका डॉक्टर इसे सुधारने या बदलने की सिफारिश कर सकता है। एक सर्जन वाल्व की मरम्मत या बदल सकता है।\n" +
                "इम्प्लांटेबल कार्डियोवर्टर-डिफाइब्रिलेटर (ICD) - यह उपकरण पेसमेकर के समान है। यह आपकी त्वचा के नीचे आपकी छाती में रखा जाता है। आपके दिल की लय पर नज़र रखने के लिए तार आपकी नसों और आपके दिल में जाते हैं। यदि आपका दिल खतरनाक लय में धड़कना शुरू कर देता है, या यदि यह रुक जाता है, तो आईसीडी आपके दिल को गति देने की कोशिश करता है या इसे वापस सामान्य लय में ल देता है। एक आईसीडी एक पेसमेकर के रूप में भी काम कर सकता है और अगर दिल बहुत धीमी गति से चल रहा है तो आपके दिल को तेज कर सकता है।\n" +
                "रोधगलन अपवर्जन सर्जरी - जब बाएं वेंट्रिकल (आपके दिल के निचले बाएं कक्ष) में दिल का दौरा पड़ता है, तो एक हिस्सा मर जाता है। जख्म वाला क्षेत्र पतला होता है और प्रत्येक धड़कन के साथ बाहर निकल सकता है, जिसे एन्यूरिज्म कहा जाता है। एक हृदय सर्जन इसे हटा सकता है।\n" +
                "वेंट्रिकुलर असिस्ट डिवाइस - डॉक्टर इसे पेट या छाती में डालता है और इसे आपके दिल से जोड़ता है ताकि यह आपके शरीर के बाकी हिस्सों में रक्त पंप कर सके। वीएडी का उपयोग अक्सर हृदय के बाएं वेंट्रिकल में किया जाता है, लेकिन उनका उपयोग दाएं वेंट्रिकल या दोनों वेंट्रिकल में भी किया जा सकता है। हृदय गति रुकने के लिए लेफ्ट वेंट्रिकुलर असिस्ट डिवाइस (LVAD) के बारे में और पढ़ें।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        // causes
        {
            [ID]: "213.0 HF causes",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Coronary Artery Disease (CAD)",
                        [LANG_HINDI]: "दिल की  धमनी का रोग",
                    },
                    [NEXT_QUESTION]: "214.0 HF CAD",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart attack",
                        [LANG_HINDI]: "दिल का दौरा",
                    },
                    [NEXT_QUESTION]: "215.0 HF MI",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "High blood pressure",
                        [LANG_HINDI]: "उच्च रक्तचाप / बीपी",
                    },
                    [NEXT_QUESTION]: "216.0 HF BP",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Diabetes",
                        [LANG_HINDI]: "डैबिटीस / शुगर / मधुमेह",
                    },
                    [NEXT_QUESTION]: "217.0 HF diabetes",
                    [VALUE]: 3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Sleep apnea",
                        [LANG_HINDI]: "स्लीप एप्निया",
                    },
                    [NEXT_QUESTION]: "218.0 HF sleep apnea",
                    [VALUE]: 4
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Obesity",
                        [LANG_HINDI]: "मोटापा",
                    },
                    [NEXT_QUESTION]: "219.0 HF obesity",
                    [VALUE]: 5
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart muscle disease",
                        [LANG_HINDI]: "हृदय की मांसपेशी का रोग",
                    },
                    [NEXT_QUESTION]: "220.0 HF cardiomyopathy",
                    [VALUE]: 6
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Heart valves",
                        [LANG_HINDI]: "हृदय के वाल्व",
                    },
                    [NEXT_QUESTION]: "221.0 HF valves",
                    [VALUE]: 7
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Irregular heart beat",
                        [LANG_HINDI]: "दिल की अनियमित धड़कन",
                    },
                    [NEXT_QUESTION]: "222.0 HF arrhythmia",
                    [VALUE]: 8
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Intoxicants",
                        [LANG_HINDI]: "नशीले पदार्थ",
                    },
                    [NEXT_QUESTION]: "223.0 HF intoxicants",
                    [VALUE]: 9
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Heart failure can happen when your heart is too weak or too stiff to pump enough blood to the rest of your body. \n" +
                "Some health conditions can affect how well your heart works and lead to heart failure.\n" +
                "1. Congenital heart disease / heart valve disease\n" +
                "2. Excessive alcohol or drug abuse\n" +
                "3. Hot Attack\n" +
                "4. Severe case of anemia\n" +
                "5. Diabetes\n" +
                "6. High blood pressure\n" +
                "7. Cardiomyopathy, from the muscles of the heart\n" +
                "8. Arthritis is a disease that causes weakening of the heart.\n" +
                "9. Certain types of arrhythmias or irregular heart rhythms\n" +
                "10. Emphysema\n" +
                "11. Infectious Diseases\n" +
                "12. Certain cancer treatments such as chemotherapy\n" +
                "13. An overactive thyroid or underactive thyroid",
                [LANG_HINDI]: "हार्ट फैल्यर तब हो सकता है जब आपका दिल आपके शरीर के बाकी हिस्सों में पर्याप्त रक्त पंप करने के लिए बहुत कमजोर या बहुत कठोर हो। \n" +
                "कुछ स्वास्थ्य स्थितियां प्रभावित कर सकती हैं कि आपका दिल कितनी अच्छी तरह काम करता है और हार्ट फैल्यर का कारण बन सकता है।\n" +
                "1. जन्मजात हृदय रोग /हृदय वैल्व रोग\n" +
                "2. अिधक मात्रा में शराब या दवाओं का दुरुपयोग\n" +
                "3. हार्ट अटैक\n" +
                "4. एनीिमया (anemia) का गंभीर रूप\n" +
                "5. डायिबटीज\n" +
                "6. उच्च रक्तचाप (high blood pressure)\n" +
                "7. कार्डिओमायोपैथी   (cardiomyopathy), यह हृदय की मांसपेिशयों से संबंधित एक रोग है जो हृदय के कमजोर होने का कारण बनता है।\n" +
                "8. कुछ प्रकार के अतालता (arrhythmias) या अिनयिमत हृदय ताल\n" +
                "9. वातस्फीति (emphysema)\n" +
                "10. संक्रामक बीमारियाँ \n" +
                "11. कुछ कैंसर के उपचार जैसे कि कीमोथेरेपी\n" +
                "12. एक ओवरऐक्टिव या अंडरऐक्टिव थायराइड"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "214.0 HF CAD",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Coronary Artery Disease (CAD)\n" +
                "CAD happens when a fatty substance called plaque builds up in your arteries (the blood vessels that carry oxygen-rich blood from your heart to the rest of your body). Over time, plaque hardens and your arteries get narrow. An artery clogged with plaque is like a clogged drainpipe -- less blood can squeeze through. This is called atherosclerosis.\n" +
                "Your heart has to pump harder to push blood through those narrow arteries, and it doesn't get the blood it needs to work as well as it should. Over time, this can make your heart so weak that it leads to heart failure.",
                [LANG_HINDI]: "दिल की  धमनी का रोग (सीएडी)\n" +
                "सीएडी तब होता है जब प्लाक नामक एक वसायुक्त पदार्थ आपकी धमनियों (आपके हृदय से आपके शरीर के बाकी हिस्सों तक ऑक्सीजन युक्त रक्त ले जाने वाली रक्त वाहिकाओं) में बनता है। समय के साथ, पट्टिका (प्लैक) सख्त हो जाती है और आपकी धमनियां संकीर्ण हो जाती हैं। पट्टिका से भरी हुई धमनी एक बंद नाली की तरह होती है - कम रक्त के माध्यम से निचोड़ सकता है। इसे एथेरोस्क्लेरोसिस कहते हैं।\n" +
                "आपके हृदय को उन संकरी धमनियों से रक्त को धकेलने के लिए अधिक पंप करना पड़ता है, और उसे उतना रक्त नहीं मिल पाता जितना उसे काम करना चाहिए। समय के साथ, यह आपके दिल को इतना कमजोर बना सकता है कि यह हार्ट फैल्यर की ओर ले जाता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "215.0 HF MI",
            [STATEMENT]: {
                [LANG_ENGLISH]: "If you have CAD, a piece of the plaque that's built up in your arteries can break off. This can lead to a blood clot. If the clot gets lodged in one of the arteries bringing blood to your heart, it can block the blood flow and you could have a heart attack.\n" +
                "Without enough oxygen, the part of the heart that's blocked can die. This damage weakens your heart and can lead to heart failure.",
                [LANG_HINDI]: "यदि आपको दिल की धमनी का रोग है, तो आपकी धमनियों में बनी पट्टिका (प्लैक) का एक टुकड़ा टूट सकता है। इससे रक्त का थक्का बन सकता है। यदि आपके हृदय में रक्त लाने वाली धमनियों में से एक में थक्का जमा हो जाता है, तो यह रक्त के प्रवाह को अवरुद्ध कर सकता है और आपको दिल का दौरा पड़ सकता है।\n" +
                "पर्याप्त ऑक्सीजन के बिना, हृदय का वह हिस्सा मर सकता है। यह आपके दिल को कमजोर करती है और हार्ट फैल्यर का कारण बन सकती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "216.0 HF BP",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Blood pressure is the force of blood as your heart pumps it through your arteries. When the blood pushes against your artery walls with more force than usual, you have high blood pressure. This makes your heart work harder to push blood through your body, and that extra work makes your heart bigger and weaker. High blood pressure that's not managed well can double or triple your chances of heart failure.",
                [LANG_HINDI]: "उच्च रक्तचाप जिसे अच्छी तरह से रोका नहीं किया जाता है, आपके हार्ट फैल्यर की संभावना को दोगुना या तिगुना कर सकता है। रक्तचाप हृदय का वो बल है जो खून को आपकी धमनियों में पंप करता है। जब रक्त आपकी धमनी की दीवारों के खिलाफ सामान्य से अधिक बल के साथ धक्का देता है, तो आपको उच्च रक्तचाप होता है। इसके कारण आपके हृदय को आपके शरीर में खून को धकेलने के लिए अधिक मेहनत करता है, और यह अतिरिक्त मेहनत आपके हृदय को बड़ा और कमजोर बनाती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "217.0 HF diabetes",
            [STATEMENT]: {
                [LANG_ENGLISH]: "The hormone insulin normally moves sugar from your bloodstream into your cells, where it's used for energy or stored for later. When you have diabetes, your body doesn't make enough insulin or doesn't use insulin well enough. This can leave too much sugar in your blood (high blood sugar).\n" +
                "High blood sugar damages arteries and weakens your heart. That can lead to heart failure. People who have diabetes are also more likely to have high blood pressure and atherosclerosis.",
                [LANG_HINDI]: "हार्मोन इंसुलिन आम तौर पर आपके रक्तप्रवाह से शुगर को आपकी कोशिकाओं में ले जाता है, जहां इसका उपयोग ऊर्जा के लिए किया जाता है या बाद के लिए संग्रहीत किया जाता है। जब आपको मधुमेह / शुगर / डाइअबीटीज़ होती है, तो आपका शरीर पर्याप्त इंसुलिन नहीं बनाता है या पर्याप्त रूप से इंसुलिन का उपयोग नहीं करता है। यह आपके रक्त (उच्च रक्त शर्करा) में बहुत अधिक शर्करा छोड़ सकता है।\n" +
                "अधिक ब्लड शुगर धमनियों को नुकसान पहुंचाती है और आपके दिल को कमजोर करती है। जिससे हार्ट फैल्यर हो सकता है। जिन लोगों को मधुमेह है, उनमें भी उच्च रक्तचाप और एथेरोस्क्लेरोसिस होने की संभावना अधिक होती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "218.0 HF sleep apnea",
            [STATEMENT]: {
                [LANG_ENGLISH]: "This is when your breathing pauses over and over again while you sleep. Each time you stop breathing, your brain jolts you awake to get it restarted. It may be linked to atrial fibrillation (a quivering or irregular heartbeat) and high blood pressure in your lungs, which can lead to heart failure.",
                [LANG_HINDI]: "यह तब होता है जब सोते समय आपकी सांस बार-बार रुकती है। जब भी आप सांस लेना बंद कर देते हैं, तो आपका दिमाग आपको झटके से जगाता है। यह एट्रियल फिब्रिलेशन (अनियमित दिल की धड़कन या दिल का कांपना) और आपके फेफड़ों में उच्च रक्तचाप से जुड़ा हो सकता है, जिससे हार्ट फैल्यर हो सकती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "219.0 HF obesity",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Being obese means the ratio of their weight to their height, known as body mass index or BMI, is 30 or higher.\n" +
                "Extra weight puts more strain on your heart. Being obese also makes you more likely to have diseases linked to heart failure, such as high blood pressure, diabetes, or sleep apnea.",
                [LANG_HINDI]: "मोटापा मतलब वजन का ऊंचाई से अनुपात, जिसे बॉडी मास इंडेक्स या बीएमआई कहा जाता है, 30 या अधिक है।\n" +
                "अतिरिक्त वजन आपके दिल पर अधिक दबाव डालता है। मोटे होने से आपको उच्च रक्तचाप, मधुमेह, या स्लीप एपनिया जैसी हृदय गति रुकने से जुड़ी बीमारियां होने की संभावना भी बढ़ जाती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "220.0 HF cardiomyopathy",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Heart Muscle Disease (Cardiomyopathy)\n" +
                "This disease damages your heart muscle and makes it so weak it can't pump blood like it should. Cardiomyopathy can run in families, or it can be caused by coronary artery disease, a virus, or another condition.",
                [LANG_HINDI]: "हृदय की मासपेशी का रोग (कार्डियोमायोपैथी)\n" +
                "यह रोग आपके हृदय की मांसपेशियों को नुकसान पहुंचाता है और इसे इतना कमजोर बना देता है कि यह रक्त को अच्छे से पंप नहीं कर सकता। कार्डियोमायोपैथी परिवारों के अनेक सदस्यों को हो सकती है, या यह कोरोनरी धमनी की बीमारी, वायरस या किसी अन्य स्थिति के कारण हो सकती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "221.0 HF valves",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Abnormal Heart Valves\n" +
                "Four valves control the flow of blood into and out of your heart. They keep blood from flowing backward. If you have heart valve disease, at least one of these valves doesn't work right. The problem can start when you're born, or it can be caused by something that damages your heart, like a heart attack or an infection.\n" +
                "When a valve doesn't open or shut the way it should, your heart has to work harder to pump blood. A valve problem that isn't treated can lead to heart failure.",
                [LANG_HINDI]: "असामान्य हृदय वाल्व\n" +
                "चार वाल्व आपके हृदय में रक्त के प्रवाह को नियंत्रित करते हैं। ये खून को पीछे की ओर बहने से रोकते हैं। यदि आपको हृदय वाल्व की बीमारी है, तो इनमें से कम से कम एक वाल्व ठीक से काम नहीं करता है। समस्या तब शुरू हो सकती है जब आप पैदा होते हैं, या यह किसी ऐसी चीज के कारण हो सकता है जो आपके दिल को नुकसान पहुंचाती है, जैसे दिल का दौरा या संक्रमण।\n" +
                "जब कोई वाल्व सही तरह से नहीं खुलता या बंद होता है, तो आपके हृदय को रक्त पंप करने के लिए अधिक मेहनत करनी पड़ती है। वाल्व कि समस्या जिसका इलाज नहीं किया जाता है वह हार्ट फैल्यर का कारण बन सकती है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "222.0 HF arrhythmia",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Irregular Heart Rhythm (Arrhythmia)\n" +
                "Your heart usually beats in a regular lub-dub pattern. The upper chambers squeeze, and then the lower chambers squeeze. When you have an irregular heart rhythm, your heart beats too quickly, too slowly, or out of rhythm.\n" +
                "If your heart is off its beat for too long, it won't pump enough blood. This can eventually lead to heart failure.",
                [LANG_HINDI]: "अनियमित हृदय ताल\n" +
                "आपका दिल आमतौर पर एक नियमित लब-डब पैटर्न में धड़कता है। ऊपरी कक्ष निचोड़ते हैं, और फिर निचले कक्ष निचोड़ते हैं। जब आपके दिल की लय अनियमित होती है, तो आपका दिल बहुत तेज़ी से, बहुत धीरे-धीरे या लय के बिना धड़कता है।\n" +
                "यदि आपका दिल बहुत देर तक गलत तरह धड़कता है, तो यह पर्याप्त रक्त पंप नहीं करेगा। यह अंततः हार्ट फैल्यर का कारण बन सकता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "223.0 HF intoxicants",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Alcohol, Drugs, and Tobacco\n" +
                "One or two drinks a day might be good for your heart, but more than that can lead to obesity, high blood pressure, and heart failure.\n" +
                "Drugs like cocaine, amphetamines, and ecstasy (MDMA) ramp up your heart rate and raise your blood pressure. Using these drugs can lead to a heart attack and eventually make your heart fail.\n" +
                "Smoking also damages your heart and raises your blood pressure. The chemicals in cigarette smoke keep your blood from carrying enough oxygen through your body. That makes your heart work harder. Smoking also narrows your blood vessels and makes your blood more likely to clot.",
                [LANG_HINDI]: "शराब, ड्रग्स और तंबाकू\n" +
                "दिन में एक या दो ग्लास आपके दिल के लिए अच्छे हो सकते हैं, लेकिन इससे अधिक मोटापा, उच्च रक्तचाप और हार्ट फैल्यर का कारण बन सकता है।\n" +
                "कोकेन, एम्फ़ैटेमिन और एक्स्टसी जैसी दवाएं आपकी हृदय गति और आपके रक्तचाप को बढ़ाती हैं। इन दवाओं का उपयोग करने से दिल का दौरा पड़ सकता है और अंततः आपको हार्ट फैल्यर हो सकता है।\n" +
                "धूम्रपान आपके दिल को भी नुकसान पहुंचाता है और आपका रक्तचाप बढ़ाता है। सिगरेट के धुएं में मौजूद रसायन आपके रक्त को आपके शरीर में पर्याप्त ऑक्सीजन ले जाने से रोकते हैं। जिससे आपका दिल ज्यादा मेहनत करता है। धूम्रपान आपकी रक्त वाहिकाओं को भी संकरा कर देता है और आपके रक्त के थक्का बनने की संभावना को बढ़ा देता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        // lifestyle
        {
            [ID]: "224.0 HF lifestyle",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Salt",
                        [LANG_HINDI]: "नमक",
                    },
                    [NEXT_QUESTION]: "225.0 HF salt",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Physical Medicine",
                        [LANG_HINDI]: "शारीरिक दवा",
                    },
                    [NEXT_QUESTION]: "226.0 HF pmr",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Infectoions",
                        [LANG_HINDI]: "संक्रमणों",
                    },
                    [NEXT_QUESTION]: "227.0 HF infections",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Medicines",
                        [LANG_HINDI]: "दवाई",
                    },
                    [NEXT_QUESTION]: "228.0 HF meds",
                    [VALUE]: 3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Manage your own team",
                        [LANG_HINDI]: "अपनी खुद की टीम संभालें",
                    },
                    [NEXT_QUESTION]: "229.0 HF teamleader",
                    [VALUE]: 4
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Limit fluid intake",
                        [LANG_HINDI]: "तरल पदार्थ का सेवन सीमित करें",
                    },
                    [NEXT_QUESTION]: "230.0 HF fluid",
                    [VALUE]: 5
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Reduce weight",
                        [LANG_HINDI]: "वजन कम करना",
                    },
                    [NEXT_QUESTION]: "231.0 HF weight",
                    [VALUE]: 6
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "What would you like to know?",
                [LANG_HINDI]: "आप क्या जानना चाहेंगे?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "225.0 HF salt",
            [STATEMENT]: {
                [LANG_ENGLISH]: "If you have heart failure, you should have NO MORE THAN 1.5 grams of salt every day. Don't add it to your food separately. It is okay to have some salt in your flour if you have been doing so. Don't eat food cooked outside.",
                [LANG_HINDI]: "अगर आपको हार्ट फेलियर है, तो आपको रोजाना 1.5 ग्राम से ज्यादा नमक नहीं खाना चाहिए। इसे अपने खाने में अलग से शामिल न करें। आपके आटे में थोड़ा सा नमक होना ठीक है लेकिन अलग से खाने में न डालें। बाहर का बना खाना न खाएं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "226.0 HF pmr",
            [STATEMENT]: {
                [LANG_ENGLISH]: "You should also pay attention to physical medicine because it is fun and is the best way to become healthy. It involves exercising regularly.\n" +
                "People with heart failure can regain up to 70% of their exercise capacity if they stick to an exercise program.\n" +
                "Heart-pumping aerobic exercise is the kind that doctors have in mind when they recommend at least 150 minutes per week of moderate activity.",
                [LANG_HINDI]: "आपको भौतिक चिकित्सा पर भी ध्यान देना चाहिए क्योंकि यह मजेदार है और स्वस्थ होने का सबसे अच्छा तरीका है। इसमें नियमित रूप से व्यायाम करना शामिल है।\n" +
                "हार्ट फैल्यर वाले लोग अपनी व्यायाम क्षमता का 70% तक पुनः प्राप्त कर सकते हैं यदि वे एक व्यायाम कार्यक्रम से चिपके रहते हैं।\n" +
                "हार्ट-पंपिंग करने वाले एरोबिक व्यायाम वह प्रकार है जो डॉक्टरों के दिमाग में होता है जब वे प्रति सप्ताह कम से कम 150 मिनट की मध्यम गतिविधि की सलाह देते हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "227.0 HF infections",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Prevent lung infections. Ask your doctor about flu and pneumonia vaccines. Always wear a mask, irrespective of covid.",
                [LANG_HINDI]: "फेफड़ों के संक्रमण को रोकें। अपने डॉक्टर से फ्लू और निमोनिया के टीके के बारे में पूछें। हुमएश मास्क पहनें कोरोना फैले या न फैले या न हो।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "228.0 HF meds",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Take your medications as prescribed. Don't stop taking them without first asking your doctor. Even if you have no symptoms, the drugs help your heart pump better.",
                [LANG_HINDI]: "अपनी दवाएं निर्धारित तौर पर लें। अपने डॉक्टर से पूछे बिना उन्हें लेना बंद न करें। अगर आपके कोई लक्षण नहीं हैं, तो दवाएं आपके दिल को बेहतर पंप करने में मदद करती हैं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "229.0 HF teamleader",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Be the Star of Your Team\n" +
                "It takes a team to manage heart failure, and you are the key player. Your heart doctor will prescribe your medications and manage other medical problems. Other team members, including nurses, dietitians, pharmacists, exercise specialists, and social workers, will also lend a hand. But it's up to you to take your medicine, change your diet, live a healthy lifestyle, keep your follow-up appointments, and be an active member of the team.",
                [LANG_HINDI]: "अपनी टीम के स्टार बनें\n" +
                "हार्ट फैल्यर को मैनेज करने के लिए एक टीम की आवश्यकता होती है, और आप इसके सबसे जरूरी खिलाड़ी हैं। आपके हृदय चिकित्सक आपकी दवाएं लिखेंगे और अन्य चिकित्सा समस्याओं का प्रबंधन करेंगे। नर्स, आहार विशेषज्ञ, केमिस्ट, व्यायाम विशेषज्ञ और सामाजिक कार्यकर्ता सहित टीम के अन्य सदस्य भी हाथ बंटाएंगे। लेकिन यह आप पर निर्भर है कि आप अपनी दवा लें, अपना आहार बदलें, एक स्वस्थ जीवन शैली जीएं, अपने डॉक्टर से सही समय पे वापस जाके मिलें और टीम के सक्रिय सदस्य बनें।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "230.0 HF fluid",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Maintain fluid balance. Keep a record of the amount of fluids you drink or eat and how often you go to the bathroom using a urometer. Remember, the more fluid you carry in your blood vessels, the harder your heart must work to pump excess fluid through your body. Limiting your fluid intake to less than two litres per day will help decrease the workload of your heart and prevent symptoms from recurring.",
                [LANG_HINDI]: "द्रव संतुलन बनाए रखें। आप कितने तरल पदार्थ पीते हैं या खाते हैं और कितनी बार बाथरूम जाकर उरोमीटर का उपयोग करते हैं, इसका रिकॉर्ड रखें। याद रखें, आप अपनी रक्त वाहिकाओं में जितना अधिक तरल पदार्थ ले जाते हैं, आपके हृदय को आपके शरीर में अतिरिक्त तरल पदार्थ को पंप करने के लिए उतनी ही अधिक मेहनत करनी पड़ती है। अपने तरल पदार्थ का सेवन प्रति दिन दो लीटर से कम करने से आपके दिल के कार्यभार को कम करने और लक्षणों की पुनरावृत्ति को रोकने में मदद मिलेगी।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "231.0 HF weight",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Monitor your weight and lose weight if needed. Learn what your \"dry\" or \"ideal\" weight is. This is your weight without extra fluid. Your goal is to keep your weight within four pounds of your dry weight. Weigh yourself at the same time each day, preferably in the morning, in similar clothing, after urinating but before eating, and on the same scale. Record your weight in a diary or calendar. If you gain 2 pounds in one day or 5 pounds in one week, call your doctor.",
                [LANG_HINDI]: "अपने वजन की निगरानी करें और जरूरत पड़ने पर वजन कम करें। जानें कि आपका \"सूखा\" या \"आदर्श\" वजन क्या है। अतिरिक्त तरल पदार्थ के बिना यह आपका वजन है। आपका लक्ष्य अपने वजन को अपने सूखे वजन के चार पाउंड (1.8 किलो) के भीतर रखना है। प्रत्येक दिन एक ही समय पर (सुबह में) एक ही तरह के कपड़ों में, पेशाब करने के बाद लेकिन खाने से पहले, और उसी पैमाने पर वजन करें। एक डायरी या कैलेंडर में अपना वजन रिकॉर्ड करें। यदि आप एक दिन में 2 पाउंड या एक सप्ताह में 5 पाउंड बढ़ा रहे हैं, तो अपने डॉक्टर को बुलाएं।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        // other
        {
            [ID]: "196.3 HF risk factors",
            [STATEMENT]: {
                [LANG_ENGLISH]: "1. Age - The risk of heart failure is higher in people above 65 years of age.\n" +
                "2. Gender – Men are more prone to heart failure than women.\n" +
                "3. Family History - If someone in your family has had heart failure, then you too can have heart failure.\n" +
                "4. Diabetes - Along with diabetes, high blood pressure and coronary artery disease increase the chances of heart failure.\n" +
                "5. Lifestyle - Obesity, smoking, alcohol consumption increases the risk of heart failure over time.\n" +
                "6. Medicines - Medicines like steroids or cancer medicine can affect the heart, which can increase the risk of heart failure.\n",
                [LANG_HINDI]: "1. आयु - 65 वर्ष से अिधक आयु के लोगों में हार्ट फेलयर का खतरा अिधक होता है।\n" +
                "2. लिंग – मिहलाओं की तुलना में पुरुषों में हार्ट फैल्यर  की संभावना अिधक होती है।\n" +
                "3. पारिवारिक इतिहास - अगर आपके परिवार में किसी को हार्ट फैल्यर रहा है तो आपको भी हार्ट फैल्यर हो सकता है।\n" +
                "4. डायबिटीज़ - डायबिटीज़ के साथ-साथ हाई ब्लड प्रेशर और कोरोनरी धमनी रोग हार्ट फैल्यर होने की संभावना बढ़ देता है।\n" +
                "5. जीवनशैली - मोटापा, धूम्रपान, शराब का सेवन समय के साथ साथ हार्ट फैल्यर के खतरे को बढा देता है।\n" +
                "6. दवाएँ - स्टेरॉइड या कैंसर की दवा जैसी दवाएं दिल को प्रभावित कर सकती हैं, जिस से हार्ट फैल्यर का खतरा बढ़ सकता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        // Stent
        {
            [ID]: "232.0 Stent / Bypass",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What is stent",
                        [LANG_HINDI]: "स्टेंट क्या है?",
                    },
                    [NEXT_QUESTION]: "233.0 What is Stent",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What is bypass surgery",
                        [LANG_HINDI]: "क्या है बाईपास सर्जरी",
                    },
                    [NEXT_QUESTION]: "234.0 What is bypass",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Is stent a major surgery?",
                        [LANG_HINDI]: "क्या स्टेंट एक बड़ी सर्जरी है?",
                    },
                    [NEXT_QUESTION]: "235.0 Is stent major",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "How many coronary arteries?",
                        [LANG_HINDI]: "कोरोनरी धमनियां कितनी हैं?",
                    },
                    [NEXT_QUESTION]: "236.0 How many coronary",
                    [VALUE]: 3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Are stents permenant?",
                        [LANG_HINDI]: "क्या स्टेंट स्थायी हैं?",
                    },
                    [NEXT_QUESTION]: "237.0 Stent permennt",
                    [VALUE]: 4
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Stent medication",
                        [LANG_HINDI]: "स्टेंट दवा",
                    },
                    [NEXT_QUESTION]: "238.0 Stent meds",
                    [VALUE]: 5
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Stent risks",
                        [LANG_HINDI]: "स्टेंट के जोखिम",
                    },
                    [NEXT_QUESTION]: "9998 dead end",
                    [VALUE]: 6
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Does stent means I can enjoy life now?",
                        [LANG_HINDI]: "क्या स्टेंट का मतलब है I अब जीवन का आनंद ले सकते हैं?",
                    },
                    [NEXT_QUESTION]: "239.0 Stent life",
                    [VALUE]: 7
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "What would you like to know?",
                [LANG_HINDI]: "आप क्या जानना चाहेंगे?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "233.0 What is Stent",
            [STATEMENT]: {
                [LANG_ENGLISH]: "A stent is a tiny tube placed into a hollow structure in your body. This structure can be an artery, a vein, or another structure such as the tube that carries urine (ureter). The stent holds the structure open",
                [LANG_HINDI]: "स्टेंट एक छोटी ट्यूब होती है जिसे आपके शरीर में एक खोखली संरचना में रखा जाता है। यह संरचना एक धमनी, एक नस या अन्य संरचना हो सकती है जैसे कि ट्यूब जो मूत्र (मूत्रवाहिनी) को ले जाती है। स्टेंट संरचना को खुला रखता है"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "234.0 What is bypass",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Coronary artery bypass surgery, also known as coronary artery bypass graft surgery, and colloquially heart bypass or bypass surgery, is a surgical procedure to restore normal blood flow to an obstructed coronary artery",
                [LANG_HINDI]: "कोरोनरी धमनी बाईपास सर्जरी, जिसे कोरोनरी धमनी बाईपास ग्राफ्ट सर्जरी के रूप में भी जाना जाता है, और बोलचाल की भाषा में हृदय बाईपास या बाईपास सर्जरी, एक बाधित कोरोनरी धमनी में सामान्य रक्त प्रवाह को बहाल करने के लिए एक शल्य प्रक्रिया है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "235.0 Is stent major",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Stenting is a minimally invasive procedure, meaning it is not considered major surgery. Stents can be made of metal mesh, fabric, silicone, or combinations of materials. Stents used for coronary arteries are made of metal mesh. Fabric stents, also called stent grafts, are used in larger arteries such as the aorta",
                [LANG_HINDI]: "स्टेंटिंग एक न्यूनतम इनवेसिव प्रक्रिया है, जिसका अर्थ है कि इसे बड़ी सर्जरी नहीं माना जाता है। स्टेंट धातु की जाली, कपड़े, सिलिकॉन या सामग्री के संयोजन से बनाए जा सकते हैं। कोरोनरी धमनियों के लिए उपयोग किए जाने वाले स्टेंट धातु की जाली से बने होते हैं। फैब्रिक स्टेंट, जिसे स्टेंट ग्राफ्ट भी कहा जाता है, का उपयोग महाधमनी जैसी बड़ी धमनियों में किया जाता है"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "236.0 How many coronary",
            [STATEMENT]: {
                [LANG_ENGLISH]: "There are two coronary arteries, each containing several branches: Right coronary artery and the Left coronary artery. The coronary arteries supply different regions of the heart.\n" +
                "The left coronary has 2 major branches",
                [LANG_HINDI]: "दो कोरोनरी धमनियां हैं, जिनमें से प्रत्येक में कई शाखाएं हैं: दाहिनी कोरोनरी धमनी और बाईं कोरोनरी धमनी। कोरोनरी धमनियां हृदय के विभिन्न क्षेत्रों की आपूर्ति करती हैं।\n" +
                "बाईं कोरोनरी की 2 प्रमुख शाखाएँ हैं"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "237.0 Stent permennt",
            [STATEMENT]: {
                [LANG_ENGLISH]: "When you have a stent placed, it's meant to be permanent. Stents can stay in your body without breaking down over time. However, stents only treat one area where your artery has narrowed or closed. They don't treat the underlying condition of vascular disease",
                [LANG_HINDI]: "जब आपके पास एक स्टेंट लगाया जाता है, तो यह स्थायी होता है। स्टेंट समय के साथ टूटे बिना आपके शरीर में रह सकते हैं। हालांकि, स्टेंट केवल उसी क्षेत्र का इलाज करते हैं जहां आपकी धमनी संकुचित या बंद हो गई है। वे संवहनी रोग की अंतर्निहित स्थिति का इलाज नहीं करते हैं"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "238.0 Stent meds",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Stents are foreign bodies and require you to take medicines regularly to prevent clot formation around them. Not taking the medicines can lead to a heart attack",
                [LANG_HINDI]: "स्टेंट विदेशी निकाय हैं और इनके आसपास थक्का बनने से रोकने के लिए आपको नियमित रूप से दवाएं लेने की आवश्यकता होती है। दवा न लेने से दिल का दौरा पड़ सकता है"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "239.0 Stent life",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Yes. However, you must have a good lifestyle. Keep exercising. Quit smoking. Eat less salt. Avoid oily food. The general good lifestyle is mandatory after a stent. \n" +
                "Make sure that you keep taking your medicines otherwise you may get a heart attack",
                [LANG_HINDI]: "हाँ। हालांकि, आपकी जीवनशैली अच्छी होनी चाहिए। व्यायाम करते रहें। धूम्रपान छोड़ने। नमक कम खाएं। तैलीय भोजन से परहेज करें। एक स्टेंट के बाद सामान्य अच्छी जीवनशैली अनिवार्य है।\n" +
                "सुनिश्चित करें कि आप अपनी दवाएं लेते रहें अन्यथा आपको दिल का दौरा पड़ सकता है"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        // Angio
        {
            [ID]: "240.0 Angio",
            [OPTIONS]:[
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Angiography",
                        [LANG_HINDI]: "एंजियोग्राफी",
                    },
                    [NEXT_QUESTION]: "241.0 Angiography",
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Types of angiography",
                        [LANG_HINDI]: "एंजियोग्राफी के प्रकार",
                    },
                    [NEXT_QUESTION]: "242.0 Angiography types",
                    [VALUE]: 1
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Angioplasty",
                        [LANG_HINDI]: "एंजियोप्लास्टी",
                    },
                    [NEXT_QUESTION]: "243.0 Angioplasty",
                    [VALUE]: 2
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Risk",
                        [LANG_HINDI]: "जोखिम",
                    },
                    [NEXT_QUESTION]: "9998 dead end",
                    [VALUE]: 3
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "What after angiography?",
                        [LANG_HINDI]: "एंजियोग्राफी के बाद क्या?",
                    },
                    [NEXT_QUESTION]: "244.0 After angiography",
                    [VALUE]: 4
                }
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "What would you like to know?",
                [LANG_HINDI]: "आप क्या जानना चाहेंगे?"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "241.0 Angiography",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Angiography is used to check the health of your blood vessels and how blood flows through them. It can help to diagnose or investigate several problems affecting blood vessels, including: atherosclerosis – narrowing of the arteries, which could mean you're at risk of having a stroke or heart attack.\n" +
                "\n" +
                "For the test:\n" +
                "you'll usually be awake, but may be given a medicine called a sedative to help you relaxyou lie on an X-ray table and a small cut (incision) is made over 1 of your arteries, usually near your groin or wrist – local anaesthetic is used to numb the area where the cut is madea very thin flexible tube (catheter) is inserted into the arterythe catheter is carefully guided to the area that's being examined (such as the heart)a dye (contrast medium) is injected into the cathetera series of X-rays are taken as the dye flows through your blood vessels\n" +
                "The test can take between 30 minutes and 2 hours. You'll usually be able to go home a few hours afterwards.",
                [LANG_HINDI]: "एंजियोग्राफी का उपयोग आपकी रक्त वाहिकाओं के स्वास्थ्य और उनके माध्यम से रक्त कैसे बहता है, इसकी जांच के लिए किया जाता है। यह रक्त वाहिकाओं को प्रभावित करने वाली कई समस्याओं का निदान या जांच करने में मदद कर सकता है, जिनमें शामिल हैं: एथेरोस्क्लेरोसिस - धमनियों का संकुचित होना, जिसका अर्थ यह हो सकता है कि आपको स्ट्रोक या दिल का दौरा पड़ने का खतरा है।\n" +
                "\n" +
                "जांच के लिए:\n" +
                "आप आमतौर पर जागते रहेंगे, लेकिन आपको आराम करने में मदद करने के लिए शामक नामक दवा दी जा सकती है, आप एक्स-रे टेबल पर लेट जाते हैं और आपकी 1 धमनियों में एक छोटा सा कट (चीरा) लगाया जाता है, आमतौर पर आपकी कमर या कलाई के पास - स्थानीय संवेदनाहारी का उपयोग उस क्षेत्र को सुन्न करने के लिए किया जाता है जहां कटौती की जाती हैएक बहुत पतली लचीली ट्यूब (कैथेटर) को धमनी में डाला जाता हैकैथेटर को उस क्षेत्र में सावधानीपूर्वक निर्देशित किया जाता है जिसकी जांच की जा रही है (जैसे हृदय) एक डाई (विपरीत माध्यम) को इंजेक्ट किया जाता है एक्स-रे की कैथीटेरा श्रृंखला ली जाती है क्योंकि डाई आपके रक्त वाहिकाओं से बहती है\n" +
                "परीक्षण में 30 मिनट से 2 घंटे तक का समय लग सकता है। आप आमतौर पर कुछ घंटों बाद घर जा सकेंगे।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "242.0 Angiography types",
            [STATEMENT]: {
                [LANG_ENGLISH]: "In the usual angiography a catheter is inserted till the area that is to be studied.\n" +
                "\n" +
                "In CT angiography,  canula is inserted only in the wrist and a CT scan or MRI is performed.",
                [LANG_HINDI]: "सामान्य एंजियोग्राफी में उस क्षेत्र तक एक कैथेटर डाला जाता है जिसका अध्ययन किया जाना है।\n" +
                "\n" +
                "सीटी एंजियोग्राफी में, कैनुला केवल कलाई में डाला जाता है और सीटी स्कैन या एमआरआई किया जाता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "243.0 Angioplasty",
            [STATEMENT]: {
                [LANG_ENGLISH]: "An angioplasty is a surgical procedure to open the blood vessels that supply blood to your heart muscle. These blood vessels are also known as coronary arteries. Doctors often perform this procedure immediately after a heart attack.\n" +
                "\n" +
                "This is often done using a deflated balloon which is inflated at the target area to widen it.",
                [LANG_HINDI]: "एंजियोप्लास्टी रक्त वाहिकाओं को खोलने के लिए एक शल्य प्रक्रिया है जो आपके हृदय की मांसपेशियों को रक्त की आपूर्ति करती है। इन रक्त वाहिकाओं को कोरोनरी धमनियों के रूप में भी जाना जाता है। डॉक्टर अक्सर दिल का दौरा पड़ने के तुरंत बाद इस प्रक्रिया को करते हैं।\n" +
                "\n" +
                "यह अक्सर एक डिफ्लेटेड बैलून का उपयोग करके किया जाता है जिसे इसे चौड़ा करने के लिए लक्ष्य क्षेत्र में फुलाया जाता है।"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: "244.0 After angiography",
            [STATEMENT]: {
                [LANG_ENGLISH]: "People often stop moving their shoulder because of the pain. That is something you must not do as it would lead to a frozen shoulder. Keep moving your arm and keep doing light exercises and physiotherapy",
                [LANG_HINDI]: "दर्द के कारण लोग अक्सर अपना कंधा हिलाना बंद कर देते हैं। यह कुछ ऐसा है जो आपको नहीं करना चाहिए क्योंकि यह एक जमे हुए कंधे की ओर ले जाएगा। हाथ हिलाते रहें और हल्के-फुल्के व्यायाम और फिजियोथैरेपी करते रहें"
            },
            [NEXT_QUESTION]: CARDIAC_CURIOSITY,
            [TYPE]: TYPE_NONE
        },

        // still curious
        {
            [ID]: CARDIAC_CURIOSITY,
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No. Go home",
                        [LANG_HINDI]: "नहीं"
                    },
                    [NEXT_QUESTION]: 1.0,
                    [VALUE]: 0
                },
                {
                    [STATEMENT]: STATEMENT_YES,
                    [NEXT_QUESTION]: "94.0 What would you like to know (heart)",
                    [VALUE]: 1
                },
            ],
            [STATEMENT]: {
                [LANG_ENGLISH]: "Still curious?",
                [LANG_HINDI]: "अभी भी जिज्ञासु?"
            },
            [TYPE]: TYPE_BUTTON
        },

        /////////////////////////////////////////////////////////////////////////////////////////////

        {
            [ID]: "71.0 Cardiac screening",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Do you have pain in your chest?",
                [LANG_HINDI]: "क्या आपके सीने में दर्द है?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "72.0 Cardiac point pain",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ"
                    },
                    [VALUE]: 0,
                    [DB_VALUE]: DB_VALUE_YES
                },
                {
                    [NEXT_QUESTION]: "73.0 Cardiac giddiness",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No",
                        [LANG_HINDI]: "नहीं"
                    },
                    [VALUE]: 1,
                    [DB_VALUE]: DB_VALUE_NO
                }
            ],
            [TYPE]: TYPE_BUTTON
        },

        // {
        //     [ID]: "71.1 Cardiac pain middle of chest pain",
        //     [STATEMENT]: {
        //         [LANG_ENGLISH]: "Is the pain in the middle of the chest",
        //         [LANG_HINDI]: "क्या सीने के बीच में दर्द होता है?"
        //     },
        //     [OPTIONS]: [
        //         {
        //             [NEXT_QUESTION]: "72.0 Cardiac point pain",
        //             [STATEMENT]: {
        //                 [LANG_ENGLISH]: "Yes",
        //                 [LANG_HINDI]: "हाँ"
        //             },
        //             [CARDIAC_SCORE]: 1,
        //             [DB_VALUE]: "Yes",
        //             [VALUE]: 0
        //         },
        //         {
        //             [NEXT_QUESTION]: "72.0 Cardiac point pain",
        //             [STATEMENT]: {
        //                 [LANG_ENGLISH]: "No",
        //                 [LANG_HINDI]: "नहीं"
        //             },
        //             [DB_VALUE]: "No",
        //             [VALUE]: 1
        //         }
        //     ],
        //     [TYPE]: TYPE_BUTTON
        // },
        {
            [ID]: "72.0 Cardiac point pain",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Is it point pain?  (You can tell the location with tip of the finger)",
                [LANG_HINDI]: "क्या आप उंगली से बता सकते हैं की दर्द कहा पे है?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "74.0 Cardiac left arm pain",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ",
                        [DESCRIPTION_IMAGE]: "point_chest_pain.jpg"
                    },
                    [VALUE]: 0,
                    [DB_VALUE]: "cardiac_point_chest_pain",
                    [CARDIAC_SCORE]: -1,
                    [FACT]: {
                        'category': 'patient',
                          // 'type': 'disease',
                          // 'group': 'arthritis',
                          'state': 'point_chest_pain',
                          'value': true
                    }
                },
                {
                    [NEXT_QUESTION]: "74.0 Cardiac left arm pain",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No, the pain is diffused",
                        [LANG_HINDI]: "नहीं, दर्द फैला हुआ है",
                        [DESCRIPTION_IMAGE]: "angina.jpg"
                    },
                    [CARDIAC_SCORE]: 0.5,
                    [DB_VALUE]: "cardiac_point_chest_pain",
                    [VALUE]: 1,
                    [FACT]: {
                        'category': 'patient',
                        'type': 'disease',
                        'group': 'heart',
                        'state': 'diffused_chest_pain',
                        'value': true
                    }
                }
            ],
            [TYPE]: TYPE_BUTTON
        },
        {
            [ID]: "74.0 Cardiac left arm pain",
            [STATEMENT]: {
                [LANG_ENGLISH]: "Is there pain in the left arm?",
                [LANG_HINDI]: "क्या बाएँ हाथ में दर्द है ?",
                [DESCRIPTION_IMAGE]: "left_arm.jpg"
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
                        [LANG_HINDI]: "नहीं",
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
                        [LANG_HINDI]: "हाँ",
                        [DESCRIPTION_IMAGE]: "left_arm_inside.jpg"
                    },
                    [VALUE]: 0,
                    [DB_VALUE]: "Yes",
                    [CARDIAC_SCORE]: 1
                },
                {
                    [NEXT_QUESTION]: "73.1 Pain on arm movement",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "No",
                        [LANG_HINDI]: "नहीं",
                        [DESCRIPTION_IMAGE]: "left_arm_outside.jpg"
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
                [LANG_HINDI]: "क्या हाथ हिलाने पे दर्द घटता या बढ़ता है?"
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
                [LANG_HINDI]: "क्या दबाने पे दर्द होता है?",
                // [DESCRIPTION_IMAGE]: "pressure.jpg"
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
                [LANG_HINDI]: "क्या कोई संबद्धित लक्षण हैं?"
            },
            [NEXT_QUESTION]: "81.0 Cardiac assessment",
            [OPTIONS]: [
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Sweating",
                        [LANG_HINDI]: "पसीना आना",
                        [DESCRIPTION_IMAGE]: "sweating2.svg"
                    },
                    [CARDIAC_SCORE]: 1,
                    [VALUE]: 0,
                    [DB_VALUE]: "Sweating"
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Difficulty in breathing",
                        [LANG_HINDI]: "सांस लेने में परेशानी",
                        [DESCRIPTION_IMAGE]: "breathless.svg"
                    },
                    [CARDIAC_SCORE]: 1,
                    [VALUE]: 1,
                    [DB_VALUE]: "Breathlessness"
                },
                {
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Fatigue",
                        [LANG_HINDI]: "थकान",
                        [DESCRIPTION_IMAGE]: "fatigue.svg"
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
            [NEXT_QUESTION]: 2.5,
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
                    [CARDIAC_SCORE]: 1,
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
                [LANG_ENGLISH]: "Does the world spin or turn black?",
                [LANG_HINDI]: "क्या दुनिया घूमती या काली होती दिखती है?"
            },
            [OPTIONS]: [
                {
                    [NEXT_QUESTION]: "9998 dead end",
                    [STATEMENT]: {
                        [LANG_ENGLISH]: "Yes",
                        [LANG_HINDI]: "हाँ"
                    },
                    [VALUE]: 0
                },
                {
                    [NEXT_QUESTION]: "9998 dead end",
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
                [LANG_ENGLISH]: "Close your eyes 👀 and try to touch your nose 👃 or cheek",
                [LANG_HINDI]: "अपनी आँखें 👀 बंद करें और अपनी नाक 👃 या गाल को छूने की कोशिश करें"
            },
            [TYPE]: TYPE_NONE
        },
        {
            [ID]: 4.0,
            [OPTIONS]: [
                {
                    [DB_VALUE]: "Yes",
                    "nextQuestion": 5.0,
                    [STATEMENT]: STATEMENT_YES,
                    [VALUE]: 0
                },
                {
                    [DB_VALUE]: "No",
                    "nextQuestion": 5.0,
                    [STATEMENT]: STATEMENT_NO,
                    [VALUE]: 1
                }
            ],
            [STATEMENT]: {
                [LANG_HINDI]: "क्या आप इसे महसूस कर पा रहे हैं?",
                [LANG_ENGLISH]: "Can you feel it?"
            },
            [TYPE]: TYPE_BUTTON
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
                "hi": "आपमें mucormycosis के कोई लक्षण दिखाई नही देते हैं। कृपया अपने आगे के विकल्प का चयन करें",
                "en": "You don't appear to have any signs and symptoms of mucormycosis. Please select your further option"
            },
            "type": "button"
        },
        {
            [ID]: 11.1,
            [NEXT_QUESTION]: NEXT_QUESTION_ENDS_FLOW,
            [STATEMENT]: {
                [LANG_HINDI]: "आपका दिन शुभ हो 😊",
                [LANG_ENGLISH]: "Have a nice day 😊."
            },
            [TYPE]: TYPE_NONE
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
                        "hi": "डॉक्टर 👨‍⚕️ से कब संपर्क करें?",
                        "en": "When to contact Doctor 👨‍⚕️?"
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
                "en": "Following conditions increase the risk of mucormycosis infection: \n 1. Uncontrolled / Undiagnosed diabetes. \n 2. Weakening of immune system due to use of steroids. \n 3. Prolonged ICU / hospital stay. \n 4. Co-morbidities / post organ transplant / cancer",
                "hi": "निम्नलिखित स्थितियों में म्यूकोर्मिकोसिस संक्रमण का खतरा बढ़ जाता है: \n 1. अनियंत्रित मधुमेह! \n 2. स्टेरॉयड के उपयोग के कारण प्रतिरक्षा प्रणाली का कमजोर होना! \n 3. लंबे समय तक आईसीयू / अस्पताल में रहना! \n 4. सह-रुग्णता / अंग प्रत्यारोपण के बाद / कैंसर!"
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
                "hi": "म्यूकोर्मिकोसिस संक्रमण का फंगस समूह जाइगोमाइसीट्स है और यह एक काला फंगस नहीं है।",
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
                "en": "Blackening / discoloration of skin around Nose, loss of vision, Nasal congestion, loss of facial sensation and Facial pain are the alarming  symptoms and one must immediately contact Doctor in these situations"
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
                "hi": "नैदानिक निदान: चेहरे की सूजन, चेहरे की संवेदना में कमी, चेहरे का टेढ़ापन, नाक के आसपास की त्वचा का काला पड़ना नैदानिक निदान का कारण हो सकता है। नाक की दूरबीन से जांच करना ज़रूरी है। पूर्ण निदान केवल एक अस्पताल में ही किया जा सकता है",
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
                [LANG_ENGLISH]: "Choose your option for consultation"
            },
            [TYPE]: TYPE_BUTTON
        },
        {
            "id": 24.0,
            "nextQuestion": 25.0,
            "statement": {
                "hi": "आपका नाम? पहले के परामर्श के लिए उपयोग किया गया",
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
        // TODO
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
                    [NEXT_QUESTION]: NEXT_QUESTION_ENDS_FLOW,
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
            [NEXT_QUESTION]: NEXT_QUESTION_ENDS_FLOW,
            "statement": {
                "hi": "कृपया अपलोड करने के लिए एक तस्वीर का चयन करें",
                "en": "Please select an image to upload"
            },
            "type": "upload"
        },
        {
            [ID]: 28.0,
            [OPTIONS]: [
                {
                    [DB_VALUE]: "OPD",
                    [NEXT_QUESTION]: 2.5,
                    [STATEMENT]: {
                        [LANG_HINDI]: "ओ.पी.डी / सामान्य परामर्श",
                        [LANG_ENGLISH]: "O.P.D / General counseling"
                    },
                    [VALUE]: 0
                },
                {
                    [DB_VALUE]: "COVID-19",
                    [NEXT_QUESTION]: 29.0,
                    [STATEMENT]: {
                        [LANG_HINDI]: "COVID-19 या ब्लैक फंगस संबंधित परामर्श",
                        [LANG_ENGLISH]: "COVID-19 or Black Fungus related counseling"
                    },
                    [VALUE]: 1
                }
            ],
            [STATEMENT]: {
                [LANG_HINDI]: "अपना विकल्प चुनें",
                [LANG_ENGLISH]: "Choose your option"
            },
            [TYPE]: TYPE_BUTTON
        },
      // Covid/Mucormycosis consultation
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
            [ID]: 30.0,
            [NEXT_QUESTION]: 31.0,
            [PATTERN]: "[0-9]{10}",
            [STATEMENT]: {
                [LANG_HINDI]: "आपका संपर्क नंबर? भविष्य में यदि आवश्यक हो तो संपर्क करने के लिए",
                [LANG_ENGLISH]: "Your contact number? To contact in the future if required"
            },
            [TYPE]: TYPE_TELEPHONE
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
                "hi": "क्या आपके पास ईमेल आईडी है 📧? नवीनतम जानकारी प्रदान करना चाहते हैं?",
                "en": "Do you have an email ID 📧? Want to provide for latest information?"
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
                "hi": "क्या आपके पास थर्मामीटर 🌡️ है ?",
                "en": "Do you have thermometer 🌡️?"
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
                "hi": "आपने ग्लूकोज का स्तर किस समय मापे थे ?",
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
                "hi": "क्या आपने स्टेरॉयड को दवा 💊 के रूप में लिया?",
                "en": "Did you take steroids as medication 💊 ?"
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
                    "dbValue": "None available / All uploaded",
                    "nextQuestion": 53.0,
                    "statement": {
                        "hi": "कोई उपलब्ध नहीं / सभी अपलोड किए गए",
                        "en": "None available / All uploaded"
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
                "hi": "कृपया रिपोर्ट अपलोड कर (चित्र के रूप में)",
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
                        "hi": "बुखार 🤒",
                        "en": "Fever 🤒"
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
                        "en": "Blackening / discoloration of Skin"
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
                        "hi": "बंद नाक 👃",
                        "en": "Nose 👃 Block"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Runny Nose",

                    "statement": {
                        "hi": "बहती नाक 👃",
                        "en": "Runny Nose 👃"
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
                        "hi": "आँख 👁️ का फड़कना",
                        "en": "Bulging of the eye 👁️"
                    },
                    "value": 6
                },
                {
                    "dbValue": "Restricted movement of the eye",

                    "statement": {
                        "hi": "आँख 👁️ की प्रतिबंधित गति",
                        "en": "Restricted movement of the eye 👁️"
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
                        "hi": "सुगंध ना आना",
                        "en": "Loss of smell"
                    },
                    "value": 1
                },
                {
                    "dbValue": "Loss of taste",

                    "statement": {
                        "hi": "स्वाद ना आना",
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
                        [LANG_HINDI]: "आँख 👁️ का फड़कना",
                        [LANG_ENGLISH]: "Bulging of the eye 👁️"
                    },
                    [VALUE]: 2
                },
                {
                    [DB_VALUE]: "Restricted movement of the eye",

                    [STATEMENT]: {
                        [LANG_HINDI]: "आँख 👁️ की प्रतिबंधित गति",
                        [LANG_ENGLISH]: "Restricted movement of the eye 👁️"
                    },
                    [VALUE]: 3
                },
                {
                    [DB_VALUE]: "Runny Nose ",

                    [STATEMENT]: {
                        [LANG_HINDI]: "बहती नाक 👃",
                        [LANG_ENGLISH]: "Runny Nose 👃"
                    },
                    [VALUE]: 4
                },
                {
                    [DB_VALUE]: "Nose Block",

                    [STATEMENT]: {
                        [LANG_HINDI]: "बंद नाक 👃",
                        [LANG_ENGLISH]: "Nose Block 👃"
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
                        [LANG_HINDI]: "सुगंध ना आना ",
                        [LANG_ENGLISH]: "Loss of smell"
                    },
                    [VALUE]: 0
                },
                {
                    [DB_VALUE]: "Loss of taste",

                    [STATEMENT]: {
                        [LANG_HINDI]: "स्वाद ना आना ",
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
            [ID]: 61.0,
            [NEXT_QUESTION]: 62.0,
            [OPTIONS]: [
				        {
                    [DB_VALUE]: "Foul Smell",
                    [STATEMENT]: {
                        [LANG_HINDI]: "दुर्गंध आना",
                        [LANG_ENGLISH]: "Foul Smell"
                    },
                    [VALUE]: 0
                },
                {
                    [DB_VALUE]: "Loss of smell",
                    [STATEMENT]: {
                        [LANG_HINDI]: "सुगंध ना आना",
                        [LANG_ENGLISH]: "Loss of smell"
                    },
                    [VALUE]: 1
                },
                {
                    [DB_VALUE]: "Loss of taste",
                    [STATEMENT]: {
                        [LANG_HINDI]: "स्वाद ना आना",
                        [LANG_ENGLISH]: "Loss of taste"
                    },
                    [VALUE]: 2
                },
                {
                    [DB_VALUE]: "Numbness of face",
                    [STATEMENT]: {
                        [LANG_HINDI]: "चेहरे का सुन्न होना",
                        [LANG_ENGLISH]: "Numbness of face"
                    },
                    [VALUE]: 3
                },
                {
                    [DB_VALUE]: "Bulging of the eye",
                    [STATEMENT]: {
                        [LANG_HINDI]: "आँख का फूलना",
                        [LANG_ENGLISH]: "Bulging of the eye"
                    },
                    [VALUE]: 4
                },
                {
                    [DB_VALUE]: "Restricted movement of the eye",
                    [STATEMENT]: {
                        [LANG_HINDI]: "आँख की प्रतिबंधित गति",
                        [LANG_ENGLISH]: "Restricted movement of the eye"
                    },
                    [VALUE]: 5
                },
				        {
                    [DB_VALUE]: "None of the listed",
                    [STATEMENT]: {
                        [LANG_HINDI]: "सूचीबद्ध में से कोई नहीं",
                        [LANG_ENGLISH]: "None of the listed"
                    },
                    [VALUE]: 6
                }
            ],
            [STATEMENT]: {
                [LANG_HINDI]: "निम्नलिखित लक्षणों का चयन करें जो आप अनुभव कर रहे हैं",
                [LANG_ENGLISH]: "Select the following symptoms your are experiencing"
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
                "hi": "क्या आपको COVID-19 का टीका 💉 लगाया गया है?",
                "en": "Have you been vaccinated 💉 for COVID-19?"
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
                "hi": "आपको कितनी बार टीका 💉 लगाया गया है?",
                "en": "How many times have you been vaccinated 💉 ?"
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
                "en": "What type of Job / Profession you have?"
            },
            "type": "button"
        },
      // OPD questionnaire
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
                "hi": "क्या आपके पास ईमेल आईडी 📧  है? नवीनतम जानकारी प्रदान करना चाहते हैं?",
                "en": "Do you have an email ID 📧? Want to provide for latest information?"
            },
            "type": "button"
        },
        {
            "id": 2.91,
            "nextQuestion": 2.4,
            "statement": {
                "hi": "आपकी ईमेल आईडी 📧?",
                "en": "Your Email ID 📧 ?"
            },
            "type": "text"
        },
        {
            "id": 2.4,
            "nextQuestion": 2.41,
            "statement": {
                "hi": "अपनी समस्याओं / दृश्यमान लक्षणों का उल्लेख करें",
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
    			  [ID]: "9998 dead end",
            [STATEMENT]: {
                en: 'You have asked something I am yet to learn. We will figure it out shortly. Did you enjoy the experience?',
                hi: 'आपने कुछ पूछा है जो मुझे अभी सीखना बाकी है। हम जल्द ही इसका पता लगा लेंगे। क्या आपने अनुभव का आनंद लिया?',
            },
            [NEXT_QUESTION]: 0,
    			  [TYPE]: TYPE_BUTTON,
    			  [OPTIONS]: [
    				{
    				    [NEXT_QUESTION]: 1,
    					  [VALUE]: 0,
                [STATEMENT]: STATEMENT_YES,
    					  [DB_VALUE]: DB_VALUE_YES
    				},
    				{
    					  [NEXT_QUESTION]: 1,
    					  [VALUE]: 1,
                [STATEMENT]: STATEMENT_NO,
                [DB_VALUE]: DB_VALUE_NO
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
    		},

      // Rapport building
        // {
        //     [ID]: "300.0 Opener",
        //     [STATEMENT]:"Hi",
        //     [OPTIONS]:[
        //         {
        //             [OPTION_NAME]: "hi reply",
        //             [STATEMENT]: "Hi!",
        //             [NEXT_QUESTION]: "305.0 Questioner",
        //             [VALUE]:0
        //         },
        //         {
        //             [OPTION_NAME]: "what's up",
        //             [STATEMENT]: "Hi! What's up?",
        //             [NEXT_QUESTION]: 1.0,
        //             [VALUE]:1
        //         }
        //     ],
        //     [TYPE]:TYPE_BUTTON
        // },
        // {
        //     [ID]: "305.0 Questioner",
        //     [STATEMENT]:"How are you?",
        //     [OPTIONS]:[
        //         {
        //             [OPTION_NAME]: "doing good",
        //             [STATEMENT]: "Great!",
        //             [NEXT_QUESTION]: "306.0 compliment because all well",
        //             [VALUE]:0
        //         },
        //         {
        //             [OPTION_NAME]: "sick",
        //             [STATEMENT]: "Sick",
        //             [NEXT_QUESTION]: 1.0,
        //             [VALUE]:1
        //         },
        //         {
        //             [OPTION_NAME]: "bad day",
        //             [STATEMENT]: "Bad day",
        //             [NEXT_QUESTION]: 1.0,
        //             [VALUE]:1
        //         },
        //     ],
        //     [TYPE]:TYPE_BUTTON
        // },
        // {
        //     [ID]: "306.0 Compliment because all well",
        //     [STATEMENT]:"That's great!",
        //     [NEXT_QUESTION]:"310.0 News?",
        //     [TYPE]:TYPE_NONE
        // },
        // {
        //     [ID]: "307.0 What?",
        //     [STATEMENT]:"What's new today?"
        // },
        // {
        //     [ID]: "310.0 News?",
        //     [STATEMENT]:"What's new today?"
        // },
        // {
        //     [ID]: "315.0 Weather?",
        //     [STATEMENT]:"Nice weather?"
        // },
        // {
        //     [ID]: "320.0 Facing problem?",
        //     [STATEMENT]:"I hope you're not facing any problem"
        // },
        // {
        //     [ID]: "225.0 Problem?",
        //     [CONTENT_VARIANTS]:[
        //         {
        //             [CONTENT_VARIANT_NAME]:"ask problem",
        //             [CONTENT_VARIANT_NAME]:"What's the problem happened",
        //         },
        //         {
        //             [CONTENT_VARIANT_NAME]:"ask event",
        //             [CONTENT_VARIANT_NAME]:"Why? What happened",
        //         },
        //         {
        //             [CONTENT_VARIANT_NAME]:"hope",
        //             [CONTENT_VARIANT_NAME]:"I hope it's not that bad",
        //         }
        //     ]
        // },
        // {
        //     [ID]: "-2.0 change topic",
        //     [CONTENT_VARIANTS]:[
        //         {
        //             [CONTENT_VARIANT_NAME]:"concise",
        //             [CONTENT_VARIANT_NAME]:"Let's change the topic",
        //         },
        //         {
        //             [CONTENT_VARIANT_NAME]:"generic",
        //             [CONTENT_VARIANT_NAME]:"Let's talk about something else",
        //         },
        //         {
        //             [CONTENT_VARIANT_NAME]:"regret",
        //             [CONTENT_VARIANT_NAME]:"I'm not smart enough. Let's discuss something else",
        //         }
        //     ],
        //     [NEXT_QUESTION]:1.0
        // },

    ],

    CONTENT_VARIANTS,
    CONTENT_VARIANT_NAME,
    STATEMENT,
    NEXT_QUESTION_LIST,
    NEXT_QUESTION_VARIANTS,
    NEXT_QUESTION,
    USUAL_ASK,
    DEFAULT_ASK,
    VARIANT_PROBABILITY,
    OPTIONS,
    OPTION_STATEMENT_VARIANTS,
    OPTION_VARIANT_NAME,
    TYPE,
    ID,
    BRANCHES,
    DB_VALUE,
    VALUE,
    COMMAND,
    LANG_BANGLA,
    LANG_HINDI,
    LANG_ENGLISH,
    DESCRIPTION_IMAGE,
    SKIP_PROBABILITY,
    FACT,
    STATEMENT_YES,
    STATEMENT_NO,
    STATEMENT_TRUE,
    STATEMENT_FALSE,
    STATEMENT_WHY_NOT
}
