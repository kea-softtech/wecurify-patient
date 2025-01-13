import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GetMedicinePriscription from './partial/GetMedicinePrescription';
import GetLabPrescription from './partial/getLabPrescription';
import GetSymptomsData from './partial/GetSymptomsData';
import PatientApi from '../../services/PatientApi';
import ReportApi from '../../services/ReportApi';
import { Wrapper } from '../../mainComponent/Wrapper';
import { MainNav } from '../../mainComponent/mainNav';
import { useRecoilState } from 'recoil';
import GetDentalServices from './partial/getdentalservices';
import { setNewPatientId } from '../../recoil/atom/setNewPatientId';
import Loader from '../../patient/patientHistory/Loader';
import wecurifyLogo from '../../img/small_wecurify.png'
import AuthApi from '../../services/AuthApi';
import ClinicApi from '../../services/ClinicApi';

export default function ViewMedicalReport() {
    const { reportId } = useParams();
    const { getMedicineReport } = ReportApi();
    const { fetchPatient } = PatientApi();
    const { getDrInfo } = AuthApi();
    const { getClinic } = ClinicApi();
    const [viewData, setViewData] = useState([]);
    const [patientData, setPatientData] = useRecoilState(setNewPatientId);
    const [patientDetails, setPatientDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [doctorDetails, setDoctorDetails] = useState([]);
    const [clinicDetails, setClinicDetails] = useState([]);

    useEffect(() => {
        getMedicineReportData()
    }, [])

    setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    const getMedicineReportData = () => {
        getMedicineReport({ reportId })
            .then((res) => {
                if (res[0]) {
                    setViewData(res[0])
                    const patientId = res[0].patientId
                    const doctorId = res[0].doctorId;
                    const clinicId = res[0].clinicId
                    fetchPatient({ patientId })
                        .then((response) => {
                            setPatientDetails(response[0])
                        })
                    getDrInfo({ doctorId })
                        .then((result) => {
                            setDoctorDetails(result.result[0]);
                        })
                    getClinic({ clinicId })
                        .then((result) => {
                            setClinicDetails(result);
                        })
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }

            })
    }

    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link to={`/patientappointment/${patientData}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>
                            Prescription
                        </span>
                    </div>

                </div>
            </MainNav>
            <div className="row wraper">
                <div className="full-width ">
                    <div className="common_box  p-2">
                        {isLoading ?
                            <div className='loader-container'>
                                <Loader />
                            </div>
                            :
                            <div className="white-box" >
                                <div id="logo_home" align='center' className="mb-2">
                                    <img className='appLogo' src={wecurifyLogo} alt="Something Went Wrong" />
                                </div>

                                <div className="p-5 bottom-Border" >
                                    <div className="row bottom-Border">
                                        {clinicDetails ?
                                            <div className="row width_60">
                                                <div className="pl-2" align="left">
                                                    {clinicDetails.clinicName ? <div><span className="patientModal">Clinic Name -</span> {clinicDetails.clinicName}</div> : null}
                                                    {clinicDetails.address ? <div><span className="patientModal">Address -</span> {clinicDetails.address}</div> : null}
                                                </div>
                                            </div>
                                            : null}
                                        {doctorDetails ?
                                            <div className="pl-2 width_40" align="left">
                                                {doctorDetails.name ? <div><span className="patientModal">Dr. {doctorDetails.name}</span></div> : null}
                                                {doctorDetails.address ? <div> <span className="patientModal">Address -</span> {doctorDetails.address}</div> : null}
                                                {doctorDetails.mobile ? <div><span className="patientModal">Mobile -</span> {doctorDetails.mobile}</div> : null}
                                            </div>
                                            : null}
                                    </div>
                                    <div className="row mt-4">
                                        {patientDetails ?
                                            <div className="pl-2 width_60" align="left">
                                                {patientDetails.name ? <div><span className="patientModal">Patient Name -</span> {patientDetails.name}</div> : null}
                                                {patientDetails.email ? <div><span className="patientModal">Email -</span> {patientDetails.email}</div> : null}
                                                {patientDetails.gender ? <div><span className="patientModal">Gender -</span> {patientDetails.gender}</div> : null}
                                                {patientDetails.age ? <div><span className="patientModal">Age -</span> {patientDetails.age}</div> : null}
                                            </div>
                                            : null}
                                        {viewData ?
                                            <div className="pl-2 width_40" align="left">
                                                {viewData.height ? <div><span className="patientModal">Height-</span> {viewData.height}</div> : null}
                                                {viewData.weight ? <div><span className="patientModal">Weight- </span> {viewData.weight}</div> : null}
                                                {viewData.BMI ? <div><span className="patientModal">BMI- </span> {viewData.BMI}</div> : null}
                                                {viewData.bp ? <div><span className="patientModal">BP- </span> {viewData.bp}</div> : null}
                                                {viewData.pulse ? <div><span className="patientModal">Pulse- </span> {viewData.pulse}</div> : null}
                                                {viewData.BMI ? <div><span className="patientModal">Temprature- </span> {viewData.BMI}</div> : null}
                                                {viewData.temp ? <div><span className="patientModal">BMI- </span> {viewData.temp}</div> : null}
                                            </div>
                                            : null}
                                    </div>

                                    <GetMedicinePriscription reportId={reportId} />

                                    <GetLabPrescription reportId={reportId} />

                                    <GetSymptomsData reportId={reportId} />

                                    <GetDentalServices reportId={reportId} />

                                    {viewData && viewData.investigation_note ?
                                        <div align="left" className='margin_top_15'>
                                            <h6 className='patientModal'>Investigation</h6>
                                            <span>{viewData.investigation_note}</span>
                                        </div>
                                        : null
                                    }

                                    {viewData && viewData.premedication_note ?
                                        <div className='margin_top_15' align="left">
                                            <h6 className='patientModal'>Premedication</h6>
                                            <span>{viewData.premedication_note}</span>
                                        </div>
                                        : null
                                    }

                                    {viewData && viewData.new_follow_up ?
                                        <div className='margin_top_15' align="left">
                                            <h6 className='patientModal'>Next follow up</h6>
                                            <span>{viewData.new_follow_up}</span>
                                        </div>
                                        : null
                                    }
                                </div>
                                <div className="row m-4">
                                    <div className="width50" align="left">
                                        <div><span className="patientModal">Thanks & Regards</span></div>
                                        <div>Dr. {doctorDetails.name}</div>
                                    </div>
                                    <div className="width50" align="right">
                                        <div>manage by <img className='smallLogo' src={wecurifyLogo} alt="Something Went Wrong" /></div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Wrapper >
    )
}