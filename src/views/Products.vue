<template>
  <div class="product">
    <div class="container h-100 bg-light py-3">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>
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
            <img src="../assets/svg/products.svg" alt class="img-fluid" />
          </div>
        </div>
        <div class="product-test">
          <div class="form-group">
            <input type="text" placeholder="Product Name" v-model="name" class="form-control" />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Price" v-model="price" class="form-control" />
          </div>
          <div class="form-group">
            <input type="submit" @click="save" class="btn btn-outline" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//imports
//import { db, fb } from "../firebase";
export default {
  name: "products",
  props: {
    msg: String
  },
  data() {
    return {
      name: null,
      price: null
    };
  },
  methods: {
    save() {}
  }
};
</script>

<style></style>
