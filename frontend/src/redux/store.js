import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userRegisterLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
    userRegisterLogin: userRegisterLoginReducer,
});

const storedUserInfo = localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
let userInfoInLocalStorage = {};

try {
  userInfoInLocalStorage = storedUserInfo ? JSON.parse(storedUserInfo) : {};
} catch (error) {
  console.error("Error parsing stored user info:", error);
}

const INITIAL_STATE = {
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
};

const middleware = [thunk];
const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
