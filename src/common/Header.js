import React from "react";
import { Link, } from "react-router-dom";
import { useRecoilState } from "recoil";
import appLogo from '../../src/img/small_wecurify.png'
import { setloggedIn } from "../recoil/atom/setloggedIn";

export default function Header() {
    const [loggedIn] = useRecoilState(setloggedIn);

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