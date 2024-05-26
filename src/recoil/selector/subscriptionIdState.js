import {  selector  } from 'recoil';
import { setSubscriptionId } from '../atom/setSubscriptionId';

export const SubscriptionIdState = selector({
  key: 'SubscriptionIdState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const subscriptionId = get(setSubscriptionId);
    return subscriptionId;
  },
});