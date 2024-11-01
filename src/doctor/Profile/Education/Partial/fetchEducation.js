import React from 'react';
import { EditEducation } from "./EditEducation";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { setDoctorEducation } from "../../../../recoil/atom/setDoctorEducation";
import EducationApi from '../../../../services/EducationApi';

function FetchEducation(props) {
    const { doctorId } = props
    const [eduData, setEduData] = useRecoilState(setDoctorEducation);
    const [activeModal, setActiveModal] = useState();
    const [Item, setItem] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const { fetchAllEducations, deleteEducationData } = EducationApi()


    useEffect(() => {
        getAllEducations()
    }, [])

    const handleDeleteShow = (item) => {
        setItem(item)
        setShowDelete(true)
    }
    const handleDeleteClose = () => setShowDelete(false)
    const handleClose = () => {
        setActiveModal(null)
    }
    const handleShow = (e, index) => {
        setActiveModal(index)
    };

    const EditData = () => {
        handleClose(true);
    };

    const getAllEducations = () => {
        fetchAllEducations({ doctorId })
            .then((res) => {
                if (res) {
                    setEduData(res);
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            })
    }
    const deleteEducation = (education) => {
        const id = education._id
        deleteEducationData(id)
            .then(() => {
                getAllEducations()
            })
        handleDeleteClose()
    }

    return (
        <>
            {eduData.length > 0 ?
                <div className='row'>
                    {eduData.map((education, index) => {
                        return (
                            <div className='col-md-5'>
                                <div key={index}>
                                    <Modal show={activeModal === index}
                                        onHide={handleClose}
                                        id={`education-${education._id}`}
                                        key={education._id}>
                                        <Modal.Header closeButton >
                                            <Modal.Title>Edit Education Data</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <EditEducation
                                                imageData={education.document}
                                                doctorId={doctorId}
                                                EduId={education._id}
                                                onClick={handleClose}
                                                onSubmit={EditData}
                                            />
                                        </Modal.Body>
                                    </Modal>
                                    <div className='row'>
                                        <div className='grayBox'>
                                            <div className='row'>
                                                <div className='col-md-9'>
                                                    <div align='left'>
                                                        {/* <span className="icon-icon">
                                                            <i className="pe-7s-medal" title="degree"></i>
                                                        </span> */}
                                                        <span className="font_weight">Doctor Degree</span>
                                                        <div>{education.degree}</div>
                                                    </div>
                                                    <div align='left'>
                                                        {/* <span className="icon-icon">
                                                            <i className="icon_building" title="building"></i>
                                                        </span> */}
                                                        <span className="font_weight">Doctor Collage/University</span>
                                                        <div>{education.collage}</div>
                                                    </div>
                                                    <div align='left'>
                                                        <span className="font_weight">Specialization</span>
                                                        <div>{education.specialization}</div>
                                                    </div>
                                                    <div align='left'>
                                                        {/* <span className="icon-icon">
                                                            <i className="icon_calendar" title="calendar"></i>
                                                        </span> */}
                                                        <span className="font_weight">Complition Year  -</span>
                                                        <span>{education.comYear}</span>
                                                    </div>
                                                </div>

                                                <div className='col-md-3' align='right'>
                                                    <Link
                                                        onClick={e => handleShow(e, index)}
                                                        to="#"
                                                        className="editbutton">
                                                        <i className="icon_pencil-edit"
                                                            title="Edit profile">
                                                        </i>
                                                    </Link>
                                                    <Link
                                                        onClick={() => handleDeleteShow(education)}
                                                        to="#"
                                                        align='right'
                                                        className="editbutton">
                                                        <i className="icon-trash-2"
                                                            title="delete profile">
                                                        </i>
                                                    </Link>
                                                </div>
                                                {/* <FetchImages imageData={education.document} /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                    }
                </div>
                : null}
            <div>
                <Modal show={showDelete} onHide={handleDeleteClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-bgcolor">You want to delete this education details.</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="default" className='appColor' onClick={() => deleteEducation(Item)}>
                            Yes
                        </Button>
                        <Button variant="default" className='appColorBorder'  onClick={handleDeleteClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
export { FetchEducation }