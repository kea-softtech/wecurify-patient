import React from "react";
import { PatientLoginForm } from "../patient/patientLoginForm";
import { Wrapper } from "../mainComponent/Wrapper";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { PatientMpin } from "./patientMpin/PatientMpin";

export default function LoginPatient() {
    const [DoctorId, setDoctorsId] = useRecoilState(setDoctorId)

    return (
        <Wrapper>
            <div className='row'>
                <div className="full-width">
                    <div className="common_box ">
                        <PatientMpin doctorId={DoctorId} redirection="dashboard" />
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}