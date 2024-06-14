import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import PatientPersonalInfo from './partial/PatientPersonalInfo';
import Investigation from './partial/Investigation'
import Premedication from './partial/Premedication'
import MedicinePrescription from './partial/MedicinePrescription';
import NewFollowup from './partial/NewFollowup';
import Symptoms from './partial/Symptoms';
import LabPrescription from './partial/LabPrescription';
import { MainNav } from '../../mainComponent/mainNav';
import AuthApi from '../../services/AuthApi';
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from '../Dashboard-card/partial/uselinks';
import { useRecoilState } from "recoil";
import { setDoctorId } from '../../recoil/atom/setDoctorId';

function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div>
            {value === index && (
                <Box div={5}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


export default function PatientMedicalReport() {
    const { reportId } = useParams();
    const { getDrInfo } = AuthApi()
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId);
    const [DoctorName, setDoctorsName] = useState([])
    const [value, setValue] = useState(0);
    const { state } = useLocation()
    const fees = state.fees

    useEffect(() => {
        doctorInfo()
    }, [])

    const handleChange = (e, newValue) => {
        e.preventDefault();
        setValue(newValue);
    };

    function changeTab(tabIndex) {
        setValue(tabIndex);
    }

    const doctorInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorsName(res.result[0].name)
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
                            Consultation
                        </span>
                    </div>
                    <div className="width50 row justifyContent">
                        <span style={{ fontSize: 'inherit' }} className="appColor" align='right'>Dr. {DoctorName}</span>
                    </div>
                </div>
            </MainNav>
            <div className='row'>
                <div className="width84">
                    <div className="common_box">
                        <div className="white-box">
                            <Paper square> 
                                <Tabs variant="scrollable" value={value} onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    className="mb-2">
                                    <Tab label="General Info" />
                                    <Tab label="Symptoms" />
                                    <Tab label="Investigation" />
                                    <Tab label="Premedication" />
                                    <Tab label="Medicine-Prescription" />
                                    <Tab label="Lab-Prescription" />
                                    <Tab label="New follow-up" />
                                </Tabs>
                            </Paper>
                            <div>
                                <TabPanel value={value} index={0}>
                                    <PatientPersonalInfo
                                        reportId={reportId}
                                        onChange={() => changeTab(1)}
                                    />
                                </TabPanel>
                                
                                <TabPanel value={value} index={1}>
                                    <Symptoms
                                        reportId={reportId}
                                        onChange={() => changeTab(2)}
                                    />
                                </TabPanel>

                                <TabPanel value={value} index={2}>
                                    <Investigation
                                        reportId={reportId}
                                        onChange={() => changeTab(3)}
                                    />
                                </TabPanel>

                                <TabPanel value={value} index={3}>
                                    <Premedication
                                        reportId={reportId}
                                        onChange={() => changeTab(4)}
                                    />
                                </TabPanel>

                                <TabPanel value={value} index={4}>
                                    <MedicinePrescription
                                        reportId={reportId}
                                        onChange={() => changeTab(5)}
                                    />
                                </TabPanel>

                                <TabPanel value={value} index={5}>
                                    <LabPrescription
                                        reportId={reportId}
                                        onChange={() => changeTab(6)}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={6}>
                                    <NewFollowup
                                        fees={fees}
                                        reportId={reportId}
                                        onChange={() => changeTab(7)}
                                    />
                                </TabPanel >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Wrapper >
    )
}