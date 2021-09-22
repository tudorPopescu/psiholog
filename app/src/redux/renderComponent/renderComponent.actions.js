import { RenderComponent } from './renderComponent.types';

export const setRenderedComponent = renderedComponent => {
  return ({
    type: RenderComponent.SET_RENDERED_COMPONENT,
    payload: renderedComponent
  })
};
