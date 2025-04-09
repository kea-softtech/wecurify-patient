import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import AppointmentApi from '../../services/AppointmentApi';

export default function DentalTreatmentPriscription(props) {
    const { appointmentId } = props;
    const [getServices, setGetServices] = useState([]);
    const [consentStatus, setConsentStatus] = useState({});
    const [show, setShow] = useState(false);
    const [selectedTreatmentId, setSelectedTreatmentId] = useState(null);
    const { fetchTreatmentbyAppointmentId, updateConsentStatus } = AppointmentApi();

    useEffect(() => {
        const getServicesData = async () => {
            const result = await fetchTreatmentbyAppointmentId(appointmentId);
            if (result) {
                setGetServices(result);
                const initialConsentStatus = {};
                result.forEach((item) => {
                    initialConsentStatus[item._id] = item.consentStatus || false;
                });
                setConsentStatus(initialConsentStatus);
            }
        };

        if (appointmentId) {
            getServicesData();
        }
    }, [appointmentId]);

    const handleCheckboxChange = (treatmentId) => {
        setSelectedTreatmentId(treatmentId);
        setShow(true);
    };

    const handleConsent = (consent) => {
        const updatedConsentStatus = !consentStatus[selectedTreatmentId];
        
        // Toggle the consent status
        setConsentStatus((prev) => ({
            ...prev,
            [selectedTreatmentId]: updatedConsentStatus
        }));
        
        // Update the consent status in the backend
        updateConsentStatus(selectedTreatmentId, { status: updatedConsentStatus })
            .then(() => {
                setShow(false);
            })
            .catch(() => {
                alert('Error updating consent status.');
            });
    };

    return (
        <>
            {getServices.length > 0 && (
                <div className="margin_top_15">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Index</TableCell>
                                    <TableCell align="center">Treatment Name</TableCell>
                                    <TableCell align="center">Doctor Name</TableCell>
                                    <TableCell align="center">Fees</TableCell>
                                    <TableCell align="center">Plan Date</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Consent</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getServices.map((item, i) => (
                                    <TableRow key={item._id}>
                                        <TableCell align="center">{i + 1}</TableCell>
                                        <TableCell align="center">{item.treatmentName}</TableCell>
                                        <TableCell align="center">{item.doctorList[0]?.name}</TableCell>
                                        <TableCell align="center">{item.treatmentPrice}</TableCell>
                                        <TableCell align="center">{moment(item.planDate).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell align="center">{item.status}</TableCell>
                                        <TableCell align="center">
                                            <input
                                                type="checkbox"
                                                checked={consentStatus[item._id] || false}
                                                onChange={() => handleCheckboxChange(item._id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Treatment Consent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>I agree to the terms and conditions of the treatment.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => handleConsent(true)}>
                        Yes, I Agree
                    </Button>
                    <Button variant="secondary" onClick={() => handleConsent(false)}>
                        No, Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
