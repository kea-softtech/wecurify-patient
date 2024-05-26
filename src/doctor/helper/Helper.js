import React, { useEffect, useState } from 'react';
import AddHelper from './partial/AddHelper';
import HelperList from './partial/helperList';
import { useParams, Link } from 'react-router-dom';
import { MainNav } from '../../mainComponent/mainNav';
import { Icon } from '@mui/material';
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from '../Dashboard-card/partial/uselinks';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import HelperApi from '../../services/HelperApi';

export default function Helper() {
    const [helperList, setHelperList] = useState([]);
    const [active, setActive] = useState(false)
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)

    const { doctorId } = useParams()
    let { getHelper } = HelperApi()

    useEffect(() => {
        getHelperDetails();
    }, [])

    // async function getHelperDetails() {
    //     const result = await getHelper(doctorId);
    //     setHelperList(result)
    // }
    function getHelperDetails() {
        getHelper(doctorId)
            .then((result) => {
                const data = result.filter((helper) => {
                    if (helper.isDeleted === false) {
                        return helper
                    }
                })
                setHelperList(data)
            })

    }

    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <Link to={`/dashboard/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }} >Assistant</span>
                    </div>
                    <div className="width50 row justifyContent">
                        <Link onClick={() => setActive(true)} >
                            <Icon className="addiconbutton " style={{ fontSize: 50 }}>add</Icon>
                        </Link>
                    </div>
                </div>
            </MainNav >
            <div className="row ">
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
                        <>
                            {!active && helperList.length > 0 ?
                                <HelperList doctorId={doctorId} />
                                :
                                <AddHelper doctorId={doctorId} />
                            }
                        </>
                    </div>
                </div>
            </div>
        </Wrapper >
    )
} 