import { atom } from 'recoil';

export const setSlotData = atom({
    key: 'setSlotData', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  