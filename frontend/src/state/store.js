import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
