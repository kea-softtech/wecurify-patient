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

const ShowInClinicAppointSlots = (props) => {
    const { sessionSlot, selectedDate, session, slotDate, doctorsId } = props;
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const [sessionData, setSessionsData] = useRecoilState(setSessionData)
    const [patientData, setPatientData] = useRecoilState(setNewPatientId)
    const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn)
    const [bookingSlots, setBookingSlots] = useState([]);
    const { getbookedSlots } = PatientApi();
    const data = props;
    const navigate = useNavigate();

    useEffect(() => {
        availableSlots()
        setSessionsData(data)
        setDoctorsId(doctorsId)
    }, [props])

    const handleShow = (item) => {
        setSlotItem('')
        setSlotItem(item)
        if (loggedIn !== true) {
            navigate(`/patient`)
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
    // const handleSelectedSlot = (item) => {
    //     if (loggedIn === true) {
    //         const startDate = (selectedDate + " " + item.time)
    //         const slotId = item._id
    //         const transactionData = {
    //             "DoctorId": session.doctorId,
    //             "ClinicId": session.clinicId,
    //             "slotId": slotId,
    //             "patientId": patientData,
    //             "dependentId": dependentId !== " " ? dependentId : null,
    //             "transactionId": '123',
    //             "currency": 'INR',
    //             "fees": session.fees,
    //             "date": slotDate,
    //             "day": session.day,
    //             "slotTime": item.time,
    //             "daySlotId": session._id,
    //             "selectedDate": selectedDate,
    //             "timeSlot": session.timeSlot,
    //             "startDate": startDate,
    //             "status": "Ongoing",
    //             "payment": "hold"
    //         }
    //         console.log('transactionData-------', transactionData)
    //         paymentInfo(transactionData)
    //             .then((res) => {
    //                 setDependentsId(" ")
    //                 handleClose()
    //             })
    //         navigate(`/calender/${patientData}`)
    //     }
    //     else {
    //         navigate(`/patient`)
    //     }
    // }

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
                                    <div>
                                        <div
                                            className="disabled-div"
                                            type="radio"
                                            time={slots}>
                                            <label>{item.time}</label>
                                        </div>
                                    </div>
                                    :
                                    <div >
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

                {/* <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-danger">You Want To Book This Slot. </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="default" className='appColor' onClick={() => handleSelectedSlot(bookSlot)}>
                            Yes
                        </Button>
                        <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </div >

        </>
    )
}
export { ShowInClinicAppointSlots }