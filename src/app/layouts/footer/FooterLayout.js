import React from "react";
import {DiReact, DiFirebase} from "react-icons/di";

class FooterLayout extends React.Component {
    render() {
        return (
            <footer id="app-footer" className="m-0 p-0 border-top border-muted bg-white">
                <div className="container">
                    <div className="row">
                        <div id="app-footer-center" className="col-12 border border-white bg-white">
                            <p className="m-0 p-3 text-center text-muted">Copyright &copy; 2020, <DiReact size="1em"/>REACT-FIREBASE<DiFirebase size="1em"/>.</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default FooterLayout;
