import { useState, useEffect } from "react";
import Experience from "../../Partial/totalExperience";
import AuthApi from "../../../../services/AuthApi";
import { Link, useParams } from "react-router-dom";
import { Wrapper } from "../../../../mainComponent/Wrapper";
import { MainNav } from "../../../../mainComponent/mainNav";
import { useRecoilState } from "recoil";
import { setNewPatientId } from "../../../../recoil/atom/setNewPatientId";
import Loader from "../../../../patient/patientHistory/Loader";

function FetchDoctorPersonalDetails() {
    const { doctorId } = useParams();
    const { getDrInfo } = AuthApi()
    const [fetchPersonalData, setFetchPersonalData] = useState([])
    const [patientId, setPatientId] = useRecoilState(setNewPatientId)
    const [isLoading, setIsLoading] = useState(true);

 
    useEffect(() => {
        getDoctorPersonalDetails();
    }, [])

    setTimeout(() => {
        setIsLoading(false);
    }, 2000);
    
    const getDoctorPersonalDetails = () => {
        getDrInfo({ doctorId })
            .then((result) => {
                setFetchPersonalData(result.result[0]);
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
                        <span to="#section_1" className="active ml-2">
                            Doctor Information
                        </span>
                    </div>
                    {/* <div className="width50 row justifyContent">
                        <div className="appColor normal-font" align='right'>Dr. {DoctorName}</div>
                    </div> */}
                </div>
            </MainNav>
            <>
                {isLoading ?
                    <div className='loader-container'>
                        <Loader />
                    </div>
                    :
                    <>
                        <div className="common_box p-2 wraper">
                            <div className="white-box pb-5 ">
                                <div className="profile"  >
                                    <div className="row" key={fetchPersonalData.id}>
                                        <div className="col-md-6">
                                            <img
                                                src={fetchPersonalData.photo}
                                                alt="doctorProfile"
                                                className='doctorPic borderRadius'
                                            />
                                        </div>
                                        <div className=" col-md-6" align='left' >
                                            <h1>Dr. {fetchPersonalData.name}</h1>
                                            <div className="contacts">
                                                <address>
                                                    <div><b>Email  :</b>  {fetchPersonalData.personalEmail}</div>
                                                    <div> <b>Location : </b> {fetchPersonalData.address}</div>
                                                    <span>  <b>Phone :</b> {fetchPersonalData.mobile}</span>
                                                    {fetchPersonalData["experienceList"] ?
                                                        (
                                                            <Experience experienceData={fetchPersonalData.experienceList}></Experience>
                                                        ) : null
                                                    }

                                                </address>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </>
        </Wrapper>
    )
}
export { FetchDoctorPersonalDetails }