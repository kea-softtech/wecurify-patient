
function ViewClinic(props) {
    const { clinicData } = props;
    return (
        <div className="container" >
            <div className="mx-2" align='center'>
                <img
                    src={clinicData.clinicLogo}
                    alt="doctorProfile"
                    className='clinicPhoto'
                />
            </div>
            <div className="justify-content">
                <div className="patientModalName align-item-right">
                    {clinicData.clinicName.charAt(0).toUpperCase() + clinicData.clinicName.slice(1)}
                </div>
                <div>
                    <b className="patientModal">Address : </b>
                    {clinicData.address}
                </div>
                <div>
                    <b className="patientModal">Clinic Number : </b>
                    {clinicData.clinicNumber}
                </div>
                <div>
                    <b className="patientModal">Account Number : </b>
                    {clinicData.accountNumber}
                </div>
                <div>
                    <b className="patientModal">Account Number : </b>
                    {clinicData.IFSCcode}
                </div>
                <div>
                    <b className="patientModal">Clinic Number : </b>
                    {clinicData.clinicNumber}
                </div>
                <div>
                    <b className="patientModal">Services :  </b>
                    {clinicData.services.map((item) => {
                        return (
                            <li>
                                {item.name}
                            </li>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}
export default ViewClinic