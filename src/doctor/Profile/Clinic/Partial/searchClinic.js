import React, { useEffect, useState } from "react";
import { setDoctorClinic } from "../../../../recoil/atom/setDoctorClinic";
import { useRecoilState } from "recoil";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { Modal } from "react-bootstrap";
import { AddClinic } from "./addclinic";
import Autocomplete from "@mui/lab/Autocomplete";
import { TextField } from "@mui/material";
import ClinicApi from "../../../../services/ClinicApi";

const SearchClinic = (props) => {
    const { doctorId } = props
    const [coilDoctorClinicData, setCoilDoctorClinicData] = useRecoilState(setDoctorClinic)
    const [clinicInfo, setClinicInfo] = useState([]);
    const [clinicSave, setClinicSave] = useState([])
    const [servicess, setServicess] = useState([])
    const { getClinic, getServicess, addClinic } = ClinicApi()
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchclinic()
        fetchServicess()
    }, [])

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onClinicFormSubmit = () => {
        handleClose();
    };
    const fetchServicess = () => {
        getServicess()
            .then((res) => {
                setServicess(res)
            })
    }

    const fetchclinic = (() => {
        getClinic()
            .then((res) => {
                setClinicInfo(res.result)
            })
    })

    const handleChange = (event, selectedValue) => {
        event.preventDefault()
        setClinicSave(selectedValue)
    }

    function sendClinicInfo(e) {
        e.preventDefault();
        const newClinicData = {
            clinicId: clinicSave._id
        }
        addClinic(doctorId, newClinicData)
            .then((res) => {
                setCoilDoctorClinicData(coilDoctorClinicData.concat(res))
            });
        props.onSubmit()
    }


    return (
        <div className="col-lg-12">
            {/* <form onSubmit={sendClinicInfo}> */}
            <div className="form-group">
                <label><b>Search Clinic</b></label>
                <Autocomplete
                    style={{ width: 250 }}
                    id={clinicInfo._id}
                    disablePortal={true}
                    disableClearable
                    disableCloseOnSelect
                    // value={clinicSave}
                    onChange={handleChange}
                    getOptionLabel={(data) => `${data.clinicName + '(' + data.address + ')'}`}
                    options={clinicInfo}
                    noOptionsText={"Clinic not available please add new clinic"}
                    renderInput={(params) =>
                        <TextField {...params}
                            label="Enter Clinic Name"
                        />}
                />
            </div>
            <div className="row margin_top_30 " align='right'>
                <div className='mr-2'>
                    <MainButtonInput onClick={sendClinicInfo} className='col-md-4 marginLeft ' value="Add" >
                        ADD
                    </MainButtonInput>
                </div>
                <MainButtonInput onClick={handleShow} >ADD ANOTHER CLINIC </MainButtonInput>
            </div>
            <div className="modalbtn">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Clinic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddClinic doctorId={doctorId} onSubmit={onClinicFormSubmit} />
                    </Modal.Body>
                </Modal>
            </div>
        </div >
    );
};
export { SearchClinic }
