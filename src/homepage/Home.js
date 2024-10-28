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
        </main>
    )
}