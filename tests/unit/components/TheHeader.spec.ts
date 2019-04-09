import TfcTheHeader from '@/components/TheHeader.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<TfcTheHeader>;
const name = 'TEST';
const $router = {
  currentRoute: {
    name,
  },
  afterEach: () => (to: any, from: any) => {},
};

describe('Details.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(TfcTheHeader, {
      mocks: {
        // adds mocked `$route` object to the Vue instance
        // before mounting component
        $router,
      },
      stubs: ['router-link'],
    });
  });

  it('should have a div with class "the-header"', () => {
    expect(wrapper.contains('.the-header')).toBe(true);
  });

  it('should display the route name', () => {
    expect(wrapper.find('.the-header').text()).toContain(name);
  });

  it('should have a navigation section', () => {
    expect(wrapper.contains('.the-header-nav')).toBe(true);
  });

  it('should have router links', () => {
    expect(wrapper.findAll('router-link-stub')).toHaveLength(2);
  });
});
