import React, { useEffect, useState } from 'react';
import ReportApi from '../../../services/ReportApi';

export default function GetDentalServices(props) {
    const { reportId } = props;
    const { getDentalServicesPrescription } = ReportApi();
    const [getServices, setGetServices] = useState([]);

    useEffect(() => {
        getServicesData()
    }, [])

    const getServicesData = () => {
        getDentalServicesPrescription({ reportId })
            .then((result) => {
                if (result) {
                    setGetServices(result)
                }
                else {
                    return <span className="validation mb-2">Server error</span>
                }
            })
    }

    return (
        <>
            {
                getServices.length > 0 ?
                    <div className='viewMreport' align='left'>
                        <h6 className="font_weight">List of Services</h6>
                        {getServices && getServices.map((item, i) => {
                            return (
                                <span key={i}>
                                    {item.service_name}/ fees-{item.fees}<br />
                                </span>
                            )
                        })}
                    </div>
                    : null
            }
        </>
    )
}