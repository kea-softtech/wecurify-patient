import React, { useState, useEffect } from "react";
import EducationApi from "../../../services/EducationApi";

export default function DoctorSpecialization(props) {
    const { doctorId } = props
    const [eduData, setEduData] = useState([]);
    const { fetchAllEducations } = EducationApi()

    useEffect(() => {
        getAllEducations()
    }, [])

    const getAllEducations = () => {
        fetchAllEducations({ doctorId })
            .then((res) => {
                setEduData(res);
            })
    }

    return (
        <>
            <div className="indent_title_in">
                <i className="pe-7s-user"></i>
                <h3>Professional statement</h3>
                <p>Mussum ipsum cacilds, vidis litro abertis.</p>
            </div>
            <div className="wrapper_indent">
                <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Nullam mollis. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapi.</p>
                <h6>Specializations</h6>
                {eduData.map((education, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="col-lg-6">
                                <ul className="bullets">
                                    <li>{education.specialization}</li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <ul className="bullets">
                                    <li>{education.specialization}</li>
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}