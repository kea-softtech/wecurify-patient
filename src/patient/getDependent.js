import React, { useState, useEffect } from 'react'
import PatientApi from '../services/PatientApi';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { setSessionData } from '../recoil/atom/setSessionData';
import { setSlotData } from '../recoil/atom/setSlotData';
import { Button, Modal } from 'react-bootstrap';
import { setPatientProfileData } from '../recoil/atom/setPatientProfileData';
import { setAppointmentType } from '../recoil/atom/setAppointmentType';
import AuthApi from '../services/AuthApi';
import { setDoctorId } from '../recoil/atom/setDoctorId';

export default function GetDependent(props) {
    const { patientId, doctorId } = props;
    const [fetchPatientData] = useRecoilState(setPatientProfileData)
    const [DoctorId] = useRecoilState(setDoctorId)
    const [slotItem] = useRecoilState(setSlotData)
    const [bookSlot, setbookSlot] = useState([]);
    const [show, setShow] = useState(false);
    const [doctorName, setDoctorName] = useState([])
    const [sessionData] = useRecoilState(setSessionData)
    const { paymentInfo } = PatientApi()
    const { notifyDoctor,getDrInfo } = AuthApi()
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [selectedType, setSelectedType] = useRecoilState(setAppointmentType);

    useEffect(() => {
        getDoctorData()
    }, [])

    const handleShow = (item) => {
        setbookSlot(item)
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }
    function getDoctorData() {
        getDrInfo({ doctorId })
            .then((response) => {
                let doctordata = response['result'][0]
                let fullName = doctordata.name.split(' '),
                    // firstName = fullName[0],
                    lastName = fullName[fullName.length - 1];
                setDoctorName("Dr. " + lastName)
                setToken(doctordata.doctorTokens)
            })
    }

    const handleBookAppointment = async (doctorId) => {
        if (token) {
            const notificationData = {
                doctorId,
                token: token,
                patientId,
                date: sessionData.slotDate,
                appointmentTime: slotItem.time,
                patientName: fetchPatientData.name,
                doctorName: doctorName
                // email: fetchPatientData.email,
                // phone: fetchPatientData.mobile,
            };
            try {
                await notifyDoctor(doctorId, notificationData)
            } catch (error) {
                console.error('Error sending notification to doctor:', error);
            }
        }
    };
    const handleSelectedSlot = (item) => {
        const startDate = (sessionData.selectedDate + " " + slotItem.time)
        const slotId = slotItem._id
        const transactionData = {
            "DoctorId": sessionData.session.doctorId,
            "ClinicId": sessionData.session.clinicId,
            "slotId": slotId,
            "patientId": patientId,
            "dependentId": item._id,
            "transactionId": '123',
            "currency": 'INR',
            "fees": sessionData.session.fees,
            "date": sessionData.slotDate,
            "day": sessionData.session.day,
            "slotTime": slotItem.time,
            "daySlotId": sessionData.session._id,
            "selectedDate": sessionData.selectedDate,
            "timeSlot": sessionData.session.timeSlot,
            "startDate": startDate,
            "selectedType": selectedType,
            "patientmobile": fetchPatientData.mobile,
            "doctorname": doctorName,
            "status": "Ongoing",
            "payment": "hold",
            "email":fetchPatientData.email,
            "parent":DoctorId
        }
        paymentInfo(transactionData)
            .then((res) => {
                if (slotItem._id) {
                    navigate(`/confirm/${sessionData.session.doctorId}`)
                    handleBookAppointment(doctorId)
                } else {
                    navigate(`/booking/${doctorId}`)
                }
                handleClose()
            })
        navigate(`/`)
    }

    return (
        <>
            {fetchPatientData["dependent"] && fetchPatientData["dependent"].length > 0 ?
                <div className="col-md-6 mb-2">
                    <div className="box_general_4 cart patientDetails">
                        <>
                            <div className="underline">
                                <div className="form_title">
                                    <h3>Dependent Details</h3>
                                </div>
                            </div>

                            <div className="patientDataStyle">
                                {fetchPatientData["dependent"] && fetchPatientData["dependent"].map((item, i) => {
                                    return (
                                        <div key={i} className="row">
                                            <div className=' getDependent col-md-7'>
                                                {item.name}
                                            </div>
                                            <div className=' getDependent col-md-5' align='right'>
                                                <Link onClick={() => handleShow(item)} className="btn">
                                                    <i className="arrow_carrot-right_alt" style={{ fontSize: 20 }}></i>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    </div>
                </div>
                : null}
            {/* <div className=" font_weight clinicHistory" >Appointments are not Available</div> */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-bgcolor">You want to book this slot. </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" className='appColor' onClick={() => handleSelectedSlot(bookSlot)}>
                        Yes
                    </Button>
                    <Button variant="default" className='appColorBorder'  onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}