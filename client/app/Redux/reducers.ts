import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
export interface User {
  User: ReturnType<typeof UserReducer>;
}
export const rootReducer = combineReducers({
  User: UserReducer,
});
