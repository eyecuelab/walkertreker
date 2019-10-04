import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView
} from "react-native";
import { Linking } from "expo";
import * as Permissions from "expo-permissions";
import * as Contacts from "expo-contacts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import constants from "../../constants";
import ContactsList from "../ui/ContactsList";
import TwoButtonOverlay from "../ui/TwoButtonOverlay";
import defaultStyle from "../../styles/defaultStyle";
import { parsePhoneNumber } from "../../util/util";
import CampaignLobbyHeader from "../ui/CampaignLobbyHeader";
import { TextAlt } from "../text";
import PropTypes from "prop-types";
// import styled from "styled-components/native";

const { c } = constants;

const styles = StyleSheet.create(defaultStyle);
// const widthUnit = wp("1%");
const heightUnit = hp("1%");
const customStyles = StyleSheet.create({
  contentContainer: {
    paddingBottom: heightUnit * 10
  },
  contactsContainer: {
    flex: 1.5,
    borderTopColor: "white",
    borderBottomColor: "white",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: heightUnit * 1
  }
});

class InvitePlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: {},
      contactsFetched: false,
      invites: {},
      numInvites: 0,
      selected: {},
      numSelected: 0
    };
  }

  componentDidMount = () => {
    this.getContacts();
    const link = Linking.makeUrl("invite", {
      campaignId: this.props.campaign.id
    });
    console.log("this.props", this.props);
  };

  componentDidUpdate() {
    if (this.props.campaign.startDate) {
      this.props.navigation.navigate("Campaign");
    }
  }

  getContacts = async () => {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CONTACTS
    );
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Image
        ],
        sort: Contacts.SortTypes.FirstName
      });
      const contactsList = {};

      if (data.length > 0) {
        await data.forEach(contact => {
          const { name } = contact;
          const numbers = [];
          let key;
          let numId;
          const { imageAvailable } = contact;
          let imageUri;
          if (contact.phoneNumbers) {
            contact.phoneNumbers.forEach(num => {
              if (num.label === "mobile" || num.label === "") {
                const phoneToAdd = num.number;
                numId = parsePhoneNumber(phoneToAdd);
                key = name + numId;
                numbers.push(phoneToAdd);
              }
            });
          }

          contact.imageAvailable
            ? (imageUri = contact.image.uri)
            : (imageUri = "none");
          if (numbers.length > 0) {
            contactsList[key] = {
              id: numId,
              name,
              numbers,
              imageAvailable,
              imageUri,
              invited: false,
              selected: false
            };
          }
        });
        await this.setState({ contacts: contactsList });
        await this.setState({ contactsFetched: true });
      } else {
        throw new Error("No contacts found");
      }
    } else {
      throw new Error("Contacts permission not granted.");
    }
  };

  handleSelectContact = async contact => {
    if (contact.invited) {
      console.log("Contact has already been invited.");
      return;
    }
    const { id } = contact;
    const key = contact.name + id;
    const {
      selected: prevSelects,
      contacts: prevContacts,
      numSelected
    } = this.state;
    const newContacts = { ...prevContacts };
    let newSelects = { ...prevSelects };
    let newNumSelected = numSelected;
    newContacts[key].selected = !newContacts[key].selected;
    if (newContacts[key].selected === true) {
      newSelects = { ...prevSelects, [key]: contact };
      newNumSelected += 1;
    } else {
      delete newSelects[key];
      newNumSelected -= 1;
    }
    await this.setState({
      contacts: newContacts,
      selected: newSelects,
      numSelected: newNumSelected
    });
    console.log(
      "handleSelectContact, state after await: ",
      this.state.selected,
      this.state.numSelected
    );
  };

  sendInvites = async () => {
    const { dispatch } = this.props;
    // TODO: Here, before updating local UI state, send contact objects collected in this.state.selected to server to send SMS invitations.
    const selectedDupe = { ...this.state.selected };
    let { numSelected } = this.state;
    const { invites: invitesDupe } = this.state;
    let { numInvites } = this.state;
    const { contacts: contactsDupe } = this.state;
    const keysToChange = Object.keys(selectedDupe);
    keysToChange.forEach(key => {
      contactsDupe[key].selected = false;
      contactsDupe[key].invited = true;
      Object.assign(invitesDupe, { [key]: contactsDupe[key] });
      numInvites = +numInvites;
    });
    numSelected = 0;
    await this.setState({
      contacts: contactsDupe,
      invites: invitesDupe,
      numInvites,
      numSelected,
      selected: {}
    });
    dispatch({
      type: c.SEND_INVITES,
      invites: this.state.invites,
      campId: this.props.campaign.id,
      playId: this.props.player.id
    });
    // here it ends
    this.props.navigation.navigate("CampaignStaging", {
      invites: this.state.invites
    });
  };

  clearSelected = async () => {
    const { contacts: contactsDupe } = this.state;
    Object.keys(contactsDupe).forEach(key => {
      contactsDupe[key].selected = false;
    });
    const newNumSelected = 0;
    await this.setState({
      contacts: contactsDupe,
      numSelected: newNumSelected
    });
  };

  abadonGame = async () => {
    console.log("Abandon Game");
  };

  submitConditionalRender = () => {
    if (this.state.numSelected > 0) {
      return (
        <TwoButtonOverlay
          button1title="Send Invites"
          button1onPress={this.sendInvites}
          button2title="Clear"
          button2onPress={this.clearSelected}
        />
      );
    }
    if (this.state.numInvites > 0) {
      return (
        <TwoButtonOverlay
          button1title="Campaign Party"
          button1onPress={() =>
            this.props.navigation.navigate("CampaignStaging", {
              invites: this.state.invites
            })
          }
          button2title="Abandon Game"
          button2onPress={this.abandonGame}
        />
      );
    }
    return (
      <TwoButtonOverlay
        button1title="Send Invites"
        button1color="darkgray"
        button1onPress={() =>
          console.log("No contacts selected for invitations.")
        }
        button2title="Back"
        button2onPress={() => this.props.navigation.goBack()}
      />
    );
  };

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <View style={customStyles.contentContainer}>
            <View>
              <CampaignLobbyHeader
                campaign={this.props.campaign}
                title="Invite Players"
              />
              <View style={customStyles.headerRow}>
                <TextAlt size="sm">
                  Tap to select people you want to invite on your journey.
                  Currently you&apos;ve selected{" "}
                  <Text style={{ color: "black", fontFamily: "verdanaBold" }}>
                    {this.state.numSelected} people.
                  </Text>
                </TextAlt>
              </View>
            </View>
            <View style={customStyles.contactsContainer}>
              <ScrollView showsVerticalScrollIndicator>
                <ContactsList
                  contacts={this.state.contacts}
                  contactsFetched={this.state.contactsFetched}
                  onSelectContact={this.handleSelectContact}
                />
              </ScrollView>
            </View>
          </View>
          {/* Renders Two-Button Component */}
          {this.submitConditionalRender()}
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    player: state.player
  };
}

InvitePlayers.propTypes = {
  campaign: PropTypes.shape().isRequired,
  player: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
  screenProps: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(InvitePlayers);
