import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import constants from '../../constants';
const { c, storeData, retrieveData } = constants;

import defaultStyle from '../../styles/defaultStyle';
import DayCounter from '../ui/DayCounter';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';


class Inventory extends React.Component {

  const apple = require('../assets/food/Apple.png');
  const beans = require('../assets/food/Baked_Beans.png');
  const beer = require('../assets/food/Beer.png');
  const meat = require('../assets/food/Dry_meat.png');
  const energyDrink = require('../assets/food/Energy_Drink.png');
  const pasta = require('../assets/food/Pasta.png');
  const pepsi = require('../assets/food/Pepsi.png');
  const water = require('../assets/food/Pure_water.png');
  const sugar = require('../assets/food/Sugar.png');
  const foodArray = [apple, beans, beer, meat, energyDrink, pasta, pepsi, water, sugar];

  const bandages = require('../assets/medication/Bandages-0.png');
  const firstAidKit = require('../assets/medication/First_Aid_Kit.png');
  const salve = require('../assets/medication/Healing_salve.png');
  const metocaine = require('../assets/medication/Metocaine.png');
  const tidocycline = require('../assets/medication/Tidocycline.png');
  const tratodonine = require('../assets/medication/Tratodonine.png');
  const medicineArray = [bandages, firstAidKit, salve, metocaine, tidocycline, tratodonine];

  const baseballBat = require('../assets/weapons/Baseball_Bat.png');
  const cleveland = require('../assets/weapons/Cleveland.png');
  const colt = require('../assets/weapons/Colt_Python.png');
  const crowbar = require('../assets/weapons/Crowbar.png');
  const golfClub = require('../assets/weapons/Golf_Club.png');
  const hammer = require('../assets/weapons/Hammer.png');
  const hockeyStick = require('../assets/weapons/Hockey_Stick.png');
  const pickaxe = require('../assets/weapons/Iron_Pickaxe.png');
  const shotgun = require('../assets/weapons/Shotgun-0.png');
  const weaponArray = [baseballBat, cleveland, colt, crowbar, golfClub, hammer, hockeyStick, pickaxe, shotgun];

  constructor(props) {
    super(props)
    this.state = {
      // TODO: add arrays of images in here to be used by _populateItemImages
    }
  }

  _onButtonPressSummary = () => {
    this.props.navigation.navigate('CampaignSummary');
  }

  _onButtonPressSafehouse = () => {
    this.props.navigation.navigate('Safehouse');
  }

  _populateItemImages = (num) => {
    let arrayOfImages;
    if (num === 0) {
      arrayOfImages = 'food array'
    } else if (num === 1) {
      arrayOfImages = 'medicine array'
    } else if (num === 2) {
      arrayOfImages = 'weapon array'
    }

  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>
        <View style={[styles.container, {alignItems: 'flex-start'}]}>
          <DayCounter campaign={this.props.campaign} />
          <Text style={styles.headline}>GROUP INVENTORY</Text>
          <Text style={styles.subHeading}>Food</Text>
          <ScrollView style={customStyles.itemContainer}></ScrollView>
          <Text style={styles.subHeading}>Medicine</Text>
          <ScrollView style={customStyles.itemContainer}></ScrollView>
          <Text style={styles.subHeading}>Weapons</Text>
          <ScrollView style={customStyles.itemContainer}></ScrollView>
          <View style={customStyles.bottom}>
            <View style={customStyles.bottom}>
                <TwoButtonOverlay
                  button1onPress={this._onButtonPressSummary}
                  button1title='Campaign Summary'
                  button1color='black'
                  button1isDisabled={false}
                  button2onPress={this._onButtonPressSafehouse}
                  button2title='Safehouse'
                  button2color='black'
                  button2isDisabled={false} />
            </View>
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
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'flex-start',
    flexWrap: 'wrap',
  }
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    // player: state.player,
    // steps: state.steps,
  }
}

export default connect(mapStateToProps)(Inventory)
