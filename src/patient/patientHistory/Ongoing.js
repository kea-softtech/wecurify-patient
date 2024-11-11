import React, { useRef } from 'react';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PatientApi from '../../services/PatientApi';
import GetDoctorData from './getDoctorData';
import AppointmentApi from '../../services/AppointmentApi';
import ReactPaginate from 'react-paginate';
import Loader from './Loader';
import { useRecoilState } from 'recoil';
import { setDoctorId } from '../../recoil/atom/setDoctorId';
import { Theme_Color } from '../../config';

export default function Ongoing(props) {
    const { patientId } = props
    const [patientList, setPatientList] = useState(null);
    const [showCancel, setCancelDelete] = useState(false);
    const [id, setId] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const [totalPages, setTotalPages] = useState(0);
    const { cancelPatientAppointment, updateIncompleteStatus } = AppointmentApi()
    const { getpaymentData } = PatientApi()
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const paginationRef = useRef(currentPage)
    const pageSize = 6;

    useEffect(() => {
        getPatientDetails(currentPage);
    }, [])

    const handleCancelShow = (details) => {
        setId(details._id)
        setCancelDelete(true)
    }
    const handleCancelClose = () => setCancelDelete(false)

    function getPatientDetails(currentPage) {
        setIsLoading(true)
        const data = {
            page: currentPage,
            pageSize: pageSize,
            status: "Ongoing",
        }
        getpaymentData({ patientId }, data)
            .then((result) => {
                setPatientList(result.pageIndex)
                const totalPages = result.totalPages;
                setTotalPages(totalPages)
                if (result.test) {
                    result.test.filter((data) => {
                        const patientAppointmentId = data._id;
                        const currentDate = moment(new Date()).format("YYYY-MM-DD HH:MM")
                        const slotDate = moment(data.selectedDate).format("YYYY-MM-DD") + " " + data.slotTime
                        if (slotDate < currentDate && data.status !== "Completed" && data.status !== "Cancelled") {
                            const bodyData = {
                                'status': "Incomplete"
                            }
                            updateIncompleteStatus(patientAppointmentId, bodyData)
                        }
                    })
                } else {
                    return <div className=" font_weight clinicHistory" >Appointments are not Available</div>
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    function cancelAppointment(id) {
        cancelPatientAppointment(id)
        getPatientDetails()
        handleCancelClose()
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
        paginationRef.current = data.selected + 1
        getPatientDetails(data.selected + 1)
    }


    const handleQueueClick = (details) => {
        setDoctorsId(details.doctorId)
        navigate(`/patientqueue/${details.clinicId}`, { state: details })
    }

    return (
        <>
            {isLoading ?
                <div className='loader-container'>
                    <Loader />
                </div>
                :
                <>
                    {patientList && patientList.length > 0 ?
                        <div className='row'>
                            {patientList && patientList.map((details, i) => {
                                return (
                                    <div key={i} className="col-md-4">
                                        <div className="cardDiv">
                                            <GetDoctorData
                                                clinicId={details.clinicId}
                                                doctorId={details.doctorId} />
                                            <span className='cardSpan time'>
                                                <i className='pe-7s-date m-1 color patientListIcon' />
                                                <span>
                                                    {moment(details.selectedDate).format('YYYY-MM-DD').toString()}
                                                    ,{details.slotTime}
                                                </span>
                                            </span>
                                            <span className='cardSpan'>
                                                <AccessTimeRoundedIcon style={{ fontSize: 25, paddingRight: 2, paddingLeft: 2, color: Theme_Color }} />
                                                {details.timeSlot} Min.
                                            </span>
                                            {!details.dependentId ?
                                                <div align='left ' className='ml-3 mb-2'>
                                                    <span className='patientName'>Patient:  </span> {details['patientDetails'][0].name}
                                                </div>
                                                :
                                                <div className='row mb-2 mr-3'>
                                                    <div align='left' className=' ml-3 width_60 fontSize'>
                                                        <span className='patientName '>Patient:  </span>{details['dependentDetails'][0].name}
                                                    </div>
                                                    <div className='width_20' align='right'>
                                                        <span className='dependent'>Dependent</span>
                                                    </div>
                                                </div>
                                            }
                                            <div className='appointmentBtn' align='right'>
                                                <Link to={`/profile/${details.doctorId}`}>
                                                    <button className="btn appColor helperBtn ">
                                                        View Profile
                                                    </button>
                                                </Link>

                                                <button
                                                    onClick={() => handleQueueClick(details)}
                                                    className="btn appColor helperBtn">
                                                    Queue
                                                </button>

                                                <Link onClick={() => handleCancelShow(details)} >
                                                    <button className='btn btn-default btnMargin'>
                                                        Cancel
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        : <div className="clinicHistory font_weight mb-3" >
                            Appointments not found please book your appoitnment.
                        </div>
                    }
                    {isError === true ? <span className="validation mb-2">Server error</span> : null}
                    {patientList ?
                        <div>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={totalPages}
                                previousLabel="< Previous"
                                renderOnZeroPageCount={null}
                                marginPagesDisplayed={2}
                                containerClassName="pagination "
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                activeClassName="active"
                                forcePage={currentPage - 1}
                            />
                        </div>
                        : null}
                </>
            }


            <Modal show={showCancel} onHide={handleCancelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-bgcolor">You want to cancel this appointment. </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" className='appColor' onClick={() => cancelAppointment(id)}>
                        Yes
                    </Button>
                    <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleCancelClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}