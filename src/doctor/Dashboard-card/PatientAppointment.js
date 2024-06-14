import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { TabPanel } from "../../common/tabpanel";
import { MainNav } from "../../mainComponent/mainNav";
import { MainTabs } from "../../mainComponent/mainTabs";
import { Wrapper } from "../../mainComponent/Wrapper";
import UserLinks from "./partial/uselinks";
import PatientList from "./PatientList";
import PatientsClinicHistory from "./PatientsClinicHistory";
import PatientCancelledApt from "./PatientCancelledApt";
import AuthApi from "../../services/AuthApi";
import PatientIncompleteApt from "./PatientIncompleteApt";

export default function PatientAppointment() {
    const { doctorId } = useParams()
    const { getDrInfo } = AuthApi()
    const [value, setValue] = useState(0);
    const [DoctorName, setDoctorsName] = useState([]);
    
    useEffect(() => {
        doctorInfo()
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        <NavLink to={`/doctors`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </NavLink>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Patient Information</span>
                    </div>
                    <div className="width50 row justifyContent">
                        <div  className="appColor normal-font" align='right'>Dr. {DoctorName}</div>
                    </div>
                </div>
            </MainNav>
            <div className="row">
                <div className="width16">
                    <div className="dash row">
                        <UserLinks doctorId={doctorId} />
                    </div>
                </div>
                <div className="width84">
                    <div className="common_box ">
                        <MainTabs
                            value={value}
                            onChange={handleChange}
                            label="Ongoing Appointment"
                            label1="Completed Appointment"
                            label2="Cancelled Appointment"
                            label3="InComplete Appointment"
                        >
                        </MainTabs>
                        <TabPanel value={value} index={0}>
                            <PatientList doctorId={doctorId} />
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <PatientsClinicHistory doctorId={doctorId} />
                        </TabPanel>

                        <TabPanel value={value} index={2}>
                            <PatientCancelledApt doctorId={doctorId} />
                        </TabPanel>

                        <TabPanel value={value} index={3}>
                            <PatientIncompleteApt doctorId={doctorId} />
                        </TabPanel>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
