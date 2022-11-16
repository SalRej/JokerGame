import React , {useEffect}from 'react'
import { useAppSelector , useAppDispatch} from '../redux/hooks';
import {givePlayerCard} from '../redux/reducers/players';
import { removeNumberOfCards} from '../redux/reducers/deck';

const NUMBER_OF_CARDS_IN_HAND = 13;
function Game(){

    const players = useAppSelector(state => state.players);
    const deck = useAppSelector(state => state.deck);
    const dispatch = useAppDispatch();

    const giveCards = () =>{
        let cardIndex = deck.length-1;
        for(let i = 0;i<NUMBER_OF_CARDS_IN_HAND;i++){

            players.forEach(player=>{
                const card = deck[cardIndex];
                cardIndex--;
                dispatch(givePlayerCard({id:player.id,card:card}));
            })
        }

        dispatch(removeNumberOfCards(players.length*NUMBER_OF_CARDS_IN_HAND));
    }

    useEffect(()=>{
        giveCards();
    },[])
    return (
        <div>
            {
                players.map(player=>{
                    return(
                        <div>
                            <h1>{player.name}</h1>
                            {
                                player.hand.map(card=>{
                                    return(<img src={card.imgUrl}></img>)
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Game