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
    const { patientDetailsData } = PatientApi();
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
                    patientDetailsData({ patientId })
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
                                <h6 align="left" className='ml-2'><b>Patient Information</b></h6>
                                <div className="row viewMreport">
                                    <div className="col-md-6 mb-2 " align='left' >
                                        <div><b>Patient Name :</b>{patientDetails.name}</div>
                                        <div><b>Email :</b>{patientDetails.email}</div>
                                        <div><b>Gender :</b>{patientDetails.gender}</div>
                                        <div><b>Age :</b>{patientDetails.age}</div>
                                        <div><b>Mobile no :</b>{patientDetails.mobile}</div>
                                    </div>
                                    <div className="col-md-6 " align='left'>
                                        {viewData.BMI ?
                                            <div >
                                                <b>BMI :</b>
                                                <span>{viewData.BMI}</span>
                                            </div>
                                            : null
                                        }

                                        {viewData.bp ?
                                            <div>
                                                <b> Bp :</b>
                                                <span>{viewData.bp}</span>
                                            </div>
                                            :
                                            null
                                        }
                                        {viewData.height ?
                                            <div >
                                                <b>Height :</b>
                                                <span>{viewData.height}</span>

                                            </div>
                                            : null
                                        }
                                        {viewData.weight ?
                                            <div>
                                                <b>Weight :</b>
                                                <span>{viewData.weight}</span>
                                            </div>
                                            : null
                                        }

                                        {
                                            viewData.pulse ?
                                                <div>
                                                    <b>Pulse :</b>
                                                    <span>{viewData.pulse}</span>

                                                </div>
                                                : null
                                        }

                                        {
                                            viewData.temp ?
                                                <div>
                                                    <b>Temprature :</b>
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
                                        <b className='viewMreport'>Investigation :</b>
                                        <span>{viewData.investigation_note}</span>
                                    </div>
                                    : null
                                }

                                {viewData.premedication_note ?
                                    <div align="left " className='viewMreport'>
                                        <b >Premedication :</b>
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