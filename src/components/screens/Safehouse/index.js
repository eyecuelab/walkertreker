import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import constants from '../../../constants';
const { c, item } = constants;
const { foodArray, medicineArray, weaponArray } = item;
const safehouse_bg = require('../../../../assets/safehouse_bg.png');

import { MainText, SubHeader, MainHeader } from './../../text';
import CampaignHeader from './../../ui/CampaignHeader';
import ProgressBar from './../../ui/ProgressBar';
import ScreenContainer from '../../containers/ScreenContainer';
import defaultStyle from './../../../styles/defaultStyle';
import SingleButtonFullWidth from './../../ui/SingleButtonFullWidth';

import FoundModal from './../../ui/FoundModal';


class Safehouse extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      foundModalVisible: false,
    };
  }

  componentDidMount() {
    console.log("STEPS IN SAFEHOUSE: ", this.props.steps)
    const { scavengingFor, itemScavenged } = this.props.steps;
    if ((scavengingFor && itemScavenged) && this.state.foundModalVisible === false) {
      this.setState({foundModalVisible: true});
    }
  }

  componentDidUpdate() {
    const { scavengingFor, itemScavenged } = this.props.steps;
    if ((scavengingFor && (itemScavenged || itemScavenged === 0)) && this.state.foundModalVisible === false) {
      this.setState({foundModalVisible: true});
    }
  }

  _selectFood = () => {
    const { dispatch } = this.props;
    dispatch({type: c.SELECT_SCAVENGE, scavengingFor: 'food'});
    setTimeout(() => {
      this.props.dispatch({ type: c.CHECK_BONUS_STEPS, player: this.props.player})
    }, 4000)
  }

  _selectMedicine = () => {
    const { dispatch } = this.props;
    dispatch({type: c.SELECT_SCAVENGE, scavengingFor: 'medicine'});
    setTimeout(() => {
      this.props.dispatch({ type: c.CHECK_BONUS_STEPS, player: this.props.player})
    }, 4000)
  }

  _selectWeapon = () => {
    const { dispatch } = this.props;
    dispatch({type: c.SELECT_SCAVENGE, scavengingFor: 'weapons'});
    setTimeout(() => {
      this.props.dispatch({ type: c.CHECK_BONUS_STEPS, player: this.props.player})
    }, 4000)
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

  _toggleFoundModal = () => {
    const foundModalVisible = !this.state.foundModalVisible;
    this.setState({ foundModalVisible })
  }

  _pressOK = () => {
    this.props.navigation.navigate('Campaign');
    this._confirmItem();
  }

  _submitConditionalRender = () => {
    const { scavengingFor, itemScavenged } = this.props.steps;
    console.log("JUST SCAVENGED", itemScavenged)
    // if you are scavenging for something but have not retrieved it yet
    if (scavengingFor != null && itemScavenged === null) {
      const stepsTowardBonus = this.props.steps.campaignDateArray[this.props.campaign.currentDay].bonus - (this.props.steps.campaignDateArray[this.props.campaign.currentDay].timesScavenged * 500)
      return (
        
          <View style={{flex: 1, justifyContent: "center"}}>
            <View style={[customStyles.opacityContainer, {marginBottom: heightUnit*2}]}>
              <SubHeader style={{textAlign: "center"}}>
                You are searching for {scavengingFor}...
              </SubHeader>
            </View>

            <ProgressBar value={stepsTowardBonus} targetValue={500}/>
          </View>

      );
    // if you are done scavenging for something, but are not scavenging for a new thing yet
    } else {
      return (
        <View style={[customStyles.container]}>

          <View style={{flex: 1, justifyContent: "center"}}>
            <View style={customStyles.opacityContainer}>
              <MainText style={{textAlign: "center"}}>You have made it to the safe house with time to spare. You can use any additional steps gained today to scavenge for items for your team!</MainText>
            </View>
          </View>
          

          <View style={customStyles.bottom}>
            <SingleButtonFullWidth
                backgroundColor='darkred'
                title='Look for food'
                onButtonPress={this._selectFood} />
            <SingleButtonFullWidth
                backgroundColor='darkred'
                title='Search for medicine'
                onButtonPress={this._selectMedicine} />
            <SingleButtonFullWidth
                backgroundColor='darkred'
                title='Find weapons'
                onButtonPress={this._selectWeapon} />
          </View>

        </View>
      );
    }
  }

 

  render() {
    return (
      <ImageBackground
              source={safehouse_bg}
              resizeMode={'cover'}
              style={customStyles.safehouseBg}>

        <Modal isVisible={this.state.foundModalVisible}>
          <FoundModal
            handleModalStateChange={this._toggleFoundModal}
            onButtonPress={this._pressOK} />
        </Modal>
        
        <ScreenContainer>
          <View style={{flex: 1}}>
              <CampaignHeader title="Safehouse"/>
              {this._submitConditionalRender()}
          </View>
          <SingleButtonFullWidth
              title='Go Back'
              backgroundColor='black'
              onButtonPress={()=>this.props.navigation.navigate("Campaign")} />
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
    fontSize: widthUnit*12,
    lineHeight: widthUnit*9,
    paddingTop: widthUnit*3,
    color: 'white',
  },
  opacityContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)', 
    padding: widthUnit*3.5,
  },
  textContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: widthUnit,
  },
  text: {
    lineHeight: heightUnit*3.75,
  },
  buttonContainer: {
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
  },
  scavengingText: {
    fontSize: heightUnit*8,
    lineHeight: heightUnit*6,
  }
})

function mapStateToProps(state) {
  return {
    // appState: state.appState,
    steps: state.steps,
    campaign: state.campaign,
    player: state.player,
  }
}

export default connect(mapStateToProps)(Safehouse);
