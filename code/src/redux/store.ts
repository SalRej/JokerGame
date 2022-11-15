import { configureStore } from "@reduxjs/toolkit";
import deskReducer from './reducers/desk';
const  store =  configureStore({
    reducer:{
        desk:deskReducer
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

