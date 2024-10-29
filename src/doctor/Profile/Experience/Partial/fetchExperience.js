import React from 'react';
import { EditExperience } from "./editExperience";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { setDoctorExperience } from "../../../../recoil/atom/setDoctorExperience";
import { useRecoilState } from 'recoil';
import ExperienceApi from '../../../../services/ExperienceApi';
function FetchExperience(props) {
    const { doctorId } = props;
    const [fetchExperience, setFetchExperience] = useRecoilState(setDoctorExperience)
    const [activeModal, setActiveModal] = useState()
    const { fetchExperienceData, removeExperience } = ExperienceApi();
    const [Item, setItem] = useState([]);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        getAllExperience()
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

    const getAllExperience = () => {
        fetchExperienceData({ doctorId })
            .then(jsonRes => {
                if (jsonRes) {
                    const exp = manipulateExperience(jsonRes)
                    setFetchExperience(exp)
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            });
    }

    function manipulateExperience(data) {
        if (data) {
            return data.map(function (item, index) {
                const experiences = monthDiff(new Date(item.startYear), new Date(item.endYear))
                const month = experiences % 12
                let year = 0
                if (experiences > 11) {
                    const exYear = experiences / 12
                    year = exYear.toFixed(0)
                }
                item.totalExperience = `${year}.${month}`;
                return item;
            })
        }
        else {
            return <span className="validation mb-2">Server error</span>
        }
    }

    function monthDiff(start, end) {
        var months;
        months = (end.getFullYear() - start.getFullYear()) * 12;
        months -= start.getMonth();
        months += end.getMonth();
        return months <= 0 ? 0 : months;
    }
    const removeExperienceData = (experience) => {
        const id = experience._id
        removeExperience(id)
            .then(() => {
                getAllExperience()
            })
        handleDeleteClose()
    }

    return (
        <>
            <div className='row'>
                {fetchExperience.map((experience, index) => {
                    return (
                        <div className='col-md-5'>
                            <div  key={index}>
                                <Modal
                                    show={activeModal === index}
                                    onHide={handleClose}
                                    id={`experience-${experience._id}`}
                                    key={experience._id}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Experience Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <EditExperience
                                            doctorId={doctorId}
                                            ExId={experience._id}
                                            onSubmit={EditData} />
                                    </Modal.Body>
                                </Modal>
                                <div className="row">
                                    <div className="grayBox">
                                        <div className="row">
                                            <div className='col-md-9'>
                                                <div align='left'>
                                                    {/* <span className="icon-icon">
                                                        <i className="icon_calendar" title="Calender profile"></i>
                                                    </span> */}
                                                    <span className="font_weight">Start Year  - </span>
                                                    <span>
                                                        {new Date(experience.startYear)
                                                            .toLocaleDateString(undefined,
                                                                {
                                                                    year: 'numeric', month: '2-digit',
                                                                    timeZone: 'Asia/Kolkata'
                                                                })}
                                                    </span>
                                                </div>
                                                <div align='left'>
                                                    {/* <span className="icon-icon">
                                                        <i className="icon_calendar" title="Calender profile"></i>
                                                    </span> */}
                                                    <span className="font_weight">End Year  - </span>
                                                    <span>
                                                        {new Date(experience.endYear)
                                                            .toLocaleDateString(undefined,
                                                                {
                                                                    year: 'numeric', month: '2-digit',
                                                                    timeZone: 'Asia/Kolkata'
                                                                })}
                                                    </span>
                                                </div>
                                                <div align='left'>
                                                    {/* <span className="icon-icon">
                                                        <i className="icon_building" title="Clinic"></i>
                                                    </span> */}
                                                    <span className="font_weight">Clinic/Hospital Name  - </span>
                                                    <span>{experience.clinicName}</span>
                                                </div>
                                                <div  align='left'>
                                                    <span className="font_weight">Doctor Experience  - </span>
                                                    <span>{experience.totalExperience} years</span>
                                                </div>

                                                <div  align='left'>
                                                    <span className="font_weight">Description  - </span>
                                                    <span>{experience.description}</span>
                                                </div>
                                            </div>
                                            <div className='col-md-3' align='right'>
                                                <Link
                                                    to="#"
                                                    onClick={e => handleShow(e, index)}
                                                    className="editbutton">
                                                    <i className="icon_pencil-edit"
                                                        title="Edit profile">
                                                    </i>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    onClick={() => handleDeleteShow(experience)}
                                                    className="editbutton">
                                                    <i className="icon-trash-2"
                                                        title="Delete profile">
                                                    </i>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}
                <div>
                    <Modal show={showDelete} onHide={handleDeleteClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are you sure?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="alert alert-bgcolor">You want to delete this experience details.</div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="default" className='appColor' onClick={() => removeExperienceData(Item)}>
                                Yes
                            </Button>
                            <Button variant="default" className='appColorBorder'  onClick={handleDeleteClose}>
                                No
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div >
        </>
    )
}
export { FetchExperience }