import React from "react";
import {View, Text,TouchableOpacity, SafeAreaView} from "react-native"
import useConst from "../hooks/useConst";

export default function Timer(){

    const {remainingTime, startTime, setStartTime, setRemainingTime, handleTimer, formatTime} = useConst()
    return(
        <SafeAreaView style={{paddingTop:30}}>
            <View>
            <TouchableOpacity onPress ={handleTimer} disabled ={startTime>0}> 
                <Text>Start</Text>
            </TouchableOpacity>
             <Text>
                Time Remaining: {formatTime(remainingTime)}
             </Text>
            
         </View>
        </SafeAreaView>
         
    )
}