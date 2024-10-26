import { useEffect, useRef, useState } from "react";
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import moment from "moment";
import PatientApi from "../../services/PatientApi";
import GetDoctorData from "./getDoctorData";
import ReactPaginate from "react-paginate";
import Loader from "./Loader";

export default function Incomplete(props) {
    const { patientId } = props;
    const [patientHistoryData, setPatientHistoryData] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getpaymentData } = PatientApi()
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const paginationRef = useRef(currentPage)
    const pageSize = 6;

    useEffect(() => {
        getPatientDetails(currentPage);
    }, []);

    function getPatientDetails(currentPage) {
        setIsLoading(true)
        const data = {
            page: currentPage,
            pageSize: pageSize,
            status: "Incomplete",
        }
        getpaymentData({ patientId }, data)
            .then((result) => {
                if (result) {
                    const totalPages = result.totalPages;
                    setTotalPages(totalPages)
                    setPatientHistoryData(result.pageIndex)
                } else {
                    setIsError(true)
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
        paginationRef.current = data.selected + 1
        getPatientDetails(data.selected + 1)
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
                                    <div className="col-md-4 " key={i}>
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
                                                <AccessTimeRoundedIcon style={{ fontSize: 25, paddingRight: 2, paddingLeft: 2, color: '#1a3c8b' }} />
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