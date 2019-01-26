import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Contacts, Permissions } from 'expo';

import ContactsListItemDisplay from './ContactsListItemDisplay';

export default class ContactsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      invites: {},
    }
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
        let contacts = [];
        data.forEach(contact => {
          const name = contact.name;
          let numbers = [];
          const imageAvailable = contact.imageAvailable;
          let imageUri;
          if (contact.phoneNumbers) {
            contact.phoneNumbers.forEach(num => {
              if (num.label === 'mobile') {
                numbers.push(num.number);
              }
            })
          }
          if (contact.imageAvailable) {
            imageUri = contact.image.uri;
          } else {
            imageUri = 'none';
          }
          if (numbers.length > 0) {
            contacts.push( { name, numbers, imageAvailable, imageUri, inviteToParty: false } )
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

  updateInviteList(contact) {
    console.log(this.state.contacts);
  }

  listConditionalRender() {
    if (this.state.contacts) {
      return (
        <ScrollView style={styles.list}>
          {this.state.contacts.map(contact => {
            return (
              <View
                style={contact.activeInvite ? styles.activeListItem : styles.inactiveListItem}
                key={contact.numbers[0]}
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
      return (
        <Text>Fetching contacts...</Text>
      )
    }
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
  text: {
    color: 'fuchsia'
  },
});
