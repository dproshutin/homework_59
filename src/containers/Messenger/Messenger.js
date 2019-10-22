import React, {Component} from 'react';
import MessageBand from "../MessagesBand/MessagesBand";
import './Messenger.css';
import InputField from "../../components/UI/InputField/InputField";
import Button from "../../components/UI/Button/Button";
import TextArea from "../../components/UI/TextArea/TextArea";

class Messenger extends Component {
    state = {
        messages: [],
        currentAuthor: "",
        currentMessage: ""
    };

    componentDidMount() {
        const M_URL = "http://146.185.154.90:8000/messages";
        fetch(M_URL).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Something went wrong with network request");
        }).then(messages => {
            this.setState({messages});
        });

    }
    sendMessage = () => {
        const url = 'http://146.185.154.90:8000/messages';
        const data = new URLSearchParams();
        data.set('message', this.state.currentMessage);
        data.set('author', this.state.currentAuthor);
        fetch(url, {
            method: 'post',
            body: data,
        }).then(response => {
            if (response.ok) {
                this.setState({currentAuthor:"", currentMessage:""});
            } else {
                console.log(response);
            }
        });
    };
    changeAuthor = (event) => {
        const currentAuthor = event.target.value;
        this.setState({currentAuthor});
    };
    changeMessage = (event) => {
        const currentMessage = event.target.value;
        this.setState({currentMessage});
    };
    render() {
        console.log(this.state);
        let messagesList = null;
        if (this.state.messages.length === 0) {
            messagesList = (
                <form>
                    <p>No messages yet</p>
                </form>
            );
        } else {
            messagesList = this.state.messages.reverse().map(message => (
                <MessageBand
                    text={message.message}
                    author={message.author}
                    datetime={message.datetime}
                    key={message._id}
                />
            ));
        }
        return (
            <div className="Container">
                <div className="MessagesPanel">
                    {messagesList}
                </div>
                <div className="NewMessage">
                    <label htmlFor="">Username:</label>
                    <InputField
                        username={this.state.currentAuthor}
                        placeholder="Add a username"
                        change={this.changeAuthor}
                    />
                    <label htmlFor=""></label>
                    <TextArea
                        type="text"
                        cols="30"
                        rows="10"
                        message={this.state.currentMessage}
                        placeholder="Type your message"
                        change={this.changeMessage}
                    />
                    <Button
                        btnType="add"
                        click={this.sendMessage}
                        value="Send message"
                    />
                </div>
            </div>
        );
    }
}

export default Messenger;