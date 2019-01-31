import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import defaultStyle from '../../styles/defaultStyle';
import phoneNumPrettyPrint from '../../util/util';

export default class ContactsListItemDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const containerStyle = this.props.contact.inviteToParty ? [customStyles.container, customStyles.active] : [customStyles.container, customStyles.inactive];
    // TODO: replace hotlinked placeholder avatar img
    const placeholderAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFIT0kr3EAW9XDNQCe-Ie6L5ArFF6Mmv7raUS6lIASX6YSJ8G";
    return (
      <View style={containerStyle}>
        <View style={customStyles.avatarContainer}>
          <Image
            source={this.props.contact.imageAvailable ? { uri: this.props.contact.imageUri } : { uri: placeholderAvatar }}
            style={customStyles.avatar}
          />
        </View>
        <View style={customStyles.infoContainer}>
          <Text style={styles.label}>{this.props.contact.name}</Text>
          <Text style={styles.plainText}>{this.props.contact.numbers[0]}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(defaultStyle);
const customStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
  active: {
    // apply these style rules to a contact that is selected for an invite
    backgroundColor: 'steelblue',
  },
  inactive: {
    // apply these style rules to a contact that has not been selected for an invite
  },
  avatar: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 75,
    height: 75,
    backgroundColor: 'black',
    borderRadius: 100,
  },
  avatarContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
