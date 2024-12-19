import axios from 'axios';
import { API } from '../config';

export default function PatientApi() {
    const fetchSessionSlotsData = async ({ doctorId, clinicId }) => {
        try {
            const result = await axios.get(`${API}/fetcSessionSlots/${doctorId}/${clinicId}`)
            return result.data
        }
        catch (err) {
            return err
        }

    };

    const paymentInfo = async (transactionData) => {
        try {
            const result = await axios.post(`${API}/payment/order`, transactionData)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const getbookedSlots = async (doctorId, clinicId) => {
        try {
            const result = await axios.get(`${API}/getBookingData/${doctorId}/${clinicId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const PatientForgetMpin = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/patientforgetmpin`, bodyData)
            return result
        }
        catch (err) {
            return err;
        }
    };
    const PatientForgetEmailMpin = async ({ email }) => {
        try {
            const result = await axios.post(`${API}/patientforgetemailmpin`, { email })
            return result
        }
        catch (err) {
            return err;
        }
    };

    // fetch patientList after payment
    const getpaymentData = async ({ patientId }, data) => {
        try {
            const result = await axios.post(`${API}/getBookings/${patientId}`, data)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const getAllPatient = async (currentPage, pageSize) => {
        try {
            const result = await axios.post(`${API}/patient?page=${currentPage}&pageSize=${pageSize}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const fetchPatient = async ({ patientId }) => {
        try {
            const result = await axios.get(`${API}/patientById/${patientId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const loginPatient = async ({ mobile }) => {
        try {
            const result = await axios.post(`${API}/patientLogin`, { mobile })
            return result
        }
        catch (err) {
            return err;
        }
    };

    const loginPatientEmail = async ({ email }) => {
        try {
            const result = await axios.post(`${API}/patientLoginemail`, { email })
            return result
        }
        catch (err) {
            return err;
        }
    };

    const validLoginPatient = async ({ mobile }) => {
        try {
            const result = await axios.post(`${API}/forgetmpinpatientlogin`, { mobile })
            return result
        }
        catch (err) {
            return err;
        }
    };

    const patientSignUp = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/patientsignup`, bodyData)
            return result
        }
        catch (err) {
            return {
                status: "error",
                message: err.message
            }
        }

    };

    const patientSignIn = async ({ mobile, password }) => {
        try {
            const result = await axios.post(`${API}/patientsignin`, { mobile, password })
            return result
        }
        catch (err) {
            return err;
        }
    };

    const PatientSignInEmail = async ({ email, password }) => {
        try {
            const result = await axios.post(`${API}/patientsigninemail`, { email, password })
            return result
        }
        catch (err) {
            return err;
        }
    };

    const patientLoginOtp = async ({ otp, _id }) => {
        try {
            const result = await axios.post(`${API}/patientLoginOtp`, { otp, _id })
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const insertPatientData = async (patientId, formData) => {
        try {
            const result = await axios.post(`${API}/insertPatientDetails/${patientId}`, formData)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const getPatientLifestyle = async (patientId) => {
        try {
            const result = await axios.get(`${API}/fetchPatientLifestyleInfo/${patientId}`);
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const addPatientMedical = async (patientData) => {
        try {
            const result = await axios.post(`${API}/patientMedicalInfo`, patientData)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const getPatientMedical = async (patientId) => {
        try {
            const result = await axios.get(`${API}/fetchPatientMedicalInfo/${patientId}`);
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const addPatientLifestyle = async (lifestyleData) => {
        try {
            const result = await axios.post(`${API}/insertPatientLifestyleInfo`, lifestyleData)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const updatePatientLifestyle = async (lifeStyleId, updateMedical) => {
        try {
            const result = await axios.post(`${API}/updatePatientLifestyleInfo/${lifeStyleId}`, updateMedical)
            return result
        }
        catch (err) {
            return err
        }
    };

    const fetchUpdatePatientLifestyle = async (lifeStyleId) => {
        try {
            const result = await axios.get(`${API}/fetchUpdatedPatientLifestyle/${lifeStyleId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const getPatientData = async (medicalId) => {
        try {
            const result = await axios.get(`${API}/fetchUpdatedPatient/${medicalId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const updatePatientData = async (medicalId, updateMedical) => {
        try {
            const result = await axios.post(`${API}/updatePatientMedicalInfo/${medicalId}`, updateMedical)
            return result
        }
        catch (err) {
            return err
        }
    };

    const AddDependents = async (patientId, dependentAdd) => {
        try {
            const result = await axios.post(`${API}/adddependent/${patientId}`, dependentAdd)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    return {
        fetchSessionSlotsData,
        paymentInfo,
        getbookedSlots,
        getpaymentData,
        getAllPatient,
        fetchPatient,
        loginPatientEmail,
        loginPatient,
        patientSignUp,
        patientSignIn,
        PatientSignInEmail,
        patientLoginOtp,
        insertPatientData,
        getPatientLifestyle,
        addPatientMedical,
        getPatientMedical,
        addPatientLifestyle,
        updatePatientLifestyle,
        fetchUpdatePatientLifestyle,
        AddDependents,
        getPatientData,
        updatePatientData,
        validLoginPatient,
        PatientForgetMpin,
        PatientForgetEmailMpin
    }
}