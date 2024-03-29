import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import fontsReducer from "./fonts-reducer"
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import userReducer from "./user-reducer";


let reducers = combineReducers({
    fontsWork:fontsReducer,
    auth:authReducer,
    userId:userReducer,
    app:appReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
