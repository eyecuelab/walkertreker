import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import constants from '../../constants';
const { c, item } = constants;
const { foodArray, medicineArray, weaponArray } = item;

import ScreenContainer from '../containers/ScreenContainer';
import CampaignHeader from './../ui/CampaignHeader';
import defaultStyle from '../../styles/defaultStyle';

import FoodModal from '../ui/FoodModal';
import MedicineModal from '../ui/MedicineModal';
import WeaponModal from '../ui/WeaponModal';

const bg1 = require('../../../assets/buttontexture1.png');
const bg2 = require('../../../assets/buttontexture2.png');
const bg3 = require('../../../assets/buttontexture3.png');

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.formatInventory()
    this.state = {
      foodModalVisible: false,
      medicineModalVisible: false,
      weaponModalVisible: false,
      modalIndex: null,
      modalValue: null,
      isLoading: false,
    }
  }
  
  componentDidUpdate() {
    this.formatInventory()
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

  _onItemPress = (type, value, index) => {
    type === 'food' ? this._toggleFoodModal() :
    type === 'medicine' ? this._toggleMedicineModal() :
    type === 'weapon' ? this._toggleWeaponModal() : null;
    this.setState({
      modalValue: value,
      modalIndex: index,
    });
  }

  formatInventory = () => {
    this.foodItems = []
    this.medicineItems = []
    this.weaponItems = []
    this.props.campaign.inventories.forEach((invenObj) => {
      if (invenObj.used === false) {
        invenObj.itemType === 'food' ? this.foodItems.push([invenObj.itemNumber, invenObj.id]) :
        invenObj.itemType === 'med' ? this.medicineItems.push([invenObj.itemNumber, invenObj.id]) :
        invenObj.itemType === 'weapon' ? this.weaponItems.push([invenObj.itemNumber, invenObj.id]) : null;
      }
    })
  }

  _eatTheFood = (num) => {
    const { dispatch, player } = this.props;
    if (num === 0) {
      this._toggleFoodModal()
    } else if (num === 1) {
      this.setState({ isLoading: true })
      const { health, hunger } = player;
      let newHealth = health + 5;
      let newHunger = hunger + 15;
      if (newHealth > 100) {
        newHealth = 100;
      }
      if (newHunger > 100) {
        newHunger = 100;
      }
      dispatch({ type: c.USE_INVENTORY, inventoryId: this.state.modalIndex, usedBy: 'player', usedById: player.id })
      dispatch({type: c.UPDATE_HUNGER_HEALTH, hunger: newHunger, health: newHealth});
      
      setTimeout(() => {
        this._toggleFoodModal()
        this.setState({ isLoading: false })
      }, 200)
    }
  }

  _takeTheMedicine = (num) => {
    if (num === 0) {
      this._toggleMedicineModal();
    } else if (num === 1) {
      this.setState({ isLoading: true })
      const { dispatch, player } = this.props;
      let newHealth = player.health + 20;
      let newHunger = player.hunger;
      if (newHealth > 100) {
        newHealth = 100;
      }
      if (newHunger > 100) {
        newHunger = 100;
      }
      dispatch({ type: c.USE_INVENTORY, inventoryId: this.state.modalIndex, usedBy: 'player', usedById: player.id })
      dispatch({type: c.UPDATE_HUNGER_HEALTH, hunger: newHunger, health: newHealth});
      setTimeout(() => {
        this._toggleMedicineModal()
        this.setState({ isLoading: false })
      }, 200)
    }
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>

        <Modal isVisible={this.state.foodModalVisible}>
          <FoodModal
            onEatTheFood={(num) => this._eatTheFood(num)}
            isLoading={this.state.isLoading}
            value={this.state.modalValue} />
        </Modal>

        <Modal isVisible={this.state.medicineModalVisible}>
          <MedicineModal
            onTakeTheMedicine={(num) => this._takeTheMedicine(num)}
            isLoading={this.state.isLoading}
            value={this.state.modalValue} />
        </Modal>

        <Modal isVisible={this.state.weaponModalVisible}>
          <WeaponModal
            onDismissTheWeapon={this._toggleWeaponModal}
            value={this.state.modalValue} />
        </Modal>

        <ScreenContainer>
          <CampaignHeader title="Inventory"/>
            

          <View style={{flex: 4.2}}>
            <ScrollView style={{flex: 1}}>

              <Text style={styles.subHeadingBlack}>{this.foodItems.length} Food</Text>
              <View
                style={customStyles.itemContainer}>

                {this.foodItems.map((arr) => {
                  let value = arr[0]
                  let index = arr[1]
                  const img = foodArray[value];
                  return(
                    <TouchableOpacity
                      key={index}
                      onPress={() => {this._onItemPress('food', value, index)}} >
                      <Image
                        style={customStyles.item}
                        resizeMode='contain'
                        source={img} />
                    </TouchableOpacity>
                  )
                })}

              </View>

              <Text style={styles.subHeadingBlack}>{this.medicineItems.length} Medicine</Text>
              <View
                style={customStyles.itemContainer}>

                {this.medicineItems.map((arr) => {
                  let value = arr[0]
                  let index = arr[1]
                  const img = medicineArray[value];
                  return(
                    <TouchableOpacity
                      key={index}
                      onPress={() => {this._onItemPress('medicine',value, index)}} >
                      <Image
                        style={customStyles.item}
                        resizeMode='contain'
                        source={img} />
                    </TouchableOpacity>
                  )
                })}

              </View>

              <Text style={styles.subHeadingBlack}>{this.weaponItems.length} Weapons</Text>
              <View
                style={customStyles.itemContainer}>

                {this.weaponItems.map((arr) => {
                  let value = arr[0]
                  let index = arr[1]
                  const img = weaponArray[value];
                  return(
                    <TouchableOpacity
                      key={index}
                      onPress={() => {this._onItemPress('weapon', value, index)}} >
                      <Image
                        style={customStyles.item}
                        resizeMode='contain'
                        source={img} />
                    </TouchableOpacity>
                  )
                })}

              </View>

            </ScrollView>
          </View>
        </ScreenContainer>
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
    flex: 0.7,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginBottom: widthUnit*2,
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
    marginTop: widthUnit * 2.5,
  },
  buttonContainer: {
    // marginTop: heightUnit*3,
    width: '100%',
    height: heightUnit*8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: widthUnit*21,
    height: widthUnit*21,
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
