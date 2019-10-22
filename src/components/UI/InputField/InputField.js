import React from 'react';

const InputField = props => {
    return (
        <input
            type="text"
            placeholder={props.placeholder}
            value={props.title}
            onChange={props.change}
        />
    );
};

export default InputField;