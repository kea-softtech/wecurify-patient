import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClinicData from "./clinicData";
import ClinicServices from "./ClinicServices";
import SelectSlot from "./SelectSlot";

export default function ClinicInto() {
    const { clinicId } = useParams();

    return (
        <div className="container margin_60">
            <div className="row">
                <div className="col-xl-8 col-lg-8">
                    <div id="section_1">
                        <div className="box_general_3">
                            <ClinicData clinicId={clinicId}/>
                            <hr></hr>
                            <ClinicServices clinicId={clinicId}/>
                        </div>
                    </div>
                </div>
                <SelectSlot clinicId={clinicId}/>
            </div>
        </div>
    )
}