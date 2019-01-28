import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, Animated } from 'react-native';
import { Contacts, Permissions } from 'expo';

import ContactsListItemDisplay from './ContactsListItemDisplay';

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

  _parsePhoneNumber(str) {
    // helper function
    // INPUT: "(503) 123-4567"
    // RETURN: "5031234567"
    const phoneStr = str;
    const phoneArr = phoneStr.split('');
    const targetArr = [];
    phoneArr.forEach(char => {
    	if (parseInt(char) || char == "0") {
      	targetArr.push(char);
      }
    })
    return targetArr.join('');
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
                const phoneToAdd = this._parsePhoneNumber(num.number);
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
        <ScrollView style={styles.list}>
          {Object.keys(this.state.contacts).map(key => {
            const contact = this.state.contacts[key];
            return (
              <View
                style={contact.activeInvite ? styles.activeListItem : styles.inactiveListItem}
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
        </ScrollView>
      );
    } else {
      // Can replace this with a spinning wheel or some loading animation
      return (
        <Text>Fetching contacts...</Text>
      )
    }
  }

  submitButtonConditionalRender() {
    if (this.state.numberOfInvites == 0) {
      return (<Button title="Send" disabled onPress={() => console.log('No contacts selected, cannot submit')} />)
    } else {
      return <Button title="Send" onPress={() => this.submitInvites()} />
    }
  }

  submitConditionalRender() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.submitContainer} >
          <Text>{this.state.numberOfInvites} contacts selected</Text>
          <View style={styles.submitButtons} >
            {this.submitButtonConditionalRender()}
            <Button title="Cancel" onPress={() => this.props.navigation.navigate('CreateCampaign')} />
          </View>
        </View>
      );
    } else { return; }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.listConditionalRender()}
        {this.submitConditionalRender()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
  list: {
    marginTop: 24,
    width: "100%",
  },
  inactiveListItem: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  activeListItem: {
    backgroundColor: 'steelblue',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  submitContainer: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    width: '80%',
    height: '10%',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.8)',
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
