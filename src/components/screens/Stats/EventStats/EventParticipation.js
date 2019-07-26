import React from 'react';
import StatDisplay_AllPlayers from './../../../ui/StatDisplay_AllPlayers';

function EventParticipation(props) {
  
  const eventParticipation = ( player ) => {
    const { events } = props;
    if(events) {
      const eventsVoted = events.reduce((acc, event) => {
        playerVoted = event.votes.reduce((acc, vote) => {
          if(vote.playerId === player.id) {
            acc = true
            return acc;
          } else {
            return acc;
          }
        }, false)
        if (playerVoted) {
          acc = acc + 1;
          return acc;
        } else {
          return acc;
        }
      }, 0);
      
      return events.length ? (eventsVoted / events.length * 100) + "%" : "0%";
    }
  }

  return(
    <StatDisplay_AllPlayers title="Event Participation" setValue={eventParticipation} />
  )
}

export default EventParticipation;