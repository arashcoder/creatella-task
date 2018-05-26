import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, prefetchProducts } from '../../actions/product';
import './product.css';
import { ProductItem } from './product_item';
import Loading from './loading';


class ProductList extends Component {

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
        this.props.fetchProducts(1);

        this.startPrefetching();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    startPrefetching = () => {
        this.intervalId = window.setInterval(
            this.prefetchProducts.bind(this)
            , 5000);
    }

    prefetchProducts = () => {
        if (this.props.noMoreProducts) {
            window.clearInterval(this.intervalId);
            return;
        }
        this.props.prefetchProducts();
    }

    headerClicked = (colName) => {
        this.props.fetchProducts(1, colName);
        this.startPrefetching();
    }

    renderProducts = () => {
        return this.props.products.map((product, i) =>
            <ProductItem key={product.id} product={product} index={i} />
        );
    }


    onScroll = () => {
        if (
            window.innerHeight + window.scrollY > document.body.offsetHeight &&
            !this.props.noMoreProducts
        ) {
            this.props.fetchProducts(this.props.currentPage + 1, this.props.sortCol);
        }

    }

    setFontStyle = (colName) => {
        let fStyle = colName === this.props.sortCol ? 'italic' : 'normal';
        return {
            fontStyle: fStyle
        }
    }

    render() {
        return (
            <Fragment>
                <table className="table table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col" className="sortable" style={this.setFontStyle('id')} onClick={() => this.headerClicked( 'id')}>Id</th>
                            <th scope="col" className="sortable" style={this.setFontStyle('size')} onClick={() => this.headerClicked('size')}>Size</th>
                            <th scope="col" className="sortable" style={this.setFontStyle('price')} onClick={() => this.headerClicked( 'price')}>Price</th>
                            <th scope="col">Face</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderProducts()}</tbody>
                </table>

                <div className="text-center font-weight-bold">{this.props.isLoading ? <Loading /> : ''}</div>
                <div className="text-center font-weight-bold">{this.props.noMoreProducts ? '~ end of catalogue ~' : ''}</div>
                <div className="text-danger text-center font-weight-bold">{this.props.errorFetchingProducts ? 'error fetching products' : ''}</div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products.products,
        currentPage: state.products.currentPage,
        sortCol: state.products.sortCol,
        isLoading: state.products.isLoading,
        noMoreProducts: state.products.noMoreProducts,
        errorFetchingProducts: state.products.errorFetchingProducts
    };
}

export default connect(mapStateToProps, { fetchProducts, prefetchProducts })(ProductList);