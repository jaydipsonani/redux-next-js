import { createSlice } from '@reduxjs/toolkit';

export interface MultipleState {
  value: number;
}

const initialState: MultipleState = {
  value: 2,
};

export const multipleSlice = createSlice({
  name: 'multiple',
  initialState,
  reducers: {
    multiplication: (state) => {
      state.value *= 2;
    },
    division: (state) => {
      state.value /= 2;
    },
  },
});

export const { multiplication, division } = multipleSlice.actions;

export default multipleSlice.reducer;
