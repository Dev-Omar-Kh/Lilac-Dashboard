import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({

    name : 'products',

    initialState : {

        searchWord : null,

    },

    reducers : {

        filterProduct : (state , value) => {

            state.searchWord = value.payload.name

        }

    }

});

export const {filterProduct} = productsSlice.actions;
export const productsReduce = productsSlice.reducer;