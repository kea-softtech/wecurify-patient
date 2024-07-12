import { Route, Routes } from "react-router-dom";
import DoctorProfile from "./doctor/Profile/DoctorProfile";
import PatientMedicalReport from "./doctor/Report/PatientMedicalReport";
import User from "./user";
import ViewMedicalReport from './doctor/Report/ViewMedicalReport';
import Logout from "./doctor/Profile/LogoutForm";
import DoctorList from "./doctor/Dashboard-card/doctorList";
import LoginPatient from "./patient/LoginPatient";
import GetLoginPatientProfile from "./patient/getLoginPatientProfile";
import CreatePatientProfile from "./patient/createPatientProfile";
import DoctorBookingWithPatientLogin from "./patient/DoctorBookingWithPatientLogin";
import SlotConfirmation from "./patient/SlotConfirmation";
import { setloggedIn } from "./recoil/atom/setloggedIn";
import { useRecoilState } from "recoil";
import Clinic from "./Clinic/Clinic";
import Home from "./homepage/Home";
import PatientProfile from "./patient/PatientProfile";
import PatientHistory from "./patient/patientHistory";
import { AppointmentBookingSection } from "./patient/appointmentBookingSection";
import ClinicInto from "./doctor/Profile/Appointment/ClinicInfo";
import Calender from "./doctor/Dashboard-card/Calender";
import PatientQueue from "./patient/patientHistory/PatientQueue";
import AddDependent from "./patient/AddDependent";
import {FetchDoctorPersonalDetails} from './doctor/Profile/Personal/Partial/fetchDoctorPersonalDetails'
import CreatePatientMpin from "./patient/patientMpin/CreatePatientMpin";
import ForgotPatientMpin from "./patient/patientMpin/ForgotPatientMpin";

function MainContainer() {
  const [loggedIn] = useRecoilState(setloggedIn);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/patient" element={<LoginPatient />} />
      <Route path="/createpatientmpin" element={<CreatePatientMpin /> } />
      <Route path="/forgetpatientmpin" element={<ForgotPatientMpin /> } />
      <Route path="/createprofile/:patientId" element={<CreatePatientProfile />} />
      <Route path="/patientprofile/:patientId" element={<GetLoginPatientProfile />} />
      <Route path="/confirm" element={<SlotConfirmation />} />
      <Route path="/doctors" element={<DoctorList />} />
      <Route path="/booking/:doctorId" element={<AppointmentBookingSection />} />
      <Route path="/profile/:doctorId" element={<FetchDoctorPersonalDetails/>} />
      <Route path="/clinicinfo/:clinicId" element={<ClinicInto />} />
      <Route path="/calender/:patientId" element={<Calender />} />
      <Route path="/patientqueue/:patientId" element={<PatientQueue />} />
      <Route path="/adddependent/:patientId" element={<AddDependent />} />
      <Route path="report/:reportId" element={<ViewMedicalReport />} />

      {/* <Route path="appointment/:doctorId" >
        <Route index element={<PatientAppointment />} />
      </Route> */}
        <Route path="consultation/:reportId" element={<PatientMedicalReport />} />

      <Route path="/patientappointment/:patientId" element={loggedIn ? <PatientHistory /> : null} />
      <Route path="/patientinfo/:patientId" element={loggedIn ? <PatientProfile /> : null} />

      <Route path="/clinic" element={<Clinic />} />

      <Route path="/doctorbookingwithpatientlogin/:doctorId" element={<DoctorBookingWithPatientLogin />} />

      <Route path="/user" element={<User />} />

      <Route path="/logout" element={< Logout />} />

    </Routes >
  )
}
export default MainContainer;