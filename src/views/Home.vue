<template>
  <div class="home">
    <Header></Header>
    <Hero />
    <Login />
    <Register />
    <Products />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Hero from "@/components/Hero.vue";
import Products from "@/sections/Our-Products.vue";
import Footer from "@/components/Footer.vue";
//import LoginSignup from "@/components/auth/LoginSignup.vue";
import Register from "@/components/auth/Register.vue";
import Login from "@/components/auth/Login.vue";
export default {
  name: "Home",
  components: {
    Header,
    Hero,
    Products,
    Footer,
    Register,
    Login,
  },
};
</script>
<style lang="scss">
.home {
  position: relative;
}
</style>
