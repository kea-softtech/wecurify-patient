import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { TabPanel } from "../common/tabpanel";
import { PatientPersonalInformation } from "../patient/patientPersonalInformation";
import { MainNav } from "../mainComponent/mainNav";
import { MainTabs } from "../mainComponent/mainTabs";
import { Wrapper } from "../mainComponent/Wrapper";
import { FetchPatientLifestyleData } from "./fetchPatientLifestyleData";
import { FetchPatientMedicalInfo } from "./fetchPatientMedicalInfo";
import PatientApi from "../services/PatientApi";
import DependentList from "./DependentList";

export default function PatientProfile() {
  const { patientId } = useParams();
  const [value, setValue] = useState(0);
  const [patientName, setPatientName] = useState([])
  const { fetchPatient } = PatientApi()
  const navigate = useNavigate();
  useEffect(() => {
    patientData()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const goBack = () => {
    navigate(-1)
  }

  return (
    <>
      <Wrapper>
        <MainNav>
          <div className="clearfix row">
            <div className="getDependent col-md-7">
              <Link onClick={goBack}>
                <i className="arrow_back backArrow" title="back button"></i>
              </Link>
              <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Edit Information</span>
            </div>
            <div className="getDependent col-md-5 justifyContent" align='right'>
              <Link to={`/fetchpatientprofile/${patientId}`} className="whiteColor">
                Done
              </Link>
            </div>
          </div>
        </MainNav>

        <div className="wraper row">
          <div className="full-width">
            <div className="">
              <div className="white-box">
                <MainTabs
                  value={value}
                  onChange={handleChange}
                  label="Personal"
                  label1="Medical "
                  label2="Lifestyle"
                  label3="Dependent ">
                </MainTabs>

                <TabPanel value={value} index={0}>
                  <PatientPersonalInformation
                    personal={goToMedical}
                    patientId={patientId}
                  />
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <FetchPatientMedicalInfo
                    Medical={goToLifestyle}
                    patientId={patientId}
                  />
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <FetchPatientLifestyleData
                    patientId={patientId}
                  />
                </TabPanel>

                <TabPanel value={value} index={3}>
                  <DependentList
                    patientId={patientId}
                  />
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
