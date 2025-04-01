import React, { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, Box} from '@mui/material';
import { MainNav } from '../../mainComponent/mainNav';
import { Wrapper } from '../../mainComponent/Wrapper';
import { MainTabs } from '../../mainComponent/mainTabs';
import DentalTreatmentPriscription from './consent/dentalTreamentprescription';
import GetMedicinePriscription from '../../doctor/Report/partial/GetMedicinePrescription';

function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div>
            {value === index && (
                <Box div={6}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function TreatmentConsentReport() {
    const {appointmentId, reportId} = useParams()
    console.log("====================", appointmentId, reportId)
    const navigate = useNavigate()
    //for tab
    const [value, setValue] = useState(0);
    const handleChange = (e, newValue) => {
        e.preventDefault();
        setValue(newValue);
    };

    function changeTab(tabIndex) {
        setValue(tabIndex);
    }

    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link to={`/`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}> Consultation</span>
                    </div>
                </div>
            </MainNav>

            <div className="wraper row">
                <div className="full-width">
                    <div className="common_box">
                        <MainTabs
                            value={value}
                            variant='scrollable'
                            onChange={handleChange}
                            label="Treatment"
                            label1="Medicines"
                        >
                        </MainTabs>
                        <div className="tablecontent">
                            <TabPanel value={value} index={0}>
                                <DentalTreatmentPriscription
                                    appointmentId={appointmentId}
                                    onChange={() => changeTab(1)}
                                />
                            </TabPanel>

                            <TabPanel value={value} index={1}>
                                <GetMedicinePriscription
                                    reportId={reportId}
                                    onChange={() => changeTab(2)} 
                                />
                            </TabPanel>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper >
    )
}