import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import DeleteIcon from '@mui/icons-material/Delete';
import PatientApi from "../services/PatientApi";
import { Button, Modal } from "react-bootstrap";

export default function DependentList(props) {
    const { patientId } = props
    const { fetchPatient, deleteDependent } = PatientApi()
    const [fetchPatientData, setFetchPatientData] = useState([])
    const [showDelete, setShowDelete] = useState(false);
    const [dependentId, setDependentId] = useState('');

    const navigate = useNavigate()
    useEffect(() => {
        getAllPatientData()
    }, [])

    function getAllPatientData() {
        fetchPatient({ patientId })
            .then((response) => {
                setFetchPatientData(response[0].dependent)
            })
    }

    const handleClick = () => {
        navigate(`/adddependent/${patientId}`)
    }

    const handleDeleteShow = (dependentId) => {
        setDependentId(dependentId)
        setShowDelete(true)
    }

    const handleDeleteClose = () => setShowDelete(false)

    const handleDelete = (dependentId) => {
        deleteDependent(dependentId)
            .then(() => {
                handleDeleteClose()
                getAllPatientData()
            })
    }

    return (
        <>
            {fetchPatientData ?
                <div className="width_84">
                    <div className="common_box">
                        <div align='right' className="mb-2 mr-3">
                            <MainButtonInput onClick={handleClick}>
                                Add Dependent
                            </MainButtonInput>
                        </div>
                        <div className="row">
                            {fetchPatientData && fetchPatientData.map((item, i) => (
                                <div className="col-md-4 mb-4">
                                    <div className="mainCards linehieght">
                                        <div className='full-width row'>
                                            <div className="width70">
                                                <span className='cardSpan'>
                                                    <i className='icon-user color' />
                                                    <b className=' fontSize'>
                                                        {item.name}
                                                    </b>
                                                </span>
                                            </div>
                                            <div className='width30'>
                                                <Link onClick={() => handleDeleteShow(item._id)}>
                                                    <DeleteIcon style={{ marginLeft: 15, fontSize: 20 }} />
                                                </Link>
                                            </div>
                                        </div>
                                        <span className='cardSpan'>
                                            <i className='icon-email color' />
                                            {item.email}
                                        </span>
                                        <span className='cardSpan'>
                                            <i className='icon-user color' />
                                            {item.gender},&nbsp; {item.age}
                                        </span>
                                        {/* <div className="row justify-end top_border">
                                            <div className=' m-2'>
                                                <SecondaryButton onClick={() => handleDeleteShow(item._id)}>Delete</SecondaryButton>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                : null}
            <Modal show={showDelete} onHide={handleDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert modalColor" >
                        You want to delete this assistant.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='appColor' variant="default " onClick={() => handleDelete(dependentId)}>
                        Yes
                    </Button>
                    <Button variant="default" className='borderStyle' onClick={handleDeleteClose}>
                        No
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}