import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MainInput } from '../mainComponent/mainInput';
import { MainButtonInput } from '../mainComponent/mainButtonInput';
import PatientApi from "../services/PatientApi";

function PatientPersonalInformation(props) {
    const { patientId } = props;
    const [updateData, setUpdateData] = useState([])
    const { insertPatientData, fetchPatient } = PatientApi()

    useEffect(() => {
        getPatientPersonalInfo();
    }, [])

    function getPatientPersonalInfo() {
        fetchPatient({ patientId })
            .then((jsonRes) => {
                if (jsonRes[0]) {
                    setUpdateData(jsonRes[0])
                } else {
                    return <span className="validation mb-2">Server error</span>
                }
            });
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setValue(name, value)
    };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmit = data => {
        const patientData = {
            name: updateData.name,
            email: updateData.email,
            mobile: updateData.mobile,
            bloodgroup: updateData.bloodgroup,
            maritalstatus: updateData.maritalstatus,
            height: updateData.height,
            weight: updateData.weight,
            gender: updateData.gender,
            age: updateData.age,
            birthdate: updateData.birthdate,
            emcontact: updateData.emcontact,
            address: updateData.address
        }
        insertPatientData(patientId, patientData)
            .then((response) => {
                props.personal();
            })
    }

    return (
        <form onSubmit={handleSubmit(() => onSubmit())}>
            <div className="col-12" >
                <div className="row">
                    <div className="col-sm-3">
                        <label className="patientData font_weight left">
                            Full Name
                        </label>
                        <MainInput
                            type="text"
                            value={updateData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            name="name" >
                        </MainInput>
                    </div>
                    <div className="col-sm-3">
                        <label className=" patientData font_weight left">
                            Age
                        </label>
                        <MainInput
                            type="text"
                            value={updateData.age}
                            onChange={handleInputChange}
                            placeholder="Age"
                            name="age" >
                        </MainInput>
                    </div>
                    <div className="col-sm-3">
                        <label className=" patientData font_weight left">
                            Email
                        </label>
                        <MainInput
                            type="text"
                            value={updateData.email}
                            onChange={handleInputChange}
                            placeholder="EmailId"
                            name="email" >
                        </MainInput>
                    </div>
                    <div className="col-sm-3">
                        <label className=" patientData font_weight left">
                            Marital status
                        </label>
                        <MainInput
                            type="text"
                            value={updateData.maritalstatus}
                            onChange={handleInputChange}
                            placeholder="Single"
                            name="maritalstatus" >
                        </MainInput>
                    </div>
                    <div className="col-sm-3">
                        <label className=" patientData font_weight left">
                            Date Of Birth
                        </label>
                        <MainInput
                            type="date"
                            name="birthdate"
                            onChange={handleInputChange}
                            value={updateData.birthdate}>
                        </MainInput>
                    </div>
                    <div className="col-sm-3">
                        <label className=" patientData font_weight left">
                            Emergency Contact
                        </label>
                        <MainInput
                            type="text"
                            name="emcontact"
                            onChange={handleInputChange}
                            value={updateData.emcontact}
                            maxLength={10}
                            className="form-control"
                            placeholder="Emergency Contact">
                        </MainInput>
                    </div>
                   
                    <div className="col-sm-3">
                        <label className=" patientData font_weight left">
                            Weight
                        </label>
                        <MainInput
                            type="text"
                            name="weight"
                            onChange={handleInputChange}
                            value={updateData.weight}
                            placeholder="kg">
                        </MainInput>
                    </div>
                    <div className="col-sm-3">
                        <label className=" patientData font_weight left">
                            Blood Group
                        </label>
                        <MainInput
                            type="text"
                            onChange={handleInputChange}
                            name="bloodgroup"
                            value={updateData.bloodgroup}
                            placeholder="Ex. O+ A B...">
                        </MainInput>
                    </div>
                    <div className="col-sm-3">
                        <label className=" patientData font_weight left">
                            Height
                        </label>
                        <MainInput
                            type="text"
                            name="height"
                            onChange={handleInputChange}
                            value={updateData.height}
                            placeholder="cm">
                        </MainInput>
                    </div>
                    <div className="col-sm-3">
                        <label className=" patientData font_weight left">
                            Mobile No
                        </label>
                        <MainInput
                            type="text"
                            onChange={handleInputChange}
                            name="mobile"
                            maxLength={10}
                            value={updateData.mobile}
                            placeholder="9090909090">
                        </MainInput>
                    </div>
                    <div className="col-sm-4">
                        <div align='left' className="patientData font_weight ">
                            Gender
                        </div>
                        <div align='left'>
                            <input
                                className="radio_button"
                                type="radio"
                                value="female"
                                name="gender"
                                onChange={handleInputChange}
                                checked={updateData.gender === 'Female'}
                            />
                            <span>Female</span>
                            <input
                                className="radio_button"
                                type="radio"
                                value='male'
                                name="gender"
                                checked={updateData.gender === 'Male'}
                                onChange={handleInputChange}
                            />
                            <span>Male</span>
                            <input
                                className="radio_button"
                                type="radio"
                                value='other'
                                name="gender"
                                checked={updateData.gender === 'Other'}
                                onChange={handleInputChange}
                            />
                            <span>Other</span>
                        </div>
                    </div>
                    <div className="col-sm-8" >
                        <label className=" patientData font_weight left">
                            Address
                        </label>
                        <textarea
                            value={updateData.address}
                            name="address"
                            onChange={handleInputChange}
                            placeholder="Address"
                            className="form-control">
                        </textarea>
                    </div>
                </div>
            </div>

            <div align='right' className="mt-2 text-right add_top_30" >
                <MainButtonInput>Verify & Save</MainButtonInput>
            </div>
        </form>
    )
}
export { PatientPersonalInformation }