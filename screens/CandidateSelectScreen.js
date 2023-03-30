import React,{useEffect, useState} from "react";
import useConst from "../hooks/useConst";
import {View, SafeAreaView, FlatList, TouchableOpacity, Text, Image} from "react-native"
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { db } from "../firebase";
import { collection,addDoc } from "firebase/firestore";

export default function CandidateSelectScreen ({navigation,route}){
    const {clubName} = route.params
    const {users, candidates,handleTimer, setStartTime, setRemainingTime, remainingTime, startTime, setModalVisible} = useConst();

    //this code is filtering all users 
    //with the same club name as the current navigated club 
    const [clubMembers, setClubMembers] = useState(users.filter(user => user.club===clubName));

    //this code is for filtering all 
    //club members selected to be candidates
    
    const selectedCandidates = clubMembers.filter(user=> user.selected)
    
    

   //this is the code to alter the boolean value 
   //of a property called selected in each picked member 
   //of an array named clubMembers

    const pickCandidate =(name)=>{
      const newArray = clubMembers.map((item)=>
       item.name === name?{...item, selected: !item.selected}:item
      );
      setClubMembers(newArray);
    }

    //this is to populate the database with an array 
    //of updated selectedCandidates into a collection called candidates

   
    const submit=(selectedCandidates)=>{
      const candidatesRef = collection(db, 'candidates')
      
      selectedCandidates.forEach((user)=>{
        addDoc(candidatesRef, user)
        .then(
          console.log("Candidates added to the database")
        )
        .catch((error)=>{
          console.log(error)
        })

      })
      navigation.navigate("Club")
      handleTimer()
      setModalVisible(true);

    } 

    useEffect(()=>{

    },[clubMembers, selectedCandidates])

    
    
   return(
       <SafeAreaView style={{
        flex:1,
        paddingTop:30,
        
        backgroundColor:'white'
        }}>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress ={()=>{
              submit(selectedCandidates)
            }} 
            style={{
              width:'30%',
              height:40,
              borderRadius:4,
              backgroundColor:Colors.primary,
              justifyContent:'center',
            }}>
              <Text style={{
                textAlign:'center',
                color:'white',
                fontFamily:Font['poppins-regular'],
                fontSize:FontSize.large
              }}
              >Register</Text>
            </TouchableOpacity>
          </View>
        
          <View>
            <FlatList
              data ={clubMembers}
              renderItem ={({item})=>(
                <View
                    style ={{
                    flex:1,
                    justifyContent:'space-between',
                    flexDirection:"row",
                    marginVertical:10,
                    height:70,
                    alignItems:'center',
                    
                    
                    }}
                >
                    <View style={{
                      flex:1, 
                      flexDirection:'row',
                      alignItems:'center'
                    }}> 
                        <Image
                            source={{uri:item.image}}
                            style={{
                                width:50,
                                height:50,
                                borderRadius:25,
                                marginHorizontal:20,
                                resizeMode:'cover'
                            }}
                            />
                    <View>
                    <Text
                        style={{
                            fontFamily:Font['poppins-bold'],
                            fontSize:FontSize.medium
                        }}
                        >{item.name}
                    </Text>
                    </View>
                    </View>
                
                    <TouchableOpacity onPress={()=>pickCandidate(item.name)}>
                      {item.selected?<FontAwesome style={{marginRight:20}} name='check' size={20} color='green' />:<FontAwesome style={{marginRight:20}} name='circle-o' size={20} color='gray' />}
                    </TouchableOpacity>
                </View>
                    )}
            />
          </View>
       </SafeAreaView>
   )
}