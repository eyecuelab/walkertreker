import React from "react";
import StatDisplay_AllPlayers from "../../../ui/StatDisplay_AllPlayers";

function RecordSteps() {
  const recordSteps = player => {
    const steps = player.steps.sort((a, b) => a < b);
    return steps[0];
  };

  return (
    <StatDisplay_AllPlayers
      title="Most steps walked in one day"
      setValue={recordSteps}
    />
  );
}

export default RecordSteps;
