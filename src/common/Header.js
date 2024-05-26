import React, { useState } from "react";
import { Link, } from "react-router-dom";
import { useRecoilState } from "recoil";
import appLogo from '../../src/img/small_wecurify.png'
import { setloggedIn } from "../recoil/atom/setloggedIn";
import { GiHamburgerMenu } from "react-icons/gi";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";

export default function Header() {
    const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn);
    const [showMenu, setShowMenu] = useState(false)

    return (
        <header style={{ zIndex: '2' }} className="header_sticky">
            <div className="hamburger-menu">
                <Link to='#' onClick={() => setShowMenu(!showMenu)} className="btn_mobile">
                    {loggedIn.length > 0 ?
                        <>
                            <GiHamburgerMenu
                                color='#1a3c8b' />
                            <div className={showMenu ? null : "dash "}>
                                <UserLinks />
                            </div>
                        </>
                        : null}
                </Link>
            </div>
            <div className="container full-width">
                <div className="row">
                    <div className="width30">
                        <div id="logo_home" align='left'>
                            <Link to={`/doctors`}>
                                <img className='appLogo' src={appLogo} alt="Something Went Wrong" />
                            </Link>
                        </div>
                    </div>
                    <div className="width70">
                        <nav id="menu" className="main-menu">
                            {loggedIn === true ?
                                <li className="fontSize"><Link to="/logout" ><b>Logout </b></Link></li>
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