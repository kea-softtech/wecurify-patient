import { useParams, Link } from "react-router-dom";
import { Wrapper } from "../mainComponent/Wrapper";
import { useRecoilState } from "recoil";
import { MainNav } from "../mainComponent/mainNav";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { PatientInformationData } from "./PatientInformationData";

export default function FetchPatientProfile() {
    const { patientId } = useParams()
    const [doctorId] = useRecoilState(setDoctorId)


    return (
        <>
            <Wrapper>
                <MainNav>
                    <div className="clearfix row">
                        <div className="patient col-md-6">
                            <Link to={`/`}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </Link>
                            <span className='float-none ' style={{ fontSize: 'inherit' }}> Patient Information</span>
                        </div>
                        <div className='getDependent col-md-5' align='right'>
                            <Link
                                to={`/patientinfo/${patientId}`}>
                                <i className="icon_pencil-edit backArrow" title="Edit profile" />
                            </Link>
                        </div>
                    </div>
                </MainNav>
                <div className='wraper' align="center">
                        <div className="mb-3">
                            <div className="">
                                <PatientInformationData doctorId={doctorId} patientId={patientId} />
                                {/* <GetDependent doctorId={doctorId} patientId={patientId} /> */}
                            </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}