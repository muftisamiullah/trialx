import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import tableReducer from "./store/reducers/tableReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux'

const store = createStore(tableReducer,applyMiddleware(thunk));

console.log(store.getState());
ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
    , document.getElementById("root")
);
