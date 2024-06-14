import { atom } from 'recoil'
import { recoilPersist } from "recoil-persist"
const { persistAtom } = recoilPersist();
export const setPatientProfileData = atom({
    key: "setPatientProfileData",
    default: [],
    effects_UNSTABLE: [persistAtom]
})