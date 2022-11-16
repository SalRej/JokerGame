import {createSlice} from '@reduxjs/toolkit';
interface Card{
    value:number,
    type:string,
    imgUrl:string
}

interface Player{
    hand:Card[],
    id:number,
    name:string
}

const initialState:Player[] = [];

export const playersSlice = createSlice({
    name:"players",
    initialState,
    reducers:{
        setNumberOfPlayers:(state:Player[],action)=>{
            for(let i = 0;i<action.payload;i++){
                const newPlayer:Player={
                    hand:[],
                    id:i,
                    name:"Player "+i
                }
                state.push(newPlayer);
            }
        },
        resetPlayers:()=>{
            return initialState;
        },
        givePlayerCard:(state:Player[],action)=>{
            const{id,card} = action.payload;
            state[id].hand.push(card);
        }
    }

})

export const {setNumberOfPlayers , resetPlayers, givePlayerCard} = playersSlice.actions;
export default playersSlice.reducer;