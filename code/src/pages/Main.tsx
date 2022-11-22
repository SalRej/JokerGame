import React, { useEffect, useState, useRef } from "react";
import KingWithMovingEyes from "../components/KingWithMovingEyes";
import FallingCards from "../components/FallingCards";
import StartGameForm from "../components/StartGameForm";
const Main: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div className="background">
      <h1>Joker Game</h1>
      <button onClick={() => setShowForm(true)}>Play now</button>

      {showForm === true && <StartGameForm />}

      <FallingCards numberCards={100} />
      <div className="king_holder left">
        <KingWithMovingEyes position={"leftKing"} />
      </div>
      <div className="king_holder right">
        <KingWithMovingEyes position={"rightKing"} />
      </div>
    </div>
  );
};

export default Main;
