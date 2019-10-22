import React from 'react';
import './Message.css';

const Message = props => {
    return (
        <div>
            <div className="LeftAlign">
                <p>{props.author}:</p>
                <p>{props.text}</p>
            </div>
            <div className="RightAlign">
                <p>{props.datetime}</p>
            </div>
        </div>
    );
};

export default Message;