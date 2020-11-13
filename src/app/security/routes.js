import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {URL_SECURITY_LOGIN} from "../routers/routes";
import UserContext from "../contexts/contexts";

export const RequiresAuthenticatedUserRoute = ({path, component, ...rest}) => {
    const user = useContext(UserContext);

    return user ? <Route path={path} component={component} {...rest}/> : <Redirect from={path} to={URL_SECURITY_LOGIN}/>;
}
