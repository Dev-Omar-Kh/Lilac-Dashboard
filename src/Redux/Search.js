import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({

    name : 'products',

    initialState : {

        searchWord : null,
        displaySearchBar : null,

        searchWordServices : null,
        displaySearchBarServices : null,

    },

    reducers : {

        filterProduct : (state , value) => {

            state.searchWord = value.payload.name;

        },

        searchBar : (state , value) => {

            state.displaySearchBar = value.payload.display;

        },

        filterServices : (state , value) => {

            state.searchWordServices = value.payload.nameS;

        },

        searchBarServices : (state , value) => {

            state.displaySearchBarServices = value.payload.display;

        }

    }

});

export const {filterProduct , filterServices , searchBar , searchBarServices} = productsSlice.actions;
export const productsReduce = productsSlice.reducer;