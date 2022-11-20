import { createSlice } from "@reduxjs/toolkit";
import Card from "../../interfaces/Card";

const initialState:Card[] = [];

export const cardsPileSlice = createSlice({
    name:'cardsPile',
    initialState:initialState,
    reducers:{
        putCardInPile:(state:Card[],action):void=>{
            const card = action.payload;
            console.log(action);
            state.push(card);
        },
        removeTopCardFromPile:(state:Card[]):void=>{
            state.pop();
        }
    }
})

export const {putCardInPile , removeTopCardFromPile} = cardsPileSlice.actions;
export default cardsPileSlice.reducer;