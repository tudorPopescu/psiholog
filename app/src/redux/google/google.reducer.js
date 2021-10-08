import { googleTypes } from './google.types';

const INITIAL_STATE = { maps: null }

export const googleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case googleTypes.SET_MAPS_API:
      return {
        ...state,
        maps: action.payload
      }
    default:
      return state;
  };
};
