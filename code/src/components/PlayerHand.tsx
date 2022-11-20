import React from 'react'
import Player from '../interfaces/Player';
import {useAppDispatch} from '../redux/hooks';
import {rearangeCardsInHand} from "../redux/reducers/players";
interface Props{
    player:Player
}
function PlayerHand({player}:Props) {

    const dispatch = useAppDispatch();
    const addDraggingClass = (event:React.DragEvent<HTMLImageElement>):void =>{
        const img:HTMLImageElement = event.target as HTMLImageElement;
        img.classList.add('dragging');
    }
    const removeDraggingClass = (event:React.DragEvent<HTMLImageElement>):void =>{
        const img:HTMLImageElement = event.target as HTMLImageElement;
        img.classList.remove('dragging');
    }

    const cancelEvent = (event:React.DragEvent<HTMLImageElement>):void=>{
        event.preventDefault();
    }

    const adjustCardPositionInHand = (event:React.DragEvent<HTMLImageElement>):void =>{

        const x:number = event.clientX;
        const draggableImages = document.querySelectorAll<HTMLImageElement>('.draggable');
        const draggedImage = document.querySelector<HTMLImageElement>('.dragging');

        let closestOffset:number = Number.NEGATIVE_INFINITY;
        let closestElement:HTMLImageElement | null= null;

        draggableImages.forEach((image:HTMLImageElement,index:number)=>{
            const box = image.getBoundingClientRect();
            const offset:number = x - box.left - box.height/2;


            if(offset<0 && offset>closestOffset){
                closestOffset=offset;
                closestElement=image;
            }
        })

        const draggedImageId:number = Number(draggedImage!.dataset.id);
        const closestElementId:number = Number(closestElement!.dataset.id);

        dispatch(rearangeCardsInHand({cardToMoveId:draggedImageId,cardBeforeId:closestElementId}));
    }
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
                            return(
                                <img
                                    className='draggable'
                                    data-rotation={index}
                                    data-close-to-middle={howCloseToMiddle}
                                    data-value={card.value}
                                    data-type={card.type}
                                    data-url={card.imgUrl}
                                    data-id={card.id}
                                    draggable={true}
                                    src={card.imgUrl}
                                    key={index}
                                    onDragStart={addDraggingClass}
                                    onDragEnd={removeDraggingClass}
                                    onDrop={adjustCardPositionInHand}
                                    onDragEnter={cancelEvent}
                                    onDragOver={cancelEvent}
                                >
                                </img>
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