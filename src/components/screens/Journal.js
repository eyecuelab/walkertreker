import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import constants from '../../constants';
const { c, events } = constants;
const event_bg = require('../../../assets/event_bg.png');

import defaultStyle from '../../styles/defaultStyle';
import JournalDisplay from '../ui/JournalDisplay'

class Journal extends React.Component {

  constructor(props) {
    super(props)
  }

 
  componentWillUnmount = () => {
  }

  
  render() {
    return (
      <JounralDisplay/>
    );
  }
}


function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(Journal);