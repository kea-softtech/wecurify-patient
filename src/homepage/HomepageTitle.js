import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PatientCards from "../patient/PatientCards";
import { useRecoilState } from "recoil";
import { setloggedIn } from "../recoil/atom/setloggedIn";
import { Button } from "react-bootstrap";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import PatientApi from "../services/PatientApi";

function HomePageTitle() {
    const [loggedIn] = useRecoilState(setloggedIn)
    const [patientId, setPatientId] = useRecoilState(setNewPatientId)
    const [patientData, setPatientData] = useState(null)
    const { fetchPatient } = PatientApi()

    useEffect(() => {
        getAllPatientData()
    }, [])

    function getAllPatientData() {
        fetchPatient({ patientId })
            .then((response) => {
                if (response[0]) {
                    setPatientData(response[0])
                }
            })
    }
    return (
        <div className="container margin_120_95">
            <div className="row">
                <div className="col-md-4">
                    {loggedIn === true ?
                        <div align='left' className="">
                            <h4 className="colorNorm mt-3">Welcome to wecurify, </h4>
                        </div>
                        : null}
                </div>
                {loggedIn !== true ?
                    <div className=" col-md-8 button_responsive row" align='left' >
                        <div className="mb-3">
                            <NavLink to="https://doctor.wecurify.com/">
                                <Button className="radius btn-home ml-2 buttonPatient appColor fontS">
                                    I am a doctor
                                </Button>
                            </NavLink>
                            <NavLink to="/doctors">
                                <Button className="radius ml-2 btn-home  buttonPatient appColor fontS">
                                    Find a doctor
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                    : <div align='right' className="col-md-8 mt-3">
                        <NavLink to="/doctors">
                            <Button className="radius ml-2  buttonPatient appColor fontS">
                                Find a doctor
                            </Button>
                        </NavLink>
                    </div>
                }

            </div>


            <div className="row add_bottom_30">
                {loggedIn !== true ?
                    <>
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
                    </>
                    : <PatientCards />
                }
            </div>

        </div>
    )
}
export { HomePageTitle }