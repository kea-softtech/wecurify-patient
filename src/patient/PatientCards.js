import React from "react";
import { useRecoilState } from "recoil";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { Link } from "react-router-dom";
import application from '../images/appointment.jpg';
import doctorprofile from '../images/doctorprofile.jpg'
import calender from '../images/calender.jpg'
export default function PatientCards() {
    const [patientData] = useRecoilState(setNewPatientId)

    return (
        <div className="full-width mt-4">
            <div className="">
                {/* <div className="row"> */}
                <div className="row add_bottom_30">
                    <div className="col-lg-4">
                        <div className="hoverBox ">
                            <Link to={`/patientappointment/${patientData}`}>
                                <img className="patientImg" src={application} alt="not found" />
                                <h4 className="colorNorm mt-2">Appointments</h4>
                                <div>Check your appointments here to view the booked slots and their respective times.</div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hoverBox">
                            <Link to={`/fetchpatientprofile/${patientData}`}>
                                <img className="patientImg" src={doctorprofile} alt="not found" />
                                <h4 className="colorNorm  mt-2"> Profile</h4>
                                <div>View your profile and make any necessary edits, including adding your lifestyle habits.</div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hoverBox" >
                            <Link to={`/calender/${patientData}`}>
                                <img className="patientImg " src={calender} alt="not found" />
                                <h4 className="colorNorm  mt-2"> Calendar</h4>
                                <div>Click the calendar for a convenient view of your appointments.</div>
                            </Link>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}