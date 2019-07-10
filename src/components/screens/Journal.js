import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScreenContainer from './../containers/ScreenContainer';  

import constants from '../../constants';
const { c, events } = constants;
const event_bg = require('../../../assets/event_bg.png');

import defaultStyle from '../../styles/defaultStyle';
import JournalDisplay from '../ui/JournalDisplay'

class Journal extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount(){
    console.log("IN JOURNAL", this.props.campaign.journals)
  }

  render() {
    const entries = this.props.campaign.journals;
    console.log(entries)
    return (
      <ImageBackground
          source={this.props.backgroundImage}
          style={{width: '100%', height: '100%'}} >
          <ScreenContainer>
    
            <View style={{width: '100%', height: '100%'}}>
              <ImageBackground
                source={event_bg}
                resizeMode={'cover'}
                style={customStyles.randomEventBg}>
                <View >
                  {entries.map((entry, index)=> {
                    return <JournalDisplay key={index} entryText={entry.entry} entryDay={entry.entryDay}/>
                  })}
                </View>
              </ImageBackground>
            </View>
    
          </ScreenContainer>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  randomEventBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    justifyContent: 'flex-start',
  },
})

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(Journal);