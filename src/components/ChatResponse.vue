<template>
  <div class="p-2 px-4 border border-gray-300">
    <p v-if="fetched" id="responseText"></p>
    <p v-else class="fetching-holder font-semibold">
      Fetching a response from OpenAI..
    </p>
  </div>
</template>
<script>
import popsData from "@/data/fake-pops.js";
import openai from "@/openai";

export default {
  name: "ChatResponse",
  props: {
    matchIds: Array,
    queryInput: String,
  },
  data() {
    return {
      response: "",
      fetched: false,
      displayedText: "",
    };
  },
  methods: {
    getPopData(id) {
      return popsData.find((pop) => pop.id === id);
    },
    async getChatCompletion(assistantPrompt, userPrompt) {
      let response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "assistant", content: assistantPrompt },
          { role: "user", content: userPrompt },
        ],
      });

      return response.data.choices[0].message.content;
    },
    async fetchChatResponse() {
      let matchedPopsData = this.matchIds.map((id) => this.getPopData(id));
      let matchedPopsCorpus = matchedPopsData
        .map(
          (pop) =>
            `[Music Info Found] #title: ${pop.title}, #singer: ${pop.singer}, #release: ${pop.release}, #description: ${pop.desc}\n`
        )
        .join("");
      let assistantPrompt =
        matchedPopsCorpus +
        "\n\n[You are a music recommendation assist bot. Above are the music infos found on our music database regarding the user's query]\n[Never mention or recommend musics that are not in our music infos found]\n[Explain to users about why those songs are matched.]\n[Respond to query based on info of songs found. If the context is insufficient to answer the query, respond like 'I don't know' or 'I can't answer that']\n\n";

      let response = await this.getChatCompletion(
        assistantPrompt,
        this.queryInput
      );

      this.fetched = true;
      return response;
    },
    typewriterEffect(content) {
      let i = 0;
      let text = content;
      let speed = 15;
      let responseSection = document.getElementById("responseText");

      function typeWriter(target) {
        if (i < text.length) {
          target.innerHTML += text.charAt(i);
          i++;
          setTimeout(() => {
            typeWriter(target);
          }, speed);
        }
      }
      typeWriter(responseSection);
    },
  },
  async mounted() {
    this.response = await this.fetchChatResponse();
    if (this.fetched) {
      this.typewriterEffect(this.response);
    }
  },
};
</script>
<style>
.fetching-holder {
  animation: pulse 800ms cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}
</style>
