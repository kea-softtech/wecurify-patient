import { Link, useParams } from "react-router-dom";
import { Wrapper } from "../mainComponent/Wrapper";
import { MainNav } from "../mainComponent/mainNav";
import AuthApi from "../services/AuthApi";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import PatientApi from "../services/PatientApi";

export default function SlotConfirmation() {
    const [patientId, setPatientId] = useRecoilState(setNewPatientId)
    const {doctorId} = useParams()
    const [doctorData, setDoctorData] = useState([])
    const [patientData, setPatientData] = useState([])
    const { getDrInfo } = AuthApi()
    const { fetchPatient } = PatientApi()

    useEffect(() => {
        doctorInfo()
        patientInfo()
    }, [])

    const doctorInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorData(res.result[0])
            })
    }

    const patientInfo = () => {
        fetchPatient({ patientId })
            .then((res) => {
                setPatientData(res[0])
            })
    }

    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Booking Confirmation</span>
                    </div>
                    <div className="width50 row justifyContent" align='right'>
                        <div className="appColor normal-font" >Dr. {doctorData.name}</div>
                    </div>
                </div>
            </MainNav>
            <div className='row'>
                <div className="full-width">
                    <div className="container common_box margin_60">
                        <div className=" patientFetch">
                            <div className="box_general_3">
                                <h1 className='color'>Thank You For Booking Your Appoinment</h1>
                                <div className='fontS'>
                                    {patientData.name}  Your
                                    Appointment booked with
                                    Dr. {doctorData.name}
                                </div>
                                <Link to={`/`}>
                                    <button align='right' className='btn appColor helperBtn'>Done</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper >
    )
}
