import React from "react";
import {Switch, Route, Redirect} from "react-router";
import {RequiresAuthenticatedUserRoute} from "../security/routes";
import ChatView from "../views/chat/ChatView";
import SignUp from "../views/security/SignUpView";
import ForgotPasswordView from "../views/security/ForgotPasswordView";
import LogInView from "../views/security/LogInView";
import LogOutView from "../views/security/LogOutView";
import Error404View from "../views/error/Error404View";

export const URL_INDEX = "/";
export const URL_CHAT = "/chat/";
export const URL_SECURITY_SIGNUP = "/sign-up/";
export const URL_SECURITY_FORGOTPASSWORD = "/forgot-password/";
export const URL_SECURITY_LOGIN = "/log-in/";
export const URL_SECURITY_LOGOUT = "/log-out/";

export const Routes = (props) => {
    return (
        <Switch>
            <Route path={URL_INDEX} exact><Redirect from={URL_INDEX} to={URL_CHAT}/></Route>
            <RequiresAuthenticatedUserRoute path={URL_CHAT} component={ChatView} user={props.user}/>
            <Route path={URL_SECURITY_SIGNUP} component={SignUp}/>
            <Route path={URL_SECURITY_FORGOTPASSWORD} component={ForgotPasswordView}/>
            <Route path={URL_SECURITY_LOGIN} component={LogInView}/>
            <RequiresAuthenticatedUserRoute path={URL_SECURITY_LOGOUT} component={LogOutView} user={props.user}/>
            <Route path="*" component={Error404View}/>
        </Switch>
    );
}
