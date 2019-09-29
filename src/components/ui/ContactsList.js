import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  /* ScrollView, */ TouchableOpacity
} from "react-native";

import ContactsListItemDisplay from "./ContactsListItemDisplay";
import defaultStyle from "../../styles/defaultStyle";
import ShortId from "shortid";

const defaultStyleSheet = StyleSheet.create(defaultStyle);
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  list: {
    width: "100%"
  },
  listItem: {
    // borderBottomColor: 'black',
    // borderBottomWidth: 2,
  }
});

export default class ContactsList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  setStatusFlags(contact) {
    if (this.props.allChecked) {
      return [true, false];
    }
    if (this.props.allSelected) {
      return [false, true];
    }
    return [contact.invited, contact.selected];
  }

  listConditionalRender = () => {
    if (this.props.contactsFetched) {
      return (
        <View style={styles.container}>
          {Object.keys(this.props.contacts).map(key => {
            const contact = this.props.contacts[key];
            const flags = this.setStatusFlags(contact);
            const index = ShortId.generate();
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.props.onSelectContact(contact)}
                activeOpacity={0.6}
              >
                <ContactsListItemDisplay
                  contact={contact}
                  checked={flags[0]}
                  selected={flags[1]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    // Can replace this with a spinning wheel or some loading animation
    return (
      <View style={[styles.container, { marginTop: 5 }]}>
        <Text style={defaultStyleSheet.label}>Fetching contacts...</Text>
      </View>
    );
  };

  render() {
    return <View style={styles.container}>{this.listConditionalRender()}</View>;
  }
}

ContactsList.propTypes = {
  contacts: PropTypes.shape(),
  contactsFetched: PropTypes.bool,
  onSelectContact: PropTypes.func,
  allSelected: PropTypes.bool,
  allChecked: PropTypes.bool
  // selectedFlag: PropTypes.bool,
  // checkedFlag: PropTypes.bool,
};

const doNothing = () => {};
// const doNothing = () => {return;}

ContactsList.defaultProps = {
  contacts: {},
  contactsFetched: false,
  onSelectContact: doNothing,
  allSelected: false,
  allChecked: false
};
