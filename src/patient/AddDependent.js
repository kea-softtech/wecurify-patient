import { Link, useParams } from "react-router-dom";
import { Wrapper } from "../mainComponent/Wrapper";
import { MainNav } from "../mainComponent/mainNav";
import { DependentRegistationForm } from "./DependentResistationForm";

export default function AddDependent() {
    const { patientId } = useParams()

    return (
        <Wrapper>
            <MainNav>
                <div className=" clearfix row">
                    <div className="width50">
                        <Link to={`/patientprofile/${patientId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                        <span className='float-none ml-2' style={{ fontSize: 'inherit' }}> Add Dependent</span>
                    </div>
                </div>
            </MainNav>
  
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
        </Wrapper>
    )
}