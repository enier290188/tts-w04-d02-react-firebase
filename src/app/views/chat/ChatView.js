import React, {useContext, useState, useEffect} from "react";
import {FaWeixin, FaComment} from "react-icons/fa";
import ContentLayout from "../../layouts/content/ContentLayout";
import CenterLayout from "../../layouts/content/center/CenterLayout";
import {firebaseApp} from "../../services/firebase";
import UserContext from "../../contexts/contexts";

const ChatView = () => {
    const user = useContext(UserContext);
    const [error, setError] = useState(null);
    const [messages, setMessage] = useState([]);
    const [inputContent, setInputContent] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            await firebaseApp.database().ref("messages").push({
                messageID: Date.now(),
                messageContent: inputContent,
                userID: user.uid,
                userDisplayName: user.displayName,
            });
            setInputContent("");
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        setError(null);
        try {
            firebaseApp.database().ref("messages").on("value", snapshot => {
                const messages = [];
                snapshot.forEach((snap) => {
                    messages.push(snap.val());
                });
                setMessage(messages);
            });
        } catch (error) {
            setError(error.message);
        }
    }, [error])

    return (
        <ContentLayout>
            <CenterLayout icon={FaWeixin} title="Chat">
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                        <form className="m-0 mb-2 mb-md-0 p-3 border border-muted bg-light" autoComplete="off" onSubmit={handleSubmit}>
                            <div className="m-0 p-3" style={{display: "block", maxHeight: "60vh", zIndex: "1000", scrollBehavior: "scroll", overflowX: "auto", overflowY: "scroll"}}>
                                {
                                    error ? (
                                        <div className="m-0 mb-3 alert alert-danger alert-dismissible fade show" role="alert">
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                            <p className="m-0 p-0 text-left">{error}</p>
                                        </div>
                                    ) : null
                                }
                                {
                                    messages.map(message => {
                                        if (user.uid === message.userID) {
                                            return (
                                                <div key={message.messageID} className="row">
                                                    <div className="offset-4 col-8">
                                                        <div className="m-0 mb-2 alert alert-success fade show" role="alert">
                                                            <p className="m-0 p-0 text-center font-weight-bolder">{(new Date(message.messageID)).getMonth()}/{(new Date(message.messageID)).getDate()}/{(new Date(message.messageID)).getFullYear()} ({(new Date(message.messageID)).getHours()}:{(new Date(message.messageID)).getMinutes()}:{(new Date(message.messageID)).getSeconds()})</p>
                                                            <p className="m-0 p-0 text-center font-weight-bolder border-bottom border-success">{user.displayName}</p>
                                                            <p className="m-0 p-0 py-3 text-center font-italic">{message.messageContent}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={message.messageID} className="row">
                                                    <div className="col-8">
                                                        <div className="m-0 mb-2 alert alert-info fade show" role="alert">
                                                            <p className="m-0 p-0 text-center font-weight-bolder">{(new Date(message.messageID)).getMonth()}/{(new Date(message.messageID)).getDate()}/{(new Date(message.messageID)).getFullYear()} ({(new Date(message.messageID)).getHours()}:{(new Date(message.messageID)).getMinutes()}:{(new Date(message.messageID)).getSeconds()})</p>
                                                            <p className="m-0 p-0 text-center font-weight-bolder border-bottom border-info">{message.userDisplayName}</p>
                                                            <p className="m-0 p-0 py-3 text-center font-italic">{message.messageContent}</p>
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
                                    <input
                                        value={inputContent}
                                        onChange={(event) => {
                                            setInputContent(event.target.value);
                                        }}
                                        type="text"
                                        name="inputContent"
                                        className="form-control"
                                        placeholder="-message-"
                                        autoComplete="off"
                                        aria-describedby="buttonSend"
                                        autoFocus
                                        required
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="submit"
                                            id="buttonSend"
                                            className="btn btn-primary d-flex flex-row justify-content-start align-items-center"
                                        >
                                            <FaComment size="1.2em"/><span className="m-0 ml-1 p-0">Send</span>
                                        </button>
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

export default ChatView;
