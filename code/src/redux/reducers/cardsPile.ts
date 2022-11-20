import { createSlice } from "@reduxjs/toolkit";
import Card from "../../interfaces/Card";

const initialState:Card[] = [];

export const cardsPileSlice = createSlice({
    name:'cardsPile',
    initialState:initialState,
    reducers:{
        putCardInPile:(state,action)=>{
            const {card} = action.payload;
            state.push(card);
        },
        removeTopCardFromPile:(state)=>{
            state.pop();
        }
    }
})

export const {putCardInPile , removeTopCardFromPile} = cardsPileSlice.actions;
export default cardsPileSlice.reducer;