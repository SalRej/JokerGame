import React, { useEffect } from 'react'
import { useAppSelector , useAppDispatch} from '../redux/hooks';
import { removeNumberOfCards } from '../redux/reducers/deck';
import { givePlayerCard , removeCardFromPlayer} from '../redux/reducers/players';
import { putCardInPile } from '../redux/reducers/cardsPile';

import Card from '../interfaces/Card';
interface Props{
    turn:number,
    setTurn:any
}
const DeckAndCombinations = ({turn,setTurn}:Props) => {

    const deck = useAppSelector(state => state.deck);
    const players = useAppSelector(state => state.players);
    const cardsPile = useAppSelector(state => state.cardsPile);
    const dispatch = useAppDispatch();

    const drawCard = () =>{
        const playerId:number = turn;
        const lastCard:Card = deck[deck.length-1];

        dispatch(givePlayerCard({id:playerId,card:lastCard}));
        dispatch(removeNumberOfCards(1));
    }

    useEffect(()=>{
        if(turn!=0){
            drawCard();
            const dropedCard:Card = players[turn].hand[0];
            dispatch(putCardInPile(dropedCard));
            dispatch(removeCardFromPlayer({playerId:turn,cardId:dropedCard.id}));

            setTurn((prev:number)=>{

                if(prev>=players.length-1){
                    prev = 0;
                    return prev;
                }
                return prev+1;
            });
        }
    },[turn]);

    const dropCardInPile = (event:React.DragEvent<HTMLDivElement>):void =>{
        event.preventDefault();
        
        if(turn === 0){
            const currentlyDragedElement:HTMLImageElement = document.querySelector('.dragging') as HTMLImageElement;
            const value:number =Number(currentlyDragedElement.dataset.value);
            const type:string = currentlyDragedElement.dataset.type as string;
            const imgUrl:string  = currentlyDragedElement.dataset.url as string;
            const id:number = Number(currentlyDragedElement.dataset.id);
    
            const dropedCard:Card={
                value:value,
                type:type,
                imgUrl:imgUrl,
                id:id,
            }
    
            dispatch(putCardInPile(dropedCard));
    
            const playerId:number = 0;//main player
            dispatch(removeCardFromPlayer({playerId:playerId,cardId:dropedCard.id}));
            //next player turn
            setTurn((prev:number)=>{

                if(prev>=players.length-1){
                    prev = 0;
                    return prev;
                }
                return prev+1;
            });
        }
    }

    const cancelEvent = (event:React.DragEvent<HTMLDivElement>):void=>{
        event.preventDefault();
    }
    return (
    <div className='combination_deck_holder'>

        <div className='combinations_holder'>
            <div className='new_combination'>
                Drop you combination here
            </div>
        </div>
        <div className='deck_and_pile'>
            <div className='deck' onClick={drawCard}></div>
            <div 
                className='deck_pile'
                onDrop={dropCardInPile}
                onDragEnter={cancelEvent}
                onDragOver={cancelEvent}
            >
                <div className='wrapper'>
                    {
                        cardsPile.map((card:Card,index:number)=>{
                            return(<img src={card.imgUrl} key={index}>
                            </img>)
                        })
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default DeckAndCombinations