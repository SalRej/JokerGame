import {createSlice} from '@reduxjs/toolkit';


interface Card{
    value:number,
    name:string,
    type:string,
    img:string
}

const initialState:Card[] = [];

export const deskSlice = createSlice({
    name:"desk",
    initialState,
    reducers:{
        loadCards:(state:Array<Card>)=>{
            
            for(let i = 0;i<102;i++){
                const card:Card={
                    value:1,
                    name:"salih",
                    type:"test",
                    img:'1'
                };
                state.push(card);
            }

        }
    }
})

export const {loadCards} = deskSlice.actions;

export default deskSlice.reducer;