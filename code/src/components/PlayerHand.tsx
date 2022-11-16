import React from 'react'
import Player from '../interfaces/Player';
interface Props{
    player:Player
}
function PlayerHand({player}:Props) {
    return (
        <div className={player.id===0?'main_player':'ai_player'}>
            <h1>{player.name}</h1>
            {
                player.hand.map(card=>{
                    return(
                        <img src={card.imgUrl}></img>
                    )
                })
            }
        </div>
    )
}

export default PlayerHand