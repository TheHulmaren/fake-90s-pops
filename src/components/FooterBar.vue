<template>
  <div class="w-full px-2 py-4 flex flex-col gap-1 items-center text-xs">
    <p>
      This portfolio of ours was built to showcase our skills of implementing
      semantic search, generative image creation, and chat completion.
    </p>
    <p>We used the <strong>OpenAI API</strong> in creating this portfolio.</p>
    <p>
      Currently all the data is stored in a couple of long JSON file, but we
      plan to expand it to a vector database such as Pinecone in the future.
    </p>
    <p class="mt-5">
      For more informations, please
      <a href="https://vanguardwebart.com" class="underline"
        >visit our website</a
      >
    </p>
    <span>2023 @ Vanguard Web Art.</span>
    <span>All rights reserved</span>
  </div>
</template>
<script>
export default {
  name: "FooterBar",
};
</script>
<style></style>
