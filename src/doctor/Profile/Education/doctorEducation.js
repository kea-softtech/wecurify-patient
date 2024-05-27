import React, { useState, useEffect } from "react";
import EducationApi from "../../../services/EducationApi";

function DoctorEducation(props) {
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
                <i className="pe-7s-news-paper"></i>
                <h3>Education</h3>
                <p>Mussum ipsum cacilds, vidis litro abertis.</p>
            </div>
            <div className="wrapper_indent">
                <p>Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Nullam mollis. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapi.</p>
                <h6>Curriculum</h6>
                {eduData.map((education, index) => {
                    return (
                        <ul key={index} className="list_edu">
                            <li><strong>{education.collage}</strong> - {education.degree}</li>
                        </ul>
                    )
                })}
            </div>
        </>
    )
}
export { DoctorEducation } 