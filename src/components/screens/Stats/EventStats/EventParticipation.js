import React from "react";
import PropTypes from "prop-types";
import StatDisplay_AllPlayers from "../../../ui/StatDisplay_AllPlayers";

function EventParticipation(props) {
  const eventParticipation = player => {
    const { events } = props;
    if (events) {
      const eventsVoted = events.reduce((acc, event) => {
        const playerVoted = event.votes.reduce((ac, vote) => {
          if (vote.playerId === player.id) {
            return true;
          }
          return ac;
        }, false);
        if (playerVoted) {
          let num = acc;
          num += 1;
          return num;
        }
        return acc;
      }, 0);
      return events.length
        ? `${((eventsVoted / events.length) * 100).toFixed(0)}%`
        : "0%";
    }
    return "0%";
  };

  return (
    <StatDisplay_AllPlayers
      title="Event Participation"
      setValue={eventParticipation}
    />
  );
}

EventParticipation.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default EventParticipation;
