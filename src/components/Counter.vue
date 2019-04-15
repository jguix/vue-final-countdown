<template>
  <div class="counter-card">
    <tfc-base-ribbon class="ribbon" v-if="hasExpired" text="EXPIRED"/>
    <div class="counter-image-wrapper">
      <tfc-base-confetti class="confetti" v-if="hasExpired && isDetailsPage"/>
      <img class="counter-image" :src="imgSrc">
    </div>
    <div class="counter-caption">
      <div class="counter-separator"></div>
      <div class="counter-time">
        <tfc-counter-time-item :value="days" units="days"/>
        <tfc-counter-time-item :value="hours" units="hours"/>
        <tfc-counter-time-item :value="minutes" units="minutes"/>
        <tfc-counter-time-item :value="seconds" units="seconds"/>
      </div>
      <div class="counter-title">
        <div class="counter-title-text">{{ counter.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment, { Moment } from 'moment';
import TfcCounterTimeItem from '@/components/CounterTimeItem.vue';
import TfcBaseConfetti from '@/components/BaseConfetti.vue';
import TfcBaseRibbon from '@/components/BaseRibbon.vue';
import { Counter } from '@/models/counter.model';

@Component({
  components: {
    TfcCounterTimeItem,
    TfcBaseConfetti,
    TfcBaseRibbon,
  },
})
export default class TfcCounter extends Vue {
  @Prop() private counter!: Counter;

  get days() {
    const days = this.counter.moment.diff(
      this.$store.getters.getCurrentMoment(),
      'days',
    );
    return days >= 0 ? days : 0;
  }

  get hours() {
    const hours =
      this.counter.moment.diff(
        this.$store.getters.getCurrentMoment(),
        'hours',
      ) % 24;
    return hours >= 0 ? hours : 0;
  }

  get minutes() {
    const minutes =
      this.counter.moment.diff(
        this.$store.getters.getCurrentMoment(),
        'minutes',
      ) % 60;
    return minutes >= 0 ? minutes : 0;
  }

  get seconds() {
    const seconds =
      this.counter.moment.diff(
        this.$store.getters.getCurrentMoment(),
        'seconds',
      ) % 60;
    return seconds >= 0 ? seconds : 0;
  }

  get imgSrc() {
    return (
      this.counter.imgUrl || require(`../assets/${this.counter.imgName}.png`)
    );
  }

  get hasExpired() {
    return this.counter.moment.isSameOrBefore(
      this.$store.getters.getCurrentMoment(),
    );
  }

  get isDetailsPage() {
    return this.$route.path.includes('details');
  }
}
</script>

<style lang="scss" scoped>
.counter-card {
  width: 100%;
  height: 100%;
  background-color: $base-light-grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.counter-image-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.ribbon {
  position: absolute;
  z-index: 2;
}

.confetti {
  position: absolute;
  z-index: 1;
}

.counter-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.counter-caption {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.counter-separator {
  height: 5px;
  width: 100%;
  background-color: $base-red;
}

.counter-time {
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
}

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

.counter-title {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.counter-title-text {
  font-size: 24px;
  font-family: $typeface-inspiration;
}
</style>
