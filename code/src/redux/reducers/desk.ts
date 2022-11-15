import {createSlice} from '@reduxjs/toolkit';

interface Card{
    value:number,
    type:string,
    imgUrl:string
}

const initialState:Card[] = [];

export const deskSlice = createSlice({
    name:"desk",
    initialState,
    reducers:{
        loadCards:(state:Array<Card>)=>{
            
            let currentType:string="";
            const types:string[] = ["Spades","Hearts","Clubs","Ace"];

            for(let i = 0; i<4 ;i++){
                currentType = types[i];

                for(let j = 1;j<14;j++){
                    const card:Card = {
                        value:j,
                        type:currentType,
                        imgUrl:`cards/${currentType}${j}.png`
                    }
                    //push 1 card two times becous the game has 2 deck of cards
                    state.push(card,card);
                }
            }
            const card:Card = {
                value:Infinity,
                type:"Joker",
                imgUrl:`cards/Joker.png`
            }
            state.push(card,card);
        },
        shuffleDeck:(state:Array<Card>)=>{
            let currentIndex = state.length,  randomIndex;
            while (currentIndex != 0) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [state[currentIndex], state[randomIndex]] = [
                state[randomIndex], state[currentIndex]];
            }
        }
    }
})

export const {loadCards,shuffleDeck} = deskSlice.actions;

export default deskSlice.reducer;