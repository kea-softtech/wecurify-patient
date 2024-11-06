import React, { useEffect, useState } from "react";
import { DoctorAppointmentType } from "../patient/doctorAppointmentType";
import { MainAccordion } from "../mainComponent/MainAccordion";
import { FaClinicMedical } from "react-icons/fa";
import AuthApi from "../services/AuthApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MainNav } from "../mainComponent/mainNav";
import { Wrapper } from "../mainComponent/Wrapper";
import Loader from "./patientHistory/Loader";
import ClinicApi from "../services/ClinicApi";

function AppointmentBookingSection() {
    const { doctorId, clinicId } = useParams()
    const [ clinicData, setClinicData] = useState(null)
    const [ doctorName, setDoctorName] = useState([])
    const [ isLoading, setIsLoading] = useState(true);
    const { getDrInfo } = AuthApi()
    const { getClinic } = ClinicApi()
    const navigate = useNavigate()
    
    useEffect(() => {
        doctorData();
        clinic();
    }, [])

    function doctorData() {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorName(res.result[0])
            })
    }

    function clinic() {
        setIsLoading(true);
        getClinic({ clinicId })
            .then((res) => {
                setClinicData(res)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const goBack = () => {
        navigate(-1)
    }
    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link onClick={goBack}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Book Appointment</span>
                    </div>
                    <div className="width50 row justifyContent">
                        <div className="appColor normal-font" align='right'>Dr. {doctorName.name}</div>
                    </div>
                </div>
            </MainNav>

            <div className='wraper row'>
                <div className="full-width">
                    <div className="common_box booking">
                        {isLoading ?
                            <div className='loader-container'>
                                <Loader />
                            </div>
                            :
                            <>
                                <div>
                                    <MainAccordion icon={<FaClinicMedical />} title={clinicData.clinicName}>
                                        <DoctorAppointmentType clinicData={clinicData} doctorId={doctorId} />
                                    </MainAccordion>
                                </div>

                            </>}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
export { AppointmentBookingSection }