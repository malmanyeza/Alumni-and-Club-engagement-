import React,{useState} from "react";
import { TouchableOpacity, View,Text } from "react-native";
import { Divider } from "react-native-elements";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useConst from "../hooks/useConst";

export default function TabBottom (){
    const {nav, setNav} = useConst();
    return(
        <View>
            <Divider width={1}/>
            <View
                style={{
                    paddingHorizontal:80,
                    height:60,
                    width:'100%',
                    alignSelf:'flex-end',
                    justifyContent:'space-between',
                    flexDirection:'row',
                    backgroundColor:'white',
                    paddingVertical:10,
                    alignItems:'center',
                    alignContent:'center',
            }}
            > 
              <TouchableOpacity onPress={()=>{setNav('home')}}>
                {nav==='home'?
                    <View style={{flex:1, alignItems:'center'}}>
                        <FontAwesome  name='home' size={25} color='blue' />
                        <Text>Home</Text> 
                    </View>
                    :<FontAwesome  name='home' size={25} color='gray' />
                }
                
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setNav('message')}}>
                {nav==='message'?
                    <View style={{flex:1, alignItems:'center'}}>
                        <FontAwesome  name='comment' size={25} color='blue' />
                        <Text>Group Chat</Text> 
                    </View>
                    :<FontAwesome  name='comment' size={25} color='gray' />
                }
                
              </TouchableOpacity>
              
            </View>
        </View>
    )
}