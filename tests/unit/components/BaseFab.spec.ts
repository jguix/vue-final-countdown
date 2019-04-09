import TfcBaseFab from '@/components/BaseFab.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<TfcBaseFab>;

describe('BaseFab.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(TfcBaseFab, {});
  });

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain(
      '<div class="fab"><div class="fab-icon">+</div></div>',
    );
  });

  it('should emit click event when clicked', () => {
    const fabIcon = wrapper.find('.fab-icon');
    fabIcon.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
});
