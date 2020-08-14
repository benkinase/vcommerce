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

        <hr />
        <!-- TABLE: READ PRODUCT-->
        <h3 class="d-inline">Product list: {{ products.length }}</h3>
        <button @click="modalAdd()" class="btn btn-success float-right mb-1">
          Add New Product
        </button>
        <table class="table-responsive">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <td>Modify</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td class="ml-5">${{ product.price }}</td>
                <td class="ml-5">{{ product.description }}</td>
                <button @click="modalEdit(product)" class="btn btn-info">
                  <span><i class="fas fa-pen"></i></span>
                </button>
                <button @click="deleteProduct(product)" class="btn btn-danger">
                  <span><i class="fas fa-trash"></i></span>
                </button>
              </tr>
            </tbody>
          </table>
        </table>
      </div>
    </div>
    <!-- TABLE ENDS-->
    <!-- MODAL: Add, edit, update-->
    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ modal == "edit" ? "Edit Product" : "Add New Post" }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
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
                autocomplete="on"
                autofocus
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Product price"
                v-model="product.price"
                class="form-control"
                autocomplete="on"
              />
            </div>

            <div class="form-group">
              <vue-editor v-model="product.description"></vue-editor>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <input
                    type="text"
                    @keyup.enter="addTag()"
                    placeholder="Product tags"
                    v-model="tag"
                    class="form-control"
                  />
                  <div class="d-flex">
                    <p v-for="tag in product.tags" :key="tag.id">
                      <span class="p-1 mt-2 ml-1 btn btn-outline-info">{{
                        tag
                      }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input
                    @change="uploadImage"
                    type="file"
                    class="form-control-file"
                    id="exampleFormControlFile1"
                  />
                </div>
                <div class="form-group d-flex">
                  <div
                    class="p-1"
                    v-for="(image, index) in product.images"
                    :key="image.id"
                  >
                    <div class="img-wrapp">
                      <img :src="image" alt="" width="80px" />
                      <span
                        class="delete-img"
                        @click="deleteImage(image, index)"
                        >X</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="addProduct()"
              type="button"
              class="btn btn-info"
              v-if="modal == 'new'"
            >
              Add product
            </button>
            <button
              @click="updateProduct()"
              type="button"
              class="btn btn-info"
              v-if="modal == 'edit'"
            >
              Apply changes
            </button>
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
import Swal from "sweetalert2";
import { db, fb } from "../firebase";
import { VueEditor } from "vue2-editor";
let $ = JQuery;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

export default {
  name: "products",
  components: { VueEditor },
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null,
        description: null,
        tag: null,
        images: [],
      },
      activeItem: null,
      modal: null,
      tag: null,
    };
  },
  firestore() {
    return {
      products: db.collection("products"),
    };
  },
  methods: {
    uploadImage(e) {
      //console.log(e.target.files[0]);
      if (e.target.files[0]) {
        const file = e.target.files[0];
        var storageRef = fb.storage().ref(`products/${file.name}`);
        const uploadTask = storageRef.put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              //this.product.image = downloadURL;
              this.product.images.push(downloadURL);
              //console.log("File available at", downloadURL);
            });
          }
        );
      }
    },
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then(() => {
          console.log("image successfully deleted");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log("an error occurred while deleting image", error);
        });
    },

    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      };
    },
    // add product modal open and reset fields
    modalAdd() {
      this.modal = "new";
      this.reset();
      $("#product").modal("show");
    },
    // populate the fields
    modalEdit(product) {
      this.modal = "edit";
      this.product = product;
      $("#product").modal("show");
    },

    // effect the changes
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      Toast.fire({
        type: "success",
        title: "Updated  successfully",
      });
      $("#product").modal("hide");
    },

    deleteProduct(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          //const doc_id = doc[".key"];
          this.$firestore.products.doc(doc.id).delete();
          Toast.fire({
            type: "success",
            title: "Deleted  successfully",
          });
        }
      });
    },
    readData() {},
    addProduct() {
      this.$firestore.products.add(this.product);
      Toast.fire({
        type: "success",
        title: "Product created successfully",
      });
      $("#product").modal("hide");
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
.img-wrapp {
  position: relative;
}
.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover {
  cursor: pointer;
}
</style>
