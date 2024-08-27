import React, { useEffect } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import AuthApi from "../../services/AuthApi";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../../recoil/atom/setDoctorId";
import Loader from "../../patient/patientHistory/Loader";

export default function DoctorList() {
    const [doctorData, setDoctorData] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [key, setKey] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { getdoctors } = AuthApi();
    const navigate = useNavigate();

    useEffect(() => {
        getDoctorList(currentPage, key)
    }, [currentPage]);

    setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    const pageSize = 6;
    const getDoctorList = () => {
        getdoctors(currentPage, pageSize, key)
            .then((result) => {
                if (result) {
                    setFilterData(result.doctorList)
                    setDoctorData(result.doctorList)
                    setTotalPages(result.doctorListPages)
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            })
    }
    const searchDoctor = (value) => {
        setKey(value)
        if (value.length !== 0) {
            const res = filterData.filter(name => name.name.toLowerCase().includes(value.toLowerCase()))
            setDoctorData(res)
        }
        else {
            setDoctorData(filterData)
        }
    }

    const handleShowProfile = (details, e) => {
        e.preventDefault();
        navigate(`/profile/${details._id}`)
    }

    const BookAppointments = (details, e) => {
        e.preventDefault();
        setDoctorsId(details._id)
        navigate(`/booking/${details._id}`)
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1)
    }

    return (
        <Wrapper>
            <MainNav>
                <div className=" clearfix row">
                    <div className="width50">
                        <Link to={`/`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}> Doctor list</span>
                    </div>
                </div>
            </MainNav>
            <div className='row'>
                <div className="full-width">
                    <div className="common_box wraper">
                        <div className="m-2" align='right'>
                            <div className="width50 ml-2 mr-2 row justifyContent">
                                <div id="custom-search-input">
                                    <input type="text"
                                        onChange={(e) => searchDoctor(e.target.value)}
                                        className="search-query"
                                        placeholder="Search Doctor By Name"
                                    />
                                </div>
                            </div>
                        </div>

                        {isLoading ?
                            <div className='loader-container'>
                                <Loader />
                            </div>
                            :
                            <>
                                {doctorData && doctorData.length>0 ?
                                    <div className='row '>
                                        {doctorData && doctorData.map((details, i) => {
                                            return (
                                                <div key={i} className="col-md-4">
                                                    <div className="cardDiv">
                                                        <span className='cardSpan'>
                                                            <i className='icon-user color patientListIcon' />
                                                            <span align='left' className='patientName color'>
                                                                <NavLink to="#" className='underLine' onClick={(e) => handleShowProfile(details, e)}>
                                                                    Dr.{details.name}
                                                                </NavLink>
                                                            </span>
                                                        </span>
                                                        <span className='cardSpan'>
                                                            <i className='icon-mobile-1 color patientListIcon' />
                                                            <span className='patinetInfo'>{details.mobile}</span>
                                                        </span>
                                                        <span className='cardSpan text-align'>
                                                            <i className='icon-building color patientListIcon' />
                                                            <span className='patinetInfo'>{details.address}</span>
                                                        </span>
                                                        <div className=' appointmentBtn' align='right'>
                                                            <NavLink onClick={(e) => BookAppointments(details, e)}>
                                                                <button className='btn appColor helperBtn'>Book Appointment</button>
                                                            </NavLink>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })}

                                    </div>
                                    : <div className="clinicHistory mb-3" ><b>Doctors are not available.</b></div>}
                                {doctorData ?
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


                    </div >
                </div>
            </div>
            <Outlet />
        </Wrapper >
    )

}