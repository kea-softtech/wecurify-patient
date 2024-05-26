import { Link, useParams, useNavigate } from "react-router-dom";
import { PatientRegistrationForm } from "../patient/patientRegistrationForm";
import { Wrapper } from "../mainComponent/Wrapper";
import { MainNav } from "../mainComponent/mainNav";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import AuthApi from "../services/AuthApi";
import { useEffect, useState } from "react";
import { setSessionData } from "../recoil/atom/setSessionData";

export default function CreatePatientProfile() {
    const navigate = useNavigate()
    const { patientId } = useParams()
    const { getDrInfo } = AuthApi()
    const [doctorName, setDoctorsName] = useState([])
    const [sessionData, setSessionsData] = useRecoilState(setSessionData)
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)

    // useEffect(() => {
    //     doctorInfo()
    // }, [])

 
    // const doctorInfo = () => {
    //     getDrInfo({ doctorId })
    //         .then((res) => {
    //             setDoctorsName(res.result[0].name)
    //         })
    // }

    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        {/* <Link to={`/doctors`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link> */}
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Patient</span>
                    </div>
                    {/* <div className="width50 row justifyContent">
                        <div className="appColor normal-font" align='right'>Dr. {doctorName}</div>
                    </div> */}
                </div>
            </MainNav>
            <div className='row'>
                <div className="full-width">
                    <div className="container margin_60">
                        <div className="patientFetch">
                            <div className="Form-data">
                                <div className="box_general_3">
                                    <PatientRegistrationForm patientId={patientId}/>
                                </div>
                            </div>
                            {/* <DoctorBookingConfirmation doctorId={doctorId} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}