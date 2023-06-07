const { Configuration, OpenAIApi } = require("openai");
let { readFileSync } = require("fs")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // apiKey: readFileSync("./openaikey").toString()
});
const openai = new OpenAIApi(configuration);

async function chatGPTGeneration(customText){
  if (!configuration.apiKey) {
    console.error("compute.action.generateGPT : OpenAI API key not configured, please follow instructions in README.md.")// apiKey = ", configuration.apiKey)
    return;
  }

  try {
    const chat = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: generatePrompt(customText) } ],
      temperature: 0.8,
      frequency_penalty:0.1,
      presence_penalty:0.1,
      max_tokens: 128,
      top_p: 1,
    });
    console.log('chatGPT api response = ', chat.data)
    let gptResponse = chat.data.choices[0].message.content
    console.log(`compute.nlg gptResponse = ${gptResponse}`)
    return gptResponse
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`NLG.GPT - 500 : Error with OpenAI API request: ${error.message}`);
    }
  }
}

function generatePrompt(customTextByUser) {
  return `Give a short empathetic reply to "${customTextByUser}" with a follow up question`;
}

module.exports = { chatGPTGeneration }