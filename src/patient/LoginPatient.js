import React from "react";
import { Wrapper } from "../mainComponent/Wrapper";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { PatientMobile } from "./patientMpin/PatientMobile";

export default function LoginPatient() {
    const [DoctorId] = useRecoilState(setDoctorId)

    return (
        <Wrapper>
            <div className='row'>
                <div className="full-width">
                    <div className="common_box ">
                        {/* <PatientMpin doctorId={DoctorId} redirection="dashboard" /> */}
                        <PatientMobile  doctorId={DoctorId}/>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}