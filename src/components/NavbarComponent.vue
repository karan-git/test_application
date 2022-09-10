<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Application</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li
          class="nav-item"
          :class="{ active: tab.route == selectedTab }"
          v-for="(tab, i) in tabs"
          :key="i"
          @click="handleRoute(tab.route)"
        >
          <span class="nav-link font-weight-bold link">{{ tab.title }}</span>
        </li>
      </ul>
      <button class="btn btn-outline-secondary" @click="handleLogout">
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: "",
      tabs: [
        { route: "/users", title: "Users" },
        { route: "/skills", title: "Skills" },
      ],
    };
  },
  methods: {
    handleRoute(route) {
      this.selectedTab = route;
      this.$router.push(route).catch(() => {});
    },
    handleLogout() {
      this.$cookies.remove("token");
      setTimeout(() => {
        location.reload();
      }, 50);
    },
  },
  mounted() {
    setTimeout(() => {
      let route = this.$route.path;
      this.selectedTab = route;
    }, 100);
  },
};
</script>

<style lang="scss" scoped>
//
.link {
  cursor: pointer;
}
</style>
