import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, Animated } from 'react-native';
import { Contacts, Permissions } from 'expo';

import ContactsListItemDisplay from '../ui/ContactsListItemDisplay';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';
import defaultStyle from '../../styles/defaultStyle';

import { parsePhoneNumber } from '../../util/util';

export default class ContactsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      invites: {},
      numberOfInvites: 0,
    };
  }

  componentDidMount() {
    this.getContacts();
  }

  async getContacts() {
    const { status, permissions } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image]
      });
      if (data.length > 0) {
        let contacts = {};
        data.forEach(contact => {
          const name = contact.name;
          let numbers = [];
          const imageAvailable = contact.imageAvailable;
          let imageUri;
          if (contact.phoneNumbers) {
            contact.phoneNumbers.forEach(num => {
              if (num.label === 'mobile') {
                const phoneToAdd = num.number;
                numbers.push(phoneToAdd);
              }
            })
          }
          contact.imageAvailable ? imageUri = contact.image.uri : imageUri = 'none';
          if (numbers.length > 0) {
            contacts = Object.assign({}, contacts, {
              [numbers[0]]: { name, numbers, imageAvailable, imageUri, inviteToParty: false }
            });
          }
        });
        this.setState({ contacts });
      } else {
        throw new Error('No contacts found');
      }
      this.setState({ isLoading: false, });
    } else {
      throw new Error('Contacts permission not granted.');
    }
  }

  async updateInviteList(contact) {
    const key = contact.numbers[0];
    const prevInvites = Object.assign({}, this.state.invites);
    const prevContacts = Object.assign({}, this.state.contacts);
    let newInvites = Object.assign({}, prevInvites);
    let newNumberOfInvites = this.state.numberOfInvites;
    let newContacts = Object.assign({}, prevContacts);
    newContacts[key].inviteToParty = !newContacts[key].inviteToParty;
    if (newContacts[key].inviteToParty === true) {
      newInvites = Object.assign({}, prevInvites, { [key]: contact});
      newNumberOfInvites++;
    } else {
      delete newInvites[key];
      newNumberOfInvites--;
    }
    await this.setState({
      contacts: newContacts,
      invites: newInvites,
      numberOfInvites: newNumberOfInvites,
    });
  }

  submitInvites() {
    console.log('Submit current value of this.state.invites to server to send SMS invitation to each contact.');
    console.log(this.state.invites);
    this.props.navigation.goBack();
    return this.state.invites;
  }

  listConditionalRender() {
    if (this.state.contacts) {
      return (
        <ScrollView showsVerticalScrollIndicator={true} style={styles.list}>
          {Object.keys(this.state.contacts).map(key => {
            const contact = this.state.contacts[key];
            return (
              <View
                style={styles.listItem}
                key={key}
              >
                <TouchableOpacity
                  onPress={() => this.updateInviteList(contact)}
                  activeOpacity={0.6}
                >
                  <ContactsListItemDisplay contact={contact} />
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={styles.bottomMargin}></View>
        </ScrollView>
      );
    } else {
      // Can replace this with a spinning wheel or some loading animation
      return (
        <Text style={defaultStyleSheet.label}>Fetching contacts...</Text>
      )
    }
  }

  submitButtonConditionalRender() {
    if (this.state.numberOfInvites == 0) {
      return (<Button title="Send" disabled onPress={() => {return;}} />)
    } else {
      return <Button title="Send" onPress={() => this.submitInvites()} />
    }
  }

  submitConditionalRender() {
    if (!this.state.isLoading) {
      const title = `${this.state.numberOfInvites} contacts selected`;
      const submitDisabled = this.state.numberOfInvites == 0 ? true : false;
      return (
        <TwoButtonOverlay
          title={title}
          button1title="Send"
          button1onPress={() => this.submitInvites()}
          button1isDisabled={submitDisabled}
          button2title="Cancel"
          button2onPress={() => this.props.navigation.navigate(`CreateCampaign`)}
        />
      );
    } else { return; }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.listConditionalRender()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
  list: {
    width: "100%",
  },
  listItem: {
    // borderBottomColor: 'black',
    // borderBottomWidth: 2,
  },
  submitContainer: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    width: '80%',
    height: '10%',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'darkgray',
    borderWidth: 2,
  },
  submitButtons: {
    margin: 5,
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-around',
  }
});
const defaultStyleSheet = StyleSheet.create(defaultStyle);
