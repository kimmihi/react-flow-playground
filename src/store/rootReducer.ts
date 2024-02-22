import { combineReducers } from "redux";

import editor from "./slices/editor";

export const rootReducer = combineReducers({
  editor,
});
