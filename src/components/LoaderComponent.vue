<template>
  <div class="cntntLoad" v-if="isLoading">
    <img width="40" height="40" src="@/assets/images/loader.gif" />
  </div>
</template>

<script>
export default {
  props: ["isLoading"],
};
</script>

<style lang="scss">
.cntntLoad img,
.darkLoader img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
}

.cntntLoad {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  background: white;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  transform: translate(-50%, -50%);
}
</style>
