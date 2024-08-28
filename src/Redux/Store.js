import { configureStore } from "@reduxjs/toolkit";
import { productsReduce } from "./Search";

export const Store = configureStore({

    reducer : {

        products : productsReduce,

    }

});