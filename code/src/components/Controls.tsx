import React from "react";
import Card from "../interfaces/Card";
import Combination from "../interfaces/Combination";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  addCardInCombination,
  createNewCombination,
} from "../redux/reducers/players";
import DragableImage from "./DragableImage";
const Controls = () => {
  const dispatch = useAppDispatch();
  const mainPlayer = useAppSelector((state) => state.players[0]);
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

    const card: Card | undefined = mainPlayer.hand.find((card) => {
      return card.id === cardId;
    });

    const imageElement: HTMLImageElement = event.target as HTMLImageElement;
    const combinationId: number = Number(imageElement.dataset.combinationId);

    dispatch(
      addCardInCombination({ newCard: card, combinationId: combinationId })
    );
  };
  const cancelEvent = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };
  return (
    <div className="controls">
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
                  onDrop={addToCombination}
                  onDragOver={cancelEvent}
                  onDragLeave={cancelEvent}
                  data-combination-id={combination.id}
                >
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
    </div>
  );
};

export default Controls;
