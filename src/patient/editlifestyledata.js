import { useEffect, useState } from "react";
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import { MainInput } from "../mainComponent/mainInput";
import { setPatientLifestyle } from "../recoil/atom/setPatientLifestyle";
import { useRecoilState } from 'recoil';
import PatientApi from '../services/PatientApi';

function EditLifeStyleData(props) {
    const { lifeStyleId } = props;
    const [editPatientData, setEditPatientData] = useState([]);
    const [coilPatientMedical, setCoilPatientMedical] = useRecoilState(setPatientLifestyle);
    const { updatePatientLifestyle, fetchUpdatePatientLifestyle } = PatientApi();

    useEffect(() => {
        fetchPatientData();
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setEditPatientData({ ...editPatientData, [name]: value })
    };

    const fetchPatientData = () => {
        fetchUpdatePatientLifestyle(lifeStyleId)
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
            smokingHabits: editPatientData.smokingHabits,
            alcoholConsumption: editPatientData.alcoholConsumption,
            foodPreferences: editPatientData.foodPreferences,
            occupation: editPatientData.occupation,
        }
        updatePatientLifestyle(lifeStyleId, updateMedical)
            .then((res) => {
                if (res) {
                    const editMedical = coilPatientMedical.map(function (e, index) {
                        if (lifeStyleId === e._id) {
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
                    <label className="font_weight">smoking Habits</label>
                    <MainInput
                        type="text"
                        name="smokingHabits"
                        value={editPatientData.smokingHabits}
                        onChange={handleInputChange}
                        placeholder="smoking Habits">
                    </MainInput>
                </div>
                <div className="col-md-6 ">
                    <label className="font_weight">Alcohol Consumption</label>
                    <MainInput
                        type="text"
                        name="alcoholConsumption"
                        value={editPatientData.alcoholConsumption}
                        onChange={handleInputChange}
                        placeholder="alcoholConsumption">
                    </MainInput>
                </div>
                <div className="col-md-12 ">
                    <label className="font_weight">Food Preferences</label>
                    <MainInput
                        type="text"
                        name="foodPreferences"
                        value={editPatientData.foodPreferences}
                        onChange={handleInputChange}
                        placeholder="foodPreferences">
                    </MainInput>
                </div>
                <div className="col-lg-12">
                    <label className="font_weight">Occupation</label>
                    <MainInput
                        type="text"
                        name="occupation"
                        value={editPatientData.occupation}
                        onChange={handleInputChange}
                        placeholder="occupation">
                    </MainInput>
                </div>
            </div>
            <div className="text-center add_top_30">
                <MainButtonInput>Save</MainButtonInput>
            </div>
        </form>
    )
}
export { EditLifeStyleData }