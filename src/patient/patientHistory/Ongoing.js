import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PatientApi from '../../services/PatientApi';
import GetDoctorData from './getDoctorData';
import AppointmentApi from '../../services/AppointmentApi';
import ReactPaginate from 'react-paginate';
import Loader from './Loader';

export default function Ongoing(props) {
    const { patientId } = props
    const [patientList, setPatientList] = useState(null);
    const [showCancel, setCancelDelete] = useState(false);
    const [ongoingProduct, setOngoingProduct] = useState([]);
    const [id, setId] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { cancelPatientAppointment } = AppointmentApi()
    const { getpaymentData } = PatientApi()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPatientDetails(currentPage);
    }, [])

    setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    const handleCancelShow = (details) => {
        setId(details._id)
        setCancelDelete(true)
    }
    const handleCancelClose = () => setCancelDelete(false)

    const pageSize = 6;
    function getPatientDetails(currentPage) {
        getpaymentData({ patientId }, currentPage, pageSize)
            .then((result) => {
                setOngoingProduct(result.ongoingProduct)
                const totalPages = result.totalOngoingPages;
                setTotalPages(totalPages)
                setPatientList(result.ongoing)
            })
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    function cancelAppointment(id) {
        cancelPatientAppointment(id)
            .then(() => {
                getPatientDetails()
                handleCancelClose()
            })
    }

    return (
        <>
            {isLoading ?
                <div className='loader-container'>
                    <Loader />
                </div>
                :
                <>
                    {patientList ?
                        <div className='row'>
                            {patientList && patientList.map((details, i) => {
                                return (
                                    <div key={i} className="col-md-4">
                                        <div className="cardDiv">
                                            <GetDoctorData clinicId={details.clinicId} doctorId={details.doctorId} />
                                            <span className='cardSpan time'>
                                                <i className='pe-7s-date m-1 color patientListIcon' />
                                                <span className=''>
                                                    {moment(details.selectedDate).format('YYYY-MM-DD').toString()}
                                                    ,{details.slotTime}
                                                </span>
                                            </span>
                                            <span className='cardSpan'>
                                                <AccessTimeRoundedIcon style={{ fontSize: 25, paddingRight: 2, paddingLeft: 2, color: '#1a3c8b' }} />
                                                {details.timeSlot} Min.
                                            </span>
                                            {!details.dependentId ?
                                                <div align='left ' className='ml-3 mb-2'>
                                                    <span className='patientName'>Patient:  </span> {details['patientDetails'][0].name}
                                                </div>
                                                :
                                                <div className='row mb-2'>
                                                    <div align='left' className=' ml-3 width_60 fontSize'>
                                                        <span className='patientName '>Patient:  </span>{details['dependentDetails'][0].name}
                                                    </div>
                                                    <div className='width_20' align='right'>
                                                        <span className='dependent'>Dependent</span>
                                                    </div>
                                                </div>
                                            }
                                            <div className=' appointmentBtn' align='right'>
                                                {/* <Link to={`/patientqueue/${patientId}`}>
                                        <button className="btn appColor helperBtn ">Queue</button>
                                    </Link> */}
                                                <Link to={`/profile/${details.doctorId}`}>
                                                    <button className="btn appColor helperBtn ">View Profile</button>
                                                </Link>
                                                <Link onClick={() => handleCancelShow(details)} >
                                                    <button className='btn btn-default btnMargin ' >Cancel</button>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                )

                            })}
                        </div>
                        : <div className="clinicHistory mb-3" ><b>Data is not Available</b></div>
                    }
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
                            />
                        </div>
                        : null}
                </>
            }


            <Modal show={showCancel} onHide={handleCancelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-bgcolor">You Want To Cancel This Appoinment. </div>
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