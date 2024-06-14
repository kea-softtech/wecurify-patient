import { setDoctorId } from "../../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { setloggedIn } from "../../recoil/atom/setloggedIn";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import { setSlotData } from "../../recoil/atom/setSlotData";
import { setSessionData } from "../../recoil/atom/setSessionData";
import { setPatientProfileData } from "../../recoil/atom/setPatientProfileData";

function Logout() {
    const [doctorId, setDoctor] = useRecoilState(setDoctorId);
    const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn);
    const [patientId, setPatientId] = useRecoilState(setNewPatientId)
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [sessionData, setSessionsData] = useRecoilState(setSessionData)
    const [fetchPatientData, setFetchPatientData] = useRecoilState(setPatientProfileData)

    useEffect(() => {
        setDoctor("")
        setLoggedIn('')
        setPatientId('')
        setSlotItem('')
        setSessionsData('')
        setFetchPatientData('')
    }, [])

    return (
        <>
            <main>
                <div className="bg_color_2">
                    <div className="container margin_60_35">
                        <div id="login-2">
                            {doctorId === "" ?
                                <h1> Succefully Logout...</h1>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Logout;