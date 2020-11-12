import React from "react";
import {FaSignOutAlt, FaHistory} from "react-icons/fa";
import {URL_INDEX} from "../../routers/routes";
import ContentLayout from "../../layouts/content/ContentLayout";
import CenterLayout from "../../layouts/content/center/CenterLayout";
import {firebaseApp} from "../../services/firebase";

class LogOutView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    render() {
        return (
            <ContentLayout>
                <CenterLayout icon={FaSignOutAlt} title="Log out">
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
                                <div className="m-0 mb-2 alert alert-info fade show" role="alert">
                                    <p className="m-0 p-0 text-left">Would you like log out?</p>
                                </div>
                                <div className="d-flex flex-row justify-content-start align-items-center mt-4 mr-0 mb-0 ml-0 pt-2 pr-0 pb-0 pl-0 border-top border-muted">
                                    <button type="submit" className="btn btn-primary d-flex flex-row justify-content-start align-items-center"><FaSignOutAlt/><span className="m-0 ml-1 p-0">Log out</span></button>
                                    <button type="button" className="btn btn-outline-success d-flex flex-row justify-content-start align-items-center ml-1" onClick={this.handleCancel}><FaHistory/><span className="m-0 ml-1 p-0">Cancel</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </CenterLayout>
            </ContentLayout>
        );
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            error: null,
        });

        try {
            await firebaseApp.auth().signOut();
            this.props.history.push(URL_INDEX);
        } catch (error) {
            this.setState({
                error: error.message,
            });
        }
    }

    handleCancel = (event) => {
        this.setState({
            error: null,
        });
        this.props.history.push(URL_INDEX);
    }
}

export default LogOutView;
