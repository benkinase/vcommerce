<template>
  <div class="product">
    <div class="container h-100 bg-light py-3">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>
            <p class="text-justify">
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
        <!-- CREATE PRODUCT-->
        <div class="product-test">
          <div class="form-group">
            <input
              type="text"
              placeholder="Product name"
              v-model="product.name"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Product price"
              v-model="product.price"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <input type="submit" @click="saveData" class="btn btn-outline" />
          </div>
        </div>
        <hr />
        <!-- READ PRODUCT-->
        <h3>Product list: {{products.length}}</h3>
        <table class="table-responsive">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <td>Modify</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{product.data().name}}</td>
                <td class="ml-5">${{product.data().price}}</td>
                <button @click="editProduct(product)" class="btn btn-info">edit</button>
                <button @click="deleteProduct(product.id)" class="btn btn-danger ml-2">delete</button>
              </tr>
            </tbody>
          </table>
        </table>
      </div>
    </div>

    <!-- Modal EDIT PRODUCT-->
    <div
      class="modal fade"
      id="edit"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                placeholder="Product name"
                v-model="product.name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Product price"
                v-model="product.price"
                class="form-control"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button @click="updateProduct" type="button" class="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal EDIT PRODUCT ends-->
  </div>
</template>

<script>
//imports
import JQuery from "jquery";
let $ = JQuery;
import { db } from "../firebase";
export default {
  name: "products",
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null
      },
      activeItem: null
    };
  },
  methods: {
    updateListener() {
      db.collection("products").onSnapshot(querySnapshot => {
        this.products = [];
        querySnapshot.forEach(doc => {
          this.products.push(doc);
        });
        console.log("Current products in doc: ", this.products.join(", "));
      });
    },
    updateProduct() {
      db.collection("products")
        .doc(this.activeItem)
        .update(this.product)
        .then(() => {
          console.log("Document successfully updated!");
          $("#edit").modal("hide");
          this.updateListener();
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },

    editProduct(product) {
      $("#edit").modal("show");
      this.product = product.data();
      this.activeItem = product.id;
    },
    deleteProduct(doc) {
      if (confirm("Delete this product?")) {
        //alert(doc);
        db.collection("products")
          .doc(doc)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      } else {
        console.log("");
      }
    },
    readData() {
      db.collection("products")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            this.products.push(doc);
          });
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
    },
    saveData() {
      db.collection("products")
        .add(this.product)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          this.readData();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    reset() {
      //Object.assign(this.$data, this.$options.data.apply(this));
    }
  },
  created() {
    this.readData();
  }
};
</script>

<style>
</style>
