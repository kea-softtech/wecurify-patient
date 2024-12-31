import React, { useEffect, useState } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import { Link, useLocation, useParams } from "react-router-dom";
import { Box, Center, Flex, HStack, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, Text, useSteps, Wrap, WrapItem } from "@chakra-ui/react";
import PatientApi from "../../services/PatientApi";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../../recoil/atom/setDoctorId";
import QueueItem from "../../mainComponent/QueueItem";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import { Diversity1 } from "@mui/icons-material";

export default function PatientQueue() {
    const { clinicId } = useParams();
    const { fetchSessionSlotsData } = PatientApi();
    const [doctorId] = useRecoilState(setDoctorId)
    const [patientId] = useRecoilState(setNewPatientId)
    const [selectedSlots, setSelectedSlots] = useState([]);
    const { state } = useLocation();
    const { activeStep } = useSteps({
        index: 1,
        count: selectedSlots.length,
    })


    useEffect(() => {
        selectedSlot()
    }, []);

    const selectedSlot = () => {
        fetchSessionSlotsData({ doctorId, clinicId })
            .then(response => {
                if (response) {
                    const data = response.filter(item => {
                        if (item.day === state.day) {
                            setSelectedSlots(item.showSelectedSlots)
                        }
                        return item
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
                        <Link to={`/patientappointment/${patientId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}> Patient Queue</span>
                    </div>
                </div>
            </MainNav>
            <div className="wraper row">
                <div className="full-width">
                    <div className="common_box">
                        {/* <HStack> */}
                            <Wrap className="mt-2" justify='center'>
                                {selectedSlots.map((item, index) => (
                                    < QueueItem
                                        key={index}
                                        position={index + 1}
                                        selectedData={state.slotTime}
                                        item={item.time} />
                                ))}
                            </Wrap>
                        {/* </HStack> */}
                    </div>
                </div>
            </div>
            {/* <div className="stepper">
                {selectedSlots.map((step, index) => {
                    return (
                        <div key={index}>
                            <div className="">{index + 1}</div>
                            <div>  <Text fontSize='x-large' fontWeight="bold">
                                <Center w='60px' h='20px' >
                                    &#8594;
                                </Center>
                            </Text></div>
                            <div className="step-number">{step.time}</div>

                        </div>
                    )
                })}
            </div> */}

        </Wrapper >
    )
}
