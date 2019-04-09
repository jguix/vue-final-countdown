<template>
  <div class="counter-grid">
    <div v-for="counter in counters" :key="counter.id" @click="goToDetails(counter.id)">
      <tfc-counter :counter="counter"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TfcCounter from "@/components/Counter.vue"; // @ is an alias to /src

@Component({
  components: {
    TfcCounter
  }
})
export default class TfcCounterList extends Vue {
  goToDetails(id: number) {
    this.$router.push({ path: `details/${id}` });
  }

  get counters() {
    return this.$store.getters.getOrderedCounters();
  }
}
</script>

<style lang="scss" scoped>
.counter-grid {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-auto-rows: 350px;
}
</style>