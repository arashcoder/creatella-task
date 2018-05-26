import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateRandomAdNum } from '../../actions/product';

 class Ad extends Component {

    constructor(props) {
       super(props);
        this.state = {
            randomNum: Math.floor(Math.random() * 1000) 
        }
   }

   getInitialState = () => {
        let random = Math.floor(Math.random() * 1000);
        while (random === this.props.adNum) {
            random = Math.floor(Math.random() * 1000);
        }
        this.setState({
            randomNum: random
        });
        this.props.generateRandomAdNum(this.state.randomNum);
    }

    setImageUrl = () => `http://localhost:4000/ads/?r=${this.state.randomNum}`;      

    renderAd = () => <img className="ad" alt="advertisement" src={this.setImageUrl()} />

    render = () => this.renderAd() 
}

const mapStateToProps = (state) => {
    return {adNum: state.products.adNum};
}

export default connect(mapStateToProps, { generateRandomAdNum })(Ad);