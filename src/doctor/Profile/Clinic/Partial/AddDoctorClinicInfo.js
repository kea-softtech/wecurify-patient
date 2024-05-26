import { SetSession } from "../Session/setSession";
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import AuthApi from "../../../../services/AuthApi";
import { SearchClinic } from "./searchClinic";
import ReactPaginate from "react-paginate";

function AddDoctorClinicInfo(props) {
    const { doctorId } = props
    const [showSession, setShowSession] = useState(false);
    const [activeModal, setActiveModal] = useState()
    const [clinicList, setClinicList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState();
    const [show, setShow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { getDrInfo } = AuthApi()

    useEffect(() => {
        getAllClinics(currentPage);
    }, [currentPage, clinicList])

    const pageSize = 5;
    const getAllClinics = (currentPage) => {
        getDrInfo({ doctorId }, currentPage, pageSize)
            .then((jsonRes) => {
                const clinicData = jsonRes['clinicList']
                setTotalPages(jsonRes.clinicListPages)
                setClinicList(clinicData)
            });
    }

    const handleSearchClose = () => setShowSearch(false)
    const handleSearchShow = () => setShowSearch(true)

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    const sessionClose = () => {
        setShowSession(null)
        setActiveModal(null);
    };
    const sessionShow = (e, index) => {
        e.preventDefault();
        setActiveModal(index);
    }
    const onSessionFormSubmit = (e) => {
        e.preventDefault();
        sessionClose();
    };
    //for add clinic info
    const handleClose = () => setShow(false);

    const onClinicFormSubmit = () => {
        handleClose();
        handleSearchClose()
    };

    return (
        <>
            <div className="modalbtn">
                <Modal show={showSearch} onHide={handleSearchClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Search Clinic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SearchClinic doctorId={doctorId} onSubmit={onClinicFormSubmit} />
                    </Modal.Body>
                </Modal>
            </div>

            {clinicList ?
                <>
                    {clinicList.map((item, index) => (
                        <div className="row" key={item._id}>
                            <div className='full-width'>
                                <div className="row">
                                    <div className="width30 ml-3" align='left'>
                                        <figure >
                                            <img
                                                className='clinicLogo borderRadius'
                                                src={item.clinicLogo}
                                                alt="Clinic Logo"
                                            />
                                        </figure>
                                    </div>
                                    <div className="width30" align='left'>
                                        <div className='fontS'><b>{item.clinicName}</b></div>
                                        <div className="icon-location fontSize color">
                                            {item.address}
                                        </div>
                                    </div>
                                    <div>
                                        <Link
                                            to="#"
                                            onClick={(e) => sessionShow(e, index)}
                                            className="patientlistlink">
                                            {<AccessTimeRoundedIcon
                                                style={{ fontSize: 30 }} />}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Modal show={activeModal === index} onHide={sessionClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Set Session</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <SetSession
                                        doctorId={doctorId}
                                        clinicId={item._id}
                                        onSubmit={onSessionFormSubmit}
                                    />
                                </Modal.Body>
                            </Modal>
                        </div>
                    ))}
                </> : null}
            <div cllassName="" align='right'>
                <MainButtonInput onClick={handleSearchShow}>ADD CLINIC</MainButtonInput>
            </div>
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
        </>
    )
}
export { AddDoctorClinicInfo }