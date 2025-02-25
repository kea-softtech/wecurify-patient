import { useState } from "react";
import { ShowLoginOtp } from "../Profile/Partial/showLoginOtp";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import AuthApi from "../../services/AuthApi";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "./partial/uselinks";
import { Link, Outlet } from "react-router-dom";

export default function AddNewDoctor() {
    //for show otp input
    const [mobile, setMobile] = useState("");
    const [loginData, setLoginData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const { login } = AuthApi();

    const getOTPSection = (e) => {
        e.preventDefault()
        if (mobile.length < 10) {
            setIsError('Please Enter valid mobile number.')
        }
        else {
            login({ mobile: mobile })
                .then(response => {
                    // alert(response.data.otp)
                    let item = response.data
                    setLoginData(item)
                    setShowOTP(true)
                })
        }
    };

    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix">
                    <Link to={`/doctors`}>
                        <i className="arrow_back backArrow" title="back button"></i>
                    </Link>
                    <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Add-Doctor</span>
                </div>
            </MainNav>
            <div className='row'>
                <div className="width16">
                    <div className="dash row">
                        <UserLinks />
                    </div>
                </div>
                <div className="width84">
                    <div className="common_box">
                        <div className="bg_color_2">
                            <div className="container margin_60_35">
                                <div id="login-2">
                                    <form >
                                        <div className="box_form clearfix">
                                            Enter Your Mobile Number
                                            <div className="box_login last">
                                                <div className="full-width">
                                                    <div className="row  mt-3">
                                                        <div className="width75">
                                                            <MainInput
                                                                type="text"
                                                                name="mobile"
                                                                value={mobile.mobile}
                                                                maxLength={10}
                                                                pattern="[+-]?\d+(?:[.,]\d+)?"
                                                                onChange={(e) => setMobile(e.target.value)}
                                                                placeholder="Phone Number (+XX)">
                                                            </MainInput>
                                                            {<span className="validation">{isError}</span>}

                                                        </div>
                                                        <div className="width25 ml-2">
                                                            <MainButtonInput onClick={getOTPSection}>Go</MainButtonInput>
                                                        </div>
                                                    </div>
                                                    {showOTP === true ?
                                                        <>
                                                            <ShowLoginOtp loginData={loginData} />
                                                            <Outlet />
                                                        </>
                                                        : null}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}