import React from 'react';
import './Button.css';

const Button = props => {
    return (
        <button
            className={["Button", props.btnType].join(" ")}
            onClick={props.click}
        >
            {props.value}
        </button>
    );
};

export default Button;