import { useState, useEffect } from "react";
import React from 'react';
import AuthApi from "../../../services/AuthApi";
import { Link } from "react-router-dom";

function DoctorPersonalInformation(props) {
    const { doctorId } = props;
    const { getDrInfo } = AuthApi()
    const [fetchPersonalData, setFetchPersonalData] = useState([])

    useEffect(() => {
        getDoctorPersonalDetails();
    }, [props])

    const getDoctorPersonalDetails = () => {
        getDrInfo({ doctorId })
            .then((result) => {
                setFetchPersonalData(result.result[0]);
            })
    }

    return (
        <div className="profile">
            <div className="row">
                <div className="col-lg-5 col-md-4">
                    <figure>
                        <img src={fetchPersonalData.photo} alt="" className="img-fluid"/>
                    </figure>
                </div>
                <div className="col-lg-7 col-md-8">
                    <small>Primary care - Internist</small>
                    <h1>DR. {fetchPersonalData.name}</h1>
                    <span className="rating">
                        <i className="icon_star voted"></i>
                        <i className="icon_star voted"></i>
                        <i className="icon_star voted"></i>
                        <i className="icon_star voted"></i>
                        <i className="icon_star"></i>
                        <small>(145)</small>
                        <a href="badges.html" data-toggle="tooltip" data-placement="top" data-original-title="Badge Level" className="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt=""/></a>
                    </span>
                    <ul className="statistic">
                        <li>854 Views</li>
                        <li>124 Patients</li>
                    </ul>
                    <ul className="contacts">
                        <li>
                            <h6>Address</h6>
                            {fetchPersonalData.address}
                        </li>
                        <li>
                            <h6>Phone</h6> <Link href="tel://000434323342">{fetchPersonalData.mobile}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export { DoctorPersonalInformation }