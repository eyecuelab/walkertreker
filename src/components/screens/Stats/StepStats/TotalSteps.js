import React from "react";
import StatDisplay_AllPlayers from "../../../ui/StatDisplay_AllPlayers";

function TotalSteps() {
  const totalSteps = player => {
    const steps = player.steps.reduce((acc, stepQty) => {
      return acc + stepQty;
    });
    return steps;
  };

  return (
    <StatDisplay_AllPlayers title="Total Steps Walked" setValue={totalSteps} />
  );
}

export default TotalSteps;
