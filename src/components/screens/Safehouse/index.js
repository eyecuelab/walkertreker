import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from "react-native";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";

import constants from "../../../constants";

import { MainText, SubHeader } from "../../text";
import CampaignHeader from "../../ui/CampaignHeader";
import ProgressBar from "../../ui/ProgressBar";
import ScreenContainer from "../../containers/ScreenContainer";
import defaultStyle from "../../../styles/defaultStyle";
import SingleButtonFullWidth from "../../ui/SingleButtonFullWidth";

import FoundModal from "../../ui/FoundModal";

const { c } = constants;
const safehouseBg = require("../../../../assets/safehouse_bg.png");

class Safehouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundModalVisible: false
    };
  }

  componentDidMount() {
    console.log("STEPS IN SAFEHOUSE: ", this.props.steps);
    const { scavengingFor, itemScavenged } = this.props.steps;
    if (
      scavengingFor &&
      itemScavenged &&
      this.state.foundModalVisible === false
    ) {
      this.setState({ foundModalVisible: true });
    }
  }

  componentDidUpdate() {
    const { scavengingFor, itemScavenged } = this.props.steps;
    if (
      scavengingFor &&
      (itemScavenged || itemScavenged === 0) &&
      this.state.foundModalVisible === false
    ) {
      this.setState({ foundModalVisible: true }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  _selectFood = () => {
    const { dispatch } = this.props;
    dispatch({ type: c.SELECT_SCAVENGE, scavengingFor: "food" });
    setTimeout(() => {
      this.props.dispatch({
        type: c.CHECK_BONUS_STEPS,
        player: this.props.player
      });
    }, 4000);
  };

  _selectMedicine = () => {
    const { dispatch } = this.props;
    dispatch({ type: c.SELECT_SCAVENGE, scavengingFor: "medicine" });
    setTimeout(() => {
      this.props.dispatch({
        type: c.CHECK_BONUS_STEPS,
        player: this.props.player
      });
    }, 4000);
  };

  _selectWeapon = () => {
    const { dispatch } = this.props;
    dispatch({ type: c.SELECT_SCAVENGE, scavengingFor: "weapons" });
    setTimeout(() => {
      this.props.dispatch({
        type: c.CHECK_BONUS_STEPS,
        player: this.props.player
      });
    }, 4000);
  };

  _onButtonPressInventory = () => {
    this.props.navigation.navigate("Inventory");
  };

  _onButtonPressSummary = () => {
    this.props.navigation.navigate("CampaignSummary");
  };

  _confirmItem = () => {
    const { dispatch } = this.props;
    dispatch({ type: c.RESET_SCAVENGE });
  };

  _toggleFoundModal = () => {
    const { foundModalVisible } = this.state;
    this.setState({ foundModalVisible: !foundModalVisible });
  };

  _pressOK = () => {
    this.props.navigation.navigate("Campaign");
    this._confirmItem();
  };

  _submitConditionalRender = () => {
    const { scavengingFor, itemScavenged } = this.props.steps;
    console.log("JUST SCAVENGED", itemScavenged);
    // if you are scavenging for something but have not retrieved it yet
    if (scavengingFor != null && itemScavenged === null) {
      const stepsTowardBonus =
        this.props.steps.campaignDateArray[this.props.campaign.currentDay]
          .bonus -
        this.props.steps.campaignDateArray[this.props.campaign.currentDay]
          .timesScavenged *
          500;
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={[
              customStyles.opacityContainer,
              { marginBottom: heightUnit * 2 }
            ]}
          >
            <SubHeader style={{ textAlign: "center" }}>
              You are searching for {scavengingFor}...
            </SubHeader>
          </View>

          <ProgressBar value={stepsTowardBonus} targetValue={500} />
        </View>
      );
      // if you are done scavenging for something, but are not scavenging for a new thing yet
    }
    return (
      <View style={[customStyles.container]}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={customStyles.opacityContainer}>
            <MainText style={{ textAlign: "center" }}>
              You have made it to the safe house with time to spare. You can use
              any additional steps gained today to scavenge for items for your
              team!
            </MainText>
          </View>
        </View>

        <View style={customStyles.bottom}>
          <SingleButtonFullWidth
            marginTop={widthUnit * 0.5}
            backgroundColor="darkred"
            title="Look for food"
            onButtonPress={this._selectFood}
          />
          <SingleButtonFullWidth
            marginTop={widthUnit * 0.5}
            backgroundColor="darkred"
            title="Search for medicine"
            onButtonPress={this._selectMedicine}
          />
          <SingleButtonFullWidth
            marginTop={widthUnit * 0.5}
            backgroundColor="darkred"
            title="Find weapons"
            onButtonPress={this._selectWeapon}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={[{ backgroundColor: "#1a1f14" }, { flex: 1 }]}>
        <ImageBackground
          source={safehouseBg}
          resizeMode="cover"
          style={customStyles.safehouseBg}
        >
          <Modal isVisible={this.state.foundModalVisible}>
            <FoundModal
              handleModalStateChange={this._toggleFoundModal}
              onButtonPress={this._pressOK}
            />
          </Modal>

          <ScreenContainer>
            <View style={{ flex: 1 }}>
              <CampaignHeader title="Safehouse" />
              {this._submitConditionalRender()}
            </View>
            <SingleButtonFullWidth
              marginTop={widthUnit * 0.5}
              title="Go Back"
              backgroundColor="black"
              onButtonPress={() => this.props.navigation.navigate("Campaign")}
            />
          </ScreenContainer>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp("1%");
const heightUnit = hp("1%");
const customStyles = StyleSheet.create({
  opacityContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: widthUnit * 3.5
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%"
  },
  safehouseBg: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-start"
  },
  bottom: {
    width: "100%",
    alignItems: "center"
  }
});

Safehouse.propTypes = {
  screenProps: PropTypes.any.isRequired,
  steps: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  campaign: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    steps: state.steps,
    campaign: state.campaign,
    player: state.player
  };
}

export default connect(mapStateToProps)(Safehouse);
