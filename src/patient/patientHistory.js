import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TabPanel } from "../common/tabpanel";
import { MainNav } from "../mainComponent/mainNav";
import { MainTabs } from "../mainComponent/mainTabs";
import { Wrapper } from "../mainComponent/Wrapper";
import Ongoing from "./patientHistory/Ongoing";
import Completed from "./patientHistory/Completed";
import Cancelled from "./patientHistory/Cancelled";
import Incomplete from "./patientHistory/Incomplete";

export default function PatientHistory() {
    const { patientId } = useParams();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
