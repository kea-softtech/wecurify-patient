import React, { useEffect, useState } from 'react';
import ReportApi from '../../../services/ReportApi';

export default function GetDentalServices(props) {
    const { reportId } = props;
    const { getDentalServicesPrescription } = ReportApi();
    const [getServices, setGetServices] = useState([]);
    
    useEffect(() => {
        getServicesData()
    }, [getServices])

    const getServicesData = () => {
        getDentalServicesPrescription({ reportId })
            .then((result) => {
                setGetServices(result)
            })
    }

    return (
        <>
            {
                getServices.length > 0 ?
                    <div className='viewMreport' align='left'>
                        <h6><b>List of Services</b></h6>
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