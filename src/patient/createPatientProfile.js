import { Link, useNavigate, useParams } from "react-router-dom";
import { PatientRegistrationForm } from "../patient/patientRegistrationForm";
import { Wrapper } from "../mainComponent/Wrapper";
import { MainNav } from "../mainComponent/mainNav";

export default function CreatePatientProfile() {
    const { patientId } = useParams();
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1);
    }
    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link onClick={goBack}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Patient</span>
                    </div>
                </div>
            </MainNav>
            <div className='row'>
                <div className="full-width">
                    <div className="container margin_60">
                        <div className="patientFetch">
                            <div className="Form-data">
                                <div className="box_general_3">
                                    <PatientRegistrationForm patientId={patientId} />
                                </div>
                            </div>
                            {/* <DoctorBookingConfirmation doctorId={doctorId} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}