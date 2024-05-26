import { Route, Routes } from "react-router-dom";
import DoctorProfile from "./doctor/Profile/DoctorProfile";
import PatientMedicalReport from "./doctor/Report/PatientMedicalReport";
import User from "./user";
import ViewMedicalReport from './doctor/Report/ViewMedicalReport';
import Logout from "./doctor/Profile/LogoutForm";
import Subscription from "./Subscription/Subscription"
import LoginHelper from "./doctor/Profile/LoginHelper";
import Helper from "./doctor/helper/Helper";
import EditHelper from './doctor/helper/EditHelper';
import DoctorList from "./doctor/Dashboard-card/doctorList";
import LoginPatient from "./patient/LoginPatient";
import GetLoginPatientProfile from "./patient/getLoginPatientProfile";
import CreatePatientProfile from "./patient/createPatientProfile";
import DoctorBookingWithPatientLogin from "./patient/DoctorBookingWithPatientLogin";
import PatientAppointment from "./doctor/Dashboard-card/PatientAppointment";
import SlotConfirmation from "./patient/SlotConfirmation";
import SubscriptionNewDr from "./Subscription/SubscriptionNewDr";
import { setloggedIn } from "./recoil/atom/setloggedIn";
import { useRecoilState } from "recoil";
import Clinic from "./Clinic/Clinic";
import Home from "./homepage/Home";
import PatientProfile from "./patient/PatientProfile";
import PatientHistory from "./patient/patientHistory";
import { AppointmentBookingSection } from "./patient/appointmentBookingSection";

function MainContainer() {
  const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/patient" element={<LoginPatient />} />
      <Route path="/createprofile/:patientId" element={<CreatePatientProfile />} />
      <Route path="/patientprofile/:patientId" element={<GetLoginPatientProfile />} />
      <Route path="/confirm/:patientAppointmentId" element={<SlotConfirmation />} />
      <Route path="/doctors" element={<DoctorList />} />
      <Route path="/booking/:doctorId" element={<AppointmentBookingSection />} />
      <Route path="/profile/:doctorId" element={<DoctorProfile />} />

      <Route path="appointment/:doctorId" >
        <Route index element={<PatientAppointment />} />
        <Route path="consultation/:reportId" element={<PatientMedicalReport />} />
        <Route path="report/:reportId" element={<ViewMedicalReport />} />
      </Route>


      {/*
          <Route index  />
          <Route path="createprofile/:patientId"  >
            <Route index element={<CreatePatientProfile />} />
            <Route path="patientprofile">
              <Route index element={<GetLoginPatientProfile />} />
              <Route path="confirm/:patientAppointmentId" element={<SlotConfirmation />} />
            </Route>
          </Route>
        </Route> */}
      {/* </Route> */}


      {/* <Route path="/allpatient" >
        <Route index element={ <AllPatients /> } />
        <Route path="dependentdata/:patientId" element={loggedIn ? <Dependent /> } />
      </Route> */}
      <Route path="patientappointment/:patientId" element={loggedIn ? <PatientHistory /> : null} />
      <Route path="/patientinfo/:patientId" element={loggedIn ? <PatientProfile /> : null} />

      <Route path="/clinic" element={<Clinic />} />

      <Route path="/doctorbookingwithpatientlogin/:doctorId" element={<DoctorBookingWithPatientLogin />} />

      <Route path="/subscription" element={<Subscription />} />

      <Route path="/user" element={<User />} />

      <Route path="/logout" element={< Logout />} />

      <Route path="/helper/:doctorId" element={<Helper />} />

      <Route path="/edithelper/:helperId" element={<EditHelper />} />

      <Route path="/loginhelper" element={<LoginHelper />} />

      <Route path="/subscriptions/:doctorId" element={<SubscriptionNewDr />} />

      {/* <Route path="/Clinics" /element={loggedIn ? <Clinic /> } /> */}

    </Routes >
  )
}
export default MainContainer;