import React from "react";
import { PatientLoginForm } from "../patient/patientLoginForm";
import { Wrapper } from "../mainComponent/Wrapper";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../recoil/atom/setDoctorId";

export default function LoginPatient() {
    const [DoctorId, setDoctorsId] = useRecoilState(setDoctorId)

    return (
        <Wrapper>
            <div className='row'>
                <div className="full-width">
                    <div className="common_box ">
                        <PatientLoginForm doctorId={DoctorId} redirection="dashboard" />
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}