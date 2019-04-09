import TfcAbout from '@/views/About.vue';
import { shallowMount } from '@vue/test-utils';

let wrapper: any;

describe('Counter.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(TfcAbout);
  });

  it('should have a div with class "about"', () => {
    expect(wrapper.contains('.about')).toBe(true);
  });

  it('should have mimacom logo', () => {
    expect(wrapper.contains('.mimacom-logo')).toBe(true);
  });
});
