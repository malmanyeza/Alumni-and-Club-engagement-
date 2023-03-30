import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    Text,
    Image,
    TextInputProps,
    TouchableOpacity,
    View,
    FlatList,
    Modal
  } from "react-native";
  import React, { useState } from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { Header,Divider } from "react-native-elements";
  import FontAwesome from '@expo/vector-icons/FontAwesome';
  import { BackgroundImage } from "react-native-elements/dist/config";
  import TabBottom from "../components/Tab";
  import useConst from "../hooks/useConst";

  const { height } = Dimensions.get("window");
  
  export default function ClubScreen({navigation, route}) {

    const {item} = route.params
    const clubName = item.name
    const bgimage = require('../assets/images/Googledev.jpg');
    const img1 = require('../assets/images/images.jpeg')
    const img2 = require('../assets/images/Android Intro.png')
    const img3 = require('../assets/images/FDJOf-YX0AQiInp.jpg')
    const img4 = require('../assets/images/Web Development Session 1_dICM6TB.jpeg')
    const img5 = require('../assets/images/mqdefault.jpg')
    const img6 = require('../assets/images/GDSC HIT Facts template (6).png')
   
    const {userData, modalVisible, setModalVisible,remainingTime, startTime, setStartTime, setRemainingTime, handleTimer, formatTime, overLay, setOverLay} = useConst();
    
    useState(()=>{
      if(remainingTime===0){
          setModalVisible(false)
      }
    },[remainingTime])

    const closeModal =()=>{
      setModalVisible(false)
    }
   
    return (
      <SafeAreaView style={{flex:1, justifyContent:'center', backgroundColor:"white"}}>
        <StatusBar backgroundColor={Colors.primary}/>
        <View style={{flex:0.99}} >
        <Header
         placement="center"
         leftComponent={<FontAwesome onPress={() =>navigation.goBack()}  name='arrow-left' size={20} color='white' /> }
         centerComponent={{ text: item.name, style: { color: '#fff', fontFamily:Font['poppins-semiBold'], fontSize:FontSize.large}}}
         rightComponent={userData.userType==='admin'?<TouchableOpacity onPress={()=>navigation.navigate('CandidateSelect',{clubName})}><FontAwesome  name='group' size={20} color='white' /></TouchableOpacity>:null}
         containerStyle={{
           borderBottomWidth:0,
           backgroundColor:Colors.primary,
           height:90,
           paddingHorizontal:20,
           marginBottom:30
       
         }}
       />
       
        <ImageBackground
          source={{uri:item.coverpic}}
          resizeMode='contain'
          style={{
            flex:0.7
          }}
        >
        <View style={{
          flexDirection:'row',
          justifyContent:'center',
          height:'50%'
        }}>
          <TouchableOpacity style={{
            width:'30%',
            height:40,
            borderRadius:4,
            backgroundColor:Colors.primary,
            justifyContent:'center'
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
        </ImageBackground>
       
        <View
          style={{
            paddingHorizontal:20
          }}
        >
          <Text
           style={{
            fontFamily:Font['poppins-bold'],
            fontSize:FontSize.large,
            marginBottom:20
           }}
          >
            About {item.name}
          </Text>
          <Text>
           {item.about}
          </Text>
          <Text
           style={{
            fontFamily:Font['poppins-bold'],
            fontSize:FontSize.large,
            marginTop:20
           }}
          >
            Gallary
          </Text>
          <Divider style={{marginBottom:20}} orientation="horizontal" width={2}/>

        </View>

        <View>
        <FlatList
           data={[{key:1, img1:img1, img2:img2, img3:img3 }
                  
          ]}
           renderItem={({item}) =>(
            <View style={{
              flexDirection:'row',
              justifyContent:'space-evenly',
              marginBottom:10
            }}>
               <TouchableOpacity>
                  <Image
                  source={item.img1}
                  style={{
                    width:100,
                    height:100
                  }}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Image
                  source={item.img2}
                  style={{
                    width:100,
                    height:100
                  }}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Image
                  source={item.img3}
                  style={{
                    width:100,
                    height:100
                  }}
                  />
                </TouchableOpacity>
            </View>
           )}
          />
        </View>
        </View>
      <TabBottom style={{flex:0.01}}/>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{
          
          width:"75%",
          height:'40%',
          borderRadius:10,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:"white",
          shadowColor:'#000',
          shadowOffset:{
            width:0,
            height:2,
          },
          shadowOpacity:0.25,
          shadowRadius:4,
          elevation:5,
          alignSelf:"center",
          position:"absolute",
          top:"35%",
          left:"12%"
        }}>
            <View style={{
              flex:1,
              justifyContent:'center'
            }}>
               <View style={{
                  flex:0.7,
                  marginTop:80,
                  fontSize:FontSize.large
                }}>
                <Text style={{
                  textAlign:'center',
                  fontSize:18
                }}>Voting Session open for:</Text>
                <Text style={{
                  marginTop:10,
                  textAlign:'center',
                  fontSize:50
                }}>{formatTime(remainingTime)}</Text>
               </View>
               <TouchableOpacity onPress={()=>{
                navigation.navigate('Voting')
                handleTimer
                setOverLay(false)
                closeModal
               }} style={{
                  flex:0.3,
                  justifyContent:'center',
                  backgroundColor:Colors.primary,
                  borderRadius:10,
                  padding:10,
                  marginTop:50,
                  marginBottom:20
               }}>
                <Text style={{
                  textAlign:'center',
                  color:'white'
                }}>Open voting page</Text>
               </TouchableOpacity>
            </View>
        </View>
      </Modal>
      {modalVisible && overLay &&(<View style={{position:'absolute',top:0,left:0,right:0,bottom:0, backgroundColor:'rgba(0,0,0,0.5)'}}></View>)}
      </SafeAreaView>
    );
  };
  

 