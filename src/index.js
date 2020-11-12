import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import {Routes} from "./app/routers/routes";
import LoadingLayout from "./app/layouts/loading/LoadingLayout";
import HeaderLayout from "./app/layouts/header/HeaderLayout";
import FooterLayout from "./app/layouts/footer/FooterLayout";
import {firebaseApp} from "./app/services/firebase";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true,
        };
    }

    render() {
        return (
            (this.state.loading === true) ? (
                <LoadingLayout/>
            ) : (
                <React.Fragment>
                    <HeaderLayout user={this.state.user}/>
                    <Routes user={this.state.user}/>
                    <FooterLayout/>
                </React.Fragment>
            ));
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user,
                    loading: false,
                });
            } else {
                this.setState({
                    user: null,
                    loading: false,
                });
            }
        });
    }
}

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <App/>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById("app")
);