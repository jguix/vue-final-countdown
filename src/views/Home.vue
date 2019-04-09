<template>
  <div class="home">
    <tfc-counter-list/>
    <tfc-base-fab @click="click"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment, { Moment } from "moment";
import TfcCounterList from "@/components/CounterList.vue"; // @ is an alias to /src
import TfcBaseFab from "@/components/BaseFab.vue";

Component.registerHooks(["beforeRouteEnter"]);

@Component({
  components: {
    TfcCounterList,
    TfcBaseFab
  }
})
export default class TfcHome extends Vue {
  click() {
    this.$router.push("/new");
  }

  beforeRouteEnter(to: string, from: string, next: Function) {
    next((vm: any) => {
      // this does not exist yet inside this lifecycle hook, we use vm
      if (vm.$store.state.counters.length === 0) {
        next({
          path: "/new"
        });
      }
    });
  }
}
</script>
