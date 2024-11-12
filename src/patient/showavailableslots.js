import { slots } from "../common/constant";
import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const ShowInClinicAppointSlots = (props) => {
    const { sessionSlot, selectedDate, session, slotDate, doctorsId } = props;
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const [sessionData, setSessionsData] = useRecoilState(setSessionData)
    const [loggedIn] = useRecoilState(setloggedIn)
    const [patientId] = useRecoilState(setNewPatientId);
    const [selectedType, setSelectedType] = useRecoilState(setAppointmentType);
    const [show, setShow] = useState(false);
    const [bookingSlots, setBookingSlots] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const { getbookedSlots } = PatientApi();
    const navigate = useNavigate()
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
        if (!loggedIn) {
            setShow(true)
        } else {
            navigate(`/patientprofile/${patientId}`)
        }
    }

    const checkSlotAvailability = (slot) => {
        const currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm")
        const slotDateTime = moment(new Date(selectedDate)).format("YYYY-MM-DD") + " " + slot.time
        const returnData = currentDate > slotDateTime || bookingSlots.some(func => (func.slotId === slot._id && func.status !== "Cancelled"))
        return returnData
    }


    const categorizeSlots = () => {
        const morningSlots = [];
        const afternoonSlots = [];
        const eveningSlots = [];
        sessionSlot.forEach((slot) => {
            const [hour] = slot.time.split(":").map(Number);
            if (hour < 12) {
                morningSlots.push(slot);
            } else if (hour < 17) {
                afternoonSlots.push(slot);
            } else {
                eveningSlots.push(slot);
            }
        });
        return { morningSlots, afternoonSlots, eveningSlots };
    };

    const { morningSlots, afternoonSlots, eveningSlots } = categorizeSlots();

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
                        className="font_weight col-md-6"
                        style={{ color: "black" }}>
                        {slotDate}&nbsp;Fees - <FaRupeeSign /> {session.fees} /-
                    </div>

                    <div align='left' style={{ color: "black" }} className="slots col-md-6">
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
                        <span className="font_weight">
                            &nbsp;Video Consultation
                        </span>
                    </div>
                </div>
                {morningSlots.length === 0 ? (
                    null
                ) : (
                    <>
                        <h6 align='left' className="font_weight ml-2 margin_top_30">MORNING </h6>
                        <section>
                            {morningSlots.map((item, index) => (
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
                    </>
                )}
                {afternoonSlots.length === 0 ? (
                    null
                ) : (
                    <>
                        <h6 align='left' className="font_weight ml-2 margin_top_30">  AFTERNOON </h6>
                        <section >
                            {afternoonSlots.map((item, index) => (
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
                    </>
                )}
                {eveningSlots.length === 0 ? (
                    null
                ) : (
                    <>
                        <h6 align='left' className="font_weight ml-2 margin_top_30">EVENING </h6>
                        <section >
                            {eveningSlots.map((item, index) => (
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
                    </>
                )}
            </div >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login to Fly4smiles</Modal.Title>
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
                    <ForgotPatientLoginMpin
                        patientId={patientId}
                        onSubmit={handleForgotClose} />
                </Modal.Body>
            </Modal>

            <Modal show={showCreate} onHide={handleCreateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePatientLoginMpin
                        onSubmit={handleCreateClose} />
                </Modal.Body>
            </Modal>
        </>
    )
}
export { ShowInClinicAppointSlots }