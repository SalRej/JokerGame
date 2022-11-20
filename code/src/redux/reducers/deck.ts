import {createSlice} from '@reduxjs/toolkit';
import Card from '../../interfaces/Card';

const initialState:Card[] = [];

export const deckSlice = createSlice({
    name:"deck",
    initialState,
    reducers:{
        loadCards:(state:Card[])=>{
            
            let currentType:string="";
            const types:string[] = ["Spades","Hearts","Clubs","Ace"];
            let cardId:number = 0;
            for(let i = 0; i<4 ;i++){
                currentType = types[i];

                for(let j = 1;j<14;j++){
                    const card1:Card = {
                        id:cardId,
                        value:j,
                        type:currentType,
                        imgUrl:`cards/${currentType}${j}.png`,
                    }
                    cardId++;
                    const card2:Card = {
                        id:cardId,
                        value:j,
                        type:currentType,
                        imgUrl:`cards/${currentType}${j}.png`,
                    }
                    cardId++;
                    //push two times becouse the game has 2 deck of cards
                    state.push(card1,card2);
                }
            }
            const card:Card = {
                value:Infinity,
                type:"Joker",
                imgUrl:`cards/Joker.png`,
                id:999,
            }
            state.push(card,card);
        },
        shuffleDeck:(state:Card[])=>{
            let currentIndex = state.length,  randomIndex;
            while (currentIndex != 0) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [state[currentIndex], state[randomIndex]] = [
                state[randomIndex], state[currentIndex]];
            }
        },
        removeNumberOfCards:(state,action)=>{

            for(let i =0;i<action.payload;i++){
                state.pop();
            }
        }
    }
})

export const {loadCards,shuffleDeck,removeNumberOfCards} = deckSlice.actions;

export default deckSlice.reducer;