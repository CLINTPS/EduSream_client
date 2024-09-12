import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./reducers/userAuth";
import adminReducer from "./reducers/adminReducer";
import courseSlice from "./reducers/courseSlice";

export const store=configureStore({
    reducer:{
        user:userAuth,
        admin:adminReducer,
        course:courseSlice
    }
})