import React from 'react';

import './Filter.css'

const Filter = (props) => (
    <div className={'filter'}>
        <input type="text" placeholder={'Tag filter'}  onChange={props.findTag} />
    </div>
);

export default Filter;