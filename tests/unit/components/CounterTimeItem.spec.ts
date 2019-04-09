import TfcCounterTimeItem from '@/components/CounterTimeItem.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

const value = '12';
const units = 'seconds';
let wrapper: Wrapper<TfcCounterTimeItem>;

describe('BaseFab.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(TfcCounterTimeItem, {
      propsData: { value, units },
    });
  });

  it('should have a div with class "counter-time-item"', () => {
    expect(wrapper.contains('.counter-time-item')).toBe(true);
  });

  it('should render the time value', () => {
    expect(wrapper.find('.counter-time-item-value').text()).toContain(value);
  });

  it('should render the time units', () => {
    expect(wrapper.find('.counter-time-item-units').text()).toContain(units);
  });
});
