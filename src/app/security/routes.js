import React from "react";
import {Redirect, Route} from "react-router-dom";
import {URL_SECURITY_LOGIN} from "../routers/routes";

export const RequiresAuthenticatedUserRoute = ({path, component, user, ...rest}) => {
    if (user) {
        return (
            <Route path={path} component={component} {...rest}/>
        );
    } else {
        return (
            <Redirect from={path} to={URL_SECURITY_LOGIN}/>
        );
    }
}
