import { useState, useEffect } from "react";
import PatientProfile from "../../../img/profile.png"
import AppointmentApi from "../../../services/AppointmentApi";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { Theme_Color } from "../../../config";
function CalendarModalBox(props) {
    const { handleClose,AppointmentData, appointmentId } = props;
    const [appointmentDetails, setAppointmentDetails] = useState([]);
    const [showCancel, setCancelDelete] = useState(false);
    const { fetchAppointmentData, cancelPatientAppointment } = AppointmentApi()
    useEffect(() => {
        fetchAppData();
    }, [])

    const fetchAppData = () => {
        fetchAppointmentData(appointmentId)
            .then((res) => {
                setAppointmentDetails(res)
            })
    }
    const handleCancelShow = () => {
        setCancelDelete(true)
    }
    const handleCancelClose = () => setCancelDelete(false)

    const cancelAppointment = () => {
        cancelPatientAppointment(appointmentDetails._id)
            .then(() => {
                handleCancelClose();
                handleClose()
                fetchAppData();
            })

    }
    return (
        <div>
            <div className="d-flex container " >
                <div className="align-items-left ">
                    <img src={PatientProfile} alt="Patient Profile" />
                </div>

                <div className="ml-2">
                    <div className=" patientModalName align-item-right ">
                        Dr. {AppointmentData.drName}
                    </div>
                    <div className=" patientModalName align-item-right ">
                        {appointmentDetails.name}
                    </div>
                    <div>
                        <b className="patientModal">Date : </b>
                        {appointmentDetails.date}
                    </div>
                    {/* <div>
                        <b className="patientModal">Time : </b>
                        {appointmentDetails.timeSlot} Min
                    </div> */}
                    <div>
                        <b className="patientModal">Fees :  </b>
                        {appointmentDetails.fees}
                    </div>
                    <div>
                        <b className="patientModal">Time :    </b>
                        {appointmentDetails.slotTime}
                    </div>
                    <div>
                        <b className="patientModal"> Patient :    </b>
                        {AppointmentData.patientName}
                    </div>
                 
                    {appointmentDetails.status === "Ongoing"   ?
                        <span>
                            <Link onClick={handleCancelShow}>
                                <button className="btn appColor modalbtn ">Cancel Appointment</button>
                            </Link>
                        </span>
                        : null}
                </div>
            </div>
            <Modal show={showCancel} onHide={handleCancelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-bgcolor">You want to cancel this appointment. </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" className='appColor' onClick={cancelAppointment}>
                        Yes
                    </Button>
                    <Button variant="default" style={{ border: `1px solid ${Theme_Color}` }} onClick={handleCancelClose}>
                        No
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>

    )
}
export default CalendarModalBox