import { configureStore } from "@reduxjs/toolkit";
import deskReducer from './reducers/deck';
import playersReducer from './reducers/players';
import cardsPile from "./reducers/cardsPile";
const  store =  configureStore({
    reducer:{
        deck:deskReducer,
        players:playersReducer,
        cardsPile:cardsPile
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

