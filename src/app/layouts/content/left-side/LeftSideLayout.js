import React from "react";

class LeftSideLayout extends React.Component {
    render() {
        return (
            <div id="app-content-left" className="col-12 col-md-auto border border-muted bg-light">
                <h3 id="app-content-left-title" className="d-none d-md-block d-md-flex flex-md-row justify-content-md-start align-items-md-center m-0 px-0 px-md-3 py-1 border-bottom border-muted">
                    &nbsp;
                </h3>
                <div id="app-content-left-content" className="m-0 px-0 py-3 p-md-3">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LeftSideLayout;
