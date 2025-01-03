import React, { useEffect, useState } from 'react';
import ReportApi from '../../../services/ReportApi';
export default function GetSymptomsData(props) {
    const { reportId } = props
    const { getMedicineReport } = ReportApi();
    const [symptomDataInfo, setSymptomDataInfo] = useState([])

    useEffect(() => {
        symptomsData()
    }, [])

    const symptomsData = () => {
        getMedicineReport({ reportId })
            .then((res) => {
                if (res) {
                    setSymptomDataInfo(res[0].symptoms)
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            })
    }

    return (
        <div align='left'>
            {symptomDataInfo.length > 0 ?
                <div className='  viewMreport' align='left'>
                    <h6 className="font_weight">List of Symptoms</h6>
                    {symptomDataInfo && symptomDataInfo.map((item, i) => {
                        return (
                            <span key={i}>
                                {item}<br />
                            </span>
                        )
                    })}
                </div>
                : null}
        </div>
    )
}