import { useState, useEffect } from "react";
import Experience from "../../Partial/totalExperience";
import AuthApi from "../../../../services/AuthApi";
import { Link, useNavigate, useParams } from "react-router-dom";
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
    const navigate = useNavigate()

    useEffect(() => {
        getDoctorPersonalDetails();
    }, [])

    const getDoctorPersonalDetails = () => {
        setIsLoading(true);
        getDrInfo({ doctorId })
            .then((result) => {
                setFetchPersonalData(result.result[0]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const goBack = () => {
        navigate(-1)
    }

    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        {patientId ?
                            <Link onClick={goBack}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </Link> :
                            <Link to={`/doctors`}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </Link>}
                        <span to="#section_1" className="active ml-2">
                            Doctor Information
                        </span>
                    </div>
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
                                        <div className="mt-2 col-md-6 text-align-left" >
                                            <h1>Dr. {fetchPersonalData.name}</h1>
                                            <div className="contacts">
                                                <address>
                                                    <div><span className="font_weight">Email  :</span>  {fetchPersonalData.personalEmail}</div>
                                                    <div> <span className="font_weight">Location : </span > {fetchPersonalData.address}</div>
                                                    <span>  <span className="font_weight">Phone :</span > {fetchPersonalData.mobile}</span>
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