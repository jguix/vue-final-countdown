<template>
  <div id="app">
    <tfc-the-header/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TfcTheHeader from "@/components/TheHeader.vue"; // @ is an alias to /src
import moment from "moment";
import { Counter } from "./models/counter.model";

@Component({
  components: {
    TfcTheHeader
  }
})
export default class App extends Vue {
  mounted() {
    this.registerInterval();
  }

  registerInterval() {
    setInterval(() => {
      this.$store.dispatch("updateCurrentMoment");
    }, 1000);
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Noto Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
}

.content {
  max-width: 1080px;
  margin: 0 auto;
  padding: 30px;
}
</style>
