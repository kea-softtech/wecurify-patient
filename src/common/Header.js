import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import appLogo from '../../src/img/small_wecurify.png'
import { setloggedIn } from "../recoil/atom/setloggedIn";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { setSlotData } from "../recoil/atom/setSlotData";
import { setSessionData } from "../recoil/atom/setSessionData";
import { setPatientProfileData } from "../recoil/atom/setPatientProfileData";

export default function Header() {
    const [doctorId, setDoctor] = useRecoilState(setDoctorId);
    const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn);
    const [patientId, setPatientId] = useRecoilState(setNewPatientId)
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [sessionData, setSessionsData] = useRecoilState(setSessionData)
    const [fetchPatientData, setFetchPatientData] = useRecoilState(setPatientProfileData)
    const navigate = useNavigate();

    useEffect(() => {
        // if (loggedIn === false) {
        //     navigate("/");
        // }
    }, [loggedIn])

    const handleLogout = () => {
        setDoctor("")
        setLoggedIn(false)
        setPatientId('')
        setSlotItem('')
        setSessionsData('')
        setFetchPatientData('')
    }

    return (
        <header style={{ zIndex: '2' }} className="header_sticky">
            <div className="container full-width">
                <div className="row">
                    <div className="width30">
                        <div id="logo_home" align='left'>
                            {/* <Link to={`/`}> */}
                                <img className='appLogo' src={appLogo} alt="Something Went Wrong" />
                            {/* </Link> */}
                        </div>
                    </div>
                    <div className="width70">
                        <nav id="menu" className="main-menu">
                            {loggedIn ?
                                <li className="fontSize"><Link className="font_weight" onClick={handleLogout}> Logout </Link></li>
                                :
                                <li className="fontSize"><Link className="font_weight" to="/patient"> Login </Link></li>
                            }
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}