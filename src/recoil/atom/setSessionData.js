import { atom } from 'recoil';

export const setSessionData = atom({
    key: 'setSessionData', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  