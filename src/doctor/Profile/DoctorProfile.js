import { Link, useParams } from "react-router-dom";
import { FetchDoctorPersonalDetails } from "./Personal/Partial/fetchDoctorPersonalDetails";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "../Dashboard-card/partial/uselinks";
import { Wrapper } from "../../mainComponent/Wrapper";
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import Report from "../Dashboard-card/Report";
export default function DoctorProfile() {
    const { doctorId } = useParams();
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)

    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link
                            to={`/doctors`}>
                            <i className="arrow_back backArrow" title="back button"> </i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>General info</span>
                    </div>
                    <div className="width50 row justifyContent">
                        <Link to={"edit"}>
                            <span> <i className="icon_pencil-edit" title="Edit profile"></i></span>
                        </Link>
                    </div>
                </div>
            </MainNav>
            <div className='row'>
                <div className="width16">
                    <div className="dash row">
                        <UserLinks
                            doctorId={doctorId}
                            helperId={helpersData._id}
                            accessModule={helpersData.access_module} />
                    </div>
                </div>
                <div className="width84">
                    <div className='common_box'>
                        <div className="white-box" >
                            <div id="section_1" className="col-lg-12">
                                <div >
                                    <FetchDoctorPersonalDetails doctorId={doctorId} />
                                </div>
                            </div>
                            <div id="section_1" className="col-lg-12">
                                <div>
                                    <Report doctorId={doctorId} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}