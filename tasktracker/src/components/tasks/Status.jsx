import React from "react";

const Status = ({state}) => {
  return (   
    <span className={'stateBorder ' + state.colorClass} >{state.value}</span>
  )
};

export default Status;