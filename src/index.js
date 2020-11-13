import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import {Routes} from "./app/routers/routes";
import LoadingLayout from "./app/layouts/loading/LoadingLayout";
import HeaderLayout from "./app/layouts/header/HeaderLayout";
import FooterLayout from "./app/layouts/footer/FooterLayout";
import {firebaseApp} from "./app/services/firebase";
import {UserProvider} from "./app/contexts/contexts";

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        });
    })

    return (
        loading ? (
            <LoadingLayout/>
        ) : (
            <UserProvider value={user}>
                <HeaderLayout/>
                <Routes/>
                <FooterLayout/>
            </UserProvider>
        )
    );
}

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <App/>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById("app")
);
