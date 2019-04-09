import moment, { Moment } from 'moment';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import {
  Counter,
  CounterDto,
  counterDtoFromCounter,
  counterFromCounterDto,
  datetimeFromMoment,
  momentFromDatetime,
} from './models/counter.model';
import router from './router';

export interface State {
  currentMoment: string;
  counters: CounterDto[];
  imgNames: string[];
}

// Vuex persistence using localStorage
// https://github.com/championswimmer/vuex-persist
// https://flaviocopes.com/vuex-persist-localstorage/
const vuexPersist = new VuexPersistence({
  key: 'tfcx',
  storage: localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    currentMoment: datetimeFromMoment(moment()),

    counters: [
      {
        // Add a 5 countdown for tutorial purposes on first run
        id: moment()
          .toDate()
          .getTime(),
        imgName: 'graduation',
        title: 'Learn how to use this app',
        datetime: datetimeFromMoment(moment().add('minutes', 5)),
      },
    ],

    imgNames: [
      'birthday',
      'birth',
      'cat',
      'christmas',
      'dog',
      'examination',
      'graduation',
      'match',
      'party',
      'presentation',
      'race',
      'trip',
      'wedding',
    ],
  },
  getters: {
    getCounters: (state) => (): Counter[] => {
      return state.counters.map((counterDto: CounterDto) =>
        counterFromCounterDto(counterDto),
      );
    },

    getCounter: (state, getters) => (id: number): Counter => {
      return getters
        .getCounters()
        .find((counter: Counter) => counter.id === id);
    },

    getCurrentMoment: (state) => (): Moment =>
      momentFromDatetime(state.currentMoment),

    getOrderedCounters: (state, getters) => () => {
      return getters
        .getCounters()
        .sort((counterB: Counter, counterA: Counter) =>
          counterB.moment.diff(counterA.moment),
        );
    },

    getRecentlyExpiredCounters: (state, getters) => () => {
      const now = momentFromDatetime(state.currentMoment);
      return getters
        .getCounters()
        .filter((counter: Counter) => counter.moment.isSame(now, 'seconds'));
    },
  },
  mutations: {
    updateCurrentMoment(state, currentMoment: Moment) {
      state.currentMoment = datetimeFromMoment(currentMoment);
    },

    addCounter(state, counter: Counter) {
      const newCounterDto = counterDtoFromCounter(counter);
      state.counters = [...state.counters, newCounterDto];
    },

    editCounter(state, counter: Counter) {
      const modifiedCounterDto = counterDtoFromCounter(counter);
      const filteredCounterDtos = state.counters.filter(
        (counterDto: CounterDto) => counterDto.id !== modifiedCounterDto.id,
      );
      state.counters = [...filteredCounterDtos, modifiedCounterDto];
    },

    deleteCounter(state, id: number) {
      state.counters = state.counters.filter(
        (counterDto: CounterDto) => counterDto.id !== id,
      );
    },
  },
  actions: {
    updateCurrentMoment({ commit, getters }) {
      const now = moment();
      commit('updateCurrentMoment', now);
      getters.getRecentlyExpiredCounters().forEach((counter: Counter) => {
        router.replace(`details/${counter.id}`);
      });
    },

    addCounter({ commit }, counter: Counter) {
      // Navigates without pushing a new history entry
      router.replace('/', () => {
        commit('addCounter', counter);
      });
    },

    editCounter({ commit }, counter: Counter) {
      // Navigates without pushing a new history entry
      router.replace('/', () => {
        commit('editCounter', counter);
      });
    },

    deleteCounter({ commit }, id: number) {
      // Navigates without pushing a new history entry
      router.replace('/', () => {
        commit('deleteCounter', id);
      });
    },
  },

  plugins: [vuexPersist.plugin],
});
