import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class ContactsListItemDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  conditionalRenderImage() {
    if (this.props.contact.imageAvailable) {
      return (
        <Image
          source={ { uri: this.props.contact.imageUri } }
          style={ styles.avatar }
        />
      );
    } else {
      return (
        // TODO: replace hotlinked placeholder avatar img
        <Image
          source={ { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFIT0kr3EAW9XDNQCe-Ie6L5ArFF6Mmv7raUS6lIASX6YSJ8G" } }
          style={ styles.avatar }
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>{this.conditionalRenderImage()}</View>
        <Text style={styles.nameContainer}>{this.props.contact.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
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
    flex: 1
  },
  nameContainer: {
    flex: 3,
  },
})
