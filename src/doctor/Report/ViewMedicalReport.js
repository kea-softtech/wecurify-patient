import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GetMedicinePriscription from './partial/GetMedicinePrescription';
import GetLabPrescription from './partial/getLabPrescription';
import GetSymptomsData from './partial/GetSymptomsData';
import PatientApi from '../../services/PatientApi';
import ReportApi from '../../services/ReportApi';
import { Wrapper } from '../../mainComponent/Wrapper';
import { MainNav } from '../../mainComponent/mainNav';
import UserLinks from '../Dashboard-card/partial/uselinks';
import AuthApi from '../../services/AuthApi';
import { useRecoilState } from 'recoil';
import { setDoctorId } from '../../recoil/atom/setDoctorId';

export default function ViewMedicalReport() {
    const { reportId } = useParams();
    const { getMedicineReport } = ReportApi();
    const { getDrInfo } = AuthApi();
    const { patientDetailsData } = PatientApi();
    const [ viewData, setViewData] = useState([]);
    const [ doctorId, setDoctorsId] = useRecoilState(setDoctorId);
    const [ doctorName, setDoctorName] = useState([]);
    const [ patientDetails, setPatientDetails] = useState([]);

    useEffect(() => {
        getMedicineReportData()
        doctorInfo()
    }, [viewData])

    const getMedicineReportData = () => {
        getMedicineReport({ reportId })
            .then((res) => {
                setViewData(res[0])
                const patientId = res[0].patientId
                patientDetailsData({ patientId })
                    .then((response) => {
                        setPatientDetails(response[0])
                    })
            })
    }

    const doctorInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorName(res.result[0].name)
            })
    }
    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link to={`/doctors/appointment/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>
                            Prescription
                        </span>
                    </div>
                    <div className="width50 row justifyContent">
                        <div className="appColor normal-font" align='right'>Dr. {doctorName}</div>
                    </div>
                </div>
            </MainNav>
            <div className="row">
                <div className="width16">
                    <div className="dash row">
                        <UserLinks />
                    </div>
                </div>
                <div className="width84">
                    <div className="common_box ">
                        <h6 align="left">
                            <b>Patient Information</b>
                        </h6>
                        <div className="white-box" >
                            <div className="row mx-4 viewMreport">
                                <div className="col-md-6 " align='left'>
                                    <div className='mt-3'><b className='viewMreport fontSize '>{patientDetails.name}</b></div>
                                    <div><b className='viewMreport'>Email :</b>{patientDetails.email}</div>
                                    <div><b className='viewMreport'>Gender :</b>{patientDetails.gender}</div>
                                    <div><b className='viewMreport'>Age :</b>{patientDetails.age}</div>
                                    <div><b className='viewMreport'>Mobile no :</b>{patientDetails.mobile}</div>
                                </div>
                                <div className="col-md-6" align='left'>
                                    <h6 className='mt-3'><b>Vital Sign</b></h6>
                                    <div className='vitalSign'>
                                        <div className='mx-1'>
                                            <div >
                                                <b>BMI :</b>
                                                {viewData.BMI ?
                                                    <span>{viewData.BMI}</span>
                                                    :
                                                    <span>{"-"}</span>
                                                }
                                            </div>

                                            <div >
                                                <b> Bp :</b>
                                                {viewData.bp ?
                                                    <span>{viewData.bp}</span>
                                                    :
                                                    <span>{'-'}</span>
                                                }
                                            </div>
                                            <div >
                                                <b>Height :</b>
                                                {viewData.height ?
                                                    <span>{viewData.height}</span>
                                                    :
                                                    <span>{'-'}</span>
                                                }
                                            </div>
                                        </div>
                                        <div className='mx-1'>
                                            <div>
                                                <b>Weight :</b>
                                                {viewData.weight ?
                                                    <span>{viewData.weight}</span>
                                                    :
                                                    <span>{'-'}</span>
                                                }
                                            </div>
                                            <div>
                                                <b>Pulse :</b>
                                                {
                                                    viewData.pulse ?
                                                        <span>{viewData.pulse}</span>
                                                        :
                                                        <span>{'-'}</span>
                                                }
                                            </div>
                                            <div>
                                                <b>Temprature :</b>
                                                {
                                                    viewData.temp ?
                                                        <span>{viewData.temp}</span>
                                                        :
                                                        <span>{'-'}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="white-box viewMreport">
                            <GetMedicinePriscription reportId={reportId} />
                        </div>

                        <div className="white-box viewMreport">
                            <GetLabPrescription reportId={reportId} />
                        </div>

                        <div className="white-box viewMreport">
                            <GetSymptomsData reportId={reportId} />
                        </div>


                        <div className="white-box viewMreport">
                            <div align="left">
                                <b className='viewMreport'>Investigation :</b>
                                {
                                    viewData.investigation_note ?
                                        <span>{viewData.investigation_note}</span>
                                        :
                                        <span>{'-'}</span>
                                }
                            </div>

                            <div align="left">
                                <b className='viewMreport'>Premedication :</b>
                                {viewData.premedication_note ?
                                    <span>{viewData.premedication_note}</span>
                                    :
                                    <span>{'-'}</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper >
    )
}