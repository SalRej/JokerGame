import Card from "./Card";
import Combination from "./Combination";

interface Player {
  hand: Card[];
  id: number;
  name: string;
  combinations: Combination[];
  points: number;
}
export default Player;
