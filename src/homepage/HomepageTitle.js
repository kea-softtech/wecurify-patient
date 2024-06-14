import React from "react";
import { NavLink } from "react-router-dom";
import PatientCards from "../patient/PatientCards";
import { useRecoilState } from "recoil";
import { setloggedIn } from "../recoil/atom/setloggedIn";
import { setPatientProfileData } from "../recoil/atom/setPatientProfileData";

function HomePageTitle() {
    const [loggedIn] = useRecoilState(setloggedIn)
    const [patientProfiledata] = useRecoilState(setPatientProfileData)

    return (
        <div className="container margin_120_95">
            {/* <div className="main_title">
                <h2>Discover the <strong>online</strong> appointment!</h2>
            </div> */}
            <div className="row mb-3">
                <div align='left' className="col-md-6">
                    {loggedIn === true ? <h4 className="colorNorm mt-3">Hello {patientProfiledata.name},</h4> : null}
                </div>
                <div align='right' className="col-md-6 mb-2">
                    <NavLink to="/doctors">
                        <button className="btn appColor helperBtn fontSize">
                            <b>Find Doctor</b>
                        </button>
                    </NavLink>
                </div>
            </div>

            <div className="row add_bottom_30">
                <div className="col-lg-4">
                    <div className="box_feat" id="icon_1">
                        <span></span>
                        <h3>Find Doctor</h3>
                        <div>"Click the 'Find Doctors' button, then choose a doctor based on what you need."</div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="box_feat" id="icon_2">
                        <span></span>
                        <h3>Create profile</h3>
                        <div>"If you're not logged in, please create your profile to schedule an appointment."</div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="box_feat" id="icon_3">
                        <h3>Book a visit</h3>
                        <div>"After creating your profile, schedule your appointment based on your preferred time slot."</div>
                    </div>
                </div>
            </div>

            {loggedIn === true ?
                <PatientCards />
                : null}
            {/* <div className="text-center"><Link to="" disabled={loading}  onClick={handleButtonClick} className="btn_1 medium">Find Doctor</Link></div> */}
        </div>
    )
}
export { HomePageTitle }