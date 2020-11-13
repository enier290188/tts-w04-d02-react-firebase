import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {FaUserPlus, FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {DiReact, DiFirebase} from "react-icons/di";
import {URL_INDEX, URL_SECURITY_SIGNUP, URL_SECURITY_LOGIN, URL_SECURITY_LOGOUT} from "../../routers/routes";
import UserContext from "../../contexts/contexts";

const HeaderLayout = () => {
    const user = useContext(UserContext);

    return (
        <header id="app-header" className="fixed-top m-0 p-0 bg-primary">
            <div className="container">
                <div className="row">
                    <div id="app-header-center" className="col-12">
                        <nav id="app-header-center-navbar" className="navbar navbar-dark navbar-expand-md m-0 p-0 bg-primary">
                            <NavLink className="navbar-brand m-0 p-0" activeClassName="active" to={URL_INDEX}>
                                <DiReact size="48px"/>
                                <span className="h2 m-0 p-0 align-middle text-white text-uppercase text-decoration-none font-weight-bold">REACT+FIREBASE</span>
                                <DiFirebase size="48px"/>
                            </NavLink>
                            <button className="navbar-toggler m-0 p-0" type="button" data-toggle="collapse" data-target="#app-header-center-navbar-collapse" aria-controls="app-header-center-navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <div id="app-header-center-navbar-collapse" className="collapse navbar-collapse m-0 p-0">
                                <div className="navbar-nav m-0 ml-auto p-0">
                                    {
                                        user ? (
                                            <React.Fragment>
                                                <span className="nav-link d-flex flex-row justify-content-start align-items-center m-0 px-2 py-2 active">
                                                    <FaUser size="24px"/>
                                                    <span className="h6 m-0 ml-1 p-0">{user.displayName}</span>
                                                </span>
                                                <NavLink className="nav-link d-flex flex-row justify-content-start align-items-center m-0 px-2 py-2" activeClassName="active" to={URL_SECURITY_LOGOUT}>
                                                    <FaSignOutAlt size="24px"/>
                                                    <span className="h6 m-0 ml-1 p-0">Log out</span>
                                                </NavLink>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <NavLink className="nav-link d-flex flex-row justify-content-start align-items-center m-0 px-2 py-2" activeClassName="active" to={URL_SECURITY_LOGIN}>
                                                    <FaSignInAlt size="24px"/>
                                                    <span className="h6 m-0 ml-1 p-0">Log in</span>
                                                </NavLink>
                                                <NavLink className="nav-link d-flex flex-row justify-content-start align-items-center m-0 px-2 py-2" activeClassName="active" to={URL_SECURITY_SIGNUP}>
                                                    <FaUserPlus size="24px"/>
                                                    <span className="h6 m-0 ml-1 p-0">Sign up</span>
                                                </NavLink>
                                            </React.Fragment>
                                        )
                                    }
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderLayout;
