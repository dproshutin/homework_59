import React, {Component} from 'react';
import MessageBand from "../MessagesBand/MessagesBand";
import './Messenger.css';
import InputField from "../../components/UI/InputField/InputField";
import Button from "../../components/UI/Button/Button";
import TextArea from "../../components/UI/TextArea/TextArea";

class Messenger extends Component {
    constructor(props) {
        super(props);
        this.myInterval = null;
        this.state = {
            messages: [],
            currentAuthor: "",
            currentMessage: "",
            lastDateTime: null
        };
    }

    getMessages = () => {
        let lastDateTime;
        const M_URL = "http://146.185.154.90:8000/messages";
        fetch(M_URL).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Something went wrong with network request");
        }).then(messages => {
            this.setState({messages});
            messages.map(message => lastDateTime=message.datetime);
            return messages;
        }).then(messages => {
            this.setState({lastDateTime});
        });
    };

    getMessagesSinceLastDateTime = () => {
        let lastDateTime;
        let messages;
        let NM_URL = "http://146.185.154.90:8000/messages?datetime=" + this.state.lastDateTime;
        fetch(NM_URL).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Something went wrong with network request");
        }).then(newMessages => {
            messages = [...this.state.messages];
            if (newMessages.length > 0) {
                newMessages.map(message => {
                    messages.push(message);
                    lastDateTime = message.datetime;
                    return newMessages;
                })
            } else {
                lastDateTime = this.state.lastDateTime;
            }
            return newMessages;
        }).then(response => {
            this.setState({messages, lastDateTime});
        })
    };
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth", block: 'end', inline: "nearest"});
    };

    componentDidMount() {
        this.getMessages();
        this.myInterval = setInterval(this.getMessagesSinceLastDateTime, 3000);
        setTimeout(this.scrollToBottom, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.myInterval);
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
        let messagesList = null;
        if (this.state.messages.length === 0) {
            messagesList = (
                <form>
                    <p>No messages yet</p>
                </form>
            );
        } else {
            messagesList = this.state.messages.map(message => (
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
                <div className="MessagesPanel"

                >
                    {messagesList}
                    <div style={{float: 'left', clear:'both'}} ref={(el) => {this.messagesEnd = el}}></div>
                </div>
                <div className="NewMessage">
                    <label>Username:</label>
                    <InputField
                        username={this.state.currentAuthor}
                        placeholder="Add a username"
                        change={this.changeAuthor}
                    />
                    <label>Message:</label>
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