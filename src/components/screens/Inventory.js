import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import constants from '../../constants';
const { c, item } = constants;
const { foodArray, medicineArray, weaponArray } = item;

import defaultStyle from '../../styles/defaultStyle';
import DayCounter from '../ui/DayCounter';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import FoodModal from '../ui/FoodModal';

const bg1 = require('../../../assets/buttontexture1.png');
const bg2 = require('../../../assets/buttontexture2.png');
const bg3 = require('../../../assets/buttontexture3.png');

class Inventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      foodModalVisible: false,
      medicineModalVisible: false,
      weaponModalVisible: false,
      foodModalIndex: null,
      medicineModalIndex: null,
      weaponModalIndex: null,
    }
  }

  _onButtonPressSummary = () => {
    this.props.navigation.navigate('CampaignSummary');
  }

  _onButtonPressSafehouse = () => {
    this.props.navigation.navigate('Safehouse');
  }

  _toggleFoodModal = () => {
    const foodModalVisible = !this.state.foodModalVisible;
    this.setState({ foodModalVisible })
  }

  _toggleMedicineModal = () => {
    const medicineModalVisible = !this.state.medicineModalVisible;
    this.setState({ medicineModalVisible })
  }

  _toggleWeaponModal = () => {
    const weaponModalVisible = !this.state.weaponModalVisible;
    this.setState({ weaponModalVisible })
  }

  _submitConditionalRender = () => {
    if (this.props.steps.campaignDateArray[this.props.campaign.currentDay].goalMet) {
    // if (true) {
      return (
        <TwoButtonOverlay
          button1onPress={this._onButtonPressSafehouse}
          button1title='Safehouse'
          button1color='black'
          button1isDisabled={false}
          button2onPress={this._onButtonPressSummary}
          button2title='Campaign Summary'
          button2color='black'
          button2isDisabled={false} />
      );
    } else {
      return (
        <View style={customStyles.buttonContainer}>
          <SingleButtonFullWidth
            title='Campaign Summary'
            backgroundColor='black'
            onButtonPress={this._onButtonPressSummary} />
        </View>
      );
    }
  }

  // TODO:
  // [ ] create modals for all three item types
  // [ ] when an item is pressed, first assign its index to state and then give the modal access to that state
  // [ ] write functions in food and med modals that use the index passed in to remove that item from the inventory array, adjust health/hunger, update the player, and update the campaign

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>

        <Modal isVisible={this.state.foodtModalVisible}>
          <FoodModal
            handleModalStateChange={this._toggleFoodModal}
            index={0} />
        </Modal>

        <View style={[styles.container, {alignItems: 'flex-start'}]}>
          <DayCounter campaign={this.props.campaign} />
          <Text style={styles.headline}>GROUP INVENTORY</Text>

          <View style={{flex: 7, width: '100%'}}>
            <ScrollView style={customStyles.inventoryContainer}>

              <Text style={styles.subHeading}>Food</Text>
              <View style={customStyles.itemContainer}>

                {this.props.campaign.inventory.foodItems.map((number, index) => {
                  const img = foodArray[number];
                  return(

                      <Image
                        key={index}
                        style={customStyles.item}
                        resizeMode='contain'
                        source={img} />
                  )
                })}

              </View>

              <Text style={styles.subHeading}>Medicine</Text>
              <View style={customStyles.itemContainer}>

                {this.props.campaign.inventory.medicineItems.map((number, index) => {
                  const img = medicineArray[number];
                  return(
                    <Image
                      key={index}
                      index={index}
                      style={customStyles.item}
                      resizeMode='contain'
                      source={img} />
                  )
                })}

              </View>

              <Text style={styles.subHeading}>Weapons</Text>
              <View style={customStyles.itemContainer}>

                {this.props.campaign.inventory.weaponItems.map((number, index) => {
                  const img = weaponArray[number];
                  return(
                    <Image
                      key={index}
                      style={customStyles.item}
                      resizeMode='contain'
                      source={img} />
                  )
                })}

              </View>

            </ScrollView>
          </View>

          <View style={customStyles.bottom}>

            {this._submitConditionalRender()}

          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create(defaultStyle)
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'skyblue'
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: widthUnit*2,
  },
  inventoryContainer: {
    flex: 1,
    width: '100%',
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    marginTop: heightUnit*3,
    width: '100%',
    height: heightUnit*8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: widthUnit*28,
    height: widthUnit*28,
    marginRight: widthUnit
  }
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player,
    steps: state.steps,
  }
}

export default connect(mapStateToProps)(Inventory)
