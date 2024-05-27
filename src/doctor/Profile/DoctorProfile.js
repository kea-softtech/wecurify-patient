import { useParams } from "react-router-dom";
import ClinicList from "./Clinic/cliniclist";
import ServicesList from "./Services/services";
import { DoctorEducation } from "./Education/doctorEducation";
import DoctorSpecialization from "./Education/specialization";
import { DoctorPersonalInformation } from "./Personal/DoctorPersonalInformation";

export default function DoctorProfile() {
    const { doctorId } = useParams();

    return (
        <div className="container margin_60">
            <div className="row">
                <div className="col-xl-8 col-lg-8">
                    <div id="section_1">
                        <div className="box_general_3">
                            <DoctorPersonalInformation doctorId={doctorId}/>
                            <hr></hr>
                            <DoctorSpecialization doctorId={doctorId}/>
                            <hr></hr>
                            <DoctorEducation doctorId={doctorId}/>
                            <hr></hr>
                            <ServicesList doctorId={doctorId}/>
                        </div>
                    </div>
                </div>
                <ClinicList doctorId={doctorId}/>
            </div>
        </div>
    )
}