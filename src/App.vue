<template>
  <div
    class="md:h-screen w-screen flex flex-col items-center justify-center overflow-y-scroll overflow-x-hidden"
  >
    <HeaderBar></HeaderBar>
    <main class="w-full flex flex-col items-center">
      <router-view></router-view>
    </main>
    <FooterBar/>
  </div>
</template>

<script>
import FooterBar from "./components/FooterBar.vue";
import HeaderBar from "./components/HeaderBar.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
    FooterBar
},
};
</script>

<style></style>
