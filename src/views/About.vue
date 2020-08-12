<template>
  <div>
    <div class="about">
      <Header />
      <h1>This is an about page</h1>
    </div>
    <span class="foot">
      <Footer />
    </span>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "About",
  components: {
    Header,
    Footer,
  },
};
</script>
<style scoped>
.foot {
  margin-top: 50px;
}
</style>
