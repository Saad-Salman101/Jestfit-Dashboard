import { combineReducers } from "redux";

// reducer import
import UserReducer from './reducers/userReducer';
import newCustomizationReducer from "./reducers/newCustomizationReducer";
import cartReducer from "./reducers/cartReducer";
import socketreducer from "./reducers/socketReducer.js";

const rootReducer = combineReducers({
  user: UserReducer,
  newCustomization: newCustomizationReducer,
  cart: cartReducer,
  socket: socketreducer
});

export default rootReducer;