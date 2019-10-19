import React from 'react';

import './Sort.css'

const Sort = (props) => (
    <div className={'sort'}>
        <select className={'sort__select'} onChange={props.handleTableSort}>
            <option>Sort</option>
            <option>Likes</option>
            <option>Comment</option>
        </select>
    </div>
)

export default Sort;