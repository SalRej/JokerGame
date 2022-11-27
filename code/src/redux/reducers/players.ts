import { createSlice } from "@reduxjs/toolkit";
import Card from "../../interfaces/Card";
import Combination from "../../interfaces/Combination";
import Player from "../../interfaces/Player";

import findCombinationById from "../../../scripts/findCombinationById";
import findCardInCombinations from "../../../scripts/findCardInCombinations";
import removeCardFromCombination from "../../../scripts/removeCardFromCombination";
// import removeCardFromPlayer from "../../../scripts/removeCardFromPlayer";
const initialState: Player[] = [];

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setNumberOfPlayers: (state: Player[], action): void => {
      for (let i = 0; i < action.payload; i++) {
        const newPlayer: Player = {
          hand: [],
          id: i,
          name: "Player " + i,
          combinations: [],
          points: 0,
          canPutOnTable: false,
        };
        state.push(newPlayer);
      }
    },
    resetPlayers: (): Player[] => {
      return initialState;
    },
    givePlayerCard: (state: Player[], action): void => {
      const { id, card } = action.payload;
      state[id].hand.push(card);
    },
    aiMakeMove: (state, action): void => {
      const { id, drawnCard } = action.payload;
      state[id];
    },
    removeCardFromPlayer: (state, action): void => {
      const { playerId, cardId } = action.payload;
      state[playerId].hand = state[playerId].hand.filter((card: Card) => {
        return card.id != cardId;
      });

      const combinationAndCard = findCardInCombinations(state[0], cardId);
      const combinationToRemoveCardFrom = combinationAndCard.combination;
      const card = combinationAndCard.card;

      if (card != undefined && combinationToRemoveCardFrom != undefined) {
        removeCardFromCombination(state[0], combinationToRemoveCardFrom, card);
      }
    },
    rearangeCardsInHand: (state, action): void => {
      const { cardToMoveId, cardBeforeId } = action.payload;
      let cardToMove: Card | null = null;
      let placeToPutIndex: number = -1;

      state[0].hand = state[0].hand.filter((card: Card, index: number) => {
        if (card.id === cardToMoveId) {
          cardToMove = card;
        }

        if (card.id === cardBeforeId) {
          placeToPutIndex = index;
        }
        return card.id != cardToMoveId;
      });

      if (cardToMove === null) {
        //look for card in combinations
        const combinationAndCard = findCardInCombinations(
          state[0],
          cardToMoveId
        );
        const combinationToRemoveCardFrom: Combination =
          combinationAndCard.combination;
        cardToMove = combinationAndCard.card;

        removeCardFromCombination(
          state[0],
          combinationToRemoveCardFrom,
          cardToMove
        );
      }

      if (cardToMove != null) {
        state[0].hand.splice(placeToPutIndex, 0, cardToMove);
      }
    },
    createNewCombination: (state, action): void => {
      const { cardToAdd } = action.payload;
      const cardArr: Card[] = [cardToAdd];

      let id: number = 0;

      state[0].combinations.forEach((combination: Combination) => {
        if (id < combination.id) {
          id = combination.id;
        }
      });
      id++;

      const newCombination: Combination = {
        id: id,
        value: 0,
        cards: cardArr,
      };

      state[0].combinations = [...state[0].combinations, newCombination];
      state[0].hand = state[0].hand.filter(
        (card: Card) => card.id != cardToAdd.id
      );
    },
    addCardInCombination: (state, action): void => {
      const { newCard, combinationId, combinationIdToRemoveCardFrom } =
        action.payload;
      const currentCombination = findCombinationById(state[0], combinationId);
      const combinationToRemoveCardFrom = findCombinationById(
        state[0],
        combinationIdToRemoveCardFrom
      );

      let areAllSameValue: boolean = true;

      currentCombination!.cards.forEach((card: Card) => {
        if (card.value != newCard.value || card.type === newCard.type) {
          areAllSameValue = false;
        }
      });

      if (areAllSameValue === true) {
        currentCombination!.cards.push(newCard);
        state[0].hand = state[0].hand.filter(
          (card: Card) => card.id != newCard.id
        );
        if (combinationIdToRemoveCardFrom !== undefined) {
          removeCardFromCombination(
            state[0],
            combinationToRemoveCardFrom,
            newCard
          );
        }
      } else if (areAllSameValue === false) {
        let isSameType: boolean = true;

        currentCombination?.cards.forEach((card: Card) => {
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

            if (combinationIdToRemoveCardFrom !== undefined) {
              removeCardFromCombination(
                state[0],
                combinationToRemoveCardFrom,
                newCard
              );
            } else {
              state[0].hand = state[0].hand.filter(
                (card: Card) => card.id != newCard.id
              );
            }
            currentCombination!.cards.sort((a, b): number => {
              return a.value - b.value;
            });
          }
        }
      }
    },
    calculatePoints: (state): void => {
      let points = 0;
      let currentCombinationPoints = 0;
      state[0].combinations.forEach((combination: Combination) => {
        currentCombinationPoints = 0;
        if (combination.cards.length >= 3) {
          combination.cards.forEach((card) => {
            if (card.value > 10) {
              points += 10;
              currentCombinationPoints += 10;
            } else {
              points += card.value;
              currentCombinationPoints += card.value;
            }
          });
          combination.value = currentCombinationPoints;
        }
      });

      state[0].points = points;
    },
    removeCombinationFromPlayer: (state: Player[], action): void => {
      const { combinationId } = action.payload;
      state[0].combinations = state[0].combinations.filter(
        (combination: Combination) => {
          return combinationId != combination.id;
        }
      );
    },
    enalbePlayerToPutOnTable: (state: Player[]) => {
      state[0].canPutOnTable = true;
    },
  },
});

export const {
  setNumberOfPlayers,
  resetPlayers,
  givePlayerCard,
  removeCardFromPlayer,
  rearangeCardsInHand,
  createNewCombination,
  addCardInCombination,
  calculatePoints,
  removeCombinationFromPlayer,
  enalbePlayerToPutOnTable,
} = playersSlice.actions;

export default playersSlice.reducer;
