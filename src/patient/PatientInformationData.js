import { useEffect } from "react";
import PatientApi from "../services/PatientApi";
import { useRecoilState } from "recoil";
import { setPatientProfileData } from "../recoil/atom/setPatientProfileData";

function PatientInformationData(props) {
    const { patientId } = props;
    const [fetchPatientData, setFetchPatientData] = useRecoilState(setPatientProfileData)
    const { fetchPatient } = PatientApi()

    useEffect(() => {
        getAllPatientData()
    }, [])

    function getAllPatientData() {
        fetchPatient({ patientId })
            .then(response => {
                if (response[0]) {
                    setFetchPatientData(response[0])
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            })
    }

    return (
        <div className="mt-3">
            <div className="box_general_4 col-md-8">
                <div className="patientDataStyle">
                    <div>
                        <label className=" font_weight mx-2 fontS  col-md-6" >
                            {fetchPatientData.name}
                        </label>
                    </div>
                    <div className="row">
                        <label className="font_weight  patient col-md-6">
                            Emergency contact
                        </label>
                        <span className="patient col-md-6">
                            {fetchPatientData.emcontact ? fetchPatientData.emcontact : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight patient col-md-6">
                            Email
                        </label>
                        <span className="patient col-md-6">
                            {fetchPatientData.email ? fetchPatientData.email : "--"}
                        </span>
                    </div>
                    <div className="row ">
                        <label className="font_weight patient col-md-6">
                            Bloodgroup
                        </label>
                        <span className="patient col-md-6">
                            {fetchPatientData.bloodgroup ? fetchPatientData.bloodgroup : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight patient col-md-6">
                            Height
                        </label>
                        <span className="patient col-md-6">
                            {fetchPatientData.height ? fetchPatientData.height : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight patient col-md-6">
                            Weight
                        </label>
                        <span className="patient col-md-6">
                            {fetchPatientData.weight ? fetchPatientData.weight : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight patient col-md-6">
                            Address
                        </label>
                        <span className="patient col-md-6">
                            {fetchPatientData.address ? fetchPatientData.address : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight patient col-md-6">
                            Marital Status
                        </label>
                        <span className="patient col-md-6">
                            {fetchPatientData.maritalstatus ? fetchPatientData.maritalstatus : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight patient col-md-6">
                            Gender
                        </label>
                        <span className="patient col-md-6">
                            {fetchPatientData.gender ? fetchPatientData.gender : "--"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export { PatientInformationData }