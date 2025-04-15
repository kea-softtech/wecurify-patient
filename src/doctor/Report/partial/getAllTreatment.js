import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';

export default function GetAllTreatments(props) {
    const { getServices } = props
    return (
        <>
            <>
                {getServices && getServices.length > 0 ?
                    <div className=''>
                        <h6 align="left" className='patientModal ml-2 mt-3'>Treatment List</h6>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'><span className='patientModal'>Index</span></TableCell>
                                        <TableCell align='center'><span className='patientModal'>Treatment Name</span></TableCell>
                                        <TableCell align='center'><span className='patientModal'>Doctor Name</span></TableCell>
                                        <TableCell align='center'><span className='patientModal'>Fees</span></TableCell>
                                        <TableCell align='center'><span className='patientModal'>Plan Date</span></TableCell>
                                        <TableCell align='center'><span className='patientModal'>Status</span></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getServices && getServices.map((item, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell align='center'>{i + 1}</TableCell>
                                                <TableCell align='center'>{item.treatmentName}</TableCell>
                                                <TableCell align='center'>{item['doctorList'][0].name}</TableCell>
                                                <TableCell align='center'>{item.treatmentPrice}</TableCell>
                                                <TableCell align='center'>{(moment(item.planDate).format('YYYY-MM-DD'))}</TableCell>
                                                <TableCell align='center'>{item.status}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    : null
                    // <div className='clinicHistory font_weight'>Treatments not added.</div>
                }
            </>
        </>
    )
}
