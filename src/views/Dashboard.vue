<template>
  <div class="dashboard">
    <div class="container h-100 bg-light py-3">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Dashboard</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              soluta doloribus autem voluptatem. Ducimus non voluptates
              consequatur atque fugit recusandae ab at, deleniti reprehenderit?
              Totam, nisi ad? Possimus quis repudiandae placeat deserunt
              voluptate quo hic, unde neque non accusamus iure consequatur
              molestias sint qui sapiente temporibus saepe, rem doloremque
              reiciendis.
            </p>
          </div>
          <div class="col-md-6">
            <img src="../assets/svg/overview.svg" alt class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
