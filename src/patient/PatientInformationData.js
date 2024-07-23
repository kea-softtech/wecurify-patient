import { useEffect } from "react";
import PatientApi from "../services/PatientApi";
import { useRecoilState } from "recoil";
import { setPatientProfileData } from "../recoil/atom/setPatientProfileData";

function PatientInformationData(props) {
    const { patientId } = props;
    const [fetchPatientData, setFetchPatientData] = useRecoilState(setPatientProfileData)
    const { fetchPatient } = PatientApi()

    useEffect(() => {
        getAllPatientData()
    }, [])

    function getAllPatientData() {
        fetchPatient({ patientId })
            .then(response => {
                setFetchPatientData(response[0])
            })
    }

   
    return (
        <div className="col-md-6 mb-2">
            <div className="box_general_4 cart patientDetails">
                {/* <div className="underline">
                    <div className="form_title">
                        <h3>Patient Details</h3>
                    </div>
                </div> */}
                <div className="patientDataStyle">
                    <div>
                        <label className="mx-2 fontS"><b>{fetchPatientData.name}</b></label>
                    </div>
                    
                    <div>
                        <label className="mx-2"><b>Emergency contact :</b></label>
                        {fetchPatientData.emcontact}
                    </div>
                    <div>
                        <label className="mx-2"><b>Email :</b></label>
                        {fetchPatientData.email}
                    </div>
                    <div>
                        <label className="mx-2"><b>Bloodgroup :</b></label>
                        {fetchPatientData.bloodgroup}
                    </div>
                    <div>
                        <label className="mx-2"><b>Height :</b></label>
                        {fetchPatientData.height}
                    </div>
                    <div>
                        <label className="mx-2"><b>Weight :</b></label>
                        {fetchPatientData.weight}
                    </div>
                    <div>
                        <label className="mx-2"><b>Address :</b></label>
                        {fetchPatientData.address}
                    </div>
                    <div>
                        <label className="mx-2"><b>Marital Status :</b></label>
                        {fetchPatientData.maritalstatus}
                    </div>
                    <div>
                        <label className="mx-2"><b>Gender :</b></label>
                        {fetchPatientData.gender}
                    </div>
                    <div className='row'>
                        {/* <div className=" mt-2 col-md-6 " >
                            <Button onClick={() => handleShow(slotItem)} className="radius btn-home button_responsive buttonPatient appColor">
                                Book Appointment
                            </Button>
                        </div> */}
                        {/* <div className=" mt-2 col-md-6 " >
                            <Button onClick={() => handleDependent()} className="radius btn-home button_responsive buttonPatient appColor">
                                Add Dependent
                            </Button>
                        </div> */}
                    </div>
                </div>
                {/* <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-bgcolor">You want to book this slot. </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="default" className='appColor' onClick={() => handleSelectedSlot(slotItem)}>
                            Yes
                        </Button>
                        <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </div>
        </div>
    )
}
export { PatientInformationData }