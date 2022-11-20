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

            if(cardToMove!=null){
                state[0].hand.splice(placeToPutIndex,0,cardToMove);
            }
        },
        createNewCombination:(state,action):void =>{
            const {cardToAdd} = action.payload;
            const cardArr:Card[] = [cardToAdd];

            const newCombination:Combination={
                id:state[0].combinations.length+1,
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

            currentCombination!.cards.push(newCard);
            currentCombination!.value=currentCombination!.value+newCard.value;
            state[0].hand = state[0].hand.filter((card:Card)=>card.id!=newCard.id);
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