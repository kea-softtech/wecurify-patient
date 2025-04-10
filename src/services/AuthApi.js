import axios from 'axios';
import { API } from '../config';

export default function AuthApi() {
    const loginAdmin = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/login`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    }

    const addDoctorInformation = async ({ doctorId }) => {
        try {
            const result = await axios.get(`${API}/fetchData/${doctorId}`);
            return result.data;
        }
        catch (err) {
            return err
        }
    }

    const submitDoctorInformation = async ({ doctorId, bodyData }) => {
        try {
            const result = await axios.post(`${API}/insertPersonalInfo/${doctorId}`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    }

    const getDrInfo = async ({ doctorId }, currentPage, pageSize) => {
        try {
            const result = await axios.get(`${API}/doctor/${doctorId}?page=${currentPage}&pageSize=${pageSize}`);
            return result.data;
        }
        catch (err) {
            return err
        }
    }

    const getdoctors = async (data) => {
        try {
            const result = await axios.post(`${API}/search`, data)
            return result.data
        }
        catch (err) {
            return err
        }

    }
    //for dr login
    const login = async ({ mobile }) => {
        const result = await axios.post(`${API}/loginotp`, { mobile })
        return result;
    };

    const loginOtp = async ({ getOTP, _id }) => {
        const result = await axios.post(`${API}/otp`, { getOTP, _id });
        return result;
    };
    // const saveNotification = async (bodyData) => {
    //     try {
    //         const result = await axios.post(`${API}/savenotification`, bodyData)
    //         return result;
    //     }
    //     catch (err) {
    //         return err
    //     }
    // };
    const getNotification = async (doctorId) => {
        try {
            const result = await axios.get(`${API}/getnotification/${doctorId}`)
            return result.data;
        }
        catch (err) {
            return err
        }
    };
    const notifyDoctor = async (doctorId, notificationData) => {
        try {
            const result = await axios.post(`${API}/notifydoctor/${doctorId}`,notificationData);
            return result.data
        }
        catch (err) {
            return err
        }
    };
    const saveNotification = async (doctorId, currentToken) => {
        try {
            const result = await axios.post(`${API}/savenotificationtoken/${doctorId}`, { token: currentToken })
            return result.data;
        }
        catch (err) {
            return err
        }
    };
    const savePatientToken = async (patientId, {patientToken:currentToken}) => {
        try {
            const result = await axios.post(`${API}/savepatienttoken/${patientId}`, {patientToken:currentToken})
            return result.data;
        }
        catch (err) {
            return err
        }
    };


    return {
        addDoctorInformation,
        submitDoctorInformation,
        getDrInfo,
        loginAdmin,
        getdoctors,
        login,
        loginOtp,
        notifyDoctor,
        saveNotification,
        getNotification,
        savePatientToken,
    }
}