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
import Inprogress from "./patientHistory/Inprogress";

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
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}> Appointments</span>
                    </div>
                </div>
            </MainNav>
            <div className="wraper row">
                <div className="full-width">
                    <div className="common_box">
                        <MainTabs
                            value={value}
                            onChange={handleChange}
                            label="Ongoing"
                            label1="Completed"
                            label2="Cancelled"
                            label3="Incomplete"
                            label4="Inprogress">
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

                        <TabPanel value={value} index={4}>
                            <Inprogress patientId={patientId} />
                        </TabPanel>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
