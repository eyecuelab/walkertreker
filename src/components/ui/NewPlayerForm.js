import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, AsyncStorage, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import TwoButtonOverlay from '../ui/TwoButtonOverlay';

import defaultStyle from '../../styles/defaultStyle';
import constants from '../../constants';
const { c } = constants;

class NewPlayerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      phoneNumber: '',
    }
  }

  _handleSubmit = async () => {
    const { dispatch } = this.props;
    dispatch({type: c.CREATE_PLAYER, name: this.state.displayName, number: this.state.phoneNumber})
    this.props.handleModalStateChange()
  }

  render() {
    return(
      <View style={customStyles.container}>
        <View style={customStyles.headlineContainer}>
          <Text style={styles.headline}>New Player</Text>
        </View>
        <View style={customStyles.formContainer}>
          <View style={customStyles.fieldContainer}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput style={customStyles.textInput} onChangeText={(text) => this.setState({displayName: text})} value={this.state.displayName}/>
          </View>
          <View style={customStyles.fieldContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={customStyles.textInput} keyboardType="phone-pad" onChangeText={(text) => this.setState({phoneNumber: text})} value={this.state.phoneNumber}/>
          </View>
          <View style={customStyles.buttonContainer}>
            <TouchableOpacity style={customStyles.button} onPress={this._handleSubmit}><Text style={styles.label}>Submit</Text></TouchableOpacity>
          </View>
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
    width: '100%',
    height: heightUnit*50,
    backgroundColor: 'darkred',
    justifyContent: 'center',
    borderRadius: 5,
  },
  headlineContainer: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    padding: 10,
  },
  fieldContainer: {
    margin: 10,
  },
  buttonContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: widthUnit*30,
    height: heightUnit*7.5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    color: 'white',
    fontFamily: 'gore',
  },
})

NewPlayerForm.propTypes = {
  handleModalStateChange: PropTypes.func
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
  }
}

export default connect(mapStateToProps)(NewPlayerForm);
