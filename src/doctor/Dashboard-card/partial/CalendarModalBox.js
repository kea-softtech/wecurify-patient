import { useState, useEffect } from "react";
import PatientProfile from "../../../img/profile.png"
import { Link} from "react-router-dom";
import PatientApi from "../../../services/PatientApi";
function CalendarModalBox(props) {
    const { patientId, doctorId, patientList } = props;
    const [patientDetails, setPatientDetails] = useState([]);
    const { patientDetailsData } = PatientApi()

    useEffect(() => {
        getPatientInfoById();
    }, [])

    

    const getPatientInfoById = async () => {
        await patientDetailsData({ patientId })
            .then(jsonRes => {
                setPatientDetails(jsonRes[0])
            })
    };

    return (
        <div>
            <div className="d-flex container " >
                <div className=" mx-4 align-items-left ">
                    <img src={PatientProfile} alt="Patient Profile" />
                </div>

                <div>
                    <div className=" patientModalName align-item-right ">
                        {patientDetails.name}
                    </div>
                    <div>
                        <b className="patientModal">Email : </b>
                        {patientDetails.email}
                    </div>
                    <div>
                        <b className="patientModal">Gender : </b>
                        {patientDetails.gender}
                    </div>
                    <div>
                        <b className="patientModal">Mobile No :  </b>
                        {patientDetails.mobile}
                    </div>
                    <div>
                        <b className="patientModal">Age :    </b>
                        {patientDetails.age}
                    </div>
                    <div>
                        <b className="patientModal">Time :    </b>
                        {patientDetails.slotTime}
                    </div>

                    <span  align='left'>
                            <Link to={`/patientinfo/${patientId}`}>
                                <button className="btn appColor modalbtn ">View Profile</button>
                            </Link>
                    </span>
                </div>
            </div>
        </div>

    )
}
export default CalendarModalBox