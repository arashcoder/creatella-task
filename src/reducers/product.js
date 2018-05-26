import {
    FETCH_PRODUCTS, AD_RANDOM_NUM, LOADING, NO_MORE_PRODUCTS, PRE_FETCH_PRODUCTS,
    PREFETCHING, GET_PREFETCHED_PRODUCTS, ERR_FETCHING, ERR_PREFETCHING
} from '../actions/product';

const initialState = {
    products: [],
    prefetchedProducts: [],
    currentPage: 1,
    sortCol: '',
    adNum: 0,
    isLoading: false,
    isPrefetching: false,
    noMoreProducts: false,
    errorFetchingProducts: false,
    errorPrefetchingProducts: false
}
export default function (state = initialState, action) {

    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.reload ? action.payload : state.products.concat(action.payload),
                currentPage: action.meta,
                sortCol: action.sortCol,
                isLoading: false,
                prefetchedProducts: [],
                noMoreProducts: false,
            };
        case PRE_FETCH_PRODUCTS:
            return {
                ...state,
                prefetchedProducts: action.payload,
                isPrefetching: false
            };
        case PREFETCHING:
            return {
                ...state,
                isPrefetching: true,
                errorPrefetchingProducts: false
            };
        case GET_PREFETCHED_PRODUCTS:
            return {
                ...state,
                products: state.products.concat(state.prefetchedProducts),
                prefetchedProducts: [],
                currentPage: action.meta,
                isLoading: false
            };
        case AD_RANDOM_NUM:
            console.log(action.meta)
            return {
                ...state,
                adNum: action.meta
            };
        case LOADING:
            return {
                ...state,
                isLoading: true,
                errorFetchingProducts: false
            };
        case NO_MORE_PRODUCTS:
            return {
                ...state,
                noMoreProducts: true,
                isLoading: false
            }
        case ERR_FETCHING:
            return {
                ...state,
                errorFetchingProducts: true,
                isLoading: false
            }
        case ERR_PREFETCHING:
            return {
                ...state,
                errorPrefetchingProducts: true,
                isPrefetching: false
            }
        default:
            return state;
    }
};