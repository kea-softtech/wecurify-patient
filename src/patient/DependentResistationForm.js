import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MainInput } from "../mainComponent/mainInput";
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import PatientApi from "../services/PatientApi";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../doctor/Dashboard-card/validateForm";
import { MainSelect } from "../mainComponent/mainSelect";

function DependentRegistationForm(props) {
    const { patientId } = props;
    const [updatePatientData, setUpdatePatientData] = useState(null)
    const [saveGender, setSaveGender] = useState('')
    const [dependentData, setDependentData] = useState([])
    const [errors, setErrors] = useState({})
    const { fetchPatient, AddDependents } = PatientApi()
    const navigate = useNavigate();

    const gender = [
        {
            "_id": 0,
            "name": "Male"
        },
        {
            "_id": 1,
            "name": "Female"
        },
        {
            "_id": 2,
            "name": "Other"
        }
    ]

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDependentData({ ...dependentData, [name]: value });
        setValue(name, value)
    };

    useEffect(() => {
        getPatientDetails()
        register("name", { required: true });
        register("age", { required: true });
        register("gender", { required: true });
        register("email", { required: true });
        register("patientId", { required: true });
    }, [])

    function getPatientDetails() {
        fetchPatient({ patientId })
            .then((result) => {
                setUpdatePatientData(result[0])
            })
    }
    const handleGender = ((e) => {
        e.preventDefault()
        setSaveGender(e.target.value)
    })


    const { register, setValue } = useForm();
    const onSubmit = (e) => {
        e.preventDefault();
        const validation = validateForm({
            dependentData,
            saveGender
        });

        if (!validation.formIsValid) {
            setErrors(validation.errors);
            return;
        }
        const dependentAdd = {
            name: dependentData.name,
            // mobile: updatePatientData.mobile,
            gender: saveGender,
            age: dependentData.age,
            email: dependentData.email,
            patientId: patientId,
        }
        AddDependents(patientId, dependentAdd)
            .then((response) => {
                // setFetchPatientData(response)
                // setDependentsId(response._id)
                navigate(`/patientprofile/${patientId}`)
            })
    }

    return (
        <>
            {updatePatientData ?
                <div>
                    <div className="underline">
                        <h3 className="mb-3">Dependent Details</h3>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label className="font_weight left">
                                    Full name
                                </label>
                                <MainInput
                                    type="text"
                                    name="name"
                                    value={dependentData.name}
                                    onChange={handleInputChange}
                                    placeholder="Jhon">
                                </MainInput>
                                {errors.name && <span className="validation">{errors.name}</span>}
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <label className="font_weight left">
                                    Mobile
                                </label>
                                <MainInput
                                    type="text"
                                    name="mobile"
                                    value={updatePatientData.mobile}
                                    maxLength={10}
                                    pattern="[+-]?\d+(?:[.,]\d+)?"
                                    // onChange={handleInputChange}
                                    placeholder="Mobile Number (+XX)">
                                </MainInput>
                                {errors.mobile && <span className="validation">{errors.mobile}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 ">
                                <label className="font_weight left">
                                    Age
                                </label>
                                <MainInput
                                    type="text"
                                    name="age"
                                    value={dependentData.age}
                                    onChange={handleInputChange}
                                    placeholder="25">
                                </MainInput>
                                {errors.age && <span className="validation">{errors.age}</span>}
                            </div>

                            {/* <div className="col-md-3 ">
                                <label className="font_weight left">
                                    Gender
                                </label>
                                <MainInput
                                    type="text"
                                    name="gender"
                                    value={dependentData.gender}
                                    onChange={handleInputChange}
                                    placeholder="Male">
                                </MainInput>
                                {errors.gender && <span className="validation">{errors.gender}</span>}
                            </div> */}
                            <div className="col-md-3 ">
                                <label className="font_weight left">
                                    Gender *
                                </label>
                                <MainSelect
                                    value={saveGender ? saveGender : updatePatientData.gender}
                                    onChange={handleGender}>
                                    <option>Select</option>
                                    {gender && gender.map((item, index) => (
                                        <option key={index}
                                            value={item.name}
                                            className="form-control">
                                            {item.name}
                                        </option>
                                    ))}
                                </MainSelect>
                                {errors.gender && <span className="validation mt-3">{errors.gender}</span>}
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <label className="font_weight left">
                                    Email
                                </label>
                                <MainInput
                                    type="email"
                                    name="email"
                                    value={dependentData.email}
                                    onChange={handleInputChange}
                                    placeholder="jhon@doe.com">
                                </MainInput>
                                {/* {errors.email && <span className="validation">Please enter your email address</span>} */}
                            </div>
                        </div>
                        <div className="text-right add_top_30 m-2">
                            <MainButtonInput>Verify & Save</MainButtonInput>
                        </div>
                    </form>
                </div>
                : null}
        </>
    )
}
export { DependentRegistationForm }