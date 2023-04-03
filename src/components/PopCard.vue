<template>
  <div v-if="imgFetched" class="w-full p-2">
    <div class="group relative">
      <img
        :src="popData.img"
        class="w-full aspect-square object-cover group-hover:opacity-20 ease-in-out duration-200"
      />
      <p
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block text-xs w-full p-4"
      >
        {{ popData.desc }}
      </p>
    </div>
    <h2>{{ popData.title }}</h2>
    <h3>{{ popData.singer }}</h3>
    <h3>{{ popData.release }}</h3>
  </div>
  <div v-else class="p-2 flex flex-col gap-1">
    <div class="group relative">
      <div
        class="w-full aspect-square object-cover group-hover:opacity-20 ease-in-out duration-200 animate-pulse bg-gray-300"
      ></div>
    </div>
    <div class="animate-pulse bg-gray-300 w-1/2 h-4"></div>
    <div class="animate-pulse bg-gray-300 w-1/4 h-4"></div>
    <div class="animate-pulse bg-gray-300 w-1/4 h-4"></div>
  </div>
</template>
<script>
import openai from "@/openai";
import popsData from "@/data/fake-pops.js";

export default {
  name: "PopCard",
  props: {
    popId: Number,
  },
  data() {
    return {
      popData: Object,
      imgFetched: false,
    };
  },
  methods: {
    getPopData(id) {
      return popsData.find((pop) => pop.id === id);
    },
    async getImg() {
      let response = await openai.createImage({
        prompt: `[Cover Art For Pop Music] #title: ${this.popData.title}, #singer: ${this.popData.singer}, #release: ${this.popData.release}`,
        n: 1,
        size: "512x512",
      });
      return response.data.data[0].url;
    },
  },
  async mounted() {
    this.popData = this.getPopData(this.popId);
    try {
      this.popData.img = await this.getImg();
      this.imgFetched = true;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
<style></style>
