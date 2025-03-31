import { Route, Routes } from "react-router-dom";
import PatientMedicalReport from "./doctor/Report/PatientMedicalReport";
import User from "./user";
import ViewMedicalReport from './doctor/Report/ViewMedicalReport';
import Logout from "./doctor/Profile/LogoutForm";
import DoctorList from "./doctor/Dashboard-card/doctorList";
import GetLoginPatientProfile from "./patient/getLoginPatientProfile";
import CreatePatientProfile from "./patient/createPatientProfile";
import DoctorBookingWithPatientLogin from "./patient/DoctorBookingWithPatientLogin";
import SlotConfirmation from "./patient/SlotConfirmation";
import Clinic from "./Clinic/Clinic";
import Home from "./homepage/Home";
import PatientProfile from "./patient/PatientProfile";
import PatientHistory from "./patient/patientHistory";
import { AppointmentBookingSection } from "./patient/appointmentBookingSection";
import ClinicInto from "./doctor/Profile/Appointment/ClinicInfo";
import Calender from "./doctor/Dashboard-card/Calender";
import PatientQueue from "./patient/patientHistory/PatientQueue";
import AddDependent from "./patient/AddDependent";
import { FetchDoctorPersonalDetails } from './doctor/Profile/Personal/Partial/fetchDoctorPersonalDetails'
import ForgotPatientMpin from "./patient/patientMpin/ForgotPatientMpin";
import FetchPatientProfile from "./patient/FetchPatientProfile";
import CreatePatientLogin from "./patient/patientMpin/CreatePatientLogin";
import { ClinicList } from "./patient/clinicList";
import TreatmentConsentReport from "./patient/patientHistory/consent";

function MainContainer() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      {/* <Route path="/" element={<PatientMobile/>} /> */}
      <Route path="/createpatientmpin" element={<CreatePatientLogin />} />
      <Route path="/forgetpatientmpin" element={<ForgotPatientMpin />} />
      <Route path="/createprofile/:patientId" element={<CreatePatientProfile />} />
      <Route path="/patientprofile/:patientId" element={<GetLoginPatientProfile />} />
      <Route path="/confirm/:doctorId" element={<SlotConfirmation />} />
      <Route path="/doctors" element={<DoctorList />} />
      <Route path="/booking/:doctorId" element={<ClinicList />} />
      <Route path="/bookAppointment/:doctorId/:clinicId" element={<AppointmentBookingSection />} />
      <Route path="/profile/:doctorId" element={<FetchDoctorPersonalDetails />} />
      <Route path="/clinicinfo/:clinicId" element={<ClinicInto />} />
      <Route path="/calender/:patientId" element={<Calender />} />
      <Route path="/patientqueue/:clinicId" element={<PatientQueue />} />
      <Route path="/adddependent/:patientId" element={<AddDependent />} />
      <Route path="/report/:reportId" element={<ViewMedicalReport />} />
      <Route path="/consent/:appointmentId" element={<TreatmentConsentReport />} />

      {/* <Route path="appointment/:doctorId" >
        <Route index element={<PatientAppointment />} />
      </Route> */}
      <Route path="/consultation/:reportId" element={<PatientMedicalReport />} />

      <Route path="/patientappointment/:patientId" element={<PatientHistory />} />
      <Route path="/patientinfo/:patientId" element={<PatientProfile />} />
      <Route path="/fetchpatientprofile/:patientId" element={<FetchPatientProfile />} />

      <Route path="/clinic" element={<Clinic />} />

      <Route path="/doctorbookingwithpatientlogin/:doctorId" element={<DoctorBookingWithPatientLogin />} />

      <Route path="/user" element={<User />} />

      <Route path="/logout" element={< Logout />} />

    </Routes >
  )
}
export default MainContainer;