import { useParams, Link, useNavigate } from "react-router-dom";
import { FetchPatientInfo } from "./fetchPatientInfo";
import { Wrapper } from "../mainComponent/Wrapper";
import { useRecoilState } from "recoil";
import { MainNav } from "../mainComponent/mainNav";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import GetDependent from "./getDependent";
import { Button } from "react-bootstrap";

export default function GetLoginPatientProfile() {
    const { patientId } = useParams()
    const [doctorId] = useRecoilState(setDoctorId)
    const navigate = useNavigate()

    const handleDependent = () => {
        navigate(`/adddependent/${patientId}`)
    }


    const goBack = () => {
        navigate(-1);
    }
    return (
        <>
            <Wrapper>
                <MainNav>
                    <div className="clearfix row">
                        <div className="width_50">
                            <Link onClick={goBack}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </Link>
                            <span className='float-none ml-2' style={{ fontSize: 'inherit' }}> Patient Information</span>
                        </div>
                        <div className='width50 row justifyContent'>
                            <Button
                                className='appColor mr-3 btn_sub '
                                type="submit" onClick={handleDependent}>
                                Add Dependent
                            </Button>
                            <Link
                                className="mt-2 "
                                to={`/patientinfo/${patientId}`}>
                                <i className="icon_pencil-edit backArrow"
                                    title="Edit profile" />
                            </Link>
                        </div>
                    </div>
                </MainNav >
                <div className='wraper row'>
                    <div className="full-width">
                        <div className="common_box mb-3">
                            <div className="row">
                                <FetchPatientInfo doctorId={doctorId} patientId={patientId} />
                                <GetDependent doctorId={doctorId} patientId={patientId} />
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper >
        </>
    )
}