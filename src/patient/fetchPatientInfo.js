import { useEffect, useState } from "react";
import PatientApi from "../services/PatientApi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setSlotData } from "../recoil/atom/setSlotData";
import { Button, Modal } from "react-bootstrap";
import { setSessionData } from "../recoil/atom/setSessionData";
import { setDependentId } from "../recoil/atom/setDependentId";
import { setPatientProfileData } from "../recoil/atom/setPatientProfileData";
import { setAppointmentType } from "../recoil/atom/setAppointmentType";
import AuthApi from "../services/AuthApi";
import { generateToken } from "../firebase.config";
import { Theme_Color } from "../config";

function FetchPatientInfo(props) {
    const { patientId, doctorId } = props;
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [show, setShow] = useState(false);
    const [sessionData] = useRecoilState(setSessionData)
    const [dependentId] = useRecoilState(setDependentId)
    const [doctorName, setDoctorName] = useState([])
    const [fetchPatientData, setFetchPatientData] = useRecoilState(setPatientProfileData)
    const [selectedType, setSelectedType] = useRecoilState(setAppointmentType);
    const { fetchPatient, paymentInfo } = PatientApi()
    const { notifyDoctor, saveNotification } = AuthApi();
    const { addDoctorInformation } = AuthApi()
    const navigate = useNavigate()

    useEffect(() => {
        getAllPatientData()
        getDoctorData()
    }, [])

    function getAllPatientData() {
        fetchPatient({ patientId })
            .then(response => {
                setFetchPatientData(response[0])
            })
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

    const handleShow = (item) => {
        setSlotItem('')
        setShow(true)
        setSlotItem(item)
    }

    const handleClose = () => {
        setShow(false)
    }
    const handleSelectedSlot = (item) => {
        const startDate = (sessionData.selectedDate + " " + item.time)
        const slotId = item._id
        const transactionData = {
            "DoctorId": sessionData.session.doctorId,
            "ClinicId": sessionData.session.clinicId,
            "slotId": slotId,
            "patientId": patientId,
            "dependentId": dependentId !== " " ? dependentId : null,
            "transactionId": '123',
            "currency": 'INR',
            "fees": sessionData.session.fees,
            "date": sessionData.slotDate,
            "day": sessionData.session.day,
            "slotTime": item.time,
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
                if (slotId) {
                    navigate(`/confirm`)
                } else {
                    navigate(`/booking/${doctorId}`)
                }
            })
        // const doctorId = sessionData.session.doctorId
        // requestPermission(doctorId)
        //     .then(() => {
        //         return generateToken(doctorId)
        //     })
        // .then((doctorToken) => {
        // const notificationData = {
        //     title: "New Appointment Booked",
        //     body: `You have a new appointment booked by patient ${patientId}`,
        //     doctorToken: [doctorToken]
        // }
        // notifyDoctor(doctorId, notificationData)
        // .catch((error) => {
        //     console.error('Error sending notification:', error);
        // });
        // requestToken(patientId, sessionData.session.doctorId, item.time, sessionData.selectedDate)
        handleClose()
        // })
    }
    // const requestToken = (patientId, doctorId, time, selectedDate) => {
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
    //                     sendNotification( patientId, doctorId, time, selectedDate, patientToken, doctorToken, userType);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error generating patient token:', error);
    //                 });
    //         })
    //         .catch((error) => {
    //             console.error('Error generating doctor token:', error);
    //         });
    // };

    // const sendNotification = async ( patientId, doctorId, time, selectedDate, patientToken, doctorToken, userType) => {
    //     const notificationData = {
    //         title: "New Appointment Booked",
    //         doctorId: doctorId,
    //         userType: userType,
    //         patientToken: patientToken,
    //         doctorToken: doctorToken,
    //         patientId: patientId,
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

    // async function requestPermission(doctorId) {
    //     const permission = await Notification.requestPermission();
    //     if (permission === "granted") {
    //         console.log("Notification permission granted.----------------");
    //         getToken(doctorId);
    //     }
    //     else {
    //         console.error("Notification permission not granted----------",);

    //     }
    // }
    // async function getToken(doctorId) {
    //     // try {
    //     generateToken(doctorId)
    //         .then((res) => {
    //             const currentToken = res
    //             if (currentToken) {
    //                 saveNotification(doctorId, currentToken);
    //             } else {
    //                 console.log("No  token available.");
    //             }
    //         })

    // }


    return (
        <div className="col-md-6 mb-2">
            <div className="box_general_4 cart patientDetails">
                <div className="underline">
                    <div className="form_title">
                        <h3>Patient Details</h3>
                    </div>
                </div>
                <div className="patientDataStyle">
                    <div >
                        <label className="font_weight mx-2">Patient name :</label>
                        {fetchPatientData.name}
                    </div>
                    <div >
                        <label className="font_weight mx-2">Age :</label>
                        {fetchPatientData.age}
                    </div>
                    <div >
                        <label className="font_weight mx-2">Gender :</label>
                        {fetchPatientData.gender}
                    </div>
                    <div >
                        <label className="font_weight mx-2">Email :</label>
                        {fetchPatientData.email}
                    </div>
                    <div align='right' className="mr-2 ml-1" >
                        <Button
                            onClick={() => handleShow(slotItem)}
                            className="radius  buttonPatient appColor">
                            Book Appointment
                        </Button>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-bgcolor">You want to book this slot. </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="default" className='appColor' onClick={() => handleSelectedSlot(slotItem)}>
                            Yes
                        </Button>
                        <Button variant="default" className='appColorBorder'  onClick={handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
export { FetchPatientInfo }