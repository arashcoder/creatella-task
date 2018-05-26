import { combineReducers } from 'redux';
import ProductReducer from './product';

const rootReducer = combineReducers({
 products: ProductReducer,
});

export default rootReducer;