<template>
  <div class="counter-time-item">
    <div class="counter-time-item-value">{{ value }}</div>
    <div class="counter-time-item-units">{{ units }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment, { Moment } from "moment";

@Component
export default class TfcCounterTimeItem extends Vue {
  @Prop() private value!: string;
  @Prop() private units!: string;
}
</script>

<style lang="scss" scoped>
.counter-time-item {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.counter-time-item-value {
  flex: 1;
  width: 100%;
  font-size: 56px;
  line-height: 60px;
  font-family: $typeface-readable;
}

.counter-time-item-units {
  height: 20px;
  width: 100%;
  font-size: 18px;
  font-family: $typeface-readable;
}
</style>