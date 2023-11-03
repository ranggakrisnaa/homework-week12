import { configureStore } from "@reduxjs/toolkit";
import tictactoeReducer from "./tictactoeReducer";

export default configureStore({ reducer: { states: tictactoeReducer } });
