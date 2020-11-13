import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {FaSignInAlt, FaSync, FaLockOpen} from "react-icons/fa";
import {URL_INDEX, URL_SECURITY_FORGOTPASSWORD} from "../../routers/routes";
import ContentLayout from "../../layouts/content/ContentLayout";
import CenterLayout from "../../layouts/content/center/CenterLayout";
import {firebaseApp} from "../../services/firebase";

const LogInView = () => {
    const history = useHistory()
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleReset = (event) => {
        setError(null);
        setEmail("");
        setPassword("");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            await firebaseApp.auth().signInWithEmailAndPassword(email, password);
            history.push(URL_INDEX);
        } catch (error) {
            setError(error.message);
            setEmail("");
        }
        setPassword("");
    }

    const handleForgotPassword = (event) => {
        setError(null);
        setEmail("");
        setPassword("");
        history.push(URL_SECURITY_FORGOTPASSWORD);
    }

    return (
        <ContentLayout>
            <CenterLayout icon={FaSignInAlt} title="Log in">
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
                            <div className="form-group">
                                <label htmlFor="password" className="font-weight-bolder">Password:</label>
                                <input
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="-Password-"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="d-flex flex-row justify-content-start align-items-center mt-4 mr-0 mb-0 ml-0 pt-2 pr-0 pb-0 pl-0 border-top border-muted">
                                <button
                                    type="submit"
                                    className="btn btn-primary d-flex flex-row justify-content-start align-items-center"
                                >
                                    <FaSignInAlt/><span className="m-0 ml-1 p-0">Log in</span>
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
                                    onClick={handleForgotPassword}
                                >
                                    <FaLockOpen/><span className="m-0 ml-1 p-0">Forgot password?</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </CenterLayout>
        </ContentLayout>
    );
}

export default LogInView;
