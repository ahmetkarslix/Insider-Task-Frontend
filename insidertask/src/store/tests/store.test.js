import { createStore } from 'vuex';
import store, { lengthToPixel } from '../store';
import { MUTATIONS, ACTIONS } from '../mutation-types';

jest.setTimeout(10000);

describe('Vuex Store Tests', () => {
  test('lengthToPixel should calculate pixel length correctly', () => {
    const length = 1000;
    const condition = 50;
    const pixelLength = lengthToPixel(length, condition);
    expect(pixelLength).toBe((40 / 1000) * length * (condition / 100));
  });

  test('SET_HORSES mutation should set the horses state', () => {
    const horses = [{ id: 1, name: 'Test Horse', condition: 100 }];
    store.commit(MUTATIONS.SET_HORSES, horses);
    expect(store.state.horses).toEqual(horses);
  });

  test('GENERATE_HORSES action should generate horses correctly', async () => {
    await store.dispatch(ACTIONS.GENERATE_HORSES);
    expect(store.state.horses.length).toBe(20);
    expect(store.state.horses[0]).toHaveProperty('name');
    expect(store.state.horses[0]).toHaveProperty('condition');
  });

  test('NEXT_LAP mutation should advance the race to the next lap', () => {
    store.commit(MUTATIONS.NEXT_LAP);
    expect(store.state.currentLapIndex).toBe(0);
    store.commit(MUTATIONS.NEXT_LAP);
    expect(store.state.currentLapIndex).toBe(1);
  });

  test('UPDATE_HORSE_CONDITIONS mutation should update horses conditions', () => {
    const horses = [
      { id: 1, name: 'Horse 1', condition: 100 },
      { id: 2, name: 'Horse 2', condition: 90 }
    ];
    store.commit(MUTATIONS.SET_HORSES, horses);

    const updatedHorses = [
      { id: 1, name: 'Horse 1', condition: 80 },
      { id: 2, name: 'Horse 2', condition: 70 }
    ];
    store.commit(MUTATIONS.UPDATE_HORSE_CONDITIONS, updatedHorses);
    expect(store.state.horses).toEqual(updatedHorses);
  });
});