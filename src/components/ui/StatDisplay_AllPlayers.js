import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StatDisplay from "./StatDisplay";

class StatDisplay_AllPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: []
    };
    this.setValueData = this.setValueData.bind(this);
  }

  setValueData() {
    const { players } = this.props;
    const data = [];
    /* eslint-disable */
    players.map(player => {
      const value = this.props.setValue(player);
      data.push({ label: player.displayName, value });
    });
    /* eslint-enable */
    return data;
  }

  render() {
    return <StatDisplay title={this.props.title} data={this.setValueData()} />;
  }
}

const mapStateToProps = state => {
  return { players: state.campaign.players };
};

StatDisplay_AllPlayers.propTypes = {
  title: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired, // Function ran for each player, returns Value to display
  players: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default connect(mapStateToProps)(StatDisplay_AllPlayers);
