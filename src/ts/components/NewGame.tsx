import * as React from "react";
import { useDispatch } from "react-redux";
import { ENEMY_HOUSE_NAMES, enemy_house_name_t } from "ts/houses";
import { close_modal, start_game } from "ts/state/actions";
import { start_game_spec } from "ts/state/types";

const HouseSelect: React.FC<{
  house: enemy_house_name_t;
  checked: boolean;
  onClick: () => void;
}> = props => {
  let className = "button";
  if (props.checked) {
    className += " is-primary";
  }
  return (
    <button className={className} onClick={props.onClick}>
      <div>{props.house}</div>
    </button>
  );
};

export default () => {
  const [state, setState] = React.useState<start_game_spec>({
    HARKONNEN: false,
    EMPEROR: false,
    "SPACING GUILD": false,
    "BENE GESERIT": false,
    FREMEN: false,
  });

  let allow_start = false;
  for (let i of ENEMY_HOUSE_NAMES) {
    if (state[i]) {
      allow_start = true;
      break;
    }
  }
  const dispatch = useDispatch();
  return (
    <>
      <section className="section">
        <div className="container">
          <p className="title is-1">New game</p>
          <p className="subtitle is-5">Select which houses are present in the game</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="buttons is-centered">
            {ENEMY_HOUSE_NAMES.map(name => (
              <HouseSelect
                house={name}
                checked={state[name]}
                onClick={() => {
                  const new_checked = !state[name];
                  setState({ ...state, [name]: new_checked });
                }}
                key={name}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="buttons is-centered">
          <button
            className="button is-success"
            disabled={!allow_start}
            onClick={() => {
              if (allow_start) {
                dispatch(start_game(state));
                dispatch(close_modal());
              }
            }}
          >
            Start game
          </button>
        </div>
      </section>
    </>
  );
};
