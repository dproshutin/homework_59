import React from 'react';
import './Message.css';

const Message = props => {
    let date = new Date(props.datetime);
    date = date.toLocaleString('ru-RU');
    return (
        <div>
            <div className="LeftAlign">
                <p>{props.author}:</p>
                <p>{props.text}</p>
            </div>
            <div className="RightAlign">
                <p>{date}</p>
            </div>
        </div>
    );
};

export default Message;