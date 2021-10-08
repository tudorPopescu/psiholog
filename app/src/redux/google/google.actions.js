import { googleTypes } from './google.types';

export const setGoogleMapsApi = google => {
  return ({
    type: googleTypes.SET_MAPS_API,
    payload: google
  });
};
