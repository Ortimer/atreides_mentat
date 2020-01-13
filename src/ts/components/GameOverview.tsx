import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "ts/state/reducers";
import { ALL_HOUSE_NAMES, house_name_t } from "ts/houses";
import { resetGame } from "ts/state/actions";
import { HouseState } from "ts/state/types";
import EditSpiceModal from "ts/components/Modals/EditSpiceModal";
import HouseTile from "ts/components/HouseTile";
import ViewCardsModal from "./Modals/ViewCardsModal";

const Modal: React.FC = props => {
  const state = useSelector((root_state: RootState) => ({
    houses: root_state.houses,
    view: root_state.view,
  }));

  if (state.view.active_modal === "none") {
    return null;
  }

  const house = state.houses[state.view.house_name as house_name_t] as HouseState;
  switch (state.view.active_modal) {
    case "edit_spice": {
      return <EditSpiceModal house={house.name} spice={house.spice} />;
    }
    case "view_cards": {
      return <ViewCardsModal house={house.name} cards={house.cards} />;
    }
    default:
      return null;
  }
};

const GameOverview: React.FC = () => {
  const state = useSelector((state: RootState) => ({
    houses: state.houses,
  }));
  const dispatch = useDispatch();
  const housesArray: JSX.Element[] = [];
  for (let name of ALL_HOUSE_NAMES) {
    const houseState = state.houses[name];
    if (houseState !== undefined) {
      housesArray.push(
        <HouseTile house={name} spice={houseState.spice} key={name} cards={houseState.cards} />
      );
    }
  }
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {housesArray}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="buttons">
            <button
              className="button is-danger is-fullwidth"
              onClick={() => {
                dispatch(resetGame());
              }}
            >
              Reset game
            </button>
          </div>
        </div>
      </section>
      <Modal></Modal>
    </>
  );
};

export default GameOverview;
