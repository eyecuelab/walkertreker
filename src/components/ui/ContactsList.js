import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';

import ContactsListItemDisplay from '../ui/ContactsListItemDisplay';
import defaultStyle from '../../styles/defaultStyle';

export default class ContactsList extends React.Component {

  constructor(props) {
    super(props);
  }

  listConditionalRender() {
    if (this.props.contactsFetched) {
      return (
        <ScrollView showsVerticalScrollIndicator={true} style={styles.list}>
          {Object.keys(this.props.contacts).map(key => {
            const contact = this.props.contacts[key];
            return (
              <View
                style={styles.listItem}
                key={key}
              >
                <TouchableOpacity
                  onPress={() => this.props.onSelectContact(contact)}
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

  render() {
    return (
      <View style={styles.container}>
        {this.listConditionalRender()}
      </View>
    );
  }

}

const defaultStyleSheet = StyleSheet.create(defaultStyle);
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

ContactsList.propTypes = {
  contacts: PropTypes.object,
  contactsFetched: PropTypes.bool,
  onSelectContact: PropTypes.func,
}
