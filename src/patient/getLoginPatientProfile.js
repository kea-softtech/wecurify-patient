import { useParams, Link } from "react-router-dom";
import { FetchPatientInfo } from "./fetchPatientInfo";
import { Wrapper } from "../mainComponent/Wrapper";
import { useRecoilState } from "recoil";
import { MainNav } from "../mainComponent/mainNav";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import GetDependent from "./getDependent";

export default function GetLoginPatientProfile() {
    const { patientId } = useParams()
    const [ doctorId] = useRecoilState(setDoctorId)

    return (
        <>
            <Wrapper>
                <MainNav>
                    <div className="clearfix row">
                        <div className="width50">
                            <Link to={`/`}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </Link>
                            <span className='float-none ml-2' style={{ fontSize: 'inherit' }}> Patient Information</span>
                        </div>
                    </div>
                </MainNav>
                <div className='row'>
                    <div className="full-width">
                        <div className="common_box mb-3">
                            <div className="row">
                                <FetchPatientInfo doctorId={doctorId} patientId={patientId} />
                                <GetDependent doctorId={doctorId} patientId={patientId} />
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}