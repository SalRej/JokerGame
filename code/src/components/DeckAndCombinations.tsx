import React, { useEffect } from 'react'
import { useAppSelector , useAppDispatch} from '../redux/hooks';
import { removeNumberOfCards } from '../redux/reducers/deck';
import { givePlayerCard } from '../redux/reducers/players';
import Card from '../interfaces/Card';
interface Props{
    turn:number,
    setTurn:any
}
const DeckAndCombinations = ({turn,setTurn}:Props) => {

    const deck = useAppSelector(state => state.deck);
    const players = useAppSelector(state => state.players);
    const dispatch = useAppDispatch();
    const drawCard = () =>{
        const playerId:number = turn;
        const card:Card = deck[deck.length-1];
        dispatch(givePlayerCard({id:playerId,card:card}));
        dispatch(removeNumberOfCards(1));
        setTurn((prev:number)=>{

            if(prev>=players.length-1){
                prev = 0;
                return prev;
            }
            return prev+1;
        });
    }

    useEffect(()=>{
        if(turn!=0){
            drawCard();
        }
    },[turn]);

    return (
    <div className='combination_deck_holder'>
        <p>{turn}</p>
        <div className='deck' onClick={drawCard}></div>
    </div>
    )
}

export default DeckAndCombinations