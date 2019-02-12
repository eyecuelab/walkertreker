import { AsyncStorage } from 'react-native';

storeData(keyString, valueString) {
  try {
    AsyncStorage.setItem(keyString, valueString);
  } catch (error) {
    console.log(keyString + ' data could not be saved - ' + error);
  }
}

retrieveData(keyString) {
  try {
    const value = AsyncStorage.getItem(keyString);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(keyString + ' data could not be retrieved - ' + error);
  }
}
