import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';

import ContactsList from '../ui/ContactsList';
import ContactsListItemDisplay from '../ui/ContactsListItemDisplay';

import defaultStyle from '../../styles/defaultStyle';

export default class TwoPartContactsList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={true} style={customStyles.list}>
          <Text style={styles.headline}>Party</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create(defaultStyle);
const customStyles = StyleSheet.create({
  container: {
    flex: 1,
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
