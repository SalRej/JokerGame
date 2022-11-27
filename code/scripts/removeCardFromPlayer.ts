import Player from "../src/interfaces/Player";
import Card from "../src/interfaces/Card";
import Combination from "../src/interfaces/Combination";
const removeCardFromPlayer = (player: Player, cardToRemove: Card): void => {
  player.hand = player.hand.filter((card: Card) => {
    return card.id != cardToRemove.id;
  });

  player.combinations = player.combinations.filter(
    (combination: Combination) => {
      return combination.cards.filter((card: Card) => {
        return card.id != cardToRemove.id;
      });
    }
  );

  player.combinations = player.combinations.filter(
    (combination: Combination) => {
      return combination.cards.length > 0;
    }
  );
};

export default removeCardFromPlayer;
