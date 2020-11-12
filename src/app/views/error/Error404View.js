import React from "react";
import ContentLayout from "../../layouts/content/ContentLayout";
import CenterLayout from "../../layouts/content/center/CenterLayout";
import {BsExclamationTriangleFill} from "react-icons/bs";

class Error404View extends React.Component {
    render() {
        return (
            <ContentLayout>
                <CenterLayout icon={BsExclamationTriangleFill} title="Error 404">
                    <p className="m-0 p-0 font-weight-bolder text-center">Page not found.</p>
                </CenterLayout>
            </ContentLayout>
        );
    }
}

export default Error404View;
