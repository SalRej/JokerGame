import React from 'react'
import Player from '../interfaces/Player';
interface Props{
    player:Player
}
function PlayerHand({player}:Props) {
    return (
        <div className={player.id===0?'main_player':'ai_player' + ` player_${player.id}`}>
            {
                (player.id !=2 && player.id!=0)&& <p>{player.name}</p>   
            }
            <div className='cards_holder'>
                {
                    player.hand.map((card,index)=>{
                        if(player.id===0){
                            const middlePosition:number = player.hand.length/2;
                            const howCloseToMiddle = Math.abs(index-middlePosition);
                            console.log(howCloseToMiddle); 
                            return(
                                <img data-rotation={index} data-close-to-middle={howCloseToMiddle} draggable={true} src={card.imgUrl} key={index}></img>
                            )
                        }
                        return(
                            <img src={card.imgUrl} key={index}></img>
                        )
                    })
                }
            </div>
            {
                player.id ===2 && <p>{player.name}</p>   
            }
        </div>
    )
}

export default PlayerHand