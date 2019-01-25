import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

export default class TOC extends React.Component {

  // Below, each button calls this.props.navigation.navigate to navigate to the next screen. You can also pass route params in as well as a second argument for the method, for example say we have a party of four players and I touch Steve's name to navigate to his profile, I might say
  //  onPress={() => this.props.navigation.navigate('Profile', { player: "Steve" } ) } and in the resulting Profile component this.props.navigation.getParam('player') would evaluate to "Steve".

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.buttonlist}>
          <Button
            title="Campaign Summary Screen"
            onPress={() => this.props.navigation.navigate('CampaignSummary')}
          />

          <Button
            title="Create Campaign"
            onPress={() => this.props.navigation.navigate('CreateCampaign')}
          />

          <Button
            title="Inventory"
            onPress={() => this.props.navigation.navigate('Inventory')}
          />

          <Button
            title="Join A Campaign"
            onPress={() => this.props.navigation.navigate('JoinCampaign')}
          />

          <Button
            title="Campaign Map"
            onPress={() => this.props.navigation.navigate('Map')}
          />

          <Button
            title="Player Profile"
            onPress={() => this.props.navigation.navigate('Profile', { player: "Steve" })}
          />

          <Button
            title="Your Party"
            onPress={() => this.props.navigation.navigate('Team')}
          />
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: 'hotpink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonlist: {

  },
  text: {
    color: 'white'
  },
});
