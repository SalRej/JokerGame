import React, { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { removeCardFromPlayer } from "../redux/reducers/players";
import table, { addCardInTableCombination } from "../redux/reducers/table";
import Pile from "./Pile";
import Deck from "./Deck";

import Card from "../interfaces/Card";
import Combination from "../interfaces/Combination";

import findCardInCombinations from "../../scripts/findCardInCombinations";
interface Props {
  turn: number;
  setTurn: any;
}
const DeckAndCombinations = ({ turn, setTurn }: Props) => {
  const idOfCardToRemove = useRef<number | null>(null);
  const mainPlayer = useAppSelector((state) => state.players[0]);
  const combinationsOnTable = useAppSelector(
    (state) => state.table.combinations
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (idOfCardToRemove.current != null) {
      dispatch(
        removeCardFromPlayer({
          playerId: 0,
          cardId: idOfCardToRemove.current,
        })
      );
    }
  }, [combinationsOnTable]);

  const addCardOnTable = (event: React.DragEvent<HTMLImageElement>): void => {
    event.preventDefault();
    const cardImage = document.querySelector<HTMLImageElement>(".dragging")!;
    const cardId: number = Number(cardImage.dataset.id);

    let card: Card | undefined = mainPlayer.hand.find((card) => {
      return card.id === cardId;
    });

    let combinationIdToRemoveCardFrom: number | undefined;
    if (card === undefined) {
      const CardAndCombination = findCardInCombinations(mainPlayer, cardId);
      card = CardAndCombination.card;
      combinationIdToRemoveCardFrom = CardAndCombination.combination.id;
    }

    const element: HTMLImageElement | HTMLDivElement = event.target as
      | HTMLImageElement
      | HTMLDivElement;
    const combinationId: number = Number(element.dataset.combinationId);
    idOfCardToRemove.current = card.id;
    dispatch(addCardInTableCombination({ newCard: card, combinationId }));
  };
  const cancelEvent = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };
  return (
    <div className="combination_deck_holder">
      <div className="combinations_holder">
        {combinationsOnTable.map((combination: Combination, index: number) => {
          return (
            <div key={index}>
              {combination.cards.map((card: Card, index2: number) => {
                return (
                  <img
                    src={card.imgUrl}
                    key={index2}
                    alt="card"
                    onDrop={addCardOnTable}
                    onDragOver={cancelEvent}
                    onDragLeave={cancelEvent}
                    data-combination-id={combination.id}
                  ></img>
                );
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
