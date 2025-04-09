import axios from 'axios'
import { API } from '../config'
export default function AppointmentApi() {

    const cancelPatientAppointment = async (id) => {
        try {
            const result = await axios.delete(`${API}/cancelappointment/${id}`)
            return result
        }
        catch (err) {
            return err
        }
    }
    const downloadPrescription = async (id) => {
        try {
            const result = await axios.get(`${API}/download-prescription/${id}`);
            return result.data;
        }
        catch (err) {
            return err
        }
    }
    const getPatientListDetails = async ({ doctorId }, currentPage, pageSize) => {
        try {
            const result = await axios.get(`${API}/getBookingData/${doctorId}?page=${currentPage}&pageSize=${pageSize}`);
            return result.data;
        }
        catch (err) {
            return err
        }
    }
    const updateIncompleteStatus = async (patientAppointmentId, bodyData) => {
        try {
            const result = await axios.post(`${API}/updateIncompleteStatus/${patientAppointmentId}`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const createPDF = async (reportId) => {
        try {
            const result = await axios.post(`${API}/createPrescriptionPdf/${reportId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const getappointment = async (patientAppointmentId) => {
        try {
            const result = await axios.get(`${API}/getappointment/${patientAppointmentId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };
    const fetchAppointmentData = async (appointmentId) => {
        try {
            const result = await axios.get(`${API}/getappointmentdata/${appointmentId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    }


    const fetchTreatmentbyAppointmentId = async (appointmentId) => {
        try {
            const result = await axios.get(`${API}/gettreatments/${appointmentId}`);
            return result.data;
        }
        catch (err) {
            return err
        }
    }

    const updateConsentStatus = async (treatmentId, bodyData) => {
        try {
            const result = await axios.post(`${API}/consentStatus/${treatmentId}`, bodyData);
            return result.data;
        }
        catch (err) {
            return err
        }
    }


    return {
        cancelPatientAppointment,
        downloadPrescription,
        getPatientListDetails,
        createPDF,
        getappointment,
        updateIncompleteStatus,
        fetchAppointmentData,
        fetchTreatmentbyAppointmentId,
        updateConsentStatus
    }
}