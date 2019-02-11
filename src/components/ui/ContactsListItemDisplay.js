import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import defaultStyle from '../../styles/defaultStyle';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class ContactsListItemDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  statusImage() {
    if (this.props.selected) {return <Image source={require('../../../assets/selected.png')} style={customStyles.status} />}
    else if (this.props.checked) {return <Image source={require('../../../assets/checked.png')} style={customStyles.status} />}
    else return;
  }

  render() {
    return (
      <View style={customStyles.container}>
        <View style={customStyles.statusContainer}>
          {this.statusImage()}
        </View>
        <View style={customStyles.avatarContainer}>
          <Image
            source={this.props.contact.imageAvailable ? { uri: this.props.contact.imageUri } : require('../../../assets/blankavatar.png') }
            style={customStyles.avatar}
          />
        </View>
        <View style={customStyles.infoContainer}>
          <Text style={styles.label}>{this.props.contact.name}</Text>
          <Text style={styles.plainText}>{this.props.contact.numbers ? this.props.contact.numbers[0] : ''}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(defaultStyle);

const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: heightUnit*12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  statusContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    paddingLeft: 10,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthUnit*15,
    height: widthUnit*15,
    borderRadius: 100,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  status: {

  },
});

ContactsListItemDisplay.propTypes = {
  contact: PropTypes.object,
  checked: PropTypes.bool,
  selected: PropTypes.bool,
};

ContactsListItemDisplay.defaultProps = {
  checked: false,
  selected: false,
}
