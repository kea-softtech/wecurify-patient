import React from 'react';
import { useEffect, useState } from "react";
import moment from 'moment';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PatientApi from '../../services/PatientApi';
import GetDoctorData from './getDoctorData';
import ReactPaginate from 'react-paginate';
import Loader from './Loader';

export default function Cancelled(props) {
    const { patientId } = props;
    const [patientList, setPatientList] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const [cancelledProduct, setCancelledProduct] = useState([]);
    const { getpaymentData } = PatientApi()
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getPatientHistory(currentPage);
    }, [currentPage])

    setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    const pageSize = 6;
    function getPatientHistory(currentPage) {
        getpaymentData({ patientId }, currentPage, pageSize)
            .then((result) => {
                if (result) {
                    setCancelledProduct(result.cancelledProduct)
                    const totalPages = result.totalCancelledPages;
                    setTotalPages(totalPages)
                    setPatientList(result.cancelled)
                }
                else {
                    setIsError('Server Error')
                }
            })
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
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
                            {patientList.map((details, i) => {
                                return (

                                    <div key={i} className="col-md-4 ">
                                        <div className="cardDiv">
                                            <GetDoctorData clinicId={details.clinicId} doctorId={details.doctorId} />
                                            <span className='cardSpan time'>
                                                <i className='pe-7s-date m-1 color patientListIcon' />
                                                <span className='slotTime'>
                                                    {moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}
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
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        : <div className="clinicHistory"><b>Appointments are not available.</b></div>
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
                            />
                        </div>
                        : null}
                </>
            }

        </>
    )
}