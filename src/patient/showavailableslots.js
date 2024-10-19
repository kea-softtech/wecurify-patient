import { slots } from "../common/constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { useRecoilState } from "recoil";
import PatientApi from "../services/PatientApi";
import moment from "moment";
import { setSlotData } from "../recoil/atom/setSlotData";
import { setSessionData } from "../recoil/atom/setSessionData";
import { setloggedIn } from "../recoil/atom/setloggedIn";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { Modal } from "react-bootstrap";
import { PatientLoginMpin } from "./patientMpin/PatientLoginMpin";
import { setAppointmentType } from "../recoil/atom/setAppointmentType";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import CreatePatientLoginMpin from "./patientMpin/CreatePatientLoginMpin";
import ForgotPatientLoginMpin from "./patientMpin/ForgotPatientLoginMpin";

const ShowInClinicAppointSlots = (props) => {
    const { sessionSlot, selectedDate, session, slotDate, doctorsId } = props;
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const [sessionData, setSessionsData] = useRecoilState(setSessionData)
    const [loggedIn] = useRecoilState(setloggedIn)
    const [patientId, setPatientId] = useRecoilState(setNewPatientId);
    const [selectedType, setSelectedType] = useRecoilState(setAppointmentType);
    const [show, setShow] = useState(false);
    const [bookingSlots, setBookingSlots] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    const { getbookedSlots } = PatientApi();
    const data = props;

    useEffect(() => {
        if (!selectedType) {
            setSelectedType("In Clinic");
        }
        availableSlots()
        setSessionsData(data)
        setDoctorsId(doctorsId)
    }, [props])

    const handleClose = () => setShow(false);

    const handleShow = (item) => {
        setSlotItem('')
        setSlotItem(item)
        setShow(true)
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

    const handleCreateShow = () => {
        setShowCreate(true); 
        setShow(false)
    };
    const handleCreateClose = () => setShowCreate(false);

    const handleAppointmentType = (e) => {
        const value = e.target.value;
        setSelectedType(value || "In Clinic");
    };

    const handleForgotShow = () => {
        setShowForgot(true);
        setShow(false)
    }
    const handleForgotClose = () => setShowForgot(false);

    return (
        <>
            <div style={{ flexWrap: 'wrap' }}>
                <div className="row">
                    <div align='left'
                        className="font_weight col-sm-6"
                        style={{ color: "black" }}>
                        {slotDate}&nbsp;Fees - <FaRupeeSign /> {session.fees} /-
                    </div>

                    <div align='right' style={{ color: "black" }} className="col-sm-6">
                        <input
                            type="radio"
                            name='appointment'
                            value='In Clinic'
                            onChange={handleAppointmentType}
                            className=" medicineCheckbox"
                            checked={selectedType === 'In Clinic'}
                        />
                        <span className="font_weight  ">
                            &nbsp;In Clinic&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <input
                            type="radio"
                            name='appointment'
                            value='Video Consultation'
                            onChange={handleAppointmentType}
                            className=" medicineCheckbox "
                            checked={selectedType === 'Video Consultation'}
                        />
                        <span className="font_weight  ">
                            &nbsp;Video Consultation
                        </span>
                    </div>
                </div>
                <section className=" radiobutton">
                    {sessionSlot.map((item, index) => (
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
                    ))}
                </section>
            </div >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login to wecurify</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PatientLoginMpin
                        onSubmit={handleClose}  
                        onCreateAccount={handleCreateShow}                   
                        onForgotAccount={handleForgotShow}                   
                    />
                </Modal.Body>
            </Modal>

            <Modal show={showForgot} onHide={handleForgotClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset MPIN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ForgotPatientLoginMpin patientId={patientId} onSubmit={handleForgotClose} />
                </Modal.Body>
            </Modal>

            <Modal show={showCreate} onHide={handleCreateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePatientLoginMpin onSubmit={handleCreateClose} />
                </Modal.Body>
            </Modal>
        </>
    )
}
export { ShowInClinicAppointSlots }