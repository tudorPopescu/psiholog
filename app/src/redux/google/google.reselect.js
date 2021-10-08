import { createSelector } from 'reselect';

const selectGoogle = state => state.google;

export const selectMapsApi = createSelector(
  [selectGoogle],
  google => google.maps
);
