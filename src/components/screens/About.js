import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import defaultStyle from '../../styles/defaultStyle';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';

export default class About extends React.Component {

  constructor(props) {
    super(props)
    const nav = this.props.navigation.getParam('navigationOption', 'none')
    let buttonTitle
    if (nav == 'back') {
      buttonTitle = 'Back'
    } else {
      buttonTitle = 'Create a Campaign'
    }
    this.state = {
      nav,
      buttonTitle,
    }
  }

  _onButtonPress = () => {

    if (this.state.nav == 'none') {
      this.props.navigation.navigate('CreateCampaign')
    } else if (this.state.nav == 'back') {
      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <View style={customStyles.headlineContainer}>
            <Text style={styles.headline}>About{"\n"}Walker{"\n"}Treker</Text>
          </View>
          <View style={customStyles.textContainer}>
            <Text style={[styles.plainText, customStyles.text]}>Walker Treker is a social step program that puts you and your group in a fictional city infested by zombies. Your goal is to have all members of your group reach a new safe house before nightfall each day.</Text>
          </View>
          <View style={customStyles.textContainer}>
            <Text style={[styles.plainText, customStyles.text]}>If anyone doesn't meet the requirement, you will be forced to start over from the previous safe house. And the consequences can be dire for the entire group.</Text>
          </View>
          <View style={customStyles.textContainer}>
            <Text style={[styles.plainText, customStyles.text]}>Walker Treker features campaigns that can be configured with various days, difficulty levels, and participants.</Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.buttonContainer}>
              <SingleButtonFullWidth
                backgroundColor='black'
                title={this.state.buttonTitle}
                onButtonPress={this._onButtonPress}
                />
            </View>
          </View>
        </View>
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
  textContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    lineHeight: heightUnit*3.25,
  },
})
