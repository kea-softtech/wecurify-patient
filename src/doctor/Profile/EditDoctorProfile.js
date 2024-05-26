import React, { useEffect } from 'react';
import { TabPanel } from "../../common/tabpanel";
import { useState } from "react";
import { DoctorProfessionalExperience } from "./Experience/doctorProfessionalExperience"
import { DoctorEducation } from "./Education/doctorEducation";
import { DoctorPersonalInformation } from "./Personal/DoctorPersonalInformation";
import { MainNav } from '../../mainComponent/mainNav';
import { MainTabs } from '../../mainComponent/mainTabs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from '../Dashboard-card/partial/uselinks';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import AuthApi from '../../services/AuthApi';
import { MainButtonInput } from '../../mainComponent/mainButtonInput';
import { AddDoctorClinicInfo } from './Clinic/Partial/AddDoctorClinicInfo';

export default function EditDoctorProfile() {
    const { getDrInfo } = AuthApi()
    const { doctorId } = useParams();
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    //for using tab
    const [tabValue, setTabValue] = useState(0);
    const [DoctorName, setDoctorsName] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        doctorInfo()
    }, [])
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const goToEducation = () => {
        setTabValue(1)
    }
    const goToExperience = () => {
        setTabValue(2)
    }
    const goToClinic = () => {
        setTabValue(3)
    }

    const doctorInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorsName(res.result[0].name)
            })
    }

    const DoneClick = () => {
        navigate(`/doctors`)
    }
    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link to={`/doctors/profile/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span to="#section_1" className="active ml-2">
                            Doctor Information
                        </span>
                    </div>
                    <div className="width50 row justifyContent">
                        <div className="appColor normal-font" align='right'>Dr. {DoctorName}</div>
                    </div>
                </div>
            </MainNav>
            <div className='row'>
                <div className="width16">
                    <div className="dash row">
                        <UserLinks
                            doctorId={doctorId}
                            helperId={helpersData._id}
                            accessModule={helpersData.access_module}
                        />
                    </div>
                </div>
                <div className="width84">
                    <div className="common_box">
                        <div className="white-box pb-5 ">
                            <div align='right'>
                                <div className="text-right add_top_30">
                                    <MainButtonInput onClick={DoneClick}>Done</MainButtonInput>
                                </div>
                            </div>
                            <MainTabs
                                value={tabValue}
                                onChange={handleChange}
                                label="Personal Information"
                                label1="Educational Details"
                                label2="Professional Experience"
                                label3="Clinic"

                            >
                            </MainTabs>

                            <TabPanel value={tabValue} index={0}>
                                <DoctorPersonalInformation
                                    data={goToEducation}
                                    doctorId={doctorId}
                                />
                            </TabPanel>

                            <TabPanel value={tabValue} index={1}>
                                <DoctorEducation
                                    data={goToExperience}
                                    doctorId={doctorId}
                                />
                            </TabPanel>

                            <TabPanel value={tabValue} index={2}>
                                <DoctorProfessionalExperience
                                    data={goToClinic}
                                    doctorId={doctorId}
                                />
                            </TabPanel>

                            <TabPanel value={tabValue} index={3}>
                                <AddDoctorClinicInfo
                                    doctorId={doctorId} />
                            </TabPanel>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}