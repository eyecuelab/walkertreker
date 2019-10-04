import React, { Component } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import ScreenContainer from "../../containers/ScreenContainer";
import CampaignHeader from "../../ui/CampaignHeader";
import ToggleBar from "../../ui/ToggleBar";
import ShortId from "shortid";
import PropTypes from "prop-types";

import StepStats from "./StepStats";
import ItemStats from "./ItemStats";
import EventStats from "./EventStats";

const options = [
  { label: "Steps", value: "Steps", id: ShortId.generate() },
  { label: "Events", value: "Events", id: ShortId.generate() },
  { label: "Items", value: "Items", id: ShortId.generate() }
];

const styles = StyleSheet.create({
  statsContainer: {
    flex: 1,
    marginTop: 30
  }
});

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleValue: undefined
    };
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange = value => {
    this.setState({ toggleValue: value });
  };

  conditionalStatComponent() {
    const { toggleValue } = this.state;
    if (toggleValue === "Steps") {
      return <StepStats />;
    }
    if (toggleValue === "Events") {
      return <EventStats />;
    }
    if (toggleValue === "Items") {
      return <ItemStats />;
    }
    return null;
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{ width: "100%", height: "100%" }}
      >
        <ScreenContainer>
          <CampaignHeader title="Total Stats" />

          <ToggleBar options={options} onValueChange={this.handleValueChange} />

          <View style={styles.statsContainer}>
            {this.conditionalStatComponent()}
          </View>
        </ScreenContainer>
      </ImageBackground>
    );
  }
}

Stats.propTypes = {
  screenProps: PropTypes.shape().isRequired
};

export default Stats;
