import { Counter } from '@/models/counter.model';
import TfcDetails from '@/views/Details.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import moment from 'moment';

const $router = {
  replace: (path: string) => {},
};

const $route = {
  params: {
    id: 1,
  },
};

const counter: Counter = {
  id: 1,
  title: 'TEST',
  moment: moment(),
  imgName: 'test',
};

const $store = {
  getters: {
    getCounter: (id: number) => counter,
  },
  dispatch: (action: string, payload: any) => {},
};

let wrapper: Wrapper<TfcDetails>;

describe('Details.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(TfcDetails, {
      mocks: {
        $router,
        $route,
        $store,
      },
    });
  });

  it('should have a div with class "counter-wrapper"', () => {
    expect(wrapper.contains('.counter-wrapper')).toBe(true);
  });

  it('should load the counter with id coming from the route param', () => {
    const spy = jest.spyOn($store.getters, 'getCounter');

    expect(wrapper.contains('tfc-counter-stub')).toBe(true);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should have a div with class "button-wrapper"', () => {
    expect(wrapper.contains('.button-wrapper')).toBe(true);
  });

  it('should have buttons', () => {
    expect(wrapper.findAll('tfc-base-button-stub')).toHaveLength(2);
  });

  it('should navigate to edit page on edit button click', () => {
    const spy = jest.spyOn($router, 'replace');
    wrapper.find('tfc-base-button-stub[text="Edit counter"]').vm.$emit('click');

    expect(spy).toHaveBeenCalledWith('/edit/1');
  });

  it('should call deleteCounter action on delete button click', () => {
    const spy = jest.spyOn($store, 'dispatch');
    wrapper
      .find('tfc-base-button-stub[text="Delete counter"]')
      .vm.$emit('click');

    expect(spy).toHaveBeenCalledWith('deleteCounter', 1);
  });
});
