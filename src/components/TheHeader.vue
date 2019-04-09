<template>
  <div class="the-header">
    <div class="the-header-title">{{ title }}</div>
    <div class="the-header-nav">
      <router-link to="/" data-cy-home>Home</router-link>&nbsp;|
      <router-link to="/about" data-cy-about>About</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TfcTheHeader extends Vue {
  title: string = "";

  mounted() {
    this.title = this.$router.currentRoute.name || "";

    this.$router.afterEach((to: any, from: any) => {
      this.title = to.name;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.the-header {
  background-color: $base-turquoise;
  height: 90px;
  width: 100%;
  padding-top: 20px;
  padding-left: 30px;
}

.the-header-title {
  font-size: 48px;
  font-family: $typeface-menus;
  color: $base-white;
}

.the-header-nav {
  font-family: $typeface-menus;
}

.the-header-nav a {
  font-weight: bold;
  color: $base-dark-grey;
}

.the-header-nav a.router-link-exact-active {
  color: $base-white;
}

@media (max-width: 480px) {
  .the-header {
    height: 70px;
  }

  .the-header-title {
    font-size: 32px;
  }
}
</style>
