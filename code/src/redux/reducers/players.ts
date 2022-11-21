import {createSlice} from '@reduxjs/toolkit';
import Card from '../../interfaces/Card';
import Combination from '../../interfaces/Combination';
import Player from '../../interfaces/Player';
const initialState:Player[] = [];

export const playersSlice = createSlice({
    name:"players",
    initialState,
    reducers:{
        setNumberOfPlayers:(state:Player[],action):void=>{
            for(let i = 0;i<action.payload;i++){
                const newPlayer:Player={
                    hand:[],
                    id:i,
                    name:"Player "+i,
                    combinations:[]
                }
                state.push(newPlayer);
            }
        },
        resetPlayers:():Player[]=>{
            return initialState;
        },
        givePlayerCard:(state:Player[],action):void=>{
            const{id,card} = action.payload;
            state[id].hand.push(card);
        },
        aiMakeMove:(state,action):void=>{
            const {id,drawnCard} = action.payload;
            state[id]
        },
        removeCardFromPlayer:(state,action):void=>{
            const {playerId,cardId} = action.payload;
            state[playerId].hand = state[playerId].hand.filter((card:Card)=>{
                return card.id!=cardId
            })
        },
        rearangeCardsInHand:(state,action):void=>{
            const {cardToMoveId,cardBeforeId} = action.payload;

            let cardToMove:Card|null = null;
            let placeToPutIndex:number = -1;

            state[0].hand = state[0].hand.filter((card:Card,index:number)=>{
                if(card.id === cardToMoveId){
                    cardToMove=card;
                }
                
                if(card.id === cardBeforeId){
                    placeToPutIndex=index;
                }
                return card.id != cardToMoveId;
            })


            if(cardToMove===null){
                //look for card in combinations
                let combinationToRemoveCardFrom:Combination;
                state[0].combinations.forEach((combination:Combination)=>{
                    combination.cards.forEach((card:Card)=>{
                        if(card.id === cardToMoveId){
                            cardToMove=card;
                            combinationToRemoveCardFrom=combination;
                        }
                    })
                })

                //remove card from combination
                combinationToRemoveCardFrom!.cards = combinationToRemoveCardFrom!.cards.filter((card:Card)=>{
                    return card.id!=cardToMove!.id;
                })

                //remove combination if there are no cards left
                if(combinationToRemoveCardFrom!.cards.length === 0){
                    state[0].combinations = state[0].combinations.filter((combination:Combination)=>{
                        return combination.cards.length > 0;
                    })
                }

            }
            
            if(cardToMove!=null){
                state[0].hand.splice(placeToPutIndex,0,cardToMove);
            }
        },
        createNewCombination:(state,action):void =>{
            const {cardToAdd} = action.payload;
            const cardArr:Card[] = [cardToAdd];

            let id:number = 0;
            
            state[0].combinations.forEach((combination:Combination)=>{
                if(id<combination.id){
                    id=combination.id;
                }
            })
            id++;
            
            const newCombination:Combination={
                id:id,
                value:cardToAdd.value,
                isOnTable:false,
                cards:cardArr
            }
            state[0].combinations = [...state[0].combinations,newCombination];
            state[0].hand = state[0].hand.filter((card:Card)=>card.id!=cardToAdd.id);
        },
        addCardInCombination:(state,action):void=>{
            const {newCard,combinationId} = action.payload;
            const currentCombination = state[0].combinations.find((combination:Combination)=>{
                return combination.id === combinationId;
            })

            
            let isAllSameValue:boolean = true;

            currentCombination!.cards.forEach((card:Card) => {
                if(card.value!=newCard.value || card.type===newCard.type){
                    isAllSameValue=false;
                }
            });

            if(isAllSameValue===true){

                currentCombination!.cards.push(newCard);
                currentCombination!.value=currentCombination!.value+newCard.value;
                state[0].hand = state[0].hand.filter((card:Card)=>card.id!=newCard.id);

            }else if(isAllSameValue===false){
                let isSameType:boolean = true;

                currentCombination?.cards.forEach((card:Card)=>{
                    if(newCard.type!=card.type){
                        isSameType=false;
                    }
                })

                if(isSameType===true){
                    const firstCard:Card = currentCombination!.cards[0];
                    const lastCard:Card = currentCombination!.cards[currentCombination!.cards.length-1];

                    if(newCard.value === firstCard.value-1 || newCard.value === lastCard.value+1){
                        currentCombination!.cards.push(newCard);
                        currentCombination!.value=currentCombination!.value+newCard.value;
                        state[0].hand = state[0].hand.filter((card:Card)=>card.id!=newCard.id);
                        currentCombination!.cards.sort((a,b):number=>{
                            return a.value-b.value;
                        })
                    }
                }
            }
        },
        
    }

})

export const {
    setNumberOfPlayers,
    resetPlayers,
    givePlayerCard,
    removeCardFromPlayer,
    rearangeCardsInHand,
    createNewCombination,
    addCardInCombination,
} = playersSlice.actions;

export default playersSlice.reducer;