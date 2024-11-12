import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import appLogo from '../../src/img/fly4smile.png'
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
    }, [])

    const handleLogout = () => {
        setLoggedIn('')
        setDoctor("")
        setPatientId('')
        setSlotItem('')
        setSessionsData('')
        setFetchPatientData('')
        setTimeout(() => {
            navigate('/');
        }, 100);
    }

    return (
        <header style={{ zIndex: '2' }} className="header_sticky">
            <div className="container full-width">
                <div className="row">
                    <div className="width30">
                        <div id="logo_home" align='left'>
                            <Link to={`https://fly4smiles.com`}>
                                <img className='appLogo' src={appLogo} alt="Fly4smiles" />
                            </Link>
                        </div>
                    </div>
                    <div className="width70">
                        <nav id="menu" className="main-menu">
                            {patientId ?
                                (
                                    <li className="fontSize">
                                        <Link className="font_weight" onClick={handleLogout}>
                                            Logout
                                        </Link>
                                    </li>)
                                :
                                null
                            }
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}
