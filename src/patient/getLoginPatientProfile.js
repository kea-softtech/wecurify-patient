import { useParams, Link } from "react-router-dom";
import { FetchPatientInfo } from "./fetchPatientInfo";
import { Wrapper } from "../mainComponent/Wrapper";
import { useRecoilState } from "recoil";
import { MainNav } from "../mainComponent/mainNav";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { useEffect, useState } from "react";
import AuthApi from "../services/AuthApi";
import GetDependent from "./getDependent";
import { setSessionData } from "../recoil/atom/setSessionData";

export default function GetLoginPatientProfile() {
    const { patientId } = useParams()
    const { getDrInfo } = AuthApi()
    const [sessionData, setSessionsData] = useRecoilState(setSessionData)
    const [DoctorName, setDoctorsName] = useState([])
    const [DoctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const doctorId = DoctorId

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
        <>
            <Wrapper>
                <MainNav>
                    <div className="clearfix row">
                        <div className="width50">
                            <Link to={`/allpatient`}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </Link>
                            <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Walkin Patient</span>
                        </div>
                        <div className="width50 row justifyContent">
                            {/* <div className="appColor normal-font" align='right'>Dr. {DoctorName}</div> */}
                        </div>
                    </div>
                </MainNav>
                <div className='row'>
                    {/* <div className="width16">
                        <div className="dash row">
                            <UserLinks />
                        </div>
                    </div> */}
                    <div className="full-width">
                        <div className="common_box mb-3">
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <div className="box_general_4 cart patientDetails">
                                        <FetchPatientInfo doctorId={doctorId} patientId={patientId} />
                                    </div>
                                </div>
                                <GetDependent  doctorId={doctorId} patientId={patientId} />
                            </div>
                        </div>
                    </div>
                </div>
                
            </Wrapper >
        </>
    )
}