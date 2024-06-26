import { createStore } from "redux";
import { root_reducer, root_state_t, initial_houses_state } from "./reducers";

import { createMigrate, persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const migrations = {
  0: (state: any) => {
    return { ...state, houses: undefined };
  },
  1: (state: any) => {
    return { ...state, houses: undefined };
  },
  2: (state: any) => {
    return { ...state, game: undefined };
  },
  3: (state: any) => {
    return undefined;
  },
  4: (state: any) => {
    return {
      ...state,
      game: {
        ...state.game,
        history: [],
        current: {
          ...state.game.current,
          decks: [...state.game.current.decks, { cards: [], num_unknowns: 0 }],
        },
      },
    };
  },
  5: (state: any) => {
    return {
      ...state,
      game: {
        ...state.game,
        history: [],
        include_expansion_cards: false,
        current: {
          ...state.game.current,
          houses: {
            ...state.game.current.houses,
            Ixians: initial_houses_state.Ixians,
            Tleilaxu: initial_houses_state.Tleilaxu,
          },
        },
      },
    };
  },
  6: (state: any) => {
    return {
      ...state,
      game: {
        ...state.game,
        history: [],
        include_expansion_cards: false,
        current: {
          ...state.game.current,
          houses: {
            ...state.game.current.houses,
            Ixians: initial_houses_state.Ixians,
            Tleilaxu: initial_houses_state.Tleilaxu,
            CHOAM: initial_houses_state.CHOAM,
            Richese: initial_houses_state.Richese,
          },
        },
      },
    };
  },
  7: (state: any) => {
    return {
      ...state,
      game: {
        ...state.game,
        history: [],
        include_expansion_cards: false,
        current: {
          ...state.game.current,
          houses: {
            ...state.game.current.houses,
            Ixians: initial_houses_state.Ixians,
            Tleilaxu: initial_houses_state.Tleilaxu,
            CHOAM: initial_houses_state.CHOAM,
            Richese: initial_houses_state.Richese,
            Ecaz: initial_houses_state.Ecaz,
            Moritani: initial_houses_state.Moritani,
          },
        },
      },
    };
  },
  8: (state: any) => {
    return {
      ...state,
      game: {
        ...state.game,
        history: [],
        include_ixians_expansion_cards: false,
        include_ecaz_expansion_cards: false,
        current: {
          ...state.game.current,
          houses: {
            ...state.game.current.houses,
            Ixians: initial_houses_state.Ixians,
            Tleilaxu: initial_houses_state.Tleilaxu,
            CHOAM: initial_houses_state.CHOAM,
            Richese: initial_houses_state.Richese,
            Ecaz: initial_houses_state.Ecaz,
            Moritani: initial_houses_state.Moritani,
          },
        },
      },
    };
  },
};

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations),
  version: 8,
};

const pReducer = persistReducer<root_state_t>(persistConfig, root_reducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
