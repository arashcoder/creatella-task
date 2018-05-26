import React, { Fragment } from 'react';
import * as moment from 'moment';

import Ad from './ad'

export const ProductItem = (props) => {
    return (
        <Fragment>
            {renderAdIfNeeded(props.index)}
            <tr key={props.product.id}>
                <td>{props.product.id}</td>
                <td>{props.product.size}</td>
                <td>{formatPrice(props.product.price)}</td>
                <td style={setFaceSize(props.product.size)}>{props.product.face}</td>
                <td>{formatDate(props.product.date)}</td>
            </tr>
        </Fragment>
    );
}

const formatPrice = (price) => '$' + (Number(price) / 100).toFixed(2);
const setFaceSize = (size) => {return { fontSize: size }}
const formatDate = (date) => {
    var days = Math.ceil(moment().startOf('day').diff(moment(date), 'days', true));
    if (days === 0) {
        return 'Today';
    }
    if (days <= 7) {
        return `${days} day(s) ago`;
    }
    return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
}

const renderAdIfNeeded = (index) => index > 0 && index % 10 === 0 ?
    <tr><td colSpan="5" className="text-center"><Ad /></td></tr> :
    null;

