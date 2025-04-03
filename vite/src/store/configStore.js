import rootReducer from "./rootReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    // whitelist: [
    //     "User"
    // ],
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);