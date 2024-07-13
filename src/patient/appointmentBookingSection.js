import React, { useEffect, useState } from "react";
import { DoctorAppointmentType } from "../patient/doctorAppointmentType";
import { MainAccordion } from "../mainComponent/MainAccordion";
import { FaClinicMedical } from "react-icons/fa";
import AuthApi from "../services/AuthApi";
import { Link, useParams } from "react-router-dom";
import { MainNav } from "../mainComponent/mainNav";
import { Wrapper } from "../mainComponent/Wrapper";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../recoil/atom/setDoctorId";

function AppointmentBookingSection() {
    const { doctorId } = useParams()
    const [clinicData, setClinicData] = useState([])
    const [doctorName, setDoctorName] = useState([])
    const { getDrInfo } = AuthApi()

    useEffect(() => {
        doctorData()
    }, [])

    function doctorData() {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorName(res.result[0])
                setClinicData(res.result[0].clinicList)
            })
    }
    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link to={`/doctors`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Clinic List  </span>
                    </div>
                    <div className="width50 row justifyContent">
                        <div className="appColor normal-font" align='right'>Dr. {doctorName.name}</div>
                    </div>
                </div>
            </MainNav>
            <div className='wraper row'>
                <div className="full-width">
                        <div className="common_box booking">
                            <div>
                                {clinicData.map((clinicItem, id) => (
                                    <MainAccordion key={id} icon={<FaClinicMedical />} title={clinicItem.clinicName}>
                                        <DoctorAppointmentType clinicData={clinicItem} doctorId={doctorId} />
                                    </MainAccordion>
                                ))}
                            </div>
                        </div>
                </div>
            </div>
        </Wrapper>
    )
}
export { AppointmentBookingSection }