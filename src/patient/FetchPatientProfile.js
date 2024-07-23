import { useParams, Link } from "react-router-dom";
import { FetchPatientInfo } from "./fetchPatientInfo";
import { Wrapper } from "../mainComponent/Wrapper";
import { useRecoilState } from "recoil";
import { MainNav } from "../mainComponent/mainNav";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import GetDependent from "./getDependent";
import { PatientInformationData } from "./PatientInformationData";

export default function FetchPatientProfile() {
    const { patientId } = useParams()
    const [doctorId] = useRecoilState(setDoctorId)

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
                        <div className='width50' align='right'>
                            <Link
                                to={`/patientinfo/${patientId}`}>
                                <i className="icon_pencil-edit backArrow" title="Edit profile" />
                            </Link>
                        </div>
                    </div>
                </MainNav>
                <div className='wraper row'>
                    <div className="full-width">
                        <div className="common_box mb-3">
                            <div className="row">
                                <PatientInformationData doctorId={doctorId} patientId={patientId} />
                                {/* <GetDependent doctorId={doctorId} patientId={patientId} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}