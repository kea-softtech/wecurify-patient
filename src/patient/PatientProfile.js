import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TabPanel } from "../common/tabpanel";
import { PatientPersonalInformation } from "../patient/patientPersonalInformation";
import { MainNav } from "../mainComponent/mainNav";
import { MainTabs } from "../mainComponent/mainTabs";
import { Wrapper } from "../mainComponent/Wrapper";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import { FetchPatientLifestyleData } from "./fetchPatientLifestyleData";
import { FetchPatientMedicalInfo } from "./fetchPatientMedicalInfo";
import PatientApi from "../services/PatientApi";

export default function PatientProfile() {
  const { patientId } = useParams();
  const [getDoctorId, setGetDoctorId] = useRecoilState(setDoctorId)
  const [value, setValue] = useState(0);
  const [patientName, setPatientName] = useState([])
  const { fetchPatient } = PatientApi()

  useEffect(() => {
    patientData()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const doctorId = getDoctorId;

  const goToMedical = () => {
    setValue(1)
  }
  const goToLifestyle = () => {
    setValue(2)
  }

  const patientData = () => {
    fetchPatient({ patientId })
      .then((res) => {
        setPatientName(res[0].name)
      })
  }
  return (
    <>
      <Wrapper>
        <MainNav>
          <div className="clearfix row">
            <div className="width50">
              <Link to={`/`}>
                <i className="arrow_back backArrow" title="back button"></i>
              </Link>
              <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Personal Information</span>
            </div>
            <div className="width50 row justifyContent">
              <div className="appColor normal-font">Patient - {patientName}</div>
            </div>
          </div>
        </MainNav>

        <div className="row">  
          <div className="full-width">
            <div className="common_box">
              <div className="white-box">
                <MainTabs
                  value={value}
                  onChange={handleChange}
                  label="Personal"
                  label1="Medical "
                  label2="Lifestyle">
                </MainTabs>

                <TabPanel value={value} index={0}>
                  <PatientPersonalInformation personal={goToMedical} patientId={patientId} />
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <FetchPatientMedicalInfo Medical={goToLifestyle} patientId={patientId} />
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <FetchPatientLifestyleData patientId={patientId} />
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
