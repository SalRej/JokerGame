import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./reducers/players";
import tableReducer from "./reducers/table";
const store = configureStore({
  reducer: {
    players: playersReducer,
    table: tableReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
