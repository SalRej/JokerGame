import { configureStore } from "@reduxjs/toolkit";
import deskReducer from './reducers/deck';
import playersReducer from './reducers/players';

const  store =  configureStore({
    reducer:{
        deck:deskReducer,
        players:playersReducer
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

