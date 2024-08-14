import React, { useEffect } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useRecoilState } from "recoil";
import appLogo from '../../src/img/small_wecurify.png'
import { setloggedIn } from "../recoil/atom/setloggedIn";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { setSlotData } from "../recoil/atom/setSlotData";
import { setSessionData } from "../recoil/atom/setSessionData";
import { setPatientProfileData } from "../recoil/atom/setPatientProfileData";

export default function Header() {
    // const [loggedIn] = useRecoilState(setloggedIn);
    const [doctorId, setDoctor] = useRecoilState(setDoctorId);
    const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn);
    const [patientId, setPatientId] = useRecoilState(setNewPatientId)
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [sessionData, setSessionsData] = useRecoilState(setSessionData)
    const [fetchPatientData, setFetchPatientData] = useRecoilState(setPatientProfileData)
    const navigate = useNavigate()

    const handleLogout = () => {
        setDoctor("")
        setLoggedIn('')
        setPatientId('')
        setSlotItem('')
        setSessionsData('')
        setFetchPatientData('')
        navigate("/")
    }

    return (
        <header style={{ zIndex: '2' }} className="header_sticky">
            <div className="container full-width">
                <div className="row">
                    <div className="width30">
                        <div id="logo_home" align='left'>
                            <Link to={`/`}>
                                <img className='appLogo' src={appLogo} alt="Something Went Wrong" />
                            </Link>
                        </div>
                    </div>
                    <div className="width70">
                        <nav id="menu" className="main-menu">
                            {loggedIn === true ?
                                <li className="fontSize"><Link onClick={handleLogout} ><b>Logout </b></Link></li>
                                :
                                <li className="fontSize"><Link to="/patient"><b>Login </b></Link></li>
                            }
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}