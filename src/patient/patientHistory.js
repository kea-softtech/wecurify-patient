import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TabPanel } from "../common/tabpanel";
import { MainNav } from "../mainComponent/mainNav";
import { MainTabs } from "../mainComponent/mainTabs";
import { Wrapper } from "../mainComponent/Wrapper";
import Ongoing from "./patientHistory/Ongoing";
import Completed from "./patientHistory/Completed";
import Cancelled from "./patientHistory/Cancelled";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import PatientApi from "../services/PatientApi";
import Incomplete from "./patientHistory/Incomplete";

export default function PatientHistory() {
    const { patientId } = useParams();
    const { fetchPatient } = PatientApi()
    const [value, setValue] = useState(0);
    const [patientName, setPatientName] = useState([]);

    useEffect(() => {
        patientData()
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const patientData = () => {
        fetchPatient({ patientId })
            .then((res) => {
                setPatientName(res[0].name)
            })
    }

    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link to={`/`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}> Appoinment</span>
                    </div>
                    <div className="width50 row justifyContent">
                        <div className="appColor normal-font" align='right'>Patient - {patientName}</div>
                    </div>
                </div>
            </MainNav>
            <div className="row">
                <div className="full-width">
                    <div className="common_box">
                        <MainTabs
                            value={value}
                            onChange={handleChange}
                            label="Ongoing Appointment"
                            label1="Completed Appointment"
                            label2="Cancelled Appointment"
                            label3="Incomplete Appointment">
                        </MainTabs>

                        <TabPanel value={value} index={0}>
                            <Ongoing patientId={patientId} />
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <Completed patientId={patientId} />
                        </TabPanel>

                        <TabPanel value={value} index={2}>
                            <Cancelled patientId={patientId} />
                        </TabPanel>

                        <TabPanel value={value} index={3}>
                            <Incomplete patientId={patientId} />
                        </TabPanel>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
