<template>
  <div class="alert">
    <div class="alert" :class="mode" role="alert">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: ["mode"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
//props
.primary {
  color: #e9eef3;
  background-color: #09192b;
  border-color: #bb0a86;
}
.success {
  color: #f4f7fa;
  background-color: #0d7a13;
  border-color: #e66c08;
}

.warning {
  color: #f2eef8;
  background-color: #dbc81b;
  border-color: #06315e;
}

.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0.2rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
</style>
