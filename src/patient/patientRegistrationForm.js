import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MainInput } from "../mainComponent/mainInput";
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import PatientApi from "../services/PatientApi";
import { useNavigate } from "react-router-dom";
import { setloggedIn } from "../recoil/atom/setloggedIn";
import { useRecoilState } from "recoil";
import { setSlotData } from "../recoil/atom/setSlotData";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { setPatientProfileData } from "../recoil/atom/setPatientProfileData";

function PatientRegistrationForm(props) {
    const { patientId } = props;
    const [updatePatientData, setUpdatePatientData] = useState({})
    const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn)
    const [slotItem] = useRecoilState(setSlotData)
    const [patientData, setPatientData] = useRecoilState(setNewPatientId)
    const [coilFetchPatientData, setCoilFetchPatientData] = useRecoilState(setPatientProfileData)
    const { insertPatientData, fetchPatient } = PatientApi()
    const navigate = useNavigate();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdatePatientData({ ...updatePatientData, [name]: value });
        setValue(name, value)
    };

    useEffect(() => {
        getPatientDetails()
        register("name", { required: true });
        register("age", { required: true });
        register("gender", { required: true });
        register("email", { required: true });
        register("mobile", { required: true });
        setPatientData(patientId)
    }, [])

    function getPatientDetails() {
        fetchPatient({ patientId })
            .then((result) => {
                setUpdatePatientData(result[0])
            })
    }

    const { register, setValue, formState: { errors } } = useForm();
    const onSubmit = (e) => {
        e.preventDefault();
        const newPatientData = {
            mobile: updatePatientData.mobile,
            name: updatePatientData.name,
            gender: updatePatientData.gender,
            age: updatePatientData.age,
            email: updatePatientData.email,
        }
        insertPatientData(patientId, newPatientData)
            .then((response) => {
                setCoilFetchPatientData(response)
                setLoggedIn(response.isLoggedIn)
            })
        if (slotItem._id) {
            navigate(`/patientprofile/${patientId}`)
        } else {
            navigate(`/`)
        }
    }

    return (
        <div>
            <div className="underline">
                <h3 className="mb-3">Patient Details</h3>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div align='left'><label>Full name</label></div>
                        <MainInput
                            type="text"
                            name="name"
                            value={updatePatientData.name}
                            onChange={handleInputChange}
                            placeholder="Jhon">
                        </MainInput>
                        {errors.name && <span className="validation">Please enter your full name</span>}
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <div align='left'> <label>Mobile</label></div>
                        <MainInput
                            type="text"
                            name="mobile"
                            value={updatePatientData.mobile}
                            maxLength={10}
                            pattern="[+-]?\d+(?:[.,]\d+)?"
                            onChange={handleInputChange}
                            placeholder="Mobile Number (+XX)">
                        </MainInput>
                        {errors.mobile && <span className="validation">Please enter your Mobile Number</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3  ">
                        <div align='left'><label>Age</label></div>
                        <MainInput
                            type="text"
                            name="age"
                            value={updatePatientData.age}
                            onChange={handleInputChange}
                            placeholder="25">
                        </MainInput>
                        {errors.age && <span className="validation">Please enter your Age</span>}
                    </div>

                    <div className="col-md-3 ">
                        <div align='left'><label>Gender</label></div>
                        <MainInput
                            type="text"
                            name="gender"
                            value={updatePatientData.gender}
                            onChange={handleInputChange}
                            placeholder="Male">
                        </MainInput>
                        {errors.gender && <span className="validation">Please enter your gender</span>}
                    </div>

                    <div className="col-md-4 col-sm-4">
                        <div align='left'><label>Email</label></div>
                        <MainInput
                            type="email"
                            name="email"
                            value={updatePatientData.email}
                            onChange={handleInputChange}
                            placeholder="jhon@doe.com">
                        </MainInput>
                        {errors.email && <span className="validation">Please enter your email address</span>}
                    </div>
                </div>

                <div className="text-right add_top_30  mr-3">
                    <MainButtonInput>Verify & Save</MainButtonInput>
                </div>

            </form>
        </div>
    )
}
export { PatientRegistrationForm }