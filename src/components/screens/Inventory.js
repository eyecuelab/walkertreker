import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import constants from '../../constants';
const { c, item } = constants;
const { foodArray, medicineArray, weaponArray } = item;

import ScreenContainer from './../containers/ScreenContainer';
import {MainHeader} from './../text';
import defaultStyle from '../../styles/defaultStyle';
import DayCounter from '../ui/DayCounter';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import SingleButtonFullWidth from '../ui/SingleButtonFullWidth';
import FoodModal from '../ui/FoodModal';
import MedicineModal from '../ui/MedicineModal';
import WeaponModal from '../ui/WeaponModal';

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
      modalIndex: null,
      modalValue: null,
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

  _onFoodPress = (value, index) => {
    this.setState({
      modalValue: value,
      modalIndex: index
    });
    this._toggleFoodModal();
  }

  _onMedicinePress = (value, index) => {
    this.setState({
      modalValue: value,
      modalIndex: index
    });
    this._toggleMedicineModal();
  }

  _onWeaponPress = (value, index) => {
    this.setState({
      modalValue: value,
      modalIndex: null,
    });
    this._toggleWeaponModal();
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>

        <Modal isVisible={this.state.foodModalVisible}>
          <FoodModal
            handleModalStateChange={this._toggleFoodModal}
            index={this.state.modalIndex}
            value={this.state.modalValue} />
        </Modal>

        <Modal isVisible={this.state.medicineModalVisible}>
          <MedicineModal
            handleModalStateChange={this._toggleMedicineModal}
            index={this.state.modalIndex}
            value={this.state.modalValue} />
        </Modal>

        <Modal isVisible={this.state.weaponModalVisible}>
          <WeaponModal
            handleModalStateChange={this._toggleWeaponModal}
            index={this.state.modalIndex}
            value={this.state.modalValue} />
        </Modal>

        <ScreenContainer>
          <DayCounter campaign={this.props.campaign} />
         
          <View style={{flex: 1, alignItems: "center"}}>
            <MainHeader>INVENTORY</MainHeader>
          </View>
            
            


          <View style={{flex: 4.2}}>
            <ScrollView style={{flex: 1}}>

              <Text style={styles.subHeadingBlack}>{this.props.campaign.inventory.foodItems.length} Food</Text>
              <View
                style={customStyles.itemContainer}>

                {this.props.campaign.inventory.foodItems.map((value, index) => {
                  const img = foodArray[value];
                  return(
                    <TouchableOpacity
                      key={index}
                      onPress={() => {this._onFoodPress(value, index)}} >
                      <Image
                        style={customStyles.item}
                        resizeMode='contain'
                        source={img} />
                    </TouchableOpacity>
                  )
                })}

              </View>

              <Text style={styles.subHeadingBlack}>{this.props.campaign.inventory.medicineItems.length} Medicine</Text>
              <View
                style={customStyles.itemContainer}>

                {this.props.campaign.inventory.medicineItems.map((value, index) => {
                  const img = medicineArray[value];
                  return(
                    <TouchableOpacity
                      key={index}
                      onPress={() => {this._onMedicinePress(value, index)}} >
                      <Image
                        style={customStyles.item}
                        resizeMode='contain'
                        source={img} />
                    </TouchableOpacity>
                  )
                })}

              </View>

              <Text style={styles.subHeadingBlack}>{this.props.campaign.inventory.weaponItems.length} Weapons</Text>
              <View
                style={customStyles.itemContainer}>

                {this.props.campaign.inventory.weaponItems.map((value, index) => {
                  const img = weaponArray[value];
                  return(
                    <TouchableOpacity
                      key={index}
                      onPress={() => {this._onWeaponPress(value, index)}} >
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
