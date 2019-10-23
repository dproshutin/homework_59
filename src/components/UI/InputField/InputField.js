import React from 'react';

const InputField = props => {
    return (
        <input
            type="text"
            placeholder={props.placeholder}
            value={props.username}
            onChange={props.change}
            required
        />
    );
};

export default InputField;