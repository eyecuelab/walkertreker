import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StatDisplay from './StatDisplay';

class StatDisplay_AllPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : []
    };
  }

  componentDidMount() {
    const { campaign } = this.props;
    let data = [...this.state.data]
    campaign.players.map( ( player ) => {
      const value = this.props.setValue(player)
      data = [...data, {label: player.displayName, value: value}];
    });
    this.setState({data : data});
  }

  render() {
    return (
      <StatDisplay title={this.props.title} data={this.state.data}/>
    );
  }
}

const mapStateToProps = (state) => {
  return({ player: state.player, campaign: state.campaign })
}

StatDisplay_AllPlayers.propTypes = {
  title : PropTypes.string.isRequired,
  setValue : PropTypes.func.isRequired // Function to be ran for each player and returns Value to display
}

export default connect(mapStateToProps)(StatDisplay_AllPlayers);

