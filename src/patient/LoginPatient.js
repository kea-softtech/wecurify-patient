import React, { useEffect, useState } from "react";
import { PatientLoginForm } from "../patient/patientLoginForm";
import { Wrapper } from "../mainComponent/Wrapper";
import { Link, useParams } from "react-router-dom";
import { MainNav } from "../mainComponent/mainNav";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import AuthApi from "../services/AuthApi";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../recoil/atom/setDoctorId";

export default function LoginPatient() {
    const [DoctorName, setDoctorsName] = useState([])
    const [DoctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const { doctorId } = useParams()
    const { getDrInfo } = AuthApi()

    // useEffect(() => {
    //     doctorInfo()
    // }, [])
    // const doctorInfo = () => {
    //     setDoctorsId(doctorId)
    //     getDrInfo({ doctorId })
    //         .then((res) => {
    //             setDoctorsName(res.result[0].name)
    //         })
    // }
    return (
        <Wrapper>
            {/* <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                            <Link to={`/doctors`}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Add-Patient</span>
                    </div>
                    <div className="width50 row justifyContent">
                        <div className="appColor normal-font" align='right'>Dr. {DoctorName}</div>
                    </div>
                </div>
            </MainNav> */}
            <div className='row'>
                <div className="full-width">
                    <div className="common_box ">
                        <PatientLoginForm doctorId={doctorId} redirection="dashboard" />
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}