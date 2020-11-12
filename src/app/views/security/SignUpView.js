import React from "react";
import {FaUserPlus, FaSync} from "react-icons/fa";
import {URL_SECURITY_LOGIN} from "../../routers/routes";
import ContentLayout from "../../layouts/content/ContentLayout";
import CenterLayout from "../../layouts/content/center/CenterLayout";
import {firebaseApp} from "../../services/firebase";

class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: "",
            password: "",
            passwordConfirm: "",
        };
    }

    render() {
        return (
            <ContentLayout>
                <CenterLayout icon={FaUserPlus} title="Sign up">
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
                                <div className="form-group">
                                    <label htmlFor="password" className="font-weight-bolder">Password:</label>
                                    <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="-Password-" autoComplete="off" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordConfirm" className="font-weight-bolder">Password Confirm:</label>
                                    <input value={this.state.passwordConfirm} onChange={this.handleChange} type="password" name="passwordConfirm" className="form-control" placeholder="-Password Confirm-" autoComplete="off" required/>
                                </div>
                                <div className="d-flex flex-row justify-content-start align-items-center mt-4 mr-0 mb-0 ml-0 pt-2 pr-0 pb-0 pl-0 border-top border-muted">
                                    <button type="submit" className="btn btn-primary d-flex flex-row justify-content-start align-items-center"><FaUserPlus/><span className="m-0 ml-1 p-0">Sign up</span></button>
                                    <button type="button" className="btn btn-outline-success d-flex flex-row justify-content-start align-items-center ml-1" onClick={this.handleReset}><FaSync/><span className="m-0 ml-1 p-0">Reset</span></button>
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
        if (this.state.password === this.state.passwordConfirm) {
            try {
                await firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
                await firebaseApp.auth().signOut();
                this.props.history.push(URL_SECURITY_LOGIN);
            } catch (error) {
                this.setState({
                    error: error.message,
                    email: "",
                    password: "",
                    passwordConfirm: "",
                });
            }
        } else {
            this.setState({
                error: "Password and Password Confirm do not match.",
                email: this.state.email,
                password: "",
                passwordConfirm: "",
            });
        }
    }

    handleReset = (event) => {
        this.setState({
            error: null,
            email: "",
            password: "",
            passwordConfirm: "",
        });
    }
}

export default SignUpView;
