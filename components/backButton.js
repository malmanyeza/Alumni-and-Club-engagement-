import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import {View} from 'react-native';

export default function BackBtn(){
    return(
        <View style={{flex:1,marginLeft:10}}>
             <FontAwesome style={{}} name='arrow-left' size={20} color='white' />
        </View>
    )
}