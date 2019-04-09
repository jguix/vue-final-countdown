import TfcBaseRibbon from '@/components/BaseRibbon.vue';
import { shallowMount } from '@vue/test-utils';

const text = 'TEST';

describe('BaseRibbon.vue', () => {
  it('renders the correct markup', () => {
    const wrapper = shallowMount(TfcBaseRibbon, {
      propsData: { text },
    });
    expect(wrapper.html()).toContain(
      '<div class="counter-ribbon"><span>TEST</span></div>',
    );
  });

  it('renders an empty ribbon when no text is provided', () => {
    const wrapper = shallowMount(TfcBaseRibbon);
    expect(wrapper.html()).toContain(
      '<div class="counter-ribbon"><span>&nbsp;</span></div>',
    );
  });
});
