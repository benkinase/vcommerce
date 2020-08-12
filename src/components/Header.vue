<template>
  <div class>
    <nav class="navbar navbar-expand-lg navbar-light bg-warning">
      <router-link to="/" class="navbar-brand">E-com</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin" class="nav-link">Admin</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <a
            class="btn btn-outline-success my-2 my-sm-0"
            data-toggle="modal"
            data-target="#login"
          >Login | Signup</a>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.nav-item .nav-link,
.navbar-brand {
  color: rgb(253, 253, 251);
  transition: all 0.5s linear;
}

.nav-item .nav-link:hover {
  color: bisque;
  font-weight: 600;
}
ul {
  margin-left: 2rem;
}
</style>
