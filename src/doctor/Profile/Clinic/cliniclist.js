import React, { useState, useEffect } from "react";
import AuthApi from "../../../services/AuthApi";
import { MainButtonInput } from "../../../mainComponent/mainButtonInput";
import { useNavigate } from "react-router-dom";

export default function ClinicList(props) {
    const { doctorId } = props
    const [clinics, setclinics] = useState([])
    const { getDrInfo } = AuthApi()
    const navigate = useNavigate();

    useEffect(() => {
        doctorServices()
    }, [])

    const doctorServices = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                console.log("res----", res)
                const clinics = res.result[0]['clinicList']
                setclinics(clinics);
            })
    }

    const BookAppointments = (e) => {
        e.preventDefault();
        navigate(`/booking/${doctorId}`)
    }

    return (
        <aside className="col-xl-4 col-lg-4" id="sidebar">
            <div className="box_general_3 booking">
                <div className="title">
                    <h3>Book a Visit</h3>
                    <small>Monday to Friday 09.00am-06.00pm</small>
                </div>
                <div id="message-booking"></div>
                <ul className="treatments clearfix">
                    {clinics.map((clinic, i) => {
                        return (
                            <li key={i}>
                                <div class="row">
                                    <div >
                                        <img
                                            className='clinicLogo borderRadius'
                                            src={clinic.clinicLogo}
                                            alt="Clinic Logo"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <div for="visit1" className="css-label"><b>{clinic.clinicName}</b></div>
                                        {/* <MainButtonInput onClick={(e) => BookAppointments(clinic, e)}>Check Availability</MainButtonInput> */}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <MainButtonInput onClick={(e) => BookAppointments(e)}>Book an Appointment</MainButtonInput>
        </aside>
    )
}