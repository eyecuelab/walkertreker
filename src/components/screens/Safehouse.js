import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import constants from '../../constants';
const { c, item } = constants;
const { foodArray, medicineArray, weaponArray } = item;
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

  _confirmItem = () => {
    const { dispatch } = this.props;
    dispatch({type: c.RESET_SCAVENGE});
  }

  _submitConditionalRender = () => {
    const { scavengingFor, justScavenged } = this.props.steps;
    // if you are scavenging for something but have not retrieved it yet
    if (scavengingFor != null && justScavenged === null) {
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
    // if you are done scavenging for something, but are not scavenging for a new thing yet
    } else if (scavengingFor && justScavenged) {
      // return a component that tells the user they scavenged something, shows them what it is, and gives them a button to close it, which will take the user to the else below
      let array;
      if (scavengingFor === 'food') {
        array = foodArray;
      } else if (scavengingFor == 'medicine') {
        array = medicineArray;
      } else if (scavengingFor === 'weapons') {
        array = weaponArray;
      } else {
        console.warn('you have a weird value in scavengingFor; fix it!');
      }
      const newItemScavenged = array[justScavenged]
      return(
        <View style={customStyles.container}>
          <Text style={[styles.plainText, customStyles.text]}>You managed to find a useful item among the wreckage and debris. It has been added to your inventory.  You might survive another night...</Text>
          <View style={[customStyles.imageContainer, {width: widthUnit*20, aspectRatio: 1}]}>
            <Image
              source={newItemScavenged}
              resizeMode='contain' />
          </View>
          <View style={customStyles.bottom}>
            <View style={customStyles.buttonContainer}>
              <SingleButtonFullWidth
                backgroundColor='darkred'
                title='OK'
                onButtonPress={this._confirmItem} />
            </View>
          </View>
        </View>
      )

    } else {
      return (
        <View style={[customStyles.container, {justifyContent: 'space-between'}]}>

          <View style={[customStyles.textContainer, customStyles.top]}>
            <Text style={[styles.plainText, customStyles.text]}>If you walk a while longer, you can do one of the following:</Text>
          </View>

          <View style={[customStyles.bottom, {paddingLeft: widthUnit, paddingRight: widthUnit}]}>
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

          <View style={{width: '100%', height: '100%'}}>
            <ImageBackground
              source={safehouse_bg}
              resizeMode={'cover'}
              style={customStyles.safehouseBg}>

              <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', padding: widthUnit}}>

                <View style={[customStyles.container]}>
                  <View style={{paddingLeft: widthUnit, paddingRight: widthUnit}}>
                    <DayCounter campaign={this.props.campaign}/>

                    <View style={customStyles.headlineContainer}>
                      <Text style={styles.headline}>Safe house</Text>
                    </View>
                  </View>

                  <View style={customStyles.textContainer}>
                    <Text style={[styles.plainText, customStyles.text]}>You have made it to the safehouse with time to spare. You can use that time to scavenge for resources.</Text>
                  </View>
                </View>

                <View style={[customStyles.container, {flex: 2.5}]}>
                  {this._submitConditionalRender()}
                </View>

                <View style={[customStyles.bottom, {paddingLeft: widthUnit, paddingRight: widthUnit, marginBottom: widthUnit * 2}]}>
                  <View style={customStyles.buttonContainer}>
                    <SingleButtonFullWidth
                      title='Go Back'
                      backgroundColor='black'
                      onButtonPress={()=>this.props.navigation.goBack()} />
                  </View>
                </View>

              </View>
            </ImageBackground>
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
    // marginTop: heightUnit,
    width: '100%',
    height: heightUnit*8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: widthUnit * 2,
  },
  container: {
    // margin: widthUnit*2,
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
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
    // flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginBottom: widthUnit,
  },
  top: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginBottom: widthUnit,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  }
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
