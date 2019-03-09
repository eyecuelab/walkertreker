import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import constants from '../../constants';
const { c } = constants;
const safehouse_bg = require('../../../assets/safehouse_bg.png');

import defaultStyle from '../../styles/defaultStyle';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import DayCounter from '../ui/DayCounter';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';


class Safehouse extends React.Component {

  _selectFood = () => {
    const { dispatch } = this.props;
    dispatch({type: c.SELECT_SCAVENGE, scavengingFor: 'food'});
  }

  _selectMedicine = () => {
    const { dispatch } = this.props;
    dispatch({type: c.SELECT_SCAVENGE, scavengingFor: 'medicine'});
  }

  _selectWeapon = () => {
    const { dispatch } = this.props;
    dispatch({type: c.SELECT_SCAVENGE, scavengingFor: 'weapons'});
  }

  _onButtonPressInventory = () => {
    this.props.navigation.navigate('Inventory');
  }

  _onButtonPressSummary = () => {
    this.props.navigation.navigate('CampaignSummary');
  }

  _submitConditionalRender = () => {
    const { scavengingFor } = this.props.steps;
    if (scavengingFor) {
      return (
        <View style={customStyles.textContainer}>
          <Text style={[styles.headline]}>
            You are{"\n"}
            scavenging{"\n"}
            for{"\n"}
            {scavengingFor}.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={customStyles.container}>

          <View style={customStyles.textContainer}>
            <Text style={[styles.plainText, customStyles.text]}>If you walk a while longer, you can do one of the following:</Text>
          </View>

          <View style={customStyles.bottom}>
            <View style={customStyles.buttonContainer}>
              <SingleButtonFullWidth
                backgroundColor='darkred'
                title='Look for food'
                onButtonPress={this._selectFood} />
            </View>

            <View style={customStyles.buttonContainer}>
              <SingleButtonFullWidth
                backgroundColor='darkred'
                title='Search for medicine'
                onButtonPress={this._selectMedicine} />
            </View>

            <View style={customStyles.buttonContainer}>
              <SingleButtonFullWidth
                backgroundColor='darkred'
                title='Find weapons'
                onButtonPress={this._selectWeapon} />
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}} >
        <View style={styles.container}>

            <View style={{width: '100%', height: heightUnit*80}}>
              <ImageBackground
                source={safehouse_bg}
                resizeMode={'cover'}
                style={customStyles.safehouseBg}>

                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', padding: widthUnit*2}}>
                  <View style={[customStyles.container, {flex: 1.25}]}>
                    <DayCounter campaign={this.props.campaign}/>

                    <View style={customStyles.headlineContainer}>
                      <Text style={styles.headline}>Safehouse</Text>
                    </View>

                    <View style={customStyles.textContainer}>
                      <Text style={[styles.plainText, customStyles.text]}>You have made it to the safehouse with time to spare. You can use that time to scavenge for resources.</Text>
                    </View>
                  </View>

                  <View style={[customStyles.container, {flex: 3, padding: widthUnit}]}>
                    {this._submitConditionalRender()}
                  </View>
                </View>


              </ImageBackground>
            </View>


          <View style={customStyles.bottom}>
              <TwoButtonOverlay
                button1onPress={this._onButtonPressSummary}
                button1title='Campaign Summary'
                button1color='black'
                button1isDisabled={false}
                button2onPress={this._onButtonPressInventory}
                button2title='Inventory'
                button2color='black'
                button2isDisabled={false} />
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
  headline: {
    fontFamily: 'gore',
    fontSize: widthUnit*12,
    lineHeight: widthUnit*9,
    paddingTop: widthUnit*3,
    color: 'white',
  },
  textContainer: {
    // marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    padding: widthUnit,
  },
  text: {
    lineHeight: heightUnit*3.75,
  },
  buttonContainer: {
    marginTop: heightUnit,
    width: '100%',
    height: heightUnit*8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    // margin: widthUnit*2,
    flex: 1,
    justifyContent: 'flex-start',
    // padding: widthUnit,
    // paddingTop: widthUnit*2,
    // backgroundColor: 'pink',
  },
  safehouseBg: {
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
    marginBottom: widthUnit*2,
  },
})

function mapStateToProps(state) {
  return {
    // appState: state.appState,
    steps: state.steps,
    campaign: state.campaign,
    // player: state.player,
  }
}

export default connect(mapStateToProps)(Safehouse);
