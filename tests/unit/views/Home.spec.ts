import TfcHome from '@/views/Home.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

const $router = {
  push: (params: any) => {},
};

const $store = {
  state: {
    counters: [{}, {}],
  },
};

let wrapper: Wrapper<TfcHome>;

describe('Counter.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(TfcHome, {
      mocks: {
        $router,
        $store,
      },
    });
  });

  it('should have a div with class "home"', () => {
    expect(wrapper.contains('.home')).toBe(true);
  });

  it('should have a counter list', () => {
    expect(wrapper.contains('tfc-counter-list-stub')).toBe(true);
  });

  it('should navigate to new page on fab click', () => {
    const spy = jest.spyOn($router, 'push');
    wrapper.find('tfc-base-fab-stub').vm.$emit('click');

    expect(spy).toHaveBeenCalledWith('/new');
  });
});
