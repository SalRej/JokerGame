import Card from "../src/interfaces/Card";
import Combination from "../src/interfaces/Combination";
import Player from "../src/interfaces/Player";

const removeCardFromCombination = (
  state: Player,
  combination: Combination,
  cardRecived: Card
): void => {
  combination.cards = combination.cards.filter((card: Card) => {
    return card.id != cardRecived.id;
  });

  //remove combination if there are no cards left
  if (combination.cards.length === 0) {
    state.combinations = state.combinations.filter(
      (combination: Combination) => {
        return combination.cards.length > 0;
      }
    );
  }
};

export default removeCardFromCombination;
