import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PatientCards from "../patient/PatientCards";
import { useRecoilState } from "recoil";
import { setloggedIn } from "../recoil/atom/setloggedIn";
import { Button } from "react-bootstrap";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import PatientApi from "../services/PatientApi";
import { PatientMobile } from "../patient/patientMpin/PatientMobile";

function HomePageTitle() {
    const [loggedIn] = useRecoilState(setloggedIn)
    const [patientId, setPatientId] = useRecoilState(setNewPatientId)
    const [patientName, setPatientName] = useState([])
    const { fetchPatient } = PatientApi()

    useEffect(() => {
        getAllPatientData()
    }, [])

    function getAllPatientData() {
        if (loggedIn) {
            fetchPatient({ patientId })
                .then((response) => {
                    const patientName = response[0].name
                    if (patientName) {
                        setPatientName(patientName)
                    }
                })
        }
    }
    return (
        <div className=" padding_top_20 wraper">
            {loggedIn === true ?
                <div className="row ">
                    <div className="col-xl-6 text_align ">
                        <h4 className="colorNorm mt-3">Welcome to fly4smile,&nbsp;{patientName}</h4>
                    </div>
                    <div className="col-xl-6 align-items-right mt-3">
                        <NavLink to={`/booking/6698d3f5a895e509cc5ad938`}>
                            <Button className="radius appColor fontS">
                                Book an Appointment
                            </Button>
                        </NavLink>
                    </div>
                </div>
                // <div className="wraper">
                //     <div className="align-items-right mt-3 mb-3">
                //         <NavLink to={`/booking/6698d3f5a895e509cc5ad938`}>
                //             <Button className="radius ml-2  buttonPatient appColor fontS">
                //                 Book Appointment
                //             </Button>
                //         </NavLink>
                //     </div>
                // </div>
                : null
            }
            {loggedIn !== true ?
                <PatientMobile redirection="dashboard" />
                :
                <div className="p-3">
                    <PatientCards />
                </div>
            }
        </div>
    )
}
export { HomePageTitle }