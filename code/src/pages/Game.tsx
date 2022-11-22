import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { givePlayerCard } from "../redux/reducers/players";
import { removeNumberOfCards } from "../redux/reducers/deck";
import PlayerHand from "../components/PlayerHand";
import DeckAndCombinations from "../components/DeckAndCombinations";
import Controls from "../components/Controls";
const NUMBER_OF_CARDS_IN_HAND = 13;
function Game() {
  const players = useAppSelector((state) => state.players);
  const deck = useAppSelector((state) => state.deck);
  const dispatch = useAppDispatch();

  const [turn, setTurn] = useState<number>(0);

  const giveCards = () => {
    let cardIndex = deck.length - 1;
    for (let i = 0; i < NUMBER_OF_CARDS_IN_HAND; i++) {
      players.forEach((player) => {
        const card = deck[cardIndex];
        cardIndex--;
        dispatch(givePlayerCard({ id: player.id, card: card }));
      });
    }

    dispatch(removeNumberOfCards(players.length * NUMBER_OF_CARDS_IN_HAND));
  };

  useEffect(() => {
    giveCards();
  }, []);

  return (
    <div className="game_holder">
      <div className="board">
        <DeckAndCombinations turn={turn} setTurn={setTurn} />
        {players.map((player, index) => {
          return <PlayerHand key={index} player={player} />;
        })}
      </div>
      <Controls />
    </div>
  );
}

export default Game;
