import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    FlatList
  } from "react-native";
  import React,{useEffect, useState} from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import FontAwesome from '@expo/vector-icons/FontAwesome';
  import { Header,Divider } from "react-native-elements";
import useConst from "../hooks/useConst";
  

  const { height } = Dimensions.get("window");
  
  export default function DepartmentScreen({navigation}){

    const {clubs, users} = useConst()
    const bgimage = require('../assets/images/SE.jpg')
    const navigateToClubScreen = (item) =>{
      navigation.navigate('Club',{item})
    }
    
    const alumniList = users.filter(item => item.userType ==='alumni')
   
   
    return (
      <SafeAreaView style ={{flex:1, backgroundColor:'white'}}>
        
       <Header
         placement="center"
         leftComponent={<FontAwesome onPress={() =>navigation.goBack()}  name='arrow-left' size={20} color='white' /> }
         centerComponent={{ text: 'Software Engineering', style: { color: '#fff', fontFamily:Font['poppins-semiBold'], fontSize:FontSize.large}}}
         containerStyle={{
           borderBottomWidth:0,
           backgroundColor:Colors.primary,
           height:90,
           paddingHorizontal:20
       
         }}
       />
       <ScrollView nestedScrollEnabled={true} style={{}}>
       <Image
         source = {bgimage}
         style={{
          height:'35%',
          width:'100%',
          marginBottom:30
         }}
       />
       <View style={{
        paddingHorizontal:20
       }}>
        <Text
         style={{
          fontFamily:Font["poppins-bold"],
          fontSize:FontSize.large,
          marginBottom:10
         }}
        >
          About Sofware Engineering
        </Text>
        <Text>
          oeioo woeeieio wieiwoi ewouoe rowruo wrowur owuuor
          rowoon woro w wer owr orow w rworuowe roeuowr 
          ashlslfl slsfjoe s eise ieie o ewoise sljlsd
          lsdfjos l sje  sieflsf sielei  iejfsl slie icons
           ie feeilsfl seifils siie eiel  eiieru eurs iejfsl
           lsifei eiels islefjlfl slflief sl fei slsfjoe
           lsjfei siefje sije sleiejsl seij sle eijfsei seifils
        </Text>
        <Text
         style={{
          fontFamily:Font["poppins-bold"],
          fontSize:FontSize.large,
          marginVertical:10
         }}
        >
          Alimni
        </Text>
       </View>

       <FlatList
        nestedScrollEnabled={true}
        style={{
          borderRadius:10,
          borderColor:'gray',
          borderWidth:2,
          marginHorizontal:20,
          height:'50%',
        }}
        showsVerticalScrollIndicator={false}
        data ={alumniList}
        renderItem={({item}) =>(
          <View
            key={item.id}
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
            source={{uri:item.image}}
            style={{
              width:50,
              height:50,
              borderRadius:25,
              marginHorizontal:20
            }}
            />
            <View >
            <Text 
              style={{
                fontFamily:Font['poppins-bold'],
                fontSize:FontSize.large
              }}
            >{item.name}</Text>
            <Text>
              | {item.job} | {item.work}
            </Text>
            </View>
            </View>
           
            <TouchableOpacity>
            <FontAwesome style={{marginBottom:10}} name='comment' size={18} color='gray' />
            </TouchableOpacity>
          </View>
        )}
       />
       
       <Text
         style={{
          fontFamily:Font["poppins-bold"],
          fontSize:FontSize.large,
          marginHorizontal:20,
          marginVertical:20
         }}
        >
          Clubs
        </Text>
        <FlatList
          style={{paddingBottom:100}}
           data ={clubs}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} onPress={()=>navigateToClubScreen(item)} style={{
              height: 100,
              flexDirection: 'row',
              paddingHorizontal:20,
              alignItems:'center',
            }}>
              <Image
                source={{uri:item.profile}}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius:7,
                  margin:10,
                  borderWidth:2,
                  borderColor:'gray',
                  resizeMode:'contain'
                }} />
              <Divider style={{
                marginVertical:10,
                marginHorizontal:10
                }} orientation="vertical" width={2} />

              <View>
                <Text
                  style={{
                    fontFamily:Font["poppins-bold"],
                    fontSize:FontSize.large
                  }}
                >{item.name}
                </Text>
                <Text>
                  ({item.SEnum}/{item.size}) SE members
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
       </ScrollView>
      </SafeAreaView>
    );
  };
  
