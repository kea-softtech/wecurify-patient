import { Link, useParams } from "react-router-dom";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { Wrapper } from "../mainComponent/Wrapper";
import { MainNav } from "../mainComponent/mainNav";
import AuthApi from "../services/AuthApi";
import { useEffect, useState } from "react";
import SubscriptionApi from "../services/SubscriptionApi";

export default function SubscriptionConfirmation() {
    const { doctorId } = useParams()
    const { getDrInfo } = AuthApi()
    const [doctorData, setDoctorData] = useState([])
    const [getSubData, setGetSubData] = useState([])
    const { getSubscriptionData } = SubscriptionApi()

    useEffect(() => {
        fetchSubscription()
    }, [getSubData])

    const fetchSubscription = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorData(res.result[0])
            })
        getSubscriptionData({ doctorId })
            .then((sub) => {
                const returndata = sub.filter((item, i) => {
                    if (item.Status === "Running") {
                        return sub
                    }
                })
                setGetSubData(returndata[0])
            })
    }

    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link to={`/doctors/subscription/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Subscription Confirmation</span>
                    </div>
                    <div className="width50 row justify-content">
                        <div className="appColor normal-font" align='right'>Dr. {doctorData.name}</div>
                    </div>
                </div>
            </MainNav>
            <div className='row'>
                <div className="width16">
                    <div className="dash row">
                        <UserLinks />
                    </div>
                </div>
                <div className="width84">
                    <div className="container margin_60">
                        <div className=" patientFetch">
                            <div className="box_general_3">
                                <h1 className='color'>Thank You For Upgraded Your Subscription</h1>
                                <div className='fontS'>
                                    Dr. {doctorData.name}
                                    {/* <div> Your Subscription is Upgraded Successfully!</div> */}
                                    <div >Now your Subscription  is ({getSubData.selected_plan})</div>
                                </div>
                                <Link to={`/doctors/profile/${doctorId}`}>
                                    <button align='right' className='btn appColor helperBtn'>Done</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
