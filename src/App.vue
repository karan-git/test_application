<template>
  <div id="app">
    <navbar-component v-if="$cookies.get('token')" />

    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavbarComponent from "./components/NavbarComponent.vue";
export default {
  computed: {
    ...mapState(["apiSuccess", "errorMsg"]),
  },
  watch: {
    errorMsg() {
      if (!this.apiSuccess && this.errorMsg !== "") {
        this.$toast.error(this.errorMsg);
      }
    },
  },
  components: { NavbarComponent },
};
</script>
<style lang="scss">
#app {
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
