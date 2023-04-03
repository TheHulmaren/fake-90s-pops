const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.VUE_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;