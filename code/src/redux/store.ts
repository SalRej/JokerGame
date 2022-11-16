import { configureStore } from "@reduxjs/toolkit";
import deskReducer from './reducers/desk';
import playersReducer from './reducers/players';

const  store =  configureStore({
    reducer:{
        desk:deskReducer,
        players:playersReducer
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

