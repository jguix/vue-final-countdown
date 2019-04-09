import TfcBaseButton from '@/components/BaseButton.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

const text = 'TEST';
const type = 'positive';
let wrapper: Wrapper<TfcBaseButton>;

describe('BaseButton.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(TfcBaseButton, {
      propsData: { text, type },
    });
  });

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain(
      '<a class="button button-positive">TEST</a>',
    );
  });

  it('should emit click event when clicked', () => {
    const a = wrapper.find('a');
    a.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
});
