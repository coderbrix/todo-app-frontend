import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import { todoApi } from "../features/api/todoApi";

export const store = configureStore({
  reducer: {
    todoUI: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

// types (important for TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;