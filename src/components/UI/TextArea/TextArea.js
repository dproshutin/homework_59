import React from 'react';

const TextArea = props => {
    return (
        <textarea
            type="text"
            placeholder={props.placeholder}
            value={props.title}
            onChange={props.change}
        />
    );
};

export default TextArea;