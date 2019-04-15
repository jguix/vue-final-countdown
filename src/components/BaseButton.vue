<template>
  <a class="button" :class="'button-'+type" @click="$emit('click')">{{ text }}</a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class TfcBaseButton extends Vue {
  @Prop() private text!: string;
  @Prop() private type!: 'positive' | 'negative' | 'disabled';
}
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  cursor: pointer;
  color: $base-white;
  font-family: $typeface-menus;
  font-size: 17px;
  padding: 16px 31px;
  text-decoration: none;
}

.button-positive {
  background-color: $button-positive;
}

.button-negative {
  background-color: $button-negative;
}

.button-disabled {
  background-color: $button-disabled;
}

.button-positive:hover {
  background-color: $button-positive-accent;
}

.button-negative:hover {
  background-color: $button-negative-accent;
}

:not(.button-disabled).button:active {
  transform: translateY(2px);
}

@media (max-width: 480px) {
  .button {
    padding: 12px 18px;
    font-size: 14px;
  }
}
</style>