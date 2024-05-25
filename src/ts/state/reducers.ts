import { combineReducers, createReducer } from "@reduxjs/toolkit";
import {
  close_modal,
  disable_deck_tracking,
  house_add_card,
  house_add_unknown,
  house_assign_unknown,
  house_remove_card,
  house_remove_unknown,
  house_toggle_expand_cards,
  reset_game,
  return_to_deck,
  show_add_cards_modal,
  show_assign_unknown_modal,
  show_disable_tracking_modal,
  show_discard_unknown_modal,
  show_reset_game_modal,
  start_game,
  undo_action,
} from "ts/state/actions";
import { ENEMY_HOUSE_NAMES, house_name_t } from "ts/houses";
import { game_history_t, game_state_t, houses_state_t, view_state_t } from "ts/state/types";
import { card_sort, treachery_card_t } from "ts/treachery_card";
import initial_deck from "ts/state/initial_deck";
import expansion_deck from "ts/state/expansion_deck";

export const initial_houses_state: houses_state_t = {
  Atreides: {
    active: true,
    cards: [],
    name: "Atreides",
    show_cards: false,
    unknown_cards: [],
  },
  "Bene Gesserit": {
    active: false,
    cards: [],
    name: "Bene Gesserit",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  Emperor: {
    active: false,
    cards: [],
    name: "Emperor",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  Fremen: {
    active: false,
    cards: [],
    name: "Fremen",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  Harkonnen: {
    active: false,
    cards: [],
    name: "Harkonnen",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }, { deck_index: 0 }],
  },
  "Spacing Guild": {
    active: false,
    cards: [],
    name: "Spacing Guild",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  Ixians: {
    active: false,
    cards: [],
    name: "Ixians",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  Tleilaxu: {
    active: false,
    cards: [],
    name: "Tleilaxu",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  CHOAM: {
    active: false,
    cards: [],
    name: "CHOAM",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  Richese: {
    active: false,
    cards: [],
    name: "Richese",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  Ecaz: {
    active: false,
    cards: [],
    name: "Ecaz",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  },
  Moritani: {
    active: false,
    cards: [],
    name: "Moritani",
    show_cards: false,
    unknown_cards: [{ deck_index: 0 }],
  }
};

export const initial_game_state: game_state_t = {
  initialized: false,
  deck_tracking: true,
  include_expansion_cards: false,
  history: [],
  current: {
    decks: [
      { cards: [...initial_deck], num_unknowns: 0 },
      { cards: [], num_unknowns: 0 }, // and initialize a discard deck ready
    ],
    houses: initial_houses_state,
    draw_deck_index: 0,
  },
};

function clone_history(snapshot: game_history_t): game_history_t {
  return JSON.parse(JSON.stringify(snapshot));
}

function push_history(state: game_state_t, handler: (state: game_history_t) => void): game_state_t {
  const current = clone_history(state.current);
  handler(current);
  let history = [...state.history];
  if (history.length === 50) {
    // if the history length is too long, remove the oldest entry
    history.pop();
  }
  const new_state = {
    ...state,
    current,
    history: [state.current, ...history],
  };
  return new_state;
}

function getHouse(name: house_name_t, state: houses_state_t) {
  const house = state[name];
  if (!house.active) {
    throw new Error("House " + name + " not present in this game");
  }
  return house;
}

export const game_state_reducer = createReducer(initial_game_state, builder => {
  builder.addCase(undo_action, state => {
    if (state.history.length === 0) {
      return state;
    } else {
      const [previous, ...rest] = state.history;
      return {
        ...state,
        current: previous,
        history: rest,
      };
    }
  });

  builder.addCase(house_add_card, (state, action) => {
    return push_history(state, history => {
      let house = getHouse(action.payload.house, history.houses);
      house.cards.push(action.payload.card);
      house.cards.sort(card_sort);
      if (state.deck_tracking) {
        const deck = history.decks[history.draw_deck_index];
        deck.cards.splice(
          deck.cards.findIndex(c => c.id === action.payload.card.id),
          1
        );

        if (deck.cards.length - deck.num_unknowns === 0) {
          // We've exhausted this deck. Increment draw deck, and add a new discard deck if necessary
          history.draw_deck_index += 1;
          if (history.decks.length - 1 === history.draw_deck_index) {
            history.decks.push({ cards: [], num_unknowns: 0 });
          }
        }
      }
    });
  });

  builder.addCase(house_remove_card, (state, action) => {
    return push_history(state, history => {
      let house = getHouse(action.payload.house, history.houses);
      const [removed_card] = house.cards.splice(action.payload.index, 1);
      if (state.deck_tracking) {
        const discard_deck = history.decks[history.decks.length - 1];
        discard_deck.cards.push(removed_card);
        discard_deck.cards.sort(card_sort);
      }
    });
  });

  builder.addCase(house_add_unknown, (state, action) => {
    return push_history(state, history => {
      let house = getHouse(action.payload, history.houses);
      house.unknown_cards.push({ deck_index: history.draw_deck_index });

      if (state.deck_tracking) {
        const deck = history.decks[history.draw_deck_index];
        deck.num_unknowns += 1;

        if (deck.cards.length - deck.num_unknowns === 0) {
          // We've exhausted this deck. Increment draw deck, and add a new discard deck if necessary
          history.draw_deck_index += 1;
          if (history.decks.length - 1 === history.draw_deck_index) {
            history.decks.push({ cards: [], num_unknowns: 0 });
          }
        }
      }
    });
  });

  builder.addCase(house_remove_unknown, (state, action) => {
    return push_history(state, history => {
      let house = getHouse(action.payload.house, history.houses);
      const [unknown_card] = house.unknown_cards.splice(action.payload.unknown_index, 1);
      if (state.deck_tracking) {
        const deck = history.decks[unknown_card.deck_index];
        const [card] = deck.cards.splice(
          deck.cards.findIndex(c => c.id === action.payload.actual_card_id),
          1
        );

        deck.num_unknowns -= 1;
        // push this card into the current discard pile
        const discard_deck = history.decks[history.decks.length - 1];
        discard_deck.cards.push(card);
        discard_deck.cards.sort(card_sort);
      }
    });
  });

  builder.addCase(house_assign_unknown, (state, action) => {
    return push_history(state, history => {
      let house = getHouse(action.payload.house, history.houses);
      const [unknown_card] = house.unknown_cards.splice(action.payload.unknown_index, 1);

      if (state.deck_tracking) {
        const deck = history.decks[unknown_card.deck_index];
        const [card] = deck.cards.splice(
          deck.cards.findIndex(c => c.id === action.payload.actual_card_id),
          1
        );

        deck.num_unknowns -= 1;
        // push this card into the players hand
        house.cards.push(card);
        house.cards.sort(card_sort);
      } else {
        const deck = history.decks[0];
        house.cards.push(
          deck.cards.find(c => c.id === action.payload.actual_card_id) as treachery_card_t
        );
        house.cards.sort(card_sort);
      }
    });
  });

  builder.addCase(house_toggle_expand_cards, (state, action) => {
    let house = getHouse(action.payload.house, state.current.houses);
    house.show_cards = !house.show_cards;
  });

  builder.addCase(return_to_deck, (state, action) => {
    return push_history(state, history => {
      if (state.deck_tracking) {
        const discard_deck = history.decks[history.decks.length - 1];
        const card_index = discard_deck.cards.findIndex(c => c.id === action.payload.card_id);
        const [card] = discard_deck.cards.splice(card_index, 1);
        history.decks[history.draw_deck_index].cards.push(card);
        history.decks[history.draw_deck_index].cards.sort(card_sort);
      }
    });
  });

  builder.addCase(reset_game, _ => {
    return initial_game_state;
  });

  builder.addCase(start_game, (state, action) => {
    const history = state.current;
    for (let house of ENEMY_HOUSE_NAMES) {
      if (action.payload.houses[house]) {
        history.houses[house].active = true;
        if (action.payload.deck_tracking) {
          history.decks[0].num_unknowns += history.houses[house].unknown_cards.length;
        }
      }
    }

    state.initialized = true;
    state.deck_tracking = action.payload.deck_tracking;
    state.include_expansion_cards = action.payload.include_expansion_cards;
    if (state.include_expansion_cards) {
      const deck = history.decks[history.draw_deck_index];
      for (let expansion_card of expansion_deck) {
        deck.cards.push(expansion_card);
      }
    }

    state.current.decks[state.current.draw_deck_index].cards.sort(card_sort);
  });

  builder.addCase(disable_deck_tracking, state => {
    if (state.deck_tracking) {
      return {
        initialized: state.initialized,
        include_expansion_cards: state.include_expansion_cards,
        deck_tracking: false,
        current: {
          houses: state.current.houses,
          decks: [
            {
              cards: [
                ...initial_deck,
                ...(state.include_expansion_cards ? expansion_deck : []),
              ].sort(card_sort),
              num_unknowns: 0,
            },
          ],
          draw_deck_index: 0,
        },
        history: [],
      };
    } else {
      return state;
    }
  });
});

export const default_view_state: view_state_t = {
  active_modal: "overview",
  house_name: undefined,
};

export const view_state_reducer = createReducer(default_view_state, builder => {
  builder.addCase(close_modal, (state, _) => {
    return default_view_state;
  });

  builder.addCase(show_add_cards_modal, (state, action) => {
    return { ...default_view_state, house_name: action.payload, active_modal: "add_card" };
  });

  builder.addCase(show_reset_game_modal, state => {
    return { ...default_view_state, active_modal: "reset_game" };
  });

  builder.addCase(show_discard_unknown_modal, (state, action) => {
    state.active_modal = "discard_unknown";
    state.house_name = action.payload;
  });

  builder.addCase(show_assign_unknown_modal, (state, action) => {
    state.active_modal = "assign_unknown";
    state.house_name = action.payload;
  });

  builder.addCase(show_disable_tracking_modal, state => {
    state.active_modal = "disable_tracking";
  });
});

export const root_reducer = combineReducers({
  view: view_state_reducer,
  game: game_state_reducer,
});

export type root_state_t = ReturnType<typeof root_reducer>;
