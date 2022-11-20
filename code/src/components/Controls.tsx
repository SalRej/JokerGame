import React from 'react'
import Card from '../interfaces/Card';
import { useAppSelector , useAppDispatch } from '../redux/hooks'
import { addCardInCombination , createNewCombination} from '../redux/reducers/players';
const Controls = () => {

    const dispatch = useAppDispatch();
    const mainPlayer = useAppSelector(state => state.players[0]);
    const createCombination = (event:React.DragEvent<HTMLImageElement>):void=>{
        event.preventDefault();
        const cardImage = document.querySelector<HTMLImageElement>('.dragging')!;
        
        const cardId:number = Number(cardImage.dataset.id);

        const card:Card | undefined = mainPlayer.hand.find((card)=>{
            return card.id === cardId;
        })


        dispatch(createNewCombination({cardToAdd:card}));
    }

    const addToCombination = (event:React.DragEvent<HTMLImageElement>):void=>{
        event.preventDefault();
        console.log(event);
        const cardImage = document.querySelector<HTMLImageElement>('.dragging')!;
        
        const cardId:number = Number(cardImage.dataset.id);

        const card:Card | undefined = mainPlayer.hand.find((card)=>{
            return card.id === cardId;
        })

        const imageElement:HTMLImageElement = event.target as HTMLImageElement;
        const combinationId:number =  Number(imageElement.dataset.combinationId);
        
        dispatch(addCardInCombination({newCard:card,combinationId:combinationId}));
    }
    const cancelEvent = (event:React.DragEvent<HTMLDivElement>):void=>{
        event.preventDefault();
    }
    return (
        <div className='controls'>
            <p>Your combinations</p>
            <div className='create_combination_holder'>
                {
                    mainPlayer!=undefined && 
                    mainPlayer.combinations.map(combination=>{
                        return(
                        <div
                            className='combination'
                            onDrop={addToCombination}
                            onDragOver={cancelEvent}
                            onDragLeave={cancelEvent}
                            data-combination-id={combination.id}
                        >
                            {
                                combination.cards.map((card:Card)=>{
                                    return(
                                        <img src={card.imgUrl}
                                        data-combination-id={combination.id}
                                        ></img>
                                    )
                                })
                            }
                        </div>)
                    })
                }
                <div 
                    className='new_combination'
                    onDrop={createCombination}
                    onDragOver={cancelEvent}
                    onDragLeave={cancelEvent}
                >Drop you cards here to create combination</div>
            </div>
        </div>
    )
}

export default Controls