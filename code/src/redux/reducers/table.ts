import { createSlice } from "@reduxjs/toolkit";
import Table from "../../interfaces/Table";
import Card from "../../interfaces/Card";

import Combination from "../../interfaces/Combination";
const initialState: Table = {
  deck: [],
  pile: [],
  combinations: [],
  lastCombinationId: 0,
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
      const newCombination = { ...combination, id: state.lastCombinationId };
      state.lastCombinationId++;
      state.combinations.push(newCombination);
    },
    addCardInTableCombination: (state: Table, action): void => {
      const { newCard, combinationId } = action.payload;
      let currentCombination: Combination;
      state.combinations.forEach((combination: Combination) => {
        if (combination.id === combinationId) {
          currentCombination = combination;
        }
      });

      let areAllSameValue: boolean = true;

      currentCombination!.cards.forEach((card: Card) => {
        if (card.value != newCard.value || card.type === newCard.type) {
          areAllSameValue = false;
        }
      });

      if (areAllSameValue === true) {
        currentCombination!.cards.push(newCard);
      } else if (areAllSameValue === false) {
        let isSameType: boolean = true;

        currentCombination!.cards.forEach((card: Card) => {
          if (newCard.type != card.type) {
            isSameType = false;
          }
        });

        if (isSameType === true) {
          const firstCard: Card = currentCombination!.cards[0];
          const lastCard: Card =
            currentCombination!.cards[currentCombination!.cards.length - 1];

          if (
            newCard.value === firstCard.value - 1 ||
            newCard.value === lastCard.value + 1
          ) {
            currentCombination!.cards.push(newCard);
            currentCombination!.cards.sort((a, b): number => {
              return a.value - b.value;
            });
          }
        }
      }
    },
  },
});

export const {
  loadCardsInDeck,
  shuffleDeck,
  removeCardsFromDeck,
  putCardInPile,
  addCombinationToTable,
  addCardInTableCombination,
} = tableSlice.actions;
export default tableSlice.reducer;
