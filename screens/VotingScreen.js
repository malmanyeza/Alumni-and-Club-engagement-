import React,{useState, useEffect} from "react";
import {View, SafeAreaView, Text, FlatList, TouchableOpacity, Image} from "react-native";
import { Header } from "react-native-elements";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import useConst from "../hooks/useConst";
import { collection,getDocs, updateDoc, doc, increment, getDoc} from "firebase/firestore";
import { db } from "../firebase";


export default function VotingScreen({navigation}){
    const {candidates, userData, setIsSubmitted, isSubmitted, setModalVisible, remainingTime} = useConst()
    const [selectedId, setSelectedId] = useState(null);
    const [voteText, setVoteText] = useState('Submit my vote')

  
    
    const increaseVote =(docId) =>{
        const docRef = doc(db,"candidates",docId)
        
        updateDoc(docRef,{
                votes:increment(1)
        })
        .then(
            console.log("Candidate updated")
        )
        .catch((error)=>{
            console.log("Candidate not found")
        })
       setIsSubmitted(true);
       setVoteText("Vote submitted!!")
       
    }

    
    return(
       <SafeAreaView style={{flex:1}}>
        <View style={{flex:0.9}}>
           <Header
                placement="center"
                leftComponent={<FontAwesome onPress={() =>{
                    navigation.goBack()
                    // if(remainingTime>0){
                    //      setModalVisible(true)
                    // }
                }}  name='arrow-left' size={20} color='white' /> }
                rightComponent={userData.userType==='admin'?<FontAwesome onPress={() =>navigation.goBack()}  name='trash' size={20} color='white' />:null}
                centerComponent={{ text: 'Voting session', style: { color: '#fff', fontFamily:Font['poppins-semiBold'], fontSize:FontSize.large}}}
                containerStyle={{
                    borderBottomWidth:0,
                    backgroundColor:Colors.primary,
                    height:90,
                    paddingHorizontal:20,
                    marginBottom:30
                
                }}
            />
            <View style={{
                backgroundColor:'gray',
                marginVertical:10,
                height:50,
                width:"60%",
                borderRadius:8,
                justifyContent:'center',
                alignItems:'center',
                alignSelf:"center"
            }}>
                <Text
                 style={{
                    fontFamily:Font['poppins-regular']
                 }}
                >
                    Position: President
                </Text>
            </View>
            <View
              style ={{
                height:"75%",
                
              }}
            >
                <FlatList
                  data ={candidates}
                  keyExtractor={item =>item.id}
                  renderItem={({item}) =>(
                    <View
                        style ={{
                            flex:1,
                            flexDirection:'row',
                            marginVertical:10,
                            height:70,
                            alignItems:'center',
                            alignContent:'center',
                        
                        }}
                    >
                        <View style={{flex:0.95, flexDirection:'row'}}>
                            <Image
                                source={item.profile}
                                style={{
                                width:50,
                                height:50,
                                borderRadius:25,
                                marginHorizontal:20
                                }}
                            />
                            <View>
                                <Text
                                style={{
                                    fontFamily:Font['poppins-bold'],
                                    fontSize:FontSize.large
                                }}
                                >{item.name}</Text>
                                <Text>
                                 {item.votes}
                                </Text>
                            </View>
                        </View>
                    
                        <TouchableOpacity
                          disabled={isSubmitted}
                          onPress={()=>{
                            setSelectedId(item.id)

                        }}
                          style={{
                            backgroundColor:"green",
                            height:35,
                            width:75,
                            borderRadius:5,
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'row'
                          }}
                        >
                            <Text
                              style={{color:Colors.background}}
                            >Vote
                            </Text>
                            {selectedId=== item.id?<FontAwesome style={{marginLeft:10}} name ='check-circle' color='orange' size={20}/>
                            :null}
                        </TouchableOpacity>
                    </View>
                  )}
                />
            </View>
            </View>
            <View style={{flex:0.1,paddingTop:20}}>
                <TouchableOpacity
                    disabled={isSubmitted}
                    onPress ={()=>increaseVote(selectedId)}
                    style={{
                        flexDirection:'column-reverse',
                        backgroundColor:isSubmitted?"gray":Colors.primary,
                        marginVertical:10,
                        height:50,
                        width:"50%",
                        borderRadius:8,
                        justifyContent:'center',
                        alignItems:'center',
                        alignSelf:"center",
                    }}
                    >
                        <Text
                            style={{
                             fontFamily:Font['poppins-bold'],
                             fontSize:FontSize.medium,
                             color:Colors.background
                            }}
                        >
                            {voteText}
                        </Text>
                </TouchableOpacity>
            </View>
               
       </SafeAreaView>
    )
}