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
                    <h6 align="left" className='ml-2 font_weight'>Medicine List</h6>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="font_weight"  align='center'>Index</TableCell>
                                    <TableCell className="font_weight" align='center'>Medicine Name</TableCell>
                                    <TableCell className="font_weight" align='center'>Take</TableCell>
                                    <TableCell className="font_weight" align='center'>Duration</TableCell>
                                    <TableCell className="font_weight" align='center'>Mg</TableCell>
                                    <TableCell className="font_weight" align='center'>Slots</TableCell>
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