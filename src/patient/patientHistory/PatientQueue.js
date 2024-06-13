import React, { useEffect, useState } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import { Link, useParams } from "react-router-dom";
import {
    Box, Flex,
    Step, StepDescription,
    StepIcon, StepIndicator,
    StepNumber, StepSeparator,
    StepStatus, StepTitle,
    Stepper, Text,
    useSteps
} from "@chakra-ui/react";
import PatientApi from "../../services/PatientApi";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../../recoil/atom/setDoctorId";

export default function PatientQueue() {
    const { patientId } = useParams();
    const { fetchSessionSlotsData, getpaymentData } = PatientApi();
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const [clinicId, setClinicId] = useState('')
    const [selectedSlots, setSelectedSlots] = useState([])

    // useEffect(() => {
    //     getpaymentData({ patientId })
    //         .then((result) => {
    //             result['test'].map((item) => {
    //                 setDoctorsId(item.doctorId)
    //                 setClinicId(item.clinicId)
    //             })
    //         })
    //     selectedSlot()
    // }, [])

    // const selectedSlot = () => {
    //     fetchSessionSlotsData({ doctorId }, clinicId)
    //         .then((response) => {
    //             console.log('=======response', response)
    //             response.map((item) => {
    //                 setSelectedSlots(item.showSelectedSlots)
    //                 return item
    //             })
    //         })
    // }

    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link to={`/`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}> Patient Queue</span>
                    </div>
                    {/* <div className="width50 row justifyContent">
                        <div className="appColor normal-font" align='right'>Patient - {patientName}</div>
                    </div> */}
                </div>
            </MainNav>
            <Flex direction="column" align="center">
                <Stepper size='lg' colorScheme='red' orientation="horizontal">
                    {selectedSlots.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                                />
                            </StepIndicator>
                            <Box >
                                <StepTitle>{step.time}</StepTitle>
                                {/* <StepDescription>{step.description}</StepDescription> */}
                            </Box>
                            {/* <StepSeparator /> */}
                        </Step>
                    ))}
                </Stepper>
            </Flex>
        </Wrapper >
    )
}
