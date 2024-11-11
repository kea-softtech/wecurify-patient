import React, { useEffect, useState } from "react";
import AuthApi from "../services/AuthApi";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { MainNav } from "../mainComponent/mainNav";
import { Wrapper } from "../mainComponent/Wrapper";
import Loader from "./patientHistory/Loader";

function ClinicList() {
    const { doctorId } = useParams()
    const [clinicData, setClinicData] = useState(null)
    const [doctorName, setDoctorName] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { getDrInfo } = AuthApi()
    const navigate = useNavigate()

    useEffect(() => {
        doctorData()
    }, []);

    function doctorData() {
        setIsLoading(true);
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorName(res.result[0])
                setClinicData(res.result[0].clinicList)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    const BookAppointments = (clinicId, e) => {
        e.preventDefault();
        navigate(`/bookAppointment/${doctorId}/${clinicId._id}`)
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
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Clinic List  </span>
                    </div>
                    <div className="width50 row justifyContent">
                        <div className="appColor normal-font" align='right'>Dr. {doctorName.name}</div>
                    </div>
                </div>
            </MainNav>
            <div className='wraper  row'>
                <div className="full-width">
                    <div className="common_box p-2 booking">
                        <div className="whiteBox p-2">
                            {isLoading ?
                                <div className='loader-container'>
                                    <Loader />
                                </div>
                                :
                                <>
                                    {clinicData && clinicData.length > 0 ?
                                        <div>
                                            {clinicData && clinicData.map((clinicItem, id) => (
                                                <div key={clinicItem._id}>
                                                    <div className='row underline mb-3'>
                                                        {clinicItem.clinicLogo ?
                                                            <figure className="clinicList col-sm-3" >
                                                                <img
                                                                    className='clinicLogo borderRadius'
                                                                    src={clinicItem.clinicLogo}
                                                                    alt="Clinic Logo"
                                                                />
                                                            </figure>
                                                            : null}
                                                        <div className="clinicList col-sm-6" align='left' >
                                                            <div className="mb-4">
                                                                <div className='font_weight fontS'>{clinicItem.clinicName}
                                                                    <div className="icon-location fontSize color">
                                                                        {clinicItem.address}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='clinicList col-sm-3' align='right'>
                                                            <NavLink onClick={(e) => BookAppointments(clinicItem, e)}>
                                                                <button className='btn appColor helperBtn'>Book Appointment</button>
                                                            </NavLink>
                                                        </div>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        : <div className="clinicHistory mb-3 fontS font-weight" >
                                            Clinics are not available.
                                        </div>
                                    }
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
export { ClinicList }