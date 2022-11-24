import React, { MouseEventHandler } from "react";
import DragableImage from "./DragableImage";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  addCardInCombination,
  createNewCombination,
  removeCombinationFromPlayer,
  enalbePlayerToPutOnTable,
} from "../redux/reducers/players";
import { addCombinationToTable } from "../redux/reducers/table";

import Card from "../interfaces/Card";
import Combination from "../interfaces/Combination";
import findCardInCombinations from "../../scripts/findCardInCombinations";
import findCombinationById from "../../scripts/findCombinationById";
const Combinations = () => {
  const mainPlayer = useAppSelector((state) => state.players[0]);
  const dispatch = useAppDispatch();

  const createCombination = (
    event: React.DragEvent<HTMLImageElement>
  ): void => {
    event.preventDefault();

    const cardImage = document.querySelector<HTMLImageElement>(".dragging")!;
    const cardId: number = Number(cardImage.dataset.id);

    const card: Card | undefined = mainPlayer.hand.find((card) => {
      return card.id === cardId;
    });

    dispatch(createNewCombination({ cardToAdd: card }));
  };

  const addToCombination = (event: React.DragEvent<HTMLImageElement>): void => {
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

    dispatch(
      addCardInCombination({
        newCard: card,
        combinationId: combinationId,
        combinationIdToRemoveCardFrom: combinationIdToRemoveCardFrom,
      })
    );
  };

  const putCombinationOnTable = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const button: HTMLButtonElement = event.target as HTMLButtonElement;
    const combinationId = Number(button.dataset.combinationId);
    const combination = findCombinationById(mainPlayer, combinationId);
    console.log(combinationId, combination);
    dispatch(removeCombinationFromPlayer({ combinationId }));
    dispatch(addCombinationToTable({ combination }));
    dispatch(enalbePlayerToPutOnTable());
  };
  const cancelEvent = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };
  return (
    <React.Fragment>
      <p>Your combinations</p>
      <div className="create_combination_holder">
        <div
          className="new_combination"
          onDrop={createCombination}
          onDragOver={cancelEvent}
          onDragLeave={cancelEvent}
        >
          Drop you cards here to create combination
        </div>
        {mainPlayer != undefined &&
          mainPlayer.combinations.map(
            (combination: Combination, index: number) => {
              return (
                <div
                  className="combination"
                  key={index}
                  data-combination-id={combination.id}
                  onDrop={addToCombination}
                  onDragOver={cancelEvent}
                  onDragLeave={cancelEvent}
                >
                  {combination.cards.length >= 3 ? (
                    <p>{combination.value}</p>
                  ) : (
                    <p>0</p>
                  )}

                  {combination.cards.length >= 3 &&
                  (mainPlayer.points > 44 ||
                    mainPlayer.canPutOnTable === true) ? (
                    <button
                      data-combination-id={combination.id}
                      onClick={putCombinationOnTable}
                    >
                      Put on table
                    </button>
                  ) : (
                    ""
                  )}
                  {combination.cards.map((card: Card, index: number) => {
                    return (
                      <DragableImage
                        card={card}
                        index={index}
                        key={index}
                        combinationId={combination.id}
                      />
                    );
                  })}
                </div>
              );
            }
          )}
      </div>
    </React.Fragment>
  );
};

export default Combinations;
