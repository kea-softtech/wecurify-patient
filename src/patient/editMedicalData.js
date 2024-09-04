import { useEffect, useState } from "react"
import { MainButtonInput } from "../mainComponent/mainButtonInput"
import { MainInput } from "../mainComponent/mainInput"
import { setPatientMedical } from "../recoil/atom/setPatientMedical";
import { useRecoilState } from 'recoil';
import PatientApi from "../services/PatientApi";

function EditMedicalData(props) {
    const { medicalId } = props;
    const [editPatientData, setEditPatientData] = useState([])
    const [coilPatientMedical, setCoilPatientMedical] = useRecoilState(setPatientMedical)
    const { getPatientData, updatePatientData } = PatientApi()

    useEffect(() => {
        fetchPatientData();
    }, [])

    const handleInputChange = event => {
        const { name, value } = event.target;
        setEditPatientData({ ...editPatientData, [name]: value })
    };

    const fetchPatientData = () => {
        getPatientData(medicalId)
            .then(jsonRes => {
                if (jsonRes) {
                    setEditPatientData(jsonRes)
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            });
    }

    const UpdatePatientData = async (event) => {
        event.preventDefault();
        const updateMedical = {
            patientId: editPatientData.patientId,
            allergies: editPatientData.allergies,
            cmedication: editPatientData.cmedication,
            pmedication: editPatientData.pmedication,
            diseases: editPatientData.diseases,
            injuries: editPatientData.injuries,
            surgeries: editPatientData.surgeries,
        }
        updatePatientData(medicalId, updateMedical)
            .then((res) => {
                if (res) {
                    const editMedical = coilPatientMedical.map(function (e, index) {
                        if (medicalId === e._id) {
                            return res.data
                        } else {
                            return e
                        }
                    })
                    setCoilPatientMedical(editMedical);
                    props.onSubmit();
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            })
    }

    return (
        <form onSubmit={UpdatePatientData} id={"updateData"}>
            <div className="row">
                <div className="col-md-6 ">
                    <label className="font_weight">Allergies</label>
                    <MainInput
                        type="text"
                        name="Allergies"
                        value={editPatientData.allergies}
                        onChange={handleInputChange}
                        placeholder="Allergies">
                    </MainInput>
                </div>
                <div className="col-md-6 ">
                    <label className="font_weight">Current Medication</label>
                    <MainInput
                        type="text"
                        name="cmedication"
                        value={editPatientData.cmedication}
                        onChange={handleInputChange}
                        placeholder="cmedication">
                    </MainInput>
                </div>
                <div className="col-md-12 ">
                    <label className="font_weight">Past Medication</label>
                    <MainInput
                        type="text"
                        name="pmedication"
                        value={editPatientData.pmedication}
                        onChange={handleInputChange}
                        placeholder="pmedication">
                    </MainInput>
                </div>
                <div className="col-lg-12">
                    <label className="font_weight"> Chronic Diseases</label>
                    <MainInput
                        type="text"
                        name="diseases"
                        value={editPatientData.diseases}
                        onChange={handleInputChange}
                        placeholder="diseases">
                    </MainInput>
                </div>
                <div className="col-lg-12">
                    <label className="font_weight">Injuries</label>
                    <MainInput
                        type="text"
                        name="injuries"
                        value={editPatientData.injuries}
                        onChange={handleInputChange}
                        placeholder="injuries">
                    </MainInput>
                </div>
                <div className="col-lg-12">
                    <label className="font_weight">Surgeries</label>
                    <MainInput
                        type="text"
                        name="surgeries"
                        value={editPatientData.surgeries}
                        onChange={handleInputChange}
                        placeholder="surgeries">
                    </MainInput>
                </div>
            </div>
            <div className="text-center add_top_30">
                <MainButtonInput>Save</MainButtonInput>
            </div>
        </form>
    )
}
export { EditMedicalData }