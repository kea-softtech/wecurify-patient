import React from 'react';
import { DependentRegistationForm } from './DependentResistationForm';
import { useParams } from 'react-router-dom';


export default function AddDependentData() {
    const { patientId } = useParams()
    return (
        <div className='row'>
            <div className="full-width">
                <div className="container margin_60">
                    <div className="patientFetch">
                        <div className="Form-data">
                            <div className="box_general_3">
                                <DependentRegistationForm patientId={patientId} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}