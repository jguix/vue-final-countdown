import TfcCounter from '@/components/Counter.vue';
import { Counter } from '@/models/counter.model';
import { shallowMount, Wrapper } from '@vue/test-utils';
import moment from 'moment';

const $route = {
  path: '/details',
};

const currentMoment = moment();

const counter: Counter = {
  id: 1,
  title: 'TEST',
  moment: currentMoment
    .clone()
    .add(1, 'days')
    .add(2, 'hours')
    .add(3, 'minutes')
    .add(4, 'seconds'),
  imgName: 'cat',
};

const expiredCounter: Counter = {
  id: 1,
  title: 'TEST',
  moment: currentMoment.clone().subtract(5, 'minutes'),
  imgUrl: 'https://dummyimage.com/600x400/000/fff',
};

const $store = {
  getters: {
    getCurrentMoment: () => currentMoment,
  },
  dispatch: (action: string, payload: any) => {},
};

let wrapper: Wrapper<TfcCounter>;

describe('Counter.vue', () => {
  describe('Future counter', () => {
    beforeEach(() => {
      wrapper = shallowMount(TfcCounter, {
        propsData: { counter },
        mocks: {
          $route,
          $store,
        },
      });
    });

    it('should have a div with class "counter-card"', () => {
      expect(wrapper.contains('.counter-card')).toBe(true);
    });

    it('should have a counter title', () => {
      expect(wrapper.find('.counter-title-text').text()).toContain(
        counter.title,
      );
    });

    it('should display an image', () => {
      expect(wrapper.contains('img.counter-image')).toBe(true);
    });

    it('should display proper time to expiration', () => {
      expect(
        wrapper.contains('tfc-counter-time-item-stub[value="1"][units="days"]'),
      ).toBe(true);
      expect(
        wrapper.contains('tfc-counter-time-item-stub[value="2"][units="hours"]'),
      ).toBe(true);
      expect(
        wrapper.contains(
          'tfc-counter-time-item-stub[value="3"][units="minutes"]',
        ),
      ).toBe(true);
      expect(
        wrapper.contains(
          'tfc-counter-time-item-stub[value="4"][units="seconds"]',
        ),
      ).toBe(true);
    });

    it('should not display a ribbon', () => {
      expect(wrapper.contains('.ribbon')).toBe(false);
    });

    it('should not display confetti', () => {
      expect(wrapper.contains('.confetti')).toBe(false);
    });
  });

  describe('Expired counter', () => {
    beforeEach(() => {
      wrapper = shallowMount(TfcCounter, {
        propsData: { counter: expiredCounter },
        mocks: {
          $route,
          $store,
        },
      });
    });

    it('should display an image', () => {
      expect(
        wrapper.contains(`img.counter-image[src="${expiredCounter.imgUrl}"]`),
      ).toBe(true);
    });

    it('should display expired time', () => {
      expect(
        wrapper.contains('tfc-counter-time-item-stub[value="0"][units="days"]'),
      ).toBe(true);
      expect(
        wrapper.contains('tfc-counter-time-item-stub[value="0"][units="hours"]'),
      ).toBe(true);
      expect(
        wrapper.contains(
          'tfc-counter-time-item-stub[value="0"][units="minutes"]',
        ),
      ).toBe(true);
      expect(
        wrapper.contains(
          'tfc-counter-time-item-stub[value="0"][units="seconds"]',
        ),
      ).toBe(true);
    });

    it('should display a ribbon', () => {
      expect(wrapper.contains('.ribbon')).toBe(true);
    });

    it('should display confetti', () => {
      expect(wrapper.contains('.confetti')).toBe(true);
    });
  });
});
