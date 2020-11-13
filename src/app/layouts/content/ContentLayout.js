import React from "react";

const ContentLayout = (props) => {
    return (
        <main id="app-content" className="m-0 mt-5 p-0 py-md-2 bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ContentLayout;
