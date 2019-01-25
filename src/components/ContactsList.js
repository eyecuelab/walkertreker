import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Contacts, Permissions } from 'expo';

export default class CreateCampaign extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    this.getContacts();
  }

  async getContacts() {
    const { status, permissions } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
      });
      if (data.length > 0) {
        let contacts = [];
        data.forEach(contact => {
          const name = contact.name;
          let numbers = [];
          if (contact.phoneNumbers) {
            contact.phoneNumbers.forEach(num => {
              if (num.label == 'mobile') {
                numbers.push(num.number);
              }
            })
          }
          if (numbers.length > 0) {
            contacts.push({ name, numbers })
          }
        });
        this.setState({ isLoading: false, contacts });
      } else {
        throw new Error('No contacts found');
      }
      this.setState({ isLoading: false, });
    } else {
      throw new Error('Contacts permission not granted.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Contact list will go here.</Text>
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
  },
  text: {
    color: 'fuchsia'
  },
});
