import React from "react";

const CenterLayout = (props) => {
    return (
        <div id="app-content-center" className="col-12 col-md border border-white bg-white">
            <h3 id="app-content-center-title" className="d-flex flex-row justify-content-start align-items-center m-0 px-0 px-md-3 py-1 border-bottom border-muted">
                {<props.icon/>}<span className="m-0 ml-1 p-0">{props.title}</span>
            </h3>
            <div id="app-content-center-content" className="m-0 px-0 py-3 p-md-3">
                {props.children}
            </div>
        </div>
    );
}

export default CenterLayout;
