import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Wrapper } from "../mainComponent/Wrapper";
import { MainNav } from "../mainComponent/mainNav";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { Button, Modal } from "react-bootstrap";
import { FaRupeeSign } from "react-icons/fa";
import SubscriptionApi from "../services/SubscriptionApi";
import AuthApi from "../services/AuthApi";

export default function SubscriptionCard() {
    const [getSubData, setGetSubData] = useState([])
    const [subscriptionId, setScriptionId] = useState([])
    const { doctorId } = useParams();
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [getPlan, setGetPlan] = useState(null);
    const [getSubscription, setGetSubscription] = useState([])
    const [doctorName, setDoctorsName] = useState([])
    const [duration, setDuration] = useState('')
    const { getDrInfo } = AuthApi()
    const {
        updateSubscriptionData,
        getSubscriptionData,
        getSubscriptionPlans,
        subscriptionPDF
    } = SubscriptionApi()

    useEffect(() => {
        getSubscriptionPlan()
        fetchSubscription()
        doctorInfo()
    }, [])

    const fetchSubscription = () => {
        getSubscriptionData({ doctorId })
            .then((res) => {
                const Data = res.filter((d) => {
                    if (d.Status === "Running") {
                        return d
                    }
                })
                setDuration(Data[0].duration)
                setGetPlan(Data[0].selected_plan)
                setScriptionId(Data[0]._id)
            })
    }
    const doctorInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorsName(res.result[0].name)
            })
    }

    const getSubscriptionPlan = () => {
        getSubscriptionPlans()
            .then((res) => {
                const data = res.filter((sub) => {
                    if (sub.status === true) {
                        return (sub)
                    }
                })
                setGetSubscription(data)
            })
    }

    const handleShow = (item) => {
        setGetSubData(item)
        setShow(true)
    }

    const handleClose = () => setShow(false)

    const confirmInputHandler = (plan) => {
        const bodyData = {
            "doctorId": doctorId,
            "date": new Date(),
            "expiryDate": new Date(),
            "plan": plan.name,
            "duration": plan.frequency,
            "features": plan.features,
            "amount": plan.amount,
            "status": "Running"
        }
        updateSubscriptionData(subscriptionId, bodyData)
        subscriptionPDF(subscriptionId)
        navigate(`/doctors/subscription/${doctorId}/confirmation`)
        handleClose()
    }

    return (
        <div>
            <Wrapper>
                <MainNav>
                    <div className="clearfix row">
                        <div className="width50">
                            <NavLink to={`/doctors`}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </NavLink>
                            <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>
                                Subscription
                            </span>
                        </div>
                        <div className="width50 row justifyContent">
                            <div className="appColor normal-font" aspangn='right'>
                                Dr. {doctorName}
                            </div>
                        </div>
                    </div>
                </MainNav>
                <div className='row'>
                    <div className="width16">
                        <div className="dash row">
                            <UserLinks doctorId={doctorId} />
                        </div>
                    </div>
                    <div className="width84">
                        <div className='common_box '>
                            <div className='row justify-content' >
                                {getSubscription.map((item, i) => {
                                    return (
                                        <div className="whiteCard  col-3" key={i}>
                                            <span>
                                                <h4 className="add_top_20 ">{item.name}</h4>
                                            </span>
                                            <h5> <FaRupeeSign />-{item.amount}</h5>
                                            <ul className="card-text cardListScroll underline" >
                                                {item.features.map((data, i) => {
                                                    return (
                                                        <li key={i} className="card-list">
                                                            <i className="icon-right-circled" title="right-tick" />
                                                            {data}
                                                        </li>
                                                    )
                                                })}

                                            </ul>
                                            {getPlan === item.name ?
                                                <button
                                                    onClick={handleClose}
                                                    className="btn disabled-card add_bottom_15 shadow-none disabled"
                                                >Subscribed
                                                </button> :
                                                item.frequency < parseInt(duration) ?
                                                    <button
                                                        onClick={handleClose}
                                                        className="btn disabled-card add_bottom_15 shadow-none disabled"
                                                    >Get Started
                                                    </button> :
                                                    <button
                                                        onClick={() => handleShow(item)}
                                                        className="sub-card-btn add_bottom_15 shadow-none btn btn-primary">
                                                        Get Started
                                                    </button>
                                            }

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are You Sure?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="alert alert-danger">You Want To Get This Subscription. </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="default" className='appColor' onClick={() => confirmInputHandler(getSubData)}>
                                Yes
                            </Button>
                            <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleClose}>
                                No
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Wrapper>
        </div>
    )
}