import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {FaSignOutAlt, FaHistory} from "react-icons/fa";
import {URL_INDEX} from "../../routers/routes";
import ContentLayout from "../../layouts/content/ContentLayout";
import CenterLayout from "../../layouts/content/center/CenterLayout";
import {firebaseApp} from "../../services/firebase";

const LogOutView = () => {
    const history = useHistory();
    const [error, setError] = useState(null);

    const handleCancel = (event) => {
        event.preventDefault();
        setError(null);
        history.push(URL_INDEX);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            await firebaseApp.auth().signOut();
            history.push(URL_INDEX);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <ContentLayout>
            <CenterLayout icon={FaSignOutAlt} title="Log out">
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
                            <div className="m-0 mb-2 alert alert-info fade show" role="alert">
                                <p className="m-0 p-0 text-left">Would you like log out?</p>
                            </div>
                            <div className="d-flex flex-row justify-content-start align-items-center mt-4 mr-0 mb-0 ml-0 pt-2 pr-0 pb-0 pl-0 border-top border-muted">
                                <button
                                    type="submit"
                                    className="btn btn-primary d-flex flex-row justify-content-start align-items-center"
                                >
                                    <FaSignOutAlt/><span className="m-0 ml-1 p-0">Log out</span>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-success d-flex flex-row justify-content-start align-items-center ml-1"
                                    onClick={handleCancel}
                                >
                                    <FaHistory/><span className="m-0 ml-1 p-0">Cancel</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </CenterLayout>
        </ContentLayout>
    );
}

export default LogOutView;
