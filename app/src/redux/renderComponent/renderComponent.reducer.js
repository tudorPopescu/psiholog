import { RenderComponent } from './renderComponent.types';

const INITIAL_STATE = { renderedComponent: { name: null } }

export const componentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RenderComponent.SET_RENDERED_COMPONENT:
      return {
        ...state,
        renderedComponent: action.payload
      }
    default:
      return state;
  };
};
