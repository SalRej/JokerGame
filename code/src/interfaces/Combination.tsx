import Card from './Card';
interface Combination{
    id:number,
    cards:Card[],
    value:number,
    isOnTable:boolean
}

export default Combination;