import React, { useEffect } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "./partial/uselinks";
import { useState } from "react";
import PatientApi from "../../services/PatientApi";
import ReactPaginate from "react-paginate";
import { Group } from "@mui/icons-material";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AllPatients() {
    const [patientData, setPatientData] = useState([])
    const [patientList, setPatientList] = useState([])
    const [filterData, setFilterData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getAllPatient } = PatientApi()
    const navigate = useNavigate();

    useEffect(() => {
        getPatientList(currentPage)
    }, [currentPage])

    const pageSize = 6;
    const getPatientList = () => {
        getAllPatient(currentPage, pageSize)
            .then((res) => {
                setFilterData(res.patients)
                setPatientList(res.patientList)
                setPatientData(res.patientList)
                setTotalPages(res.totalPages)
            })
    }

    const searchPatient = (value) => {
        if (value.length !== 0) {
            const res = filterData.filter(name => name.name.toLowerCase().includes(value.toLowerCase()))
            setPatientData(res)
        } else {
            setPatientData(patientList)
        }
    }

    const handleShowProfile = (details, e) => {
        e.preventDefault();
        navigate(`patientinfo/${details}`)
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    return (
        <Wrapper>
            <MainNav>
                <div className=" clearfix row">
                    <div className="width50">
                        <span className='float-none margin-top' style={{ fontSize: 'inherit' }}>Patient-List</span>
                    </div>
                    <div className="width50 row justifyContent">
                        <div id="custom-search-input">
                            <input type="text" onChange={(e) => searchPatient(e.target.value)} className="search-query" placeholder="Search Patient By Name" />
                        </div>
                    </div>
                </div>
            </MainNav>
            <div className='row'>
                <div className="width16">
                    <div className="dash row">
                        <UserLinks />
                    </div>
                </div>
                <div className="width84">
                    <div className="common_box">
                        <div className='row'>
                            {patientData.map((details, i) => {
                                return (

                                    <div key={i} className="col-md-4 " >
                                        <div className="cardDiv">
                                            <span className='cardSpan '>
                                                <i className='icon-user color patientListIcon' />
                                                <span className='patientName'>{details.name}</span>
                                            </span>
                                            <span className='cardSpan'>
                                                <i className='icon-mobile-1 color patientListIcon' />
                                                <span className='patinetInfo'>{details.mobile}</span>
                                            </span>
                                            <span className='cardSpan '>
                                                <i className='icon-email color patientListIcon' />
                                                <span className='patinetInfo'>{details.email}</span>
                                            </span>

                                            <div className='appointmentBtn'>
                                                <Link to='#' onClick={(e) => handleShowProfile(details._id, e)}>
                                                    <button className="btn appColor helperBtn ">View Profile</button>
                                                </Link>
                                                <Link to={`patientappointment/${details._id}`} >
                                                    <button className='btn appColor helperBtn'>Appointment Details</button>
                                                </Link>
                                                {details['dependent'].length > 0 ?
                                                    <Link
                                                        to={`dependentdata/${details._id}`}>
                                                        <Group style={{ fontSize: 40 }} />
                                                    </Link>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                        {patientData.length > 0 ?
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
                            : <div className="clinicHistory font_weight">Data is Not Available</div>}
                    </div >
                </div>
            </div>
            <Outlet />
        </Wrapper>
    )

}