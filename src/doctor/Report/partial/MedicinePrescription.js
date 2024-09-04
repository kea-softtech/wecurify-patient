import React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import GetMedicinePriscription from './GetMedicinePrescription';
import ReportApi from '../../../services/ReportApi';
import Toaster from '../../Toaster';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

export default function MedicinePrescription(props) {
    //for add new fiels (priscription)
    const { onChange, reportId, appointmentId } = props;
    const [tabletName, setTabletName] = useState([]);
    const [medicineSave, setMedicineSave] = useState();
    const [duration, setDuration] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState([]);
    const [checked, setChecked] = useState([]);
    const [saveMealData, setSaveMealData] = useState([]);
    const { getMedicine, insertMedicinePrescriptionData } = ReportApi();

    const useStyles = makeStyles((theme) => ({
        formControl: {
            // margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            // marginTop: theme.spacing(2)
        },
        table: {
            minWidth: 650,
        },
    }));
    const meal = [
        {
            "_id": 0,
            "name": "Before Meal"
        },
        {
            "_id": 1,
            "name": "After Meal"
        }
    ]
    const medicineSchedule = [
        "Morning",
        "Afternoon",
        "Evening",
        "Night"
    ]

    useEffect(() => {
        getMedicineData()
    }, [tabletName]);

    const getMedicineData = () => {
        getMedicine()
            .then((res) => {
                setTabletName(res)
            })
    };
    const classes = useStyles();

    const handleMealData = (e, selectedValue) => {
        e.preventDefault()
        setSaveMealData(selectedValue.name)
    }

    const handleChange = (event, selectedValue) => {
        event.preventDefault()
        setMedicineSave(selectedValue.medicineName)
    }

    const handleFrequencyChange = (index) => {
        let newState = [...checked]
        newState[index] = !checked[index]
        setChecked(newState)
        let time = []
        time = [...selectedSchedule];
        let value = newState[index];
        if (value) {
            time.push({
                schedule: medicineSchedule[index],
            })
        } else {
            let schTime = time.filter((item, i) => {
                return (item.schedule !== (medicineSchedule[index]))
            })
            time = schTime
        }
        setSelectedSchedule(time)
    }

    const handleDurationValue = (e) => {
        e.preventDefault();
        setDuration(e.target.value)
    }

    const saveData = () => {
        const bodyData = {
            "reportId": reportId,
            'patientAppointmentId': appointmentId,
            "medicineName": medicineSave,
            "days": duration,
            "timing": saveMealData,
            "frequency": selectedSchedule
        }
        insertMedicinePrescriptionData(bodyData)
            .then((res) => {
            })
        toast.success("Saved Successfully!")
    }

    return (
        <>
            <div >
                <GetMedicinePriscription reportId={reportId} />
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="large" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="font_weight" align="center">Medicine Name</TableCell>
                                <TableCell className="font_weight" align="center">Take</TableCell>
                                <TableCell className="font_weight" align="center">Duration</TableCell>
                                <TableCell className="font_weight tablecell" align="center">
                                    Slots
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="right">
                                    <Autocomplete
                                        style={{ width: 250 }}
                                        id={tabletName._id}
                                        disablePortal={true}
                                        disableClearable
                                        disableCloseOnSelect
                                        value={medicineSave}
                                        onChange={handleChange}
                                        getOptionLabel={(tabletName) => `${tabletName.medicineName}`}
                                        options={tabletName}
                                        noOptionsText={"Medicine not available"}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                label="Medicine Name"
                                            />}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Autocomplete
                                        disablePortal={true}
                                        disableClearable
                                        disableCloseOnSelect
                                        style={{ width: 250 }}
                                        id={saveMealData._id}
                                        value={saveMealData.name}
                                        onChange={handleMealData}
                                        getOptionLabel={(meal) => `${meal.name}`}
                                        options={meal}
                                        renderInput={(params) => <TextField {...params} label="Select" />}
                                    />
                                </TableCell>

                                <TableCell align="right">
                                    <div className="input">
                                        <input
                                            type="text"
                                            value={duration}
                                            onChange={handleDurationValue}
                                            className="form-control"
                                            name="duration" />
                                    </div>
                                </TableCell>

                                <TableCell className=" d-flex">
                                    {medicineSchedule.map((item, i) => {
                                        return (
                                            <div key={i} >
                                                <span className="d-flex  p-2">{item}</span>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleFrequencyChange(i)}
                                                    className="mx-3 medicineCheckbox"
                                                    value={item}
                                                />
                                            </div>
                                        )
                                    })
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="text-right add_top_30 medicinebtn">
                <input type="submit" onClick={saveData} className="btn_1 medicinebtn" value="Save" />
                <input type="submit" onClick={onChange} className="btn_1 medicinebtn" value="Next" />
            </div>
            <div className="row float-right">
                <Toaster />
            </div>
        </>

    )
}

