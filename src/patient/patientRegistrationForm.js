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
import Loader from "./patientHistory/Loader";
import { MainSelect } from "../mainComponent/mainSelect";
import { requestNotificationPermission } from "../firebase.config";
import { API } from "../config";
import AuthApi from "../services/AuthApi";

function PatientRegistrationForm(props) {
    const { patientId } = props;
    const [updatePatientData, setUpdatePatientData] = useState({})
    const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn)
    const [slotItem] = useRecoilState(setSlotData)
    const [patientData, setPatientData] = useRecoilState(setNewPatientId)
    const [coilFetchPatientData, setCoilFetchPatientData] = useRecoilState(setPatientProfileData)
    const { insertPatientData, fetchPatient } = PatientApi()
    const [isLoading, setIsLoading] = useState(true);
    const [mobile, setMobile] = useState('');
    const navigate = useNavigate();
    const [saveGender, setSaveGender] = useState('')
    const { savePatientToken } = AuthApi()

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



    const handleGender = ((e) => {
        e.preventDefault()
        setSaveGender(e.target.value)
    })

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdatePatientData({ ...updatePatientData, [name]: value });
        setValue(name, value)
    };
    const handleMobile = (e) => {
        setMobile(e.target.value)
    }

    useEffect(() => {
        getPatientDetails()
        register("name", { required: true });
        register("age", { required: true });
        register("gender", { required: true });
        register("email", { required: true });
        register("mobile", { required: true });
        setPatientData(patientId)
    }, [])

    setTimeout(() => {
        setIsLoading(false)
    }, 2000)

    function getPatientDetails() {
        fetchPatient({ patientId })
            .then((result) => {
                setUpdatePatientData(result[0])
            })
    }

    const patientToken = async (patientId) => {
        try {
            const currentToken = await requestNotificationPermission();
            if (currentToken) {
                savePatientToken(patientId, { patientToken: currentToken })
                    .then(() => {
                        console.log('Patient token saved for patientId:', patientId);
                    })
                    .catch(err => {
                        console.error('Error saving patient token:', err);
                    });
            }
        } catch (error) {
            console.error('Error generating patient token:', error);
        }
    };

    const { register, setValue, formState: { errors } } = useForm();
    const onSubmit = (e) => {
        e.preventDefault();
        const newPatientData = {
            mobile: updatePatientData.mobile,
            name: updatePatientData.name,
            gender: saveGender ? saveGender : updatePatientData.gender,
            age: updatePatientData.age,
            email: updatePatientData.email,
        }
        insertPatientData(patientId, newPatientData)
            .then((response) => {
                patientToken(patientId)
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
            {isLoading ?
                <div className='loader-container'>
                    <Loader />
                </div>
                :
                <>
                    <div className="underline">
                        <h3 className="mb-3">Patient Details</h3>
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
                                    value={updatePatientData.name}
                                    onChange={handleInputChange}
                                    placeholder="Jhon">
                                </MainInput>
                                {errors.name && <span className="validation">Please enter your full name</span>}
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
                                    onChange={handleInputChange}
                                    placeholder="Mobile Number (+XX)">
                                </MainInput>
                                {errors.mobile && <span className="validation">Please enter your Mobile Number</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3  ">
                                <label className="font_weight left">
                                    Age
                                </label>
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
                                <label className="font_weight left">
                                    Gender
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
                                {errors.gender && <span className="validation">Please enter your gender</span>}
                            </div>

                            <div className="col-md-4 col-sm-4">
                                <label className="font_weight left">
                                    Email
                                </label>
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
                </>
            }
        </div >
    )
}
export { PatientRegistrationForm }