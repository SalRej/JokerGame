import React from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

import Card from "../interfaces/Card";
import Combination from "../interfaces/Combination";
import Deck from "./Deck";
import Pile from "./Pile";
interface Props {
  turn: number;
  setTurn: any;
}
const DeckAndCombinations = ({ turn, setTurn }: Props) => {
  const combinationsOnTable = useAppSelector(
    (state) => state.table.combinations
  );

  return (
    <div className="combination_deck_holder">
      <div className="combinations_holder">
        {combinationsOnTable.map((combination: Combination, index: number) => {
          return (
            <div key={index}>
              {combination.cards.map((card: Card, index: number) => {
                return <img src={card.imgUrl} key={index} alt="card"></img>;
              })}
            </div>
          );
        })}
      </div>
      <div className="deck_and_pile">
        <Deck turn={turn} setTurn={setTurn} />
        <Pile turn={turn} setTurn={setTurn} />
      </div>
    </div>
  );
};

export default DeckAndCombinations;
