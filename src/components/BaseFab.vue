<template>
  <div class="fab">
    <div class="fab-icon" @click="$emit('click')">+</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TfcBaseFab extends Vue {}
</script>

<style lang="scss" scoped>
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  background-color: $base-turquoise;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 4px 0px $base-dark-grey;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
}

.fab:active {
  box-shadow: 0px 1px 2px 0px $base-dark-grey;
  transform: translateY(2px);
}

.fab-icon {
  width: 100%;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  line-height: 36px;
  color: $base-white;
}

@media (max-width: 480px) {
  .fab {
    position: fixed;
    bottom: 60px;
    right: 60px;
  }
}
</style>