import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { RootSaga } from "../ReduxSaga/RootSaga";
import createSagaMiddleware from "redux-saga";

const SagaMiddleWare = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: [SagaMiddleWare],
});

SagaMiddleWare.run(RootSaga);
export type AppDispatch = typeof store.dispatch;
