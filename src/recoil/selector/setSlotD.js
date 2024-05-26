import { selector } from 'recoil';
import { setSlotData } from '../atom/setSlotData';

export const setSlotD = selector({
    key: 'setSlotD', // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        const slotData = get(setSlotData);
        return slotData;
    },
});
