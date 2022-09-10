<template>
  <div
    class="login m-auto w-50 d-flex align-items-center justify-content-center flex-column"
  >
    <h3 class="mb-4">Login</h3>
    <form class="w-100">
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="username"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="password"
        />
      </div>
    </form>
    <button class="btn btn-primary" @click="handleLogin">Submit</button>
    <loader :isLoading="isLoading" />
  </div>
</template>

<script>
import Loader from "@/components/LoaderComponent.vue";
export default {
  components: { Loader },
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    async handleLogin() {
      if (this.username == "" || this.password == "") {
        this.$toast.error("Both fields are required");
      } else {
        let payload = {
          username: this.username,
          password: this.password,
        };
        this.isLoading = true;
        await this.$store.dispatch("userAuth", payload);
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.login {
  height: 100vh;
}
</style>
