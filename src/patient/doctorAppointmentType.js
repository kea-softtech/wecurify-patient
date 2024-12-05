import React, { useEffect, useState } from "react";
import { ShowDoctorInClinicAppointment } from "./showDoctorInClinicAppointment";
import PatientApi from "../services/PatientApi";

const DoctorAppointmentType = (props) => {
    const { doctorId, clinicData} = props;
    const clinicId = props.clinicData._id
    const [clinicSession, setClinicSession] = useState([])
    const { fetchSessionSlotsData } = PatientApi()

    useEffect(() => {
        fetchSessionSlots()
    }, [])

    function fetchSessionSlots() {
        fetchSessionSlotsData({ doctorId, clinicId })
            .then((result) => {
                setClinicSession(result)
            })
    }

    return (
        
        <div>
            {clinicSession.length > 0 ? (
                <ShowDoctorInClinicAppointment 
                    doctorId={doctorId} 
                    clinicId={clinicId} 
                    setSessions={clinicSession} 
                    />
            ) : (<div className="font_weight" style={{ color: "black", margin: '20px' }}>Slots Not Available</div>)}
        </div>
    )
}
export { DoctorAppointmentType }