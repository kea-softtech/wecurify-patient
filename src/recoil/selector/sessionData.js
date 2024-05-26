import { selector } from 'recoil';
import { setSessionData } from '../atom/setSessionData';

export const sessionData = selector({
    key: 'sessionData', // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        const sessionD = get(setSessionData);
        return sessionD;
    },
});
