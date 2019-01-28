import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class CreateCampaign extends React.Component {

  componentDidMount() {
    // console.log('CreateCampaign did mount');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Create campaign</Text>
        <Button
          title="Start Campaign"
          onPress={() => {console.log('Start campaign')}}
        />
        <Button
          title="Invite Players to Campaign"
          onPress={() => {this.props.navigation.navigate('ContactsList')}}
        />
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
