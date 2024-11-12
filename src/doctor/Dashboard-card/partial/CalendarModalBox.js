import { useState, useEffect } from "react";
import PatientProfile from "../../../img/profile.png"
import AppointmentApi from "../../../services/AppointmentApi";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { Theme_Color } from "../../../config";
function CalendarModalBox(props) {
    const { handleClose, AppointmentData, appointmentId } = props;
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
            <div className="d-flex" >
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
                        <span className="patientModal">Date : </span>
                        {appointmentDetails.date}
                    </div>
                    {/* <div>
                        <span className="patientModal">Time : </span>
                        {appointmentDetails.timeSlot} Min
                    </div> */}
                    <div>
                        <span className="patientModal">Fees :  </span>
                        {appointmentDetails.fees}
                    </div>
                    <div>
                        <span className="patientModal">Time :    </span>
                        {appointmentDetails.slotTime}
                    </div>
                    <div>
                        <span className="patientModal"> Patient :    </span>
                        {AppointmentData.patientName}
                    </div>


                    {appointmentDetails.status === "Ongoing" ?
                        <span>
                            <button onClick={handleCancelShow} className="btn appColor modalbtn ">Cancel Appointment</button>
                        </span>
                        : <div className=" validation">
                            {appointmentDetails.status}
                        </div>}
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
                    <Button variant="default" className='appColorBorder' onClick={handleCancelClose}>
                        No
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>

    )
}
export default CalendarModalBox