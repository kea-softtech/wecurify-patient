import { useEffect, useState } from "react";
import PatientApi from "../services/PatientApi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setSlotData } from "../recoil/atom/setSlotData";
import { Button, Modal } from "react-bootstrap";
import { setSessionData } from "../recoil/atom/setSessionData";
import { setDependentId } from "../recoil/atom/setDependentId";
import { setPatientProfileData } from "../recoil/atom/setPatientProfileData";

function FetchPatientInfo(props) {
    const { patientId, doctorId } = props;
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [show, setShow] = useState(false);
    const [sessionData] = useRecoilState(setSessionData)
    const [dependentId] = useRecoilState(setDependentId)
    const [fetchPatientData, setFetchPatientData] = useRecoilState(setPatientProfileData)
    const { fetchPatient, paymentInfo } = PatientApi()
    const navigate = useNavigate()

    useEffect(() => {
        getAllPatientData()
    }, [])

    const handleShow = (item) => {
        setSlotItem(' ')
        setShow(true)
        setSlotItem(item)
    }

    const handleDependent = () => {
        navigate(`/adddependent/${patientId}`)
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
            "status": "Ongoing",
            "payment": "hold"
        }
        paymentInfo(transactionData)
            .then((res) => {
                // setDependentsId(" ")
                const appointmentId = res._id
                console.log("-----",appointmentId)
                console.log("--slotId---",slotId)

                if (slotId) {
                    // navigate(`/confirm/${appointmentId}`)
                    navigate(`/`)

                } else {
                    navigate(`/booking/${doctorId}`)
                }
                handleClose()
            })
    }

    function getAllPatientData() {
        fetchPatient({ patientId })
            .then(function (response) {
                setFetchPatientData(response[0])
            })
    }

    return (
        <>
            <div className="underline">
                <div className="form_title">
                    <h3>Patient Details</h3>
                </div>
            </div>
            <div className="patientDataStyle">
                <div className="">
                    <label className="mx-2"><b>Patient name :</b></label>
                    {fetchPatientData.name}
                </div>
                <div className="">
                    <label className="mx-2"><b>Age :</b></label>
                    {fetchPatientData.age}
                </div>
                <div className="">
                    <label className="mx-2"><b>Gender :</b></label>
                    {fetchPatientData.gender}
                </div>
                <div className="">
                    <label className="mx-2"><b>Email :</b></label>
                    {fetchPatientData.email}
                </div>
                <div className='row'>
                    <div className=" mt-2 col-6 " >
                        <Button onClick={() => handleShow(slotItem)} className="radius buttonPatient appColor">
                            Book Appointment
                        </Button>
                    </div>
                    <div className=" mt-2 col-6 " >
                        <Button onClick={() => handleDependent()} className="radius  buttonPatient appColor">
                            Add Dependent
                        </Button>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-bgcolor">You Want To Book This Slot. </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" className='appColor' onClick={() => handleSelectedSlot(slotItem)}>
                        Yes
                    </Button>
                    <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export { FetchPatientInfo }