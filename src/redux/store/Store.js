import { createStore } from "redux";

import reducers from "../reducers/Reducers";

// Create the Redux store
const store = createStore(reducers);

export default store;
