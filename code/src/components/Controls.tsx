import React from "react";
import Card from "../interfaces/Card";
import Combination from "../interfaces/Combination";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

import findCardInCombinations from "../../scripts/findCardInCombinations";

import DragableImage from "./DragableImage";
import PlayerPoints from "./PlayerPoints";
import Combinations from "./Combinations";
const Controls = () => {
  return (
    <div className="controls">
      <PlayerPoints />
      <Combinations />
    </div>
  );
};

export default Controls;
