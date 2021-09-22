import { createSelector } from 'reselect';

const components = state => state.components;

export const selectedRenderedComponent = createSelector(
  [components],
  components => components.renderedComponent
);
