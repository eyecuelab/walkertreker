import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import defaultStyle from '../../styles/defaultStyle';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import DayCounter from '../ui/DayCounter';
import ScreenContainer from './../containers/ScreenContainer';  
import { MainText } from './../text';


import constants from '../../constants';
const { c, events } = constants;
const event_bg = require('../../../assets/event_bg.png');



class EventDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  handleButtonPress(opt) {
    console.log('option from display', opt)
    this.props.onVote(opt)
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
                      <Text style={styles.label}>{this.props.timeLeft}</Text>
    
                      <View style={customStyles.headlineContainer}>
                        <Text style={styles.headline}>Group{'\n'}Decision</Text>
                      </View>
                      <ScrollView>
                        <View style={[customStyles.textContainer, customStyles.marginTop]}>
                          <MainText>{this.props.antecedent}</MainText>
                        </View>
                      </ScrollView>
                    </View>
                    
                    <View style={[customStyles.container, {flex: 1, alignContent: 'flex-end', padding: widthUnit}]}>
                      <View style={customStyles.buttonContainer}>
                        <SingleButtonFullWidth
                          title={this.props.optionAButton}
                          backgroundColor="darkred"
                          onButtonPress={() => this.handleButtonPress('A')}
                        />
                      </View>
                      <View style={customStyles.buttonContainer}>
                        <SingleButtonFullWidth
                          title={this.props.optionBButton}
                          backgroundColor="darkred"
                          onButtonPress={() => this.handleButtonPress('B')}
                        />
                      </View>
                    </View>
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
    lineHeight: heightUnit * 3.75,
    fontFamily: 'Gill Sans MT Condensed',
    fontSize: widthUnit*5.5,
  },
  buttonContainer: {
    marginTop: heightUnit,
    width: '100%',
    height: heightUnit * 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  randomEventBg: {
    width: undefined,
    height: undefined,
    flex: 1,
    // padding: widthUnit*3,
    // borderWidth: widthUnit*2,
    // borderColor: 'black',
    // marginLeft: widthUnit*3,
    justifyContent: 'flex-start',
    // opacity: 0.2,
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

export default EventDisplay;