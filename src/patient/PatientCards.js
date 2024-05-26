import React from "react";
import { useRecoilState } from "recoil";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import PatientHistory from "./patientHistory";
import { Link } from "react-router-dom";


export default function PatientCards() {
    const [patientData, setPatientData] = useRecoilState(setNewPatientId)

    return (
        <div className="full-width mt-4">
            <div className="common_box">
                <div className="row">
                    <div className="col-md-4 ">
                        <div className="cardDiv">
                            <span className='cardSpan'>
                                <i className='icon-docs m-1 color patientListIcon' />
                                <Link to={`/patientappointment/${patientData}`}> Appoinment</Link>
                            </span>

                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="cardDiv">
                            <span className='cardSpan'>
                                <i className='icon-user m-1 color patientListIcon' />
                                <Link to={`/patientinfo/${patientData}`}> Profile</Link>
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}