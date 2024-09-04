import React, { useEffect, useState } from 'react';
import ReportApi from '../../../services/ReportApi';

export default function GetLabPrescription(props) {
    const { reportId } = props;
    const { getLabTestPrescriptionData } = ReportApi();
    const [getLabData, setGetLabData] = useState(null);

    useEffect(() => {
        getLabPrescriptionData()
    }, [])

    const getLabPrescriptionData = () => {
        getLabTestPrescriptionData({ reportId })
            .then((result) => {
                if (result) {
                    setGetLabData(result)
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            })
    }
    return (
        <>
            {
                getLabData && getLabData.length > 0 ?
                    <div className='viewMreport' align='left'>
                        <h6 className="font_weight">List of Test</h6>
                        {getLabData && getLabData.map((item, i) => {
                            return (
                                <span key={i}>
                                    {item.test_name}<br />
                                </span>
                            )

                        })}
                    </div>
                    : null
            }
        </>
    )
}