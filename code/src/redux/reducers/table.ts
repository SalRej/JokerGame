import { createSlice } from "@reduxjs/toolkit";
import Table from "../../interfaces/Table";
import Card from "../../interfaces/Card";
import findCombinationById from "../../../scripts/findCombinationById";
import Player from "../../interfaces/Player";
const initialState: Table = {
  deck: [],
  pile: [],
  combinations: [],
};
const tableSlice = createSlice({
  initialState: initialState,
  name: "table",
  reducers: {
    loadCardsInDeck: (state: Table) => {
      let currentType: string = "";
      const types: string[] = ["Spades", "Hearts", "Clubs", "Ace"];
      let cardId: number = 0;
      for (let i = 0; i < 4; i++) {
        currentType = types[i];

        for (let j = 1; j < 14; j++) {
          const card1: Card = {
            id: cardId,
            value: j,
            type: currentType,
            imgUrl: `cards/${currentType}${j}.png`,
          };
          cardId++;
          const card2: Card = {
            id: cardId,
            value: j,
            type: currentType,
            imgUrl: `cards/${currentType}${j}.png`,
          };
          cardId++;
          //push two times becouse the game has 2 deck of cards
          state.deck.push(card1, card2);
        }
      }
      const card: Card = {
        value: Infinity,
        type: "Joker",
        imgUrl: `cards/Joker.png`,
        id: 999,
      };
      state.deck.push(card, card);
    },
    shuffleDeck: (state: Table) => {
      let currentIndex = state.deck.length,
        randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [state.deck[currentIndex], state.deck[randomIndex]] = [
          state.deck[randomIndex],
          state.deck[currentIndex],
        ];
      }
    },
    removeCardsFromDeck: (state, action) => {
      for (let i = 0; i < action.payload; i++) {
        state.deck.pop();
      }
    },
    putCardInPile: (state: Table, action): void => {
      const card = action.payload;
      state.pile.push(card);
    },
    addCombinationToTable: (state: Table, action): void => {
      const { combination } = action.payload;
      console.log(combination);
      state.combinations.push(combination);
    },
    // addCardInCombination: (state: Table, action): void => {
    //   const { newCard, combinationId, combinationIdToRemoveCardFrom } =
    //     action.payload;

    //   const tempPlayer: Player = {
    //     id: -1,
    //     hand: [],
    //     canPutOnTable: false,
    //     combinations: state.combinations,
    //     name: "temp",
    //     points: 0,
    //   };
    //   const currentCombination = findCombinationById(tempPlayer, combinationId);
    //   const combinationToRemoveCardFrom = findCombinationById(
    //     state[0],
    //     combinationIdToRemoveCardFrom
    //   );

    //   let areAllSameValue: boolean = true;

    //   currentCombination!.cards.forEach((card: Card) => {
    //     if (card.value != newCard.value || card.type === newCard.type) {
    //       areAllSameValue = false;
    //     }
    //   });

    //   if (areAllSameValue === true) {
    //     currentCombination!.cards.push(newCard);
    //     state[0].hand = state[0].hand.filter(
    //       (card: Card) => card.id != newCard.id
    //     );
    //     if (combinationIdToRemoveCardFrom !== undefined) {
    //       removeCardFromCombination(
    //         state[0],
    //         combinationToRemoveCardFrom,
    //         newCard
    //       );
    //     }
    //   } else if (areAllSameValue === false) {
    //     let isSameType: boolean = true;

    //     currentCombination?.cards.forEach((card: Card) => {
    //       if (newCard.type != card.type) {
    //         isSameType = false;
    //       }
    //     });

    //     if (isSameType === true) {
    //       const firstCard: Card = currentCombination!.cards[0];
    //       const lastCard: Card =
    //         currentCombination!.cards[currentCombination!.cards.length - 1];

    //       if (
    //         newCard.value === firstCard.value - 1 ||
    //         newCard.value === lastCard.value + 1
    //       ) {
    //         currentCombination!.cards.push(newCard);

    //         if (combinationIdToRemoveCardFrom !== undefined) {
    //           removeCardFromCombination(
    //             state[0],
    //             combinationToRemoveCardFrom,
    //             newCard
    //           );
    //         } else {
    //           state[0].hand = state[0].hand.filter(
    //             (card: Card) => card.id != newCard.id
    //           );
    //         }
    //         currentCombination!.cards.sort((a, b): number => {
    //           return a.value - b.value;
    //         });
    //       }
    //     }
    //   }
    // },
  },
});

export const {
  loadCardsInDeck,
  shuffleDeck,
  removeCardsFromDeck,
  putCardInPile,
  addCombinationToTable,
} = tableSlice.actions;
export default tableSlice.reducer;
