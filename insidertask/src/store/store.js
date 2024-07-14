import { createStore } from 'vuex';
import { MUTATIONS, ACTIONS } from './mutation-types';

export function generateRandomName(usedNames) {
  const names = [
    'Harun', 'Barkan', 'Ahmet', 'Alperen', 'Aliye', 'Alper', 'Azat', 'Ayça',
    'Seher', 'Canberk', 'Onat', 'Emre', 'Tuğrul', 'Beyza', 'Betül', 'Nur',
    'Barış', 'Aylin', 'Zeynep', 'Erhan'
  ];
  let name;
  do {
    name = names[Math.floor(Math.random() * names.length)];
  } while (usedNames.has(name));
  usedNames.add(name);
  return name;
}

export function generateRandomColor(usedColors) {
  const letters = '0123456789ABCDEF';
  let color;
  do {
    color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (usedColors.has(color));
  usedColors.add(color);
  return color;
}

export function generateUniqueCondition(usedConditions) {
  let condition;
  do {
    condition = Math.floor(Math.random() * 71) + 30;
  } while (usedConditions.has(condition));
  usedConditions.add(condition);
  return condition;
}

export function lengthToPixel(length, condition) {
  const baseSpeed = 40; 
  return (baseSpeed / 1000) * length * (condition / 100);
}

const store = createStore({
  state: {
    horses: [],
    selectedHorses: [],
    program: [],
    results: [],
    raceRunning: false,
    raceStartTime: null,
    intervalId: null,
    currentLapIndex: -1,
    lapLengthInPixels: 500,
    laps: [
      { length: 1200 },
      { length: 1400 },
      { length: 1600 },
      { length: 1800 },
      { length: 2000 },
      { length: 2200 }
    ]
  },
  getters: {
    selectedHorses(state) {
      return state.selectedHorses;
    },
    program(state) {
      return state.program;
    },
    results(state) {
      return state.results;
    },
    currentLapLength(state) {
      return state.laps[state.currentLapIndex]?.length || 0;
    },
    stepSize(state) {
      return state.lapLengthInPixels / state.laps[state.currentLapIndex]?.length || 1;
    }
  },
  mutations: {
    [MUTATIONS.SET_HORSES](state, horses) {
      state.horses = horses;
    },
    [MUTATIONS.ADD_PROGRAM](state, program) {
      state.program.push(program);
    },
    [MUTATIONS.ADD_RESULTS](state, results) {
      state.results.push(results);
    },
    [MUTATIONS.SET_RACE_RUNNING](state, isRunning) {
      state.raceRunning = isRunning;
    },
    [MUTATIONS.SET_INTERVAL_ID](state, intervalId) {
      state.intervalId = intervalId;
    },
    [MUTATIONS.SET_SELECTED_HORSES](state, horses) {
      state.selectedHorses = horses.map(horse => ({ ...horse, finishTime: 0, position: 0 }));
    },
    [MUTATIONS.START_RACE](state) {
      state.raceRunning = true;
      state.raceStartTime = Date.now();
    },
    [MUTATIONS.UPDATE_HORSE_POSITION](state, { index, position }) {
      const horse = state.selectedHorses[index];
      horse.position = position;
      if (position >= state.lapLengthInPixels && horse.finishTime === 0) {
        horse.finishTime = (Date.now() - state.raceStartTime) / 1000;
        state.results[state.currentLapIndex].push(horse);
      }
    },
    [MUTATIONS.PAUSE_RACE](state) {
      state.raceRunning = false;
      clearInterval(state.intervalId);
    },
    [MUTATIONS.NEXT_LAP](state) {
      state.currentLapIndex++;
      state.results.push([]);
      state.selectedHorses.forEach(horse => {
        horse.position = 0;
        horse.finishTime = 0;
      });
    },
    [MUTATIONS.DECREASE_CONDITIONS](state) {
      state.horses = state.horses.map(horse => {
        if (state.selectedHorses.find(selectedHorse => selectedHorse.id === horse.id)) {
          return {
            ...horse,
            condition: Math.max(30, horse.condition - Math.floor(Math.random() * 20) + 1)
          };
        }
        return horse;
      });
    },
    [MUTATIONS.INCREASE_CONDITIONS](state) {
      state.horses = state.horses.map(horse => {
        if (!state.selectedHorses.find(selectedHorse => selectedHorse.id === horse.id)) {
          return {
            ...horse,
            condition: Math.min(100, horse.condition + Math.floor(Math.random() * 20) + 1)
          };
        }
        return horse;
      });
    },
    [MUTATIONS.UPDATE_HORSE_CONDITIONS](state, horses) {
      state.horses = horses;
    }
  },
  actions: {
    [ACTIONS.GENERATE_HORSES]({ commit }) {
      const horses = [];
      const usedNames = new Set();
      const usedColors = new Set();
      const usedConditions = new Set();
      for (let i = 0; i < 20; i++) {
        horses.push({
          id: i + 1,
          name: generateRandomName(usedNames),
          condition: generateUniqueCondition(usedConditions),
          color: generateRandomColor(usedColors),
          position: 0,
          finishTime: 0,
        });
      }
      commit(MUTATIONS.SET_HORSES, horses);
    },
    [ACTIONS.GENERATE_PROGRAM]({ state, commit }) {
      for (let i = 0; i < state.laps.length; i++) {
        const selectedHorses = [];
        const horseList = [...state.horses];
        for (let j = 0; j < 10; j++) {
          const randomIndex = Math.floor(Math.random() * horseList.length);
          selectedHorses.push(horseList.splice(randomIndex, 1)[0]);
        }
        commit(MUTATIONS.ADD_PROGRAM, selectedHorses);
      }
    },
    async [ACTIONS.START_RACE]({ state, commit, dispatch }) {
      if (!state.raceRunning) {
        if (state.currentLapIndex === -1) {
          commit(MUTATIONS.NEXT_LAP);
          commit(MUTATIONS.SET_SELECTED_HORSES, state.program[state.currentLapIndex]);
        }
        commit(MUTATIONS.START_RACE);
        await dispatch(ACTIONS.RUN_RACE);
        commit(MUTATIONS.PAUSE_RACE);

        if (state.currentLapIndex < state.laps.length - 1) {
          commit(MUTATIONS.DECREASE_CONDITIONS);
          commit(MUTATIONS.INCREASE_CONDITIONS);
          commit(MUTATIONS.NEXT_LAP);
          commit(MUTATIONS.SET_SELECTED_HORSES, state.program[state.currentLapIndex]);
          commit(MUTATIONS.START_RACE);
          await dispatch(ACTIONS.RUN_RACE);
        }
      }
    },
    [ACTIONS.RUN_RACE]({ state, commit }) {
      return new Promise(resolve => {
        const raceInterval = setInterval(() => {
          let raceFinished = true;
          state.selectedHorses.forEach((horse, index) => {
            if (horse.position < state.lapLengthInPixels) {
              const newPosition = Math.min(horse.position + lengthToPixel(state.laps[state.currentLapIndex].length, horse.condition), state.lapLengthInPixels);
              commit(MUTATIONS.UPDATE_HORSE_POSITION, { index, position: newPosition });
              raceFinished = false;
            }
          });
          if (raceFinished) {
            clearInterval(raceInterval);
            resolve();
          }
        }, 1000);
        commit(MUTATIONS.SET_INTERVAL_ID, raceInterval);
      });
    },
    [ACTIONS.PAUSE_RACE]({ commit }) {
      commit(MUTATIONS.PAUSE_RACE);
    },
    [ACTIONS.RESET_RESULTS]({ commit }) {
      commit(MUTATIONS.ADD_RESULTS, []);
    }
  },
});

export default store;
