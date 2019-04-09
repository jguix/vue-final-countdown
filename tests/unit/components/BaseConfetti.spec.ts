import TfcBaseConfetti from '@/components/BaseConfetti.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

const text = 'TEST';
let wrapper: Wrapper<TfcBaseConfetti>;

describe('BaseConfetti.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(TfcBaseConfetti, {
      propsData: { text },
    });
  });

  it('should have a div with class "confetti"', () => {
    expect(wrapper.contains('.confetti')).toBe(true);
  });

  it('should have several divs with class "confetti-piece"', () => {
    expect(wrapper.findAll('.confetti-piece')).toHaveLength(13);
  });
});
