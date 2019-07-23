import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import ItemsAdded from './TotalItemsAdded';
import ItemsUsed from './TotalItemsUsed';
import EventItems from './EventItems';
import WeaponsUsed from './WeaponsUsed';

class ItemStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemsAdded campaign={this.props.campaign}/> 
        <ItemsUsed campaign={this.props.campaign}/> 
        <EventItems campaign={this.props.campaign}/> 
        <WeaponsUsed campaign={this.props.campaign}/> 
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(ItemStats);
