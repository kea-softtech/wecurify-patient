import React from "react";
import { NavLink, useNavigate, } from "react-router-dom";
import PatientCards from "../patient/PatientCards";
import { useRecoilState } from "recoil";
import { setloggedIn } from "../recoil/atom/setloggedIn";

function HomePageTitle() {
    let navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn)
    
    const handleButtonClick = () => {
        navigate(`/doctors`);
    };

    return (
        <div className="container margin_120_95">
            <div className="main_title">
                <h2>Discover the <strong>online</strong> appointment!</h2>
                <form>
                    <div id="custom-search-input">
                        <div className="input-group">
                            <input type="text" className=" search-query" placeholder="Search Doctor by name" />
                            <input type="submit" className="btn_search" onClick={handleButtonClick} value="Search" />
                        </div>
                        {/* <ul>
                            <li>
                                <input type="radio" id="all" name="radio_search" value="all" defaultChecked />
                                <label htmlFor="all">All</label>
                            </li>
                            <li>
                                <input type="radio" id="doctor" name="radio_search" value="doctor" />
                                <label htmlFor="doctor">Doctor</label>
                            </li>
                            <li>
                                <input type="radio" id="clinic" name="radio_search" value="clinic" />
                                <label htmlFor="clinic">Clinic</label>
                            </li>
                        </ul> */}
                    </div>
                </form>
            </div>
            <div className="row add_bottom_30">
                <div className="col-lg-4">
                    <div className="box_feat" id="icon_1">
                        <span></span>
                        <h3>Find Doctor</h3>
                        <div>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="box_feat" id="icon_2">
                        <span></span>
                        <h3>View profile</h3>
                        <div>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="box_feat" id="icon_3">
                        <h3>Book a visit</h3>
                        <div>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</div>
                    </div>
                </div>
            </div>
            <div>
                <NavLink to="/doctors">
                    <button className="btn appColor helperBtn">Find Doctor</button>
                </NavLink>
            </div>
            {loggedIn === true ?
            <PatientCards />
           : null} 
            {/* <div className="text-center"><Link to="" disabled={loading}  onClick={handleButtonClick} className="btn_1 medium">Find Doctor</Link></div> */}
        </div>
    )
}
export { HomePageTitle }