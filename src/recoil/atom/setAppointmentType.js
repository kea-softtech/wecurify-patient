import { atom } from 'recoil';

export const setAppointmentType = atom({
    key: 'setAppointmentType', // unique ID (with respect to other atoms/selectors)
    default:'' ,// default value (aka initial value)
});  

 