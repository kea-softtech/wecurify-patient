import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist"
const { persistAtom } = recoilPersist();

export const setDoctorClinic = atom({
    key: 'setDoctorClinic', // unique ID (with respect to other atoms/selectors)
    default: [] ,// default value (aka initial value)
    effects_UNSTABLE: [persistAtom]
});  