import React, { useState, useEffect } from "react";
import EducationApi from "../../../services/EducationApi";

export default function ClinicServices() {
    const [services, setservices] = useState(null)
    const { getDentalServices } = EducationApi()

    useEffect(() => {
        doctorServices()
    }, [])

    const doctorServices = () => {
        getDentalServices()
            .then((res) => {
                setservices(res);
            })
    }
    return (
        <>
            {services ?
                <>
                    <div className="indent_title_in">
                        <i className="pe-7s-cash"></i>
                        <h3>Prices &amp; Payments</h3>
                        <p>Mussum ipsum cacilds, vidis litro abertis.</p>
                    </div>
                    <div className="wrapper_indent">
                        <p>Zril causae ancillae sit ea. Dicam veritus mediocritatem sea ex, nec id agam eius. Te pri facete latine salutandi, scripta mediocrem et sed, cum ne mundi vulputate. Ne his sint graeco detraxit, posse exerci volutpat has in.</p>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Service - Visit</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map((ser, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{ser.name}</td>
                                                <td>$34</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
                : null}
        </>
    )
}