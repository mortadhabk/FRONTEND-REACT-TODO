import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import {  applyMiddleware } from 'redux';

import AuthReducer from "./Auth/reducer";
import TasksReducer  from "./Tasks/reducer";
const reducers = combineReducers({
  Auth: AuthReducer,
  Tasks: TasksReducer ,
});

const store = createStore(
  reducers,
  {},
  composeWithDevTools( applyMiddleware())
);

export { store };
