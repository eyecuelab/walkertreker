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
        <View style={styles.container}>
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
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
  },
  list: {
    width: "100%",
  },
  listItem: {
    // borderBottomColor: 'black',
    // borderBottomWidth: 2,
  },
});

ContactsList.propTypes = {
  contacts: PropTypes.object,
  contactsFetched: PropTypes.bool,
  onSelectContact: PropTypes.func,
}

const doNothing = () => {return;}

ContactsList.defaultProps = {
  contacts: {},
  contactsFetched: false,
  onSelectContact: doNothing,
}
