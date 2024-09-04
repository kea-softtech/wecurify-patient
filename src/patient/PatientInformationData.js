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
                if (response[0]) {
                    setFetchPatientData(response[0])
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            })
    }

    return (
        <div className="mt-3">
            <div className="box_general_4 col-md-8">
                <div className="patientDataStyle">
                    <div>
                        <label className=" font_weight mx-2 fontS col-md-6" >
                           {fetchPatientData.name} 
                        </label>
                    </div>
                    <div className="row">
                        <label className="font_weight mx-2 col-md-6">
                           Emergency contact 
                        </label>
                        <span className="col-md-4">
                            {fetchPatientData.emcontact ? fetchPatientData.emcontact : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight mx-2 col-md-6">
                           Email 
                        </label>
                        <span className="col-md-4">
                            {fetchPatientData.email ? fetchPatientData.email : "--"}
                        </span>
                    </div>
                    <div className="row ">
                        <label className="font_weight mx-2 col-md-6">
                           Bloodgroup 
                        </label>
                        <span className="col-md-4">
                            {fetchPatientData.bloodgroup ? fetchPatientData.bloodgroup : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight mx-2 col-md-6">
                            Height 
                        </label>
                        <span className="col-md-4">
                            {fetchPatientData.height ? fetchPatientData.height : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight mx-2 col-md-6">
                            Weight 
                        </label>
                        <span className="col-md-4">
                            {fetchPatientData.weight ? fetchPatientData.weight : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight mx-2 col-md-6">
                            Address 
                        </label>
                        <span className="col-md-4">
                            {fetchPatientData.address ? fetchPatientData.address : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight mx-2 col-md-6">
                            Marital Status 
                        </label>
                        <span className="col-md-4">
                            {fetchPatientData.maritalstatus ? fetchPatientData.maritalstatus : "--"}
                        </span>
                    </div>
                    <div className="row">
                        <label className="font_weight mx-2 col-md-6">
                           Gender
                        </label>
                        <span className="col-md-4">
                            {fetchPatientData.gender ? fetchPatientData.gender : "--"}
                        </span>

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