import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from "react-bootstrap";
import { EditLifeStyleData } from "../patient/editlifestyledata";
import { useRecoilState } from "recoil";
import { setPatientLifestyle } from "../recoil/atom/setPatientLifestyle";
import PatientApi from "../services/PatientApi";
import { AddPatientLifestyleInfo } from "./addPatientLifestyleInfo";
import { Drawer, IconButton, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function FetchPatientLifestyleData(props) {
    const { patientId } = props;
    const [fetchPatientdata, setFetchPatientData] = useRecoilState(setPatientLifestyle)
    const [activeModal, setActiveModal] = useState(false)
    const { getPatientLifestyle } = PatientApi();
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:  768px)')

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

    const lifeStyleData = () => {
        handleClose(true);
    };

    function getPatientData() {
        getPatientLifestyle(patientId)
            .then((result) => {
                if (result) {
                    setFetchPatientData(result)
                } else {
                    return <span className="validation mb-2">Server error</span>
                }
            })
    }
    return (
        <>
            {fetchPatientdata.length > 0 ?
                <>
                    {fetchPatientdata.map((item, index) => (
                        <div className="grayBox" key={index}>
                            <Link onClick={e => handleShow(e, index)} className="editbutton">
                                <i className="icon_pencil-edit" title="Edit profile" />
                            </Link>
                            {isMobile ? (
                                <Drawer anchor="bottom" open={open} onClose={handleClose}>
                                    <div className='drawerTitle underline' >
                                        <Typography variant="h6">Edit Lifestyle Data</Typography>
                                        <IconButton  onClick={handleClose} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                    <div className='p-4'>
                                        <EditLifeStyleData
                                            patientId={patientId}
                                            lifeStyleId={item._id}
                                            onSubmit={lifeStyleData} />
                                    </div>
                                </Drawer>
                            ) : (
                                <Modal show={activeModal } onHide={handleClose} id={`item-${item._id}`} key={item._id}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Lifestyle Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <EditLifeStyleData
                                            patientId={patientId}
                                            lifeStyleId={item._id}
                                            onSubmit={lifeStyleData} />
                                    </Modal.Body>
                                </Modal>
                            )}

                            < div className="row">
                                <div className="col-md-6 ">
                                    <div className="fetchedudata">
                                        <div
                                            align='left'
                                            className="font_weight patientData">
                                            Smoking Habits
                                        </div>
                                        <div>
                                            {item.smokingHabits}
                                        </div>
                                    </div>
                                    <div className="fetchedudata">
                                        <div align='left' className="font_weight patientData">Alcohol Consumption</div>
                                        <div>{item.alcoholConsumption}</div>
                                    </div>
                                </div>

                                <div className="col-md-6 ">
                                    <div className="fetchedudata">
                                        <div align='left' className="font_weight patientData">Food Preferences</div>
                                        <div>{item.foodPreferences}</div>
                                    </div>
                                    <div className="fetchedudata">
                                        <div align='left' className="font_weight patientData">Occupation</div>
                                        <div>{item.occupation}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
                : <AddPatientLifestyleInfo patientId={patientId} />
            }
        </>
    )
}
export { FetchPatientLifestyleData }