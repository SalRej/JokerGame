import React from "react";
import { useAppSelector } from "../redux/hooks";
const PlayerPoints = () => {
  const mainPlayer = useAppSelector((state) => state.players[0]);
  return (
    <div>
      {mainPlayer.points}
      points
    </div>
  );
};

export default PlayerPoints;
