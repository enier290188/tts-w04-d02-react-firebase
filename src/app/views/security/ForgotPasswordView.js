import React from "react";
import {FaLockOpen, FaSync, FaSignInAlt} from "react-icons/fa";
import {URL_SECURITY_LOGIN} from "../../routers/routes";
import ContentLayout from "../../layouts/content/ContentLayout";
import CenterLayout from "../../layouts/content/center/CenterLayout";
import {firebaseApp} from "../../services/firebase";

class ForgotPasswordView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: "",
        };
    }

    render() {
        return (
            <ContentLayout>
                <CenterLayout icon={FaLockOpen} title="Forgot password">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                            <form className="m-0 mb-2 mb-md-0 p-3 border border-muted bg-light" autoComplete="off" onSubmit={this.handleSubmit}>
                                {
                                    this.state.error ? (
                                        <div className="m-0 mb-3 alert alert-danger alert-dismissible fade show" role="alert">
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                            <p className="m-0 p-0 text-left">{this.state.error}</p>
                                        </div>
                                    ) : null
                                }
                                <div className="form-group">
                                    <label htmlFor="email" className="font-weight-bolder">Email:</label>
                                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" placeholder="-Email-" autoComplete="off" required/>
                                </div>
                                <div className="d-flex flex-row justify-content-start align-items-center mt-4 mr-0 mb-0 ml-0 pt-2 pr-0 pb-0 pl-0 border-top border-muted">
                                    <button type="submit" className="btn btn-primary d-flex flex-row justify-content-start align-items-center"><FaLockOpen/><span className="m-0 ml-1 p-0">Send email for reset password</span></button>
                                    <button type="button" className="btn btn-outline-success d-flex flex-row justify-content-start align-items-center ml-1" onClick={this.handleReset}><FaSync/><span className="m-0 ml-1 p-0">Reset</span></button>
                                </div>
                                <div className="d-flex flex-row justify-content-end align-items-center mt-0 mr-0 mb-0 ml-0 pt-2 pr-0 pb-0 pl-0">
                                    <button type="button" className="btn btn-link d-flex flex-row justify-content-start align-items-center ml-1" onClick={this.handleLogIn}><FaSignInAlt/><span className="m-0 ml-1 p-0">Log in</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </CenterLayout>
            </ContentLayout>
        );
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
            await firebaseApp.auth().sendPasswordResetEmail(this.state.email);
            this.props.history.push(URL_SECURITY_LOGIN);
        } catch (error) {
            this.setState({
                error: error.message,
                email: "",
            });
        }
    }

    handleReset = (event) => {
        this.setState({
            error: null,
            email: "",
        });
    }

    handleLogIn = (event) => {
        this.setState({
            error: null,
            email: "",
        });
        this.props.history.push(URL_SECURITY_LOGIN);
    }
}

export default ForgotPasswordView;
