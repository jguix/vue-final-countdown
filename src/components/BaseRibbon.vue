<template>
  <div class="counter-ribbon">
    <span>{{ text || '&nbsp;' }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TfcBaseRibbon extends Vue {
  @Prop() private text!: string;
}
</script>

<style lang="scss" scoped>
.counter-ribbon {
  position: absolute;
  left: -5px;
  top: -5px;
  overflow: hidden;
  width: 75px;
  height: 75px;
  text-align: right;
}

.counter-ribbon span {
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  width: 100px;
  display: block;
  background: #79a70a;
  background: linear-gradient(#00c9a8 0%, #00a78b 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px;
  left: -21px;
}

.counter-ribbon span::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid #00a78b;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #00a78b;
}

.counter-ribbon span::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #00a78b;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #00a78b;
}
</style>