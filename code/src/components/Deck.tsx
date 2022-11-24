import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { removeCardsFromDeck } from "../redux/reducers/table";
import {
  givePlayerCard,
  removeCardFromPlayer,
} from "../redux/reducers/players";
import { putCardInPile } from "../redux/reducers/table";

import Card from "../interfaces/Card";
import Combination from "../interfaces/Combination";

interface Props {
  turn: number;
  setTurn: any;
}
const Deck = ({ turn, setTurn }: Props) => {
  const players = useAppSelector((state) => state.players);
  const deck = useAppSelector((state) => state.table.deck);
  const cardsPile = useAppSelector((state) => state.table.pile);
  const combinationsOnTable = useAppSelector(
    (state) => state.table.combinations
  );

  const dispatch = useAppDispatch();

  const drawCard = () => {
    const playerId: number = turn;
    const lastCard: Card = deck[deck.length - 1];

    dispatch(givePlayerCard({ id: playerId, card: lastCard }));
    dispatch(removeCardsFromDeck(1));
  };

  useEffect(() => {
    if (turn != 0) {
      drawCard();
      const dropedCard: Card = players[turn].hand[0];
      dispatch(putCardInPile(dropedCard));
      dispatch(removeCardFromPlayer({ playerId: turn, cardId: dropedCard.id }));

      setTurn((prev: number) => {
        if (prev >= players.length - 1) {
          prev = 0;
          return prev;
        }
        return prev + 1;
      });
    }
  }, [turn]);
  return (
    <div className="deck" role="button" onClick={drawCard} tabIndex={0}></div>
  );
};

export default Deck;
