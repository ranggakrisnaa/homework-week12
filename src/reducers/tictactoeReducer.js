import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  squares: Array(9).fill(null),
  xWin: 0,
  oWin: 0,
  draw: 0,
  winner: null,
  xIsNext: true,
};

const ticTacToeSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.squares = action.payload;
      state.xIsNext = !state.xIsNext;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    setXWin: (state) => {
      state.xWin++;
    },
    setDraw: (state) => {
      state.draw++;
    },
    setOWin: (state) => {
      state.oWin++;
    },
    resetState: (state) => {
      state.squares = Array(9).fill(null);
      state.xIsNext = true;
    },
    resetWin: (state) => {
      state.oWin = 0;
      state.draw = 0;
      state.xWin = 0;
    },
  },
});

export const {
  setState,
  setOWin,
  setDraw,
  setWinner,
  setXWin,
  resetState,
  resetWin,
} = ticTacToeSlice.actions;
export default ticTacToeSlice.reducer;
