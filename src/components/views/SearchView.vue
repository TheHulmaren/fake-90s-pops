<template>
  <div class="w-full md:max-w-[1024px]">
    <div class="w-full grid grid-cols-1 md:grid-cols-3 p-2 gap-2 h-fit md:h-44">
      <div class="col-span-1 h-32 md:h-full">
        <SearchBox />
      </div>
      <ChatResponse
        v-if="matchingDone && !errorOccured"
        class="col-span-2 h-32 md:h-full overflow-y-auto"
        :query-input="queryInput"
        :match-ids="matchedIds"
      ></ChatResponse>
      <div v-else class="col-span-2 h-32 md:h-full border border-gray-300 p-4">
        <p class="fetching-holder font-semibold">
          Finding relavant musics from database..
        </p>
      </div>
    </div>
    <ul v-if="!errorOccured" class="w-full grid grid-cols-1 md:grid-cols-3">
      <li v-for="id in matchedIds" :key="id" class="col-span-1">
        <PopCard :popId="id" />
      </li>
    </ul>
    <span v-if="errorOccured" class="text-red-500"
      >Error has occured during semantic searching process.</span
    >
  </div>
</template>
<script>
import openai from "@/openai";
import embeddings from "@/data/embeddings";
import PopCard from "@/components/PopCard.vue";
import ChatResponse from "@/components/ChatResponse.vue";
import SearchBox from "../SearchBox.vue";

export default {
  name: "SearchView",
  data() {
    return {
      matchedIds: [],
      matchingDone: false,
      errorOccured: false,
      queryInput: this.$route.query.query,
    };
  },
  components: {
    PopCard,
    ChatResponse,
    SearchBox,
  },
  methods: {
    async getEmbedding(text) {
      let response = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: text,
      });

      return response.data.data[0].embedding;
    },
    calculateCosineSimliarity(x, y) {
      var result = [];
      for (var i = 0; i < x.length; i++) {
        result.push(x[i] * y[i]);
      }
      return result.reduce((a, b) => a + b);
    },
    getClosestMatch(queryEmbedding, amount) {
      embeddings.sort((a, b) => {
        return (
          this.calculateCosineSimliarity(queryEmbedding, b.embedding) -
          this.calculateCosineSimliarity(queryEmbedding, a.embedding)
        );
      });

      return embeddings.slice(0, amount);
    },
    async searchPops() {
      let queryEmbedding = await this.getEmbedding(this.queryInput);
      let closestMatches = this.getClosestMatch(queryEmbedding, 3);
      return closestMatches.map((match) => match.id);
    },
  },
  async mounted() {
    console.log(process.env.VUE_APP_OPENAI_API_KEY);
    try {
      this.matchedIds = await this.searchPops();

      this.matchingDone = true;
      this.errorOccured = false;
    } catch (err) {
      console.log(err);
      this.errorOccured = true;
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
