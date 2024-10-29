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
import { generateToken } from '../firebase.config';

export default function GetDependent(props) {
    const { patientId, doctorId } = props;
    const [fetchPatientData] = useRecoilState(setPatientProfileData)
    const [slotItem] = useRecoilState(setSlotData)
    const [bookSlot, setbookSlot] = useState([]);
    const [show, setShow] = useState(false);
    const [doctorName, setDoctorName] = useState([])
    const [sessionData] = useRecoilState(setSessionData)
    const { paymentInfo } = PatientApi()
    const { notifyDoctor } = AuthApi()
    const { addDoctorInformation } = AuthApi()
    const navigate = useNavigate()
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
        addDoctorInformation({ doctorId })
            .then((response) => {
                let fullName = response.name.split(' '),
                    firstName = fullName[0],
                    lastName = fullName[fullName.length - 1];
                setDoctorName("Dr. " + lastName)
            })
    }

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
            "payment": "hold"
        }
        paymentInfo(transactionData)
            .then((res) => {
                if (slotItem._id) {
                    navigate(`/confirm`)
                } else {
                    navigate(`/booking/${doctorId}`)
                }
                handleClose()
            })
        // requestToken(item._id, sessionData.session.doctorId, slotItem.time, sessionData.selectedDate)
        navigate(`/`)
    }
    // const requestToken = (dependentId, doctorId, time, selectedDate) => {
    //     const userType = {
    //         doctor: 'doctor',
    //         patient: 'patient'
    //     }
    //     generateToken(userType.doctor)
    //         .then((doctorToken) => {
    //             if (!doctorToken) {
    //                 console.error('Failed to get doctor token.');
    //                 return;
    //             }
    //             generateToken(userType.patient)
    //                 .then((patientToken) => {
    //                     if (!patientToken) {
    //                         console.error('Failed to get patient token.');
    //                         return;
    //                     }
    //                     sendNotification(dependentId, doctorId, time, selectedDate, patientToken, doctorToken, userType);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error generating patient token:', error);
    //                 });
    //         })
    //         .catch((error) => {
    //             console.error('Error generating doctor token:', error);
    //         });
    // };

    // const sendNotification = async (dependentId, doctorId, time, selectedDate, patientToken, doctorToken, userType) => {
    //     const notificationData = {
    //         title: "New Appointment Booked",
    //         doctorId: doctorId,
    //         userType: userType,
    //         patientToken: patientToken,
    //         doctorToken: doctorToken,
    //         patientId: dependentId,
    //         selectedDate: selectedDate,
    //         time: time,
    //     };
    //     try {
    //         await notifyDoctor(notificationData)
    //             .then((res) => {
    //                 alert(res.notificationData.notification[0].body)
    //             })
    //     } catch (error) {
    //         console.error('Error sending notification:', error);
    //     }
    // };

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