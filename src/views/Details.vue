<template>
  <div class="counter-wrapper">
    <tfc-counter class="counter" :counter="counter"/>
    <div class="button-wrapper">
      <tfc-base-button text="Edit counter" type="positive" @click="editCounter"/>
      <tfc-base-button text="Delete counter" type="negative" @click="deleteCounter"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TfcCounter from '@/components/Counter.vue';
import TfcBaseButton from '@/components/BaseButton.vue';

@Component({
  components: {
    TfcCounter,
    TfcBaseButton,
  },
})
export default class TfcDetails extends Vue {
  public editCounter() {
    this.$router.replace(`/edit/${this.counter.id}`);
  }

  public deleteCounter() {
    this.$store.dispatch('deleteCounter', this.counter.id);
  }

  get counter() {
    return this.$store.getters.getCounter(Number(this.$route.params.id));
  }
}
</script>

<style lang="scss" scoped>
.counter-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}

.counter {
  max-height: 400px;
  max-width: 500px;
}

.button-wrapper {
  margin-top: 20px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
}
</style>