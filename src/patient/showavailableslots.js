import { slots } from "../common/constant";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { useRecoilState } from "recoil";
import PatientApi from "../services/PatientApi";
import { useEffect, useState } from "react";
import moment from "moment";
import { setSlotData } from "../recoil/atom/setSlotData";
import { setSessionData } from "../recoil/atom/setSessionData";
import { setloggedIn } from "../recoil/atom/setloggedIn";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { Modal } from "react-bootstrap";
import { PatientMpin } from "./patientMpin/PatientMpin";
import { PatientLoginMpin } from "./patientMpin/PatientLoginMpin";

const ShowInClinicAppointSlots = (props) => {
    const { sessionSlot, selectedDate, session, slotDate, doctorsId } = props;
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const [sessionData, setSessionsData] = useRecoilState(setSessionData)
    const [patientData, setPatientData] = useRecoilState(setNewPatientId)
    const [loggedIn] = useRecoilState(setloggedIn)
    const [show, setShow] = useState(false);
    const [bookingSlots, setBookingSlots] = useState([]);
    const { getbookedSlots } = PatientApi();
    const data = props;
    const navigate = useNavigate();

    useEffect(() => {
        availableSlots()
        setSessionsData(data)
        setDoctorsId(doctorsId)
    }, [props])

    const handleshow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleShow = (item) => {
        setSlotItem('')
        setSlotItem(item)
        if (loggedIn !== true) {
            setShow(true)
            // navigate(`/patient`)
        } else {
            navigate(`/patientprofile/${patientData}`)
        }
    }

    const checkSlotAvailability = (slot) => {
        const currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm")
        const slotDateTime = moment(new Date(selectedDate)).format("YYYY-MM-DD") + " " + slot.time
        const returnData = currentDate > slotDateTime || bookingSlots.some(func => (func.slotId === slot._id && func.status !== "Cancelled"))
        return returnData
    }

    const availableSlots = () => {
        getbookedSlots(session.doctorId, session.clinicId)
            .then((result) => {
                const data = result.filter((item) => {
                    if (item.date === slotDate)
                        return item
                })
                setBookingSlots(data)
            })

    }
    return (
        <>
            <div style={{ flexWrap: 'wrap' }}>
                <span style={{ color: "black" }}>
                    <b>{slotDate}  </b>
                    <b>  Fees - <FaRupeeSign /> {session.fees} /-</b></span>
                <section className=" radiobutton">
                    {sessionSlot.map((item, index) => (
                        <>
                            <div key={index}>
                                {checkSlotAvailability(item)
                                    ?
                                    <div key={index}>
                                        <div
                                            className="disabled-div"
                                            type="radio"
                                            time={slots}>
                                            <label>{item.time}</label>
                                        </div>
                                    </div>
                                    :
                                    <div key={index}>
                                        <button
                                            onClick={() => handleShow(item)}
                                            className="btn_1"
                                            type="radio"
                                            time={slots}>
                                            {item.time}
                                        </button>
                                    </div>
                                }
                            </div>

                        </>
                    ))}
                </section>
            </div >
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Login to wecurify</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PatientLoginMpin onSubmit={handleClose} />
                    </Modal.Body>
                </Modal>
        </>
    )
}
export { ShowInClinicAppointSlots }