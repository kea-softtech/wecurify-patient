import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClinicData from "./clinicData";
import ClinicServices from "./ClinicServices";
import ClinicApi from "../../../services/ClinicApi";

export default function SelectSlot() {
    const { clinicId } = useParams();
    const [clinics, setclinics] = useState([])
    const {getSingleClinic} = ClinicApi()

    // useEffect(() => {
    //     doctorServices()
    // }, [])

    // const doctorServices = () => {
    //     getSingleClinic({ clinicId })
    //         .then((res) => {
    //             const clinics = res.result[0]['clinicList']
    //             setclinics(clinics);
    //         })
    // }
    return (
        <div className="container margin_60">
            <div className="row">
                
            </div>
        </div>
    )
}