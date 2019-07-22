import React from 'react';
import PropTypes from 'prop-types';

import { View, ScrollView } from 'react-native';
import { Label } from './../text';
import StatInfoSquare from './StatInfoSquare';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const heightUnit = hp('1%');

function StatDisplay (props) {
  return (
    <View style={{marginBottom: 15}}>
      <Label style={{marginBottom: heightUnit*1}}>{props.title}</Label>
      
        <ScrollView horizontal={ true } contentContainerStyle={{flexDirection: 'row', justifyContent: "space-around"}}>
          {

            props.data.map( (dataItem, index) => {
              return (

                <View key={index} style={{marginRight: 5}}>
                  <StatInfoSquare value={dataItem.value} label={dataItem.label}/>
                </View>
                
              )
            })

          }
        </ScrollView>
    </View>
    
  );
}

StatDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  data : PropTypes.array.isRequired // Array Shape [{value: value, label: label} , {...}]
}

export default StatDisplay;
