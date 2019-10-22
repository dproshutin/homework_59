import React, {Component} from 'react';
import './MessagesBand.css';
import Message from "../../components/Message/Message";

class MessageBand extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.datetime !== this.props.datetime;
    }
    render() {
        return (
            <div className="Board clearfix">
                <Message
                    text={this.props.text}
                    author={this.props.author}
                    datetime={this.props.datetime}
                />
            </div>
        );
    }
}

export default MessageBand;