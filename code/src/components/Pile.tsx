import React from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Card from "../interfaces/Card";

import { removeCardFromPlayer } from "../redux/reducers/players";
import { putCardInPile } from "../redux/reducers/table";

interface Props {
  turn: number;
  setTurn: any;
}
const Pile = ({ turn, setTurn }: Props) => {
  const cardsPile = useAppSelector((state) => state.table.pile);
  const players = useAppSelector((state) => state.players);

  const dispatch = useAppDispatch();

  const dropCardInPile = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();

    if (turn === 0) {
      const currentlyDragedElement: HTMLImageElement = document.querySelector(
        ".dragging"
      ) as HTMLImageElement;
      const value: number = Number(currentlyDragedElement.dataset.value);
      const type: string = currentlyDragedElement.dataset.type as string;
      const imgUrl: string = currentlyDragedElement.dataset.url as string;
      const id: number = Number(currentlyDragedElement.dataset.id);

      const dropedCard: Card = {
        value: value,
        type: type,
        imgUrl: imgUrl,
        id: id,
      };

      dispatch(putCardInPile(dropedCard));
      const playerId: number = 0; //main player
      dispatch(
        removeCardFromPlayer({ playerId: playerId, cardId: dropedCard.id })
      );
      //next player turn
      setTurn((prev: number) => {
        if (prev >= players.length - 1) {
          prev = 0;
          return prev;
        }
        return prev + 1;
      });
    }
  };

  const cancelEvent = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };
  return (
    <div
      className="deck_pile"
      onDrop={dropCardInPile}
      onDragEnter={cancelEvent}
      onDragOver={cancelEvent}
    >
      <div className="wrapper">
        {cardsPile.map((card: Card, index: number) => {
          return <img alt="card_in_pile" src={card.imgUrl} key={index}></img>;
        })}
      </div>
    </div>
  );
};

export default Pile;
