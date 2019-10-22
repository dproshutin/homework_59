import React from 'react';

const TextArea = props => {
    return (
        <textarea
            type={props.type}
            rows={props.rows}
            cols={props.cols}
            placeholder={props.placeholder}
            value={props.message}
            onChange={props.change}
        />
    );
};

export default TextArea;