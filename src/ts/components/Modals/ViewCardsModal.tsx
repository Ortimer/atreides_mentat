import * as React from "react";
import { house_name_t, houseNameStr } from "ts/houses";
import { treachery_card, treachery_card_kind } from "ts/treachery_card";
import { useDispatch } from "react-redux";
import { showAddCard, showOverview as closeModal } from "ts/state/actions";

const treachery_card_colours: { [key in treachery_card_kind]: string } = {
  defence: "info",
  special: "link",
  useless: "warning",
  weapon: "danger",
};

const TreacheryCardComponent: React.FC<{ card: treachery_card }> = props => {
  return (
    <div className="card">
      <header className={"card-header"}></header>
    </div>
  );
};

const ViewCards: React.FC<{ house: house_name_t; cards: ReadonlyArray<treachery_card> }> = props => {
  const dispatch = useDispatch();
  const close = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Cards for {houseNameStr(props.house)}</p>
          <button className="delete" onClick={close}></button>
        </header>
        <section className="modal-card-body">
          {props.cards.length !== 0
            ? props.cards.map(card => <TreacheryCardComponent card={card} />)
            : "No cards"}
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button
              className="button is-primary"
              onClick={() => dispatch(showAddCard(props.house))}
            >
              Add card
            </button>
            <button className="button is-secondary" onClick={close}>
              Back
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ViewCards;