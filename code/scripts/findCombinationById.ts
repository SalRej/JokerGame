import Combination from '../src/interfaces/Combination';
import Player from '../src/interfaces/Player';

const findCombinationById = (state:Player,combinationId:number):Combination =>{
    const combination = state.combinations.find((combination:Combination)=>{
        return combination.id === combinationId;
    })

    return combination!;
}

export default findCombinationById;