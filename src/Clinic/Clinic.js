import { Button, Modal } from "react-bootstrap";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { Wrapper } from "../mainComponent/Wrapper";
import { MainNav } from "../mainComponent/mainNav";
import { AddClinic } from "./addClinic";
import { useEffect, useState } from "react";
import ClinicApi from "../services/ClinicApi";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ViewClinic from "./partial/ViewClinic";
import { EditClinic } from "./partial/EditClinic";

export default function Clinic() {
    const [clinicData, setClinicData] = useState([])
    const [clinicList, setClinicList] = useState([])
    const { getClinic } = ClinicApi();
    const [show, setShow] = useState(false);
    const [clinicShow, setClinicShow] = useState(false);
    const [clinicInfo, setClinicInfo] = useState(false);
    const [editClinicShow, setEditClinicShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const [filterData, setFilterData] = useState([])
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const ClinicsShow = (details) => {
        setClinicShow(true);
        setClinicInfo(details)
    }
    const ClinicsClose = () => setClinicShow(false);

    const EditClinicShow = (details) => {
        setEditClinicShow(true);
        setClinicInfo(details)
    }
    const EditClinicClose = () => setEditClinicShow(false);

    const onClinicFormSubmit = () => {
        handleClose();
    };

    useEffect(() => {
        fetchClinic(currentPage)
    }, [currentPage])

    const pageSize = 6;
    const fetchClinic = () => {
        getClinic(currentPage, pageSize)
            .then((res) => {
                setTotalPages(res.clinicListPages)
                setClinicData(res.clinicList)
                setClinicList(res.clinicList)
                setFilterData(res.result)
            })
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }
    const searchClinic = (value) => {
        if (value.length !== 0) {
            const res = filterData.filter(name => name.clinicName.toLowerCase().includes(value.toLowerCase()))
            setClinicData(res)
        }
        else {
            setClinicData(clinicList)
        }
    }
    return (
        <>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <span className='float-none margin-top' style={{ fontSize: 'inherit' }}>Clinic-List</span>
                    </div>
                    <div className="width50 row justifyContent">
                        <div id="custom-search-input">
                            <input type="text" onChange={(e) => searchClinic(e.target.value)} className="search-query" placeholder="Search Clinic by Name" />
                        </div>
                        {/* <Button
                            type="submit"
                            onClick={() => handleShow()}
                            variant="default"
                            className='appColor ml-3  mr-3 btn_sub'>
                            Add New Clinic
                        </Button> */}
                    </div>
                </div>
            </MainNav>
            <Wrapper>
            <div className='row'>
                {/* <div className="width16">
                    <div className="dash row">
                        <UserLinks />
                    </div>
                </div> */}
                <div className="full-width">
                    <div className="common_box">
                        <div className='row'>
                            {clinicData.map((details, i) => {
                                return (
                                    <div key={i} className="col-md-4">
                                        <div className="cardDiv">
                                            <div className='doctorCard'>
                                                <div className='row'>
                                                    <div className='col-md-5'>
                                                        <img
                                                            src={details.clinicLogo}
                                                            alt="doctorProfile"
                                                            className='doctorphotoPatient'
                                                        />
                                                    </div>
                                                    <div className='col-md-7 ' align='center'>
                                                        <span className='patientName fontS font-weight'>
                                                            {details.clinicName.charAt(0).toUpperCase() + details.clinicName.slice(1)}
                                                        </span>

                                                    </div>
                                                </div>
                                            </div>
                                            <span className='cardSpan'>
                                                <span className="fontSize ">
                                                    <b>Address : </b> {details.address}
                                                </span>
                                            </span>
                                            <span className='cardSpan'>
                                                <span className=' fontSize '>
                                                    <b>Clinic Number : </b>{details.clinicNumber}
                                                </span>
                                            </span>
                                            <div className=' appointmentBtn' align='right'>
                                                <Link >
                                                    <button onClick={() => ClinicsShow(details)} className="btn appColor helperBtn ">View More</button>
                                                </Link>
                                                {/* <Link  >
                                                    <button onClick={() => EditClinicShow(details)} className='btn btn-default btnMargin ' >Edit Clinic</button>
                                                </Link> */}
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {clinicData.length > 0 ?
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
                            : <div className="clinicHistory" ><b>Data is not Available</b></div>}
                    </div>
                </div>
            </div>
            <div className="modalbtn">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Clinic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddClinic onSubmit={onClinicFormSubmit} />
                    </Modal.Body>
                </Modal>
            </div>
            <Modal show={clinicShow} onHide={ClinicsClose}>
                <Modal.Header closeButton>
                    <Modal.Title >Clinic Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ViewClinic clinicData={clinicInfo} onSubmit={onClinicFormSubmit} />
                </Modal.Body>
            </Modal>
            <div className="modalbtn">
                <Modal show={editClinicShow} onHide={EditClinicClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Clinic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditClinic clinicsData={clinicInfo} onSubmit={EditClinicClose} />
                    </Modal.Body>
                </Modal>
            </div>
        </Wrapper>
        </>
    )

}