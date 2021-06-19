import React from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = ({ id, place, message }) => {

  return (
    <ReactTooltip id={id} data-place='bottom' place={place ? place : 'top'} type='dark' effect='solid'>
      <span>{message}</span>
    </ReactTooltip>
  );
};

export default Tooltip;
