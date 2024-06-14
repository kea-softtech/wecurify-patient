import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";
import { useState } from "react";
import { HomePageTitle } from "./HomepageTitle";

export default function Home() {
    const [loading] = useState(false);
    
    return (
        <main>
            {loading && <LinearProgress size={800} />}
            <HomePageTitle />
            <div id="app_section">
                <div className="container">
                    <div className="row justify-content-around">
                        <div className="col-md-6">
                            <small>Application</small>
                            <h3>Download <strong>Wecurify</strong> Now!</h3>
                            <div className="lead">Book your a doctor sitting at home </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}