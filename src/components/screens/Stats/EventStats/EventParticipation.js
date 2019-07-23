import React from 'react';
import StatDisplay_AllPlayers from './../../../ui/StatDisplay_AllPlayers';

function EventParticipation(props) {
  
  const eventParticipation = ( player ) => {
    console.log(props.events,"EVENTPROPS\n\n\n")
    return 1;
  }

  return(
    <StatDisplay_AllPlayers title="Event Participation" setValue={eventParticipation} />
  )
}

export default EventParticipation;