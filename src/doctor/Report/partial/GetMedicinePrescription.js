import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import ReportApi from '../../../services/ReportApi';

const GetMedicinePriscription = (props) => {
    const { reportId } = props;
    const { getMedicinePrescriptionData } = ReportApi();
    const [showMedicineData, setShowMedicineData] = useState([])

    useEffect(() => {
        getMedicineData()
    }, [])

    function getMedicineData() {
        getMedicinePrescriptionData(reportId)
            .then((result) => {
                if (result) {
                    setShowMedicineData(result);
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            })
    }

    return (
        <>
            {showMedicineData ?
                <>
                    <h6 align="left" className='ml-2'><b>Medicine List</b></h6>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'><b>Index</b></TableCell>
                                    <TableCell align='center'><b>Medicine Name</b></TableCell>
                                    <TableCell align='center'><b>Take</b></TableCell>
                                    <TableCell align='center'><b>Duration</b></TableCell>
                                    <TableCell align='center'><b>Mg</b></TableCell>
                                    <TableCell align='center'><b>Slots</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showMedicineData.map((item, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell align='center'>{i + 1}</TableCell>
                                            <TableCell align='center'>{item.medicineName}</TableCell>
                                            <TableCell align='center'>{item.timing}</TableCell>
                                            <TableCell align='center'>{item.days}</TableCell>
                                            <TableCell align='center'>{item.mg}</TableCell>
                                            <TableCell align='center'>
                                                {item['frequency'].map((schedule, index) => {
                                                    return (
                                                        <>{schedule.schedule}, </>
                                                    )
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
                : null}
        </>
    )
}
export default GetMedicinePriscription;