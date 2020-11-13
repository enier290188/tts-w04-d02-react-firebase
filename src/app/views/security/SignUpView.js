import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {FaUserPlus, FaSync} from "react-icons/fa";
import {URL_SECURITY_LOGIN} from "../../routers/routes";
import ContentLayout from "../../layouts/content/ContentLayout";
import CenterLayout from "../../layouts/content/center/CenterLayout";
import {firebaseApp} from "../../services/firebase";

const SignUpView = () => {
    const history = useHistory()
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [sendingEmail, setSendingEmail] = useState(false);

    const handleReset = (event) => {
        setError(null);
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        if (password === passwordConfirm) {
            if (name.length >= 5) {
                try {
                    await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
                    await firebaseApp.auth().currentUser.updateProfile({displayName: name});
                    await firebaseApp.auth().currentUser.sendEmailVerification().then(async () => {
                        await firebaseApp.auth().signOut();
                        // Email sent.
                        setSendingEmail(true);
                        setTimeout(() => {
                            history.push(URL_SECURITY_LOGIN);
                        }, 5000);
                    });
                } catch (error) {
                    setError(error.message);
                    setName("");
                    setEmail("");
                }
            } else {
                setError("Name has to be greater or equal 5 characters.");
            }
        } else {
            setError("Password and Password Confirm do not match.");
        }
        setPassword("");
        setPasswordConfirm("");
    }


    return (
        <ContentLayout>
            <CenterLayout icon={FaUserPlus} title="Sign up">
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
                                            <label htmlFor="name" className="font-weight-bolder">Name:</label>
                                            <input
                                                value={name}
                                                onChange={(event) => {
                                                    setName(event.target.value);
                                                }}
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="-Name-"
                                                autoComplete="off"
                                                autoFocus
                                                required
                                            />
                                        </div>
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
                                        <div className="form-group">
                                            <label htmlFor="passwordConfirm" className="font-weight-bolder">Password Confirm:</label>
                                            <input
                                                value={passwordConfirm}
                                                onChange={(event) => {
                                                    setPasswordConfirm(event.target.value);
                                                }}
                                                type="password"
                                                name="passwordConfirm"
                                                className="form-control"
                                                placeholder="-Password Confirm-"
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        <div className="d-flex flex-row justify-content-start align-items-center mt-4 mr-0 mb-0 ml-0 pt-2 pr-0 pb-0 pl-0 border-top border-muted">
                                            <button
                                                type="submit"
                                                className="btn btn-primary d-flex flex-row justify-content-start align-items-center"
                                            >
                                                <FaUserPlus/><span className="m-0 ml-1 p-0">Sign up</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-success d-flex flex-row justify-content-start align-items-center ml-1"
                                                onClick={handleReset}
                                            >
                                                <FaSync/><span className="m-0 ml-1 p-0">Reset</span>
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

export default SignUpView;
