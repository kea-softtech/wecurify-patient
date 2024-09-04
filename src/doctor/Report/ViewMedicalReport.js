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

export default function ViewMedicalReport() {
    const { reportId } = useParams();
    const { getMedicineReport } = ReportApi();
    const { fetchPatient } = PatientApi();
    const [viewData, setViewData] = useState([]);
    const [patientData, setPatientData] = useRecoilState(setNewPatientId);
    const [patientDetails, setPatientDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                    fetchPatient({ patientId })
                        .then((response) => {
                            setPatientDetails(response[0])
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
                                <h6 align="left" className='ml-2 font_weight'>Patient Information</h6>
                                <div className="row viewMreport">
                                    <div className="col-md-6 mb-2 " align='left' >
                                        <div><span className="font_weight">Patient Name :</span>{patientDetails.name}</div>
                                        <div><span className="font_weight">Email :</span>{patientDetails.email}</div>
                                        <div><span className="font_weight">Gender :</span>{patientDetails.gender}</div>
                                        <div><span className="font_weight">Age :</span>{patientDetails.age}</div>
                                        <div><span className="font_weight">Mobile no :</span>{patientDetails.mobile}</div>
                                    </div>
                                    <div className="col-md-6 " align='left'>
                                        {viewData.BMI ?
                                            <div >
                                                <span className="font_weight">BMI :</span>
                                                <span>{viewData.BMI}</span>
                                            </div>
                                            : null
                                        }

                                        {viewData.bp ?
                                            <div>
                                                <span className="font_weight"> Bp :</span>
                                                <span>{viewData.bp}</span>
                                            </div>
                                            :
                                            null
                                        }
                                        {viewData.height ?
                                            <div >
                                                <span className="font_weight">Height :</span>
                                                <span>{viewData.height}</span>
                                            </div>
                                            : null
                                        }
                                        {viewData.weight ?
                                            <div>
                                                <span className="font_weight">Weight :</span>
                                                <span>{viewData.weight}</span>
                                            </div>
                                            : null
                                        }

                                        {
                                            viewData.pulse ?
                                                <div>
                                                    <span className="font_weight">Pulse :</span>
                                                    <span>{viewData.pulse}</span>

                                                </div>
                                                : null
                                        }

                                        {
                                            viewData.temp ?
                                                <div>
                                                    <span>Temprature :</span>
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                <GetMedicinePriscription reportId={reportId} />

                                <GetLabPrescription reportId={reportId} />

                                <GetSymptomsData reportId={reportId} />

                                <GetDentalServices reportId={reportId} />

                                {viewData.investigation_note ?
                                    <div align="left" className='margin_top_15'>
                                        <span className='viewMreport font_weight'>Investigation :</span>
                                        <span>{viewData.investigation_note}</span>
                                    </div>
                                    : null
                                }

                                {viewData.premedication_note ?
                                    <div align="left " className='viewMreport'>
                                        <span className="font_weight" >Premedication :</span>
                                        <span>{viewData.premedication_note}</span>
                                    </div>
                                    : null
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Wrapper >
    )
}