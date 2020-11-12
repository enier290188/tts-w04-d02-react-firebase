import React from "react";

class ContentLayout extends React.Component {
    render() {
        return (
            <main id="app-content" className="m-0 mt-5 p-0 py-md-2 bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default ContentLayout;
