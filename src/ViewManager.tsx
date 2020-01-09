import * as React from "/web_modules/react.js";
import { useSelector } from "/web_modules/react-redux.js";
import NewGame from "./components/NewGame.js";
import GameOverview from "./components/GameOverview.js";
import { RootState } from "./RootState.js";
import HouseTile from "./components/HouseTile.js";
import { HouseName, HouseState } from "./HouseState.js";

const ViewManager: React.FC = () => {
  const state = useSelector((state: RootState) => {
    let house: { name: HouseName; spice: number } | undefined = undefined;
    if (state.view.house_name !== undefined) {
      const house_state = state.houses[state.view.house_name] as HouseState;
      house = {
        name: state.view.house_name,
        spice: house_state.spice,
      };
    }
    return {
      house: house,
      active_view: state.view.active_view,
    };
  });

  switch (state.active_view) {
    case "new_game":
      return <NewGame />;
    case "overview":
      return <GameOverview />;
    case "house_details":
      if (state.house !== undefined) {
        return <HouseTile spice={state.house.spice} house_name={state.house.name} />;
      }
      else {
        throw new Error("Missing view.house_name");
      }
    default: {
      throw new Error("Unhandled active_view state");
    }
  }
};

export default ViewManager;