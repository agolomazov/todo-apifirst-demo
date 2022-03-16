import { combineReducers } from '@reduxjs/toolkit';

import { reducer as todoReducer } from '../features/todos';

export const rootReducer = combineReducers({
  todos: todoReducer,
});