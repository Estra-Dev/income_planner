import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
// import {persistStore, persistReducer} from "redux-persist"

export const store = configureStore({
  reducer: {
    name: userReducer,
  },
});
