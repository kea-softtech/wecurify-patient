import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClinicApi from "../../../services/ClinicApi";

export default function ClinicData(props) {
    const { clinicId } = props;
    const [clinics, setclinics] = useState([])
    const {getSingleClinic} = ClinicApi()

    useEffect(() => {
        doctorServices()
    }, [])

    const doctorServices = () => {
        getSingleClinic({ clinicId })
            .then((res) => {
                setclinics(res);
            })
    }

    return (
        <div className="profile">
            {/* <div className="row">
                <div className="col-lg-5 col-md-4">
                    <figure>
                        <img src={clinics.clinicLogo} alt="" className="img-fluid"/>
                    </figure>
                </div>
                <div className="col-lg-7 col-md-8">
                    <small>Primary care - Internist</small>
                    <h1>DR. {clinics.clinicLogo}</h1>
                    <span className="rating">
                        <i className="icon_star voted"></i>
                        <i className="icon_star voted"></i>
                        <i className="icon_star voted"></i>
                        <i className="icon_star voted"></i>
                        <i className="icon_star"></i>
                        <small>(145)</small>
                        <a href="badges.html" data-toggle="tooltip" data-placement="top" data-original-title="Badge Level" className="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt=""/></a>
                    </span>
                    
                    <ul className="contacts">
                        <li>
                            <h6>Address</h6>
                            {clinics.address}
                        </li>
                        <li>
                            <h6>Clinic Number</h6> <Link href="tel://000434323342">{clinics.clinicNumber}</Link>
                        </li>
                    </ul>
                </div>
            </div> */}
        </div>
    )
}