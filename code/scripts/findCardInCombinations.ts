import Card from "../src/interfaces/Card";
import Combination from "../src/interfaces/Combination";
import Player from "../src/interfaces/Player";

interface CardAndCombination {
  card: Card;
  combination: Combination;
}
const findCardInCombinations = (
  state: Player,
  cardId: number
): CardAndCombination => {
  let combinationToReturn: Combination;
  let cardToReturn: Card;

  state.combinations.forEach((combination: Combination) => {
    combination.cards.forEach((card: Card) => {
      if (card.id === cardId) {
        cardToReturn = card;
        combinationToReturn = combination;
      }
    });
  });

  return { combination: combinationToReturn!, card: cardToReturn! };
};

export default findCardInCombinations;
