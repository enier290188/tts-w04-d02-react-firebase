import React from "react";
import {FaWeixin, FaComment} from "react-icons/fa";
import ContentLayout from "../../layouts/content/ContentLayout";
import CenterLayout from "../../layouts/content/center/CenterLayout";
import {firebaseApp} from "../../services/firebase";

class ChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            user: firebaseApp.auth().currentUser,
            chats: [],
            content: "",
        };
    }

    render() {
        return (
            <ContentLayout>
                <CenterLayout icon={FaWeixin} title="Chat">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                            <form className="m-0 mb-2 mb-md-0 p-3 border border-muted bg-light" autoComplete="off" onSubmit={this.handleSubmit}>
                                <div className="m-0 p-3" style={{display: "block", maxHeight: "60vh", zIndex: "1000",  scrollBehavior: "scroll", overflowX: "auto", overflowY: "scroll"}}>
                                    {
                                        this.state.error ? (
                                            <div className="m-0 mb-3 alert alert-danger alert-dismissible fade show" role="alert">
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                <p className="m-0 p-0 text-left">{this.state.error}</p>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        this.state.chats.map(chat => {
                                            if (this.state.user.email === chat.userEmail) {
                                                return (
                                                    <div key={chat.chatID} className="row">
                                                        <div className="offset-4 col-8">
                                                            <div className="m-0 mb-2 alert alert-success fade show" role="alert">
                                                                <p className="m-0 p-0 text-center font-weight-bolder border-bottom border-success">{this.state.user.email}</p>
                                                                <p className="m-0 p-0 pt-1 text-left">{chat.content}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div key={chat.chatID} className="row">
                                                        <div className="col-8">
                                                            <div className="m-0 mb-2 alert alert-info fade show" role="alert">
                                                                <p className="m-0 p-0 text-center font-weight-bolder border-bottom border-info">{chat.userEmail}</p>
                                                                <p className="m-0 p-0 pt-1 text-left">{chat.content}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })
                                    }
                                </div>
                                <div className="d-flex flex-row justify-content-start align-items-center mt-4 mr-0 mb-0 ml-0 pt-2 pr-0 pb-0 pl-0 border-top border-muted">
                                    <div className="input-group m-0 px-5 py-3">
                                        <input value={this.state.content} onChange={this.handleChange} type="text" name="content" className="form-control" placeholder="-message-" autoComplete="off" aria-describedby="buttonSend" required/>
                                        <div className="input-group-append">
                                            <button type="submit" id="buttonSend" className="btn btn-primary d-flex flex-row justify-content-start align-items-center"><FaComment size="1.2em"/><span className="m-0 ml-1 p-0">Send</span></button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </CenterLayout>
            </ContentLayout>
        );
    }

    async componentDidMount() {
        this.setState({
            error: null,
        });
        try {
            firebaseApp.database().ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                this.setState({
                    chats,
                });
            });
        } catch (error) {
            this.setState({
                error: error.message,
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            error: null,
        });
        try {
            await firebaseApp.database().ref("chats").push({
                chatID: Date.now(),
                userID: this.state.user.uid,
                userEmail: this.state.user.email,
                content: this.state.content,
            });
            this.setState({
                content: "",
            });
        } catch (error) {
            this.setState({
                error: error.message,
            });
        }
    }
}

export default ChatView;
