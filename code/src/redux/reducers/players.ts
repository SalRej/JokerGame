import {createSlice} from '@reduxjs/toolkit';
import Card from '../../interfaces/Card';
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
                    name:"Player "+i
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
        }
    }

})

export const {setNumberOfPlayers , resetPlayers, givePlayerCard , removeCardFromPlayer} = playersSlice.actions;
export default playersSlice.reducer;