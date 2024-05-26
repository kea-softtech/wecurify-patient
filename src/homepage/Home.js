import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { HomePageTitle } from "./HomepageTitle";
// import { MostViewedDr } from "./MostViewedDr";
import { setDoctorId } from "../recoil/atom/setDoctorId";

export default function Home() {
    //using for preloader
    // const doctorId = useRecoilState(setDoctorId);
    const [loading] = useState(false);

    // let navigate = useNavigate();

    // const handleButtonClick = () => {
    //     navigate(`/doctors`);
    // };

    return (
        <main>
            {loading && <LinearProgress size={800} />}
            <HomePageTitle />
            {/* Most Viewed doctors */}
            {/* <div className="bg_color_1">
                <div className="container margin_120_95">
                    <div className="main_title">
                        <h2>Most Viewed doctors</h2>
                        <div>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri.</div>
                    </div>
                    <MostViewedDr doctorId={doctorId} />
                    <div className="text-center add_top_30"><Link to="/doctors" disabled={loading} onClick={handleButtonClick} className="btn_1 medium">View all Doctors</Link></div>
                </div>
            </div> */}

            {/* Application Download */}
            <div id="app_section">
                <div className="container">
                    <div className="row justify-content-around">
                        <div className="col-md-6">
                            <small>Application</small>
                            <h3>Download <strong>KeaCure App</strong> Now!</h3>
                            <div className="lead">Book your a doctor sitting at home </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}