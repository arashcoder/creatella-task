import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';
import ProductList from './components/product/product_list';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
            <div className="container">
                <ProductList />
            </div>
    </Provider>,
    document.getElementById('root')
);