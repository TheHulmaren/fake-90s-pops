<template>
  <form
    class="flex gap-2 items-stretch w-full h-full"
    @submit.prevent="onQuerySubmit()"
  >
    <textarea
      v-model="queryInput"
      type="text"
      class="focus:outline-0 border-4 bg-gray-100 resize-none px-2 query-input grow"
      placeholder="Search for musics.."
    />
    <button
      type="submit"
      class="px-2 border-gray-200 bg-gray-300 query-button border-4 self-start"
    >
      Search
    </button>
  </form>
</template>
<script>
export default {
  name: "SearchBox",
  data() {
    return {
      queryInput: this.$route.query.query,
    };
  },
  methods: {
    onQuerySubmit() {
      this.$router
        .push({ path: "search", query: { query: this.queryInput } })
        .then(() => {
          this.$router.go(this.$router.currentRoute);
        });
    },
  },
};
</script>
<style>
.query-input {
  border-style: inset;
  border-right-color: #d9d9d9;
  border-bottom-color: #d9d9d9;
}
.query-button {
  border-style: outset;
  border-right-color: white;
  border-bottom-color: white;
}
</style>
