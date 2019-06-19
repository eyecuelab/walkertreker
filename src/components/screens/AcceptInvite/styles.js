import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

const widthUnit = wp('1%');
const heightUnit = hp('1%');

const customStyles = StyleSheet.create({
  inviteContainer: {
    // flex: 1,
    width: '100%',
    height: '85%',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // borderWidth: 1,
    // borderColor: 'white'
  },
  headerContainer: {
    width: '100%',
    flex: 1,
  },
  playerContainer: {
    width: '100%',
    flex: 2,
  },
  playerHeadlineContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerListContainer: {
    flex: 2,
    marginBottom: heightUnit*5,
  },
});

export default customStyles;
