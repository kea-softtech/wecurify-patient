import React, { useState, useEffect } from "react";
import { setDoctorClinic } from "../../recoil/atom/setDoctorClinic";
import { useRecoilState } from "recoil";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import ClinicApi from "../../services/ClinicApi";
import { Autocomplete, TextField } from "@mui/material";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import uuid from "uuid";
import EducationApi from "../../services/EducationApi";

const EditClinic = (props) => {
    const { clinicsData } = props
    const clinicId = clinicsData._id
    const [coilDoctorClinicData, setCoilDoctorClinicData] = useRecoilState(setDoctorClinic)
    const [selectedService, setSelectedService] = useState([]);
    const [drspecialization, setDrSpecialization] = useState([])
    const [updateClinicInfo, setUpdateClinicInfo] = useState([]);
    const { fetchDrSpecialization } = EducationApi()
    const [servicess, setServicess] = useState([])
    const { editClinic, getServicess, getClinic } = ClinicApi()

    useEffect(() => {
        fetchSpecializations()
        fetchServicess()
        setUpdateClinicInfo(clinicsData)
    }, [])

    const fetchSpecializations = () => {
        fetchDrSpecialization()
            .then((result) => {
                setDrSpecialization(result);
            })
    }

    const fetchServicess = () => {
        getServicess()
            .then((res) => {
                setServicess(res)
            })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setUpdateClinicInfo({ ...updateClinicInfo, [name]: value })

    }
    const handleService = (e, selectedValue) => {
        e.preventDefault()
        setSelectedService(selectedValue)
    }

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileRef = ref(getStorage(), uuid.v4());

        const result = await uploadBytes(fileRef, blob);
        // blob.close();
        return await getDownloadURL(fileRef);
    }
    async function sendClinicInfo(e) {
        e.preventDefault()
        const resultUrl = await uploadImageAsync(updateClinicInfo.clinicLogo)
        const newClinicData = {
            clinicLogo: resultUrl,
            clinicName: updateClinicInfo.clinicName,
            address: updateClinicInfo.address,
            clinicNumber: updateClinicInfo.clinicNumber,
            services: selectedService,
            accountNumber: updateClinicInfo.accountNumber,
            IFSCcode: updateClinicInfo.IFSCcode,
        }
        editClinic(clinicId, newClinicData)
            .then((res) => {
                setCoilDoctorClinicData(coilDoctorClinicData.concat(res))
            });
        props.onSubmit()
    }

    return (
        <div className="col-lg-12">
            <form onSubmit={sendClinicInfo}>
                <div className="text-left">
                    <label>Clinic Logo</label>
                    <MainInput
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                            setUpdateClinicInfo({ ...updateClinicInfo, ['clinicLogo']: URL.createObjectURL(e.target.files[0]) })
                        }}
                        name="clinicLogo">
                    </MainInput>
                </div>
                <div className="form-group">
                    <label>Clinic Name *</label>
                    <MainInput
                        type="text"
                        name="clinicName"
                        onChange={handleChange}
                        value={updateClinicInfo.clinicName}
                        placeholder="Enter clinic name">
                    </MainInput>
                    {/* {errors.clinicName && <span className="validation">Clinic Name is Required</span>} */}

                </div>

                <div className="form-group">
                    <label>Location *</label>
                    <MainInput
                        type="text"
                        name="address"
                        value={updateClinicInfo.address}
                        onChange={handleChange}
                        placeholder="Enter clinic address">
                    </MainInput>
                    {/* {errors.address && <span className="validation">Clinic Address is Required</span>} */}

                </div>
                <div className="form-group">
                    <label className="font_weight">Clinic Number</label>
                    <MainInput
                        type="text"
                        name="clinicNumber"
                        onChange={(e) => handleChange(e)}
                        pattern="[+-]?\d+(?:[.,]\d+)?"
                        maxLength={10}
                        value={updateClinicInfo.clinicNumber}
                        placeholder="Clinic Number (+XX)">
                    </MainInput>
                </div>

                <div className="form-group">
                    <label className="font_weight">Account Number</label>
                    <MainInput
                        type="text"
                        name="accountNumber"
                        onChange={handleChange}
                        pattern="[+-]?\d+(?:[.,]\d+)?"
                        maxLength={15}
                        value={updateClinicInfo.accountNumber}
                        placeholder="Account Number">
                    </MainInput>
                </div>
                <div className="form-group">
                    <label className="font_weight">IFSC Code</label>
                    <MainInput
                        type="text"
                        name="IFSCcode"
                        onChange={handleChange}
                        pattern="[+-]?\d+(?:[.,]\d+)?"
                        maxLength={15}
                        value={updateClinicInfo.IFSCcode}
                        placeholder="IFSC code">
                    </MainInput>
                </div>
                <div className='align-left '>
                    <div align='left' className="patientData mt-2 mb-2 font_weight">
                        Clinic Services *
                    </div>
                    <Autocomplete
                        disablePortal={true}
                        disableClearable
                        disableCloseOnSelect
                        multiple={true}
                        className='autocompleteWidth'
                        id={servicess._id}
                        value={selectedService.name}
                        onChange={handleService}
                        getOptionLabel={(servicess) => `${servicess.name}`}
                        options={servicess}
                        renderInput={(params) =>
                            <TextField {...params}
                                label="Service" />}
                    />
                </div>
                <div className="text-center m-3">
                    <MainButtonInput value="Add Clinic" />
                </div>
            </form >
        </div >
    );
};
export { EditClinic }
