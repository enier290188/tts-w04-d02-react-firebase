import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {FaLockOpen, FaSync, FaSignInAlt} from "react-icons/fa";
import {URL_SECURITY_LOGIN} from "../../routers/routes";
import ContentLayout from "../../layouts/content/ContentLayout";
import CenterLayout from "../../layouts/content/center/CenterLayout";
import {firebaseApp} from "../../services/firebase";

const ForgotPasswordView = () => {
    const history = useHistory()
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [sendingEmail, setSendingEmail] = useState(false);

    const handleReset = (event) => {
        setError(null);
        setEmail("");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        await firebaseApp.auth().sendPasswordResetEmail(email).then(() => {
            // Email sent.
            setSendingEmail(true);
            setTimeout(() => {
                history.push(URL_SECURITY_LOGIN);
            }, 5000);
        }).catch(error => {
            setError(error.message);
            setEmail("");
        });
    }

    const handleLogIn = (event) => {
        setError(null);
        setEmail("");
        history.push(URL_SECURITY_LOGIN);
    }

    return (
        <ContentLayout>
            <CenterLayout icon={FaLockOpen} title="Forgot password">
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                        <form className="m-0 mb-2 mb-md-0 p-3 border border-muted bg-light" autoComplete="off" onSubmit={handleSubmit}>
                            {
                                error ? (
                                    <div className="m-0 mb-3 alert alert-danger alert-dismissible fade show" role="alert">
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <p className="m-0 p-0 text-left">{error}</p>
                                    </div>
                                ) : null
                            }
                            {
                                sendingEmail ? (
                                    <React.Fragment>
                                        <div className="m-0 mb-2 alert alert-info fade show" role="alert">
                                            <p className="m-0 p-0 text-left">It was sended an email with a link to verify your email address.</p>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <div className="form-group">
                                            <label htmlFor="email" className="font-weight-bolder">Email:</label>
                                            <input
                                                value={email}
                                                onChange={(event) => {
                                                    setEmail(event.target.value);
                                                }}
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="-Email-"
                                                autoComplete="off"
                                                autoFocus
                                                required
                                            />
                                        </div>
                                        <div className="d-flex flex-row justify-content-start align-items-center mt-4 mr-0 mb-0 ml-0 pt-2 pr-0 pb-0 pl-0 border-top border-muted">
                                            <button
                                                type="submit"
                                                className="btn btn-primary d-flex flex-row justify-content-start align-items-center"
                                            >
                                                <FaLockOpen/><span className="m-0 ml-1 p-0">Send email for reset password</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-success d-flex flex-row justify-content-start align-items-center ml-1"
                                                onClick={handleReset}
                                            >
                                                <FaSync/><span className="m-0 ml-1 p-0">Reset</span>
                                            </button>
                                        </div>
                                        <div className="d-flex flex-row justify-content-end align-items-center mt-0 mr-0 mb-0 ml-0 pt-2 pr-0 pb-0 pl-0">
                                            <button
                                                type="button"
                                                className="btn btn-link d-flex flex-row justify-content-start align-items-center ml-1"
                                                onClick={handleLogIn}
                                            >
                                                <FaSignInAlt/><span className="m-0 ml-1 p-0">Log in</span>
                                            </button>
                                        </div>
                                    </React.Fragment>
                                )
                            }
                        </form>
                    </div>
                </div>
            </CenterLayout>
        </ContentLayout>
    );
}

export default ForgotPasswordView;
