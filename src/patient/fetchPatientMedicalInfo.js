import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from "react-bootstrap";
import { EditMedicalData } from "../patient/editMedicalData";
import { useRecoilState } from "recoil";
import { setPatientMedical } from "../recoil/atom/setPatientMedical";
import PatientApi from "../services/PatientApi";
import { AddPatientMedicalInfo } from "./addPatientMedicalInfo";
import { Drawer, IconButton, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function FetchPatientMedicalInfo(props) {
    const { patientId } = props;
    const [fetchPatientdata, setFetchPatientData] = useRecoilState(setPatientMedical);
    const [activeModal, setActiveModal] = useState(false);
    const [showMedicalInfo, setShowMedicalInfo] = useState(false);
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:  768px)')
    const { getPatientMedical } = PatientApi()

    useEffect(() => {
        getPatientData()
    }, [])

    const handleClose = () => {
        setActiveModal(false)
        setOpen(false)
    }

    const handleShow = (e, index) => {
        e.preventDefault()
        setActiveModal(true)
        setOpen(true)
    };

    const MedicalData = () => {
        handleClose(true);
    };

    function handleRecordAdded() {
        setShowMedicalInfo(false)
    }

    function getPatientData() {
        getPatientMedical(patientId)
            .then((result) => {
                if (result) {
                    setFetchPatientData(result)
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            })
    }

    return (
        <>
            {
                fetchPatientdata.length > 0 ?
                    <>
                        {fetchPatientdata.map((item, index) => (
                            <div key={index} className="grayBox">
                                <Link
                                    onClick={e => handleShow(e, index)} className="editbutton">
                                    <i className="icon_pencil-edit mr-3 mt-3" title="Edit profile"></i>
                                </Link>
                                {isMobile ? (
                                    <Drawer anchor="bottom" open={open} onClose={handleClose}>
                                        <div className='drawerTitle underline' >
                                            <Typography variant="h6">Edit Medical Data</Typography>
                                            <IconButton onClick={handleClose} aria-label="close">
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <div className='p-4'>
                                            <EditMedicalData
                                                patientId={patientId}
                                                medicalId={item._id}
                                                onSubmit={MedicalData} />
                                        </div>
                                    </Drawer>
                                ) : (
                                    <Modal show={activeModal} onHide={handleClose} id={`item-${item._id}`} key={item._id}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Medical Data</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <EditMedicalData
                                                patientId={patientId}
                                                medicalId={item._id}
                                                onSubmit={MedicalData} />
                                        </Modal.Body>
                                    </Modal>
                                )
                                }
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="fetchedudata">
                                            <label className="font_weight ">
                                                Current Medications
                                            </label>
                                            <div>{item.cmedication}</div>
                                        </div>
                                        <div className="fetchedudata">
                                            <label className="font_weight ">
                                                Allergies
                                            </label>
                                            <div>{item.allergies}</div>
                                        </div>
                                        <div className="fetchedudata">
                                            <label className="font_weight ">
                                                Past Medications
                                            </label>
                                            <div>{item.pmedication}</div>
                                        </div>
                                        <div className="fetchedudata">
                                            <label className="font_weight ">
                                                Past Allergies
                                            </label>
                                            <div>{item.allergies}</div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 ">
                                        <div className="fetchedudata">
                                            <label className="font_weight ">
                                                Chronic Diseases
                                            </label>
                                            <div>{item.diseases}</div>
                                        </div>
                                        <div className="fetchedudata">
                                            <label className="font_weight ">
                                                Injuries
                                            </label>
                                            <div>{item.injuries}</div>
                                        </div>
                                        <div className="fetchedudata">
                                            <label className="font_weight ">
                                                Surgeries
                                            </label>
                                            <div>{item.surgeries}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                    :
                    <AddPatientMedicalInfo
                        patientId={patientId}
                        addMedicalRecord={handleRecordAdded} />
            }
        </>
    )
}
export { FetchPatientMedicalInfo }