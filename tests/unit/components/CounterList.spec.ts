import TfcCounterList from '@/components/CounterList.vue';
import { Counter } from '@/models/counter.model';
import { shallowMount, Wrapper } from '@vue/test-utils';
import moment from 'moment';

const $router = {
  push: (params: any) => {},
};

const counters: Counter[] = [
  {
    id: 1,
    title: 'TEST1',
    moment: moment().add(5, 'minutes'),
    imgName: 'https://dummyimage.com/600x400/000/fff',
  },
  {
    id: 2,
    title: 'TEST2',
    moment: moment().add(10, 'minutes'),
    imgName: 'https://dummyimage.com/600x400/fff/000',
  },
];

const $store = {
  getters: {
    getOrderedCounters: () => counters,
  },
};

let wrapper: Wrapper<TfcCounterList>;

describe('Counter.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(TfcCounterList, {
      mocks: {
        $router,
        $store,
      },
    });
  });

  it('should have a div with class "counter-grid"', () => {
    expect(wrapper.contains('.counter-grid')).toBe(true);
  });

  it('should have counters', () => {
    expect(wrapper.findAll('tfc-counter-stub').length).toBe(2);
  });

  it('should navigate to details page on click', () => {
    const spy = jest.spyOn($router, 'push');
    wrapper.findAll('div').wrappers[1].trigger('click');

    expect(spy).toHaveBeenCalledWith({ path: 'details/1' });
  });
});
