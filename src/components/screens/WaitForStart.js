import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground /* ,
  ScrollView,
  FlatList */
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { connect } from "react-redux";
// import { StackActions, NavigationActions } from "react-navigation";

import SingleButtonFullWidth from "../ui/SingleButtonFullWidth";
import TwoButtonOverlay from "../ui/TwoButtonOverlay";

// import CampaignDetails from "../ui/CampaignDetails";
import PlayersList from "../ui/PlayersList";
import defaultStyle from "../../styles/defaultStyle";
import constants from "../../constants";

// import { MainHeader } from "../text";
import CampaignLobbyHeader from "../ui/CampaignLobbyHeader";
import ScreenContainer from "../containers/ScreenContainer";
import PropTypes from "prop-types";
import LeaveCampaignSuccess from "./LeaveCampaignSuccess";

const { c } = constants;

const styles = StyleSheet.create(defaultStyle);
const widthUnit = wp("1%");
const heightUnit = hp("1%");
const customStyles = StyleSheet.create({
  modalContainer: {
    height: heightUnit * 50,
    width: widthUnit * 80,
    position: "absolute",
    top: heightUnit * 25,
    left: widthUnit * 5,
    backgroundColor: "darkred"
  },
  modalHeadline: {
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    padding: 20
  },
  modalButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    paddingBottom: heightUnit * 5
  },
  headerContainer: {
    width: "100%",
    flex: 1
  },
  playerContainer: {
    width: "100%",
    flex: 2
  },
  playerHeadlineContainer: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: "center"
  },
  playerListContainer: {
    flex: 2
    // marginBottom: heightUnit*5,
  },
  waitMessageContainer: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    height: heightUnit * 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

class WaitForStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationModalVisible: false,
      leaveCampaign: false,
      playerName: this.props.player.displayName
    };
  }

  componentDidUpdate() {
    console.log("playerName componentdidupdate", this.state.playerName);
    if (this.props.campaign.startDate) {
      console.log("INSIDE this.props.campaign.startDate");
      this.props.navigation.navigate("Campaign");
    }
  }

  _toggleConfirmationModal = () => {
    const { confirmationModalVisible } = this.state;
    console.log(
      "toggleConfirmationModal clicked, state for visibility is:",
      confirmationModalVisible
    );
    this.setState({
      confirmationModalVisible: !confirmationModalVisible
    });
  };

  _getHostPlayerDisplayName = () => {
    const hostId = this.props.campaign.host;
    const host = this.props.campaign.players.filter(
      player => player.id === hostId
    )[0];
    if (host) {
      return host.displayName;
    }
    return "";
  };

  _leaveCampaign = () => {
    console.log(this.props.campaign.id);
    console.log(this.props.player.id);
    console.log("leave campaign button clicked");
    this.props.dispatch({
      type: c.LEAVE_CAMPAIGN,
      campId: this.props.campaign.id,
      playId: this.props.player.id
    });
    this.setState({
      leaveCampaign: true
    });
    // this._toggleConfirmationModal();
    // this.props.navigation.navigate("SignUp");
  };

  render() {
    return (
      <View style={{ backgroundColor: "#871C1D" }}>
        {this.state.leaveCampaign ? (
          <LeaveCampaignSuccess
            navigation={this.props.navigation}
            player={this.state.playerName}
          />
        ) : (
          <ImageBackground
            source={this.props.screenProps.backgroundImage}
            style={{ width: "100%", height: "100%" }}
          >
            <Modal isVisible={this.state.confirmationModalVisible}>
              <View style={customStyles.modalContainer}>
                <View style={customStyles.modalHeadline}>
                  <Text style={styles.label}>
                    Are you sure you want to leave this campaign?{" "}
                  </Text>
                </View>
                <View style={customStyles.modalButtonContainer}>
                  <View style={customStyles.buttonContainer}>
                    <TwoButtonOverlay
                      button1title="Stay!"
                      button1onPress={this._toggleConfirmationModal}
                      button2title="Confirm"
                      button2onPress={this._leaveCampaign}
                    />
                  </View>
                </View>
              </View>
            </Modal>

            <ScreenContainer>
              <View style={customStyles.contentContainer}>
                <CampaignLobbyHeader
                  campaign={this.props.campaign}
                  title="New Campaign"
                />

                <View style={[customStyles.playerContainer]}>
                  <View style={customStyles.playerHeadlineContainer}>
                    <Text style={styles.subHeading}>Players</Text>
                  </View>
                  <View style={customStyles.playerListContainer}>
                    <PlayersList />
                  </View>
                </View>

                <View style={customStyles.waitMessageContainer}>
                  <Text style={styles.label}>
                    Waiting for {this._getHostPlayerDisplayName()} to start the
                    campaign.
                  </Text>
                </View>

                <View style={customStyles.buttonContainer}>
                  <SingleButtonFullWidth
                    title="Leave Campaign"
                    onButtonPress={this._toggleConfirmationModal}
                    backgroundColor="black"
                  />
                </View>
              </View>
            </ScreenContainer>
          </ImageBackground>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player
  };
}

export default connect(mapStateToProps)(WaitForStart);

WaitForStart.propTypes = {
  campaign: PropTypes.shape().isRequired,
  screenProps: PropTypes.shape().isRequired,
  player: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired
};
