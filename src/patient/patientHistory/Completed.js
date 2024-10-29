import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { Button } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PatientApi from '../../services/PatientApi';
import GetDoctorData from './getDoctorData';
import AppointmentApi from '../../services/AppointmentApi';
import ReactPaginate from 'react-paginate';
import Loader from './Loader';
import { Theme_Color } from '../../config';

export default function Completed(props) {
    const { patientId } = props
    const [patientHistoryData, setPatientHistoryData] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { downloadPrescription } = AppointmentApi()
    const { getpaymentData } = PatientApi()
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const paginationRef = useRef(currentPage)

    useEffect(() => {
        getPatientHistory(currentPage);
    }, [])

    const pageSize = 6;
    function getPatientHistory(currentPage) {
        setIsLoading(true)
        const data = {
            page: currentPage,
            pageSize: pageSize,
            status: "Completed",
        }
        getpaymentData({ patientId }, data)
            .then((result) => {
                if (result) {
                    const totalPages = result.totalPages;
                    setTotalPages(totalPages)
                    setPatientHistoryData(result.pageIndex)
                } else {
                    setIsError('Server Error')
                }

            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const downloadPdf = async (details) => {
        const reportId = details.medicalReportId
        downloadPrescription(reportId)
            .then((result) => {
                let alink = document.createElement('a');
                alink.href = result;
                alink.setAttribute("target", "_blank")
                alink.download = 'Prescription.pdf';
                alink.click();
            })
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
        paginationRef.current = data.selected + 1
        getPatientHistory(data.selected + 1)
    }

    return (
        <>
            {isLoading ?
                <div className='loader-container'>
                    <Loader />
                </div>
                :
                <>
                    {patientHistoryData && patientHistoryData.length > 0 ?
                        <div className='row'>
                            {patientHistoryData.map((details, i) => {
                                return (
                                    <div key={i} className="col-md-4 ">
                                        <div className="cardDiv">
                                            <GetDoctorData clinicId={details.clinicId} doctorId={details.doctorId} />
                                            <span className='cardSpan time'>
                                                <i className='pe-7s-date m-1 color patientListIcon' />
                                                <span className='slotTime'>
                                                    {moment(details.selectedDate).format('YYYY-MM-DD').toString()},
                                                    {details.slotTime}
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
                                                    <div className='width_20 ' align='right'>
                                                        <span className='dependent'>Dependent</span>
                                                    </div>
                                                </div>
                                            }
                                            <div className='cardSpan appointmentBtn historyBtn'>
                                                <Link to={`/report/${details.medicalReportId}`}>
                                                    <Button className="appColor helperBtn" > View</Button>
                                                </Link>
                                                <Button className="appColor helperBtn" onClick={() => downloadPdf(details)}> Download</Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        : <div className="clinicHistory font_weight" >Appointments are not available.</div>}
                    {isError === true ? <span className="validation mb-2">Server error</span> : null}
                    {patientHistoryData ?
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

        </>
    )
}