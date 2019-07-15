import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../styles/defaultStyle';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import { MainText, SubHeader, TextAlt, Label } from './../text';
import ScreenContainer from './../containers/ScreenContainer';  

import constants from '../../constants';
const { c, events } = constants;
const event_bg = require('../../../assets/event_bg.png');



class EventResultDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGroupVotes: false,
    }
  }

  _toggleGroupVotes = () => {
    this.setState({ showGroupVotes: true })
    console.log("Player vote: ", this.props.playerVotes)
  }

  conditionalShowVotes = () => {
    if (!this.state.showGroupVotes) {
      return <View style={[customStyles.textContainer, customStyles.marginTop]}>
        <MainText>{this.props.resultText}</MainText>
      </View>
    } else {
      let playerVotes = this.props.playerVotes
      console.log("All Player votes: ", playerVotes)
      const entriesList = []
      Object.entries(playerVotes).map(([key, value], index) => {
        entriesList.push(`${key} voted to ${value}`)
      })
      return (<View style={[customStyles.textContainer, customStyles.marginTop]}>
        {entriesList.map((entry, index) => {
          return (<MainText style={customStyles.text} key={index} size='lg'>{entry}</MainText>)
        })}
      </View>)
    }
  }
  

  render() {
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
    
                  <View style={{flex: 4, backgroundColor: 'rgba(0,0,0,0.4)', padding: widthUnit*5}}>
                    <View style={[customStyles.container, {flex: 3}]}>
    
                      <View style={customStyles.headlineContainer}>
                        <Text style={styles.headline}>Your group decided to {this.props.resultHeader}</Text>
                      </View>
    
                      {this.conditionalShowVotes()}
                    </View>

                  </View>
    
    
                </ImageBackground>
              </View>

              {<TwoButtonOverlay
                button1title="See Group Votes"
                button1onPress={this._toggleGroupVotes}
                button2title="Campaign"
                button2onPress={() => this.props.navigateBack()}
              />}
          </ScreenContainer>
        </ImageBackground>
    );
  }
}


const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  headlineContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  headline: {
    fontFamily: 'gore',
    fontSize: widthUnit * 12,
    lineHeight: widthUnit * 9,
    paddingTop: widthUnit * 3,
    color: 'white',
  },
  textContainer: {
    // marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    padding: widthUnit,
  },
  text: {
    fontFamily: 'Gill Sans MT Condensed',
    marginTop: heightUnit * 3.75,
    lineHeight: heightUnit * 3.75,
    fontSize: widthUnit*5.5,
  },
  randomEventBg: {
    width: undefined,
    height: undefined,
    flex: 1,

    justifyContent: 'flex-start',
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: widthUnit * 2,
  },
  marginTop: {
    marginTop: heightUnit * 2.5
  }
})

export default EventResultDisplay;