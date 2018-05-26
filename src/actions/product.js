import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';
export const SORT_PRODUCTS = 'sort_products';
export const AD_RANDOM_NUM = 'ad_random_num';
export const LOADING = 'loading';
export const PRE_FETCH_PRODUCTS = 'pre_fetch_products';
export const PREFETCHING = 'prefetching';
export const GET_PREFETCHED_PRODUCTS = 'get_prefetched_products';
export const NO_MORE_PRODUCTS = 'no_more_products'
export const ERR_FETCHING = 'error_fetching_products';
export const ERR_PREFETCHING = 'error_prefetching_products';

const ROOT_URL = 'http://localhost:4000/api/products';


export function fetchProducts(pageNum, sortCol) {
    return async function (dispatch, getState) {
        if (getState().products.isLoading) 
            return;

        dispatch({
            type: LOADING
        });


        if (getState().products.prefetchedProducts.length > 0 && pageNum > 1) {
            dispatch(
                {
                    type: GET_PREFETCHED_PRODUCTS,
                    meta: pageNum
                }
            );
            return;
        }

        try {
            let url = setUrl(pageNum, sortCol);
            const response = await axios.get(url);
            if (response.data.length > 0) {
                dispatch(
                    {
                        type: FETCH_PRODUCTS,
                        payload: response.data,
                        meta: pageNum,
                        sortCol: sortCol,
                        reload: pageNum === 1
                    }
                );
            }
            else {
                dispatch(
                    {
                        type: NO_MORE_PRODUCTS
                    }
                );
            }
        }
        catch (err) {
            dispatch(
                {
                    type: ERR_FETCHING
                }
            );
        }
    }
};

export function prefetchProducts() {
    return async function (dispatch, getState) {
        if (getState().products.isLoading ||
            getState().products.isPrefetching ||
            getState().products.prefetchedProducts.length > 0) {
            return;
        }

        let pageNum = getState().products.currentPage + 1;
        let sortCol = getState().products.sortCol;
        let url = setUrl(pageNum, sortCol);

        dispatch({
            type: PREFETCHING
        });

        try {
            const response = await axios.get(url);
            dispatch(
                {
                    type: PRE_FETCH_PRODUCTS,
                    payload: response.data,
                }
            );
        }
        catch (err) {
            dispatch({
                type: ERR_PREFETCHING
            })
        }

    }
};


export function generateRandomAdNum(randomNum) {
    return function (dispatch) {
        dispatch(
            {
                type: AD_RANDOM_NUM,
                meta: randomNum
            }
        );
    };
}

const setUrl = (pageNum, sortCol) => {
    let url = `${ROOT_URL}?_page=${pageNum}&_limit=15`;
    if (sortCol) {
        url += `&_sort=${sortCol}`;
    }
    return url;
}
