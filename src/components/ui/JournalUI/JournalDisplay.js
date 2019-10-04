import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import JournalEntry from "./JournalEntry";
import constants from "../../../constants";

const { events } = constants;

const widthUnit = wp("1%");
const heightUnit = hp("1%");
const customStyles = StyleSheet.create({
  entryLine: {
    marginLeft: widthUnit * 2,
    color: "white",
    fontFamily: "Gill Sans MT Condensed",
    fontSize: widthUnit * 5.5
  }
});

class JournalDisplay extends React.Component {
  render() {
    const entriesObj = this.props.entries;
    return Object.keys(entriesObj).map(key => {
      if (events[entriesObj[key].eventNumber]) {
        return (
          <JournalEntry
            key={entriesObj[key].id}
            style={customStyles.entryLine}
            entry={entriesObj[key].entry}
            eventNumber={entriesObj[key].eventNumber}
            votingList={entriesObj[key].votingList}
          />
        );
      }
      return (
        <JournalEntry
          key={entriesObj[key].id}
          style={customStyles.entryLine}
          entry={entriesObj[key].entry}
        />
      );
    });
  }
}

export default JournalDisplay;

JournalDisplay.propTypes = {
  entries: PropTypes.shape().isRequired
};
