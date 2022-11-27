import Card from "./Card";
import Combination from "./Combination";

interface Table {
  deck: Card[];
  pile: Card[];
  combinations: Combination[];
  lastCombinationId: number;
}

export default Table;
