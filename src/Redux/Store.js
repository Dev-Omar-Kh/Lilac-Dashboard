import { configureStore } from "@reduxjs/toolkit";
import { productsReduce } from "./Products";

export const Store = configureStore({

    reducer : {

        products : productsReduce,

    }

});