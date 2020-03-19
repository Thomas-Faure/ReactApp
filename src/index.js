import React from 'react';

import ReactDOM from 'react-dom';
import Index from './css/index.scss'
import Post from './css/post.scss'
import thunk from 'redux-thunk';
import App from './App';
import {IntlProvider} from "react-intl";
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware} from 'redux';
import allReducers from './reducers'
import {Provider} from 'react-redux';
import { addLocaleData } from "react-intl";
import ConnectedIntlProvider from './ConnectedIntlProvider';


const middlewares = [thunk];
const store = createStore(allReducers,
    applyMiddleware(...middlewares))

ReactDOM.render(

    <Provider store={store}><ConnectedIntlProvider><App /></ConnectedIntlProvider>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
