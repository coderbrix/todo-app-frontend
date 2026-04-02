import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  activeCategory: string;
  searchText: string;
}

const initialState: TodoState = {
  activeCategory: "today",
  searchText: "",
};

const todoSlice = createSlice({
  name: "todoUI",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const { setCategory, setSearchText } = todoSlice.actions;
export default todoSlice.reducer;