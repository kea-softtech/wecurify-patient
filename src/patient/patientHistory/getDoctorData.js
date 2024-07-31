import React from 'react';
import { useEffect, useState } from "react";
import AuthApi from "../../services/AuthApi";
import ClinicApi from '../../services/ClinicApi';
import { FaClinicMedical } from 'react-icons/fa';

export default function GetDoctorData(props) {
    const { doctorId, clinicId } = props
    const [doctorData, setDoctorData] = useState([]);
    const [clinicName, setClinicName] = useState([]);
    const [isError, setIsError] = useState(false);
    const { getDrInfo } = AuthApi()
    const { getSingleClinic } = ClinicApi()


    useEffect(() => {
        getDoctorDetails();
        getClinic()
    }, [])

    function getDoctorDetails() {
        getDrInfo({ doctorId })
            .then((result) => {
                if (result.result) {
                    setDoctorData(result.result[0])
                }
                else {
                    setIsError(true)
                }
            })
    }
    function getClinic() {
        getSingleClinic(clinicId)
            .then((result) => {
                setClinicName(result.clinicName)
            })
    }

    return (
        <>
            <div className='doctorCard'>
                <div className='row'>
                    <div className='col-md-5'>
                        <img
                            src={doctorData.photo}
                            alt="doctorProfile"
                            className='doctorphotoPatient'
                        />
                    </div>
                    <div className='col-md-7 mt-3' align='left'>
                        <span className='patientName'>
                            Dr.{doctorData.name}
                        </span>
                        {doctorData['educationList'] ?
                            <>
                                {
                                    doctorData['educationList'].map((item, i) => {
                                        return (
                                            <div key={i} >
                                                {item.specialization}
                                            </div>
                                        )
                                    })
                                }

                            </ >
                            : null}

                    </div>
                </div>
                {isError === true ? <span className="validation mb-2">Server error</span> : null}
            </div>
            <span className='cardSpan time'>
                <i className=' color patientListIcon ml-1 mr-2' ><FaClinicMedical /> </i>
                {clinicName}
            </span>
        </>
    )
}