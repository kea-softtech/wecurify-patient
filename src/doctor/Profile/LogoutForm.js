import { setDoctorId} from "../../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { setHelperData } from "../../recoil/atom/setHelperData";
import { setloggedIn } from "../../recoil/atom/setloggedIn";
import { setNewPatientId } from "../../recoil/atom/setNewPatientId";
import { setSlotData } from "../../recoil/atom/setSlotData";
import { setSessionData } from "../../recoil/atom/setSessionData";

function Logout(){
    const [doctorId , setDoctor] = useRecoilState(setDoctorId);
    const [loggedIn , setLoggedIn] = useRecoilState(setloggedIn);
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [patientId, setPatientId] = useRecoilState(setNewPatientId)
    const [slotItem, setSlotItem] = useRecoilState(setSlotData)
    const [sessionData, setSessionsData] = useRecoilState(setSessionData)

    useEffect(() =>{
        setDoctor("")
        setLoggedIn('')
        setPatientId('')
        setHelpersData('')
        setSlotItem('')
        setSessionsData('')
    }, [])

    return(
        <>
        <main>
            <div className="bg_color_2">
                <div className="container margin_60_35">
                    <div id="login-2">
                    {doctorId ===""?
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