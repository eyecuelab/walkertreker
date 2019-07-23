import React from 'react';
import StatDisplay_AllPlayers from './../../../ui/StatDisplay_AllPlayers';

function SafehouseSteps() {
  
  const successRate = ( player ) => {
    const successfulDays = player.steps.reduce((acc, stepQty, index) => {
      
      if(stepQty > 0 && stepQty > player.stepTargets[index]) {
        acc++
        return acc;
      } else {
        console.log("Skip: ", index);
        return acc;
      }
    }, 0);
    return successfulDays;
  }

  return(
    <StatDisplay_AllPlayers title="Days made it to safehouse" setValue={successRate} />
  )
}

export default SafehouseSteps;