import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import SubscriptionApi from "../../../services/SubscriptionApi";
import { Link, useNavigate } from "react-router-dom";

export default function UpgradeSubscription(props) {
    const { doctorId } = props
    const { getSubscriptionData } = SubscriptionApi()
    const [subscription, setsubscription] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getSubscriptionList()
    }, [subscription])

    const getSubscriptionList = () => {
        getSubscriptionData({ doctorId })
            .then((sub) => {
                const returndata = sub && sub.filter((item, i) => {
                    if (item.Status === "Running") {
                        return item
                    }
                })
                setsubscription(returndata[0])
            })
    }

    const handleSubscription = (e) => {
        e.preventDefault()
        navigate(`subscription/${doctorId}`)
    }
    const handleNewSubscription = (e) => {
        e.preventDefault();
        navigate(`/subscriptions/${doctorId}`)
    }

    return (
        <span className='cardSpan' >
            <i className="pe-7s-date color patientListIcon" />
            {subscription.Status === "Running" ?
                <Link className='patinetInfo' onClick={(e) => handleSubscription(e)} >
                    <>
                        <span> {"(" + subscription.selected_plan + ")"}</span>
                        {moment(new Date(subscription.expiryDate)).format('YYYY-MM-DD')}
                    </>
                    <span className="greenColor" > Upgrade </span>
                </Link>
                :
                <Link className='patinetInfo' onClick={(e) => handleNewSubscription(e)}>
                    <span >Upgrade Your Subscription</span>
                    <span className="greenColor" > Upgrade </span>
                </Link>
            }
        </span>
    )

}