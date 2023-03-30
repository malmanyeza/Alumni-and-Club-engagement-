import React from 'react';
import { Tab, TabView, Divider, Header } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { FlatList, Text,SectionList, TouchableOpacity, View, SafeAreaView,Image, ImageBackground } from 'react-native';
import Colors from '../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import { useState,useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import TabBottom from '../components/Tab';
import Spacing from '../constants/Spacing';
import { onAuthStateChanged} from 'firebase/auth';
import { auth,db } from '../firebase';
import useConst from '../hooks/useConst';

const MainScreen = ({navigation}) => {

  const ref = React.useRef(null);
  const [index,setIndex] = useState(0);
  const {userData} = useConst();

  const backgroundimage = require('../assets/images/SE.jpg');
  const backgroundimage2 = require('../assets/images/CS.png');
  const backgroundimage3 = require('../assets/images/ISA.jpg');
  const backgroundimage4 = require('../assets/images/IT.jpg');

   
    
    return(
      
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
          <StatusBar backgroundColor='blue'/>
        <View style={{backgroundColor:Colors.primary}}>
          <View>
        <Header
          placement="center"
          leftComponent={<FontAwesome onPress={() =>navigation.goBack()}  name='arrow-left' size={20} color='white' /> }
          centerComponent={{ text:'', style: { color: '#fff', fontFamily:Font['poppins-semiBold'], fontSize:FontSize.large}}}
          rightComponent={<FontAwesome  name='ellipsis-v' size={20} color='white' />}
          containerStyle={{
            borderBottomWidth:0,
            backgroundColor:Colors.primary,
            height:90,
            paddingHorizontal:20
        
          }}
        />
        </View>

<Tab  
      containerStyle={{
        backgroundColor:'red',
        borderTopWidth:0,
        height:50,
        
      }}
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'white',
        height: 4,
        borderRadius:2   
      }}
      variant="primary"
    >
      <Tab.Item
        title="Departments"
        titleStyle={{ fontSize: 16 }}
        containerStyle={{
          backgroundColor: Colors.primary
        }}
        
      />
      <Tab.Item
        title="Clubs"
        titleStyle={{ fontSize: 16 }}
        containerStyle={{
          backgroundColor: Colors.primary
        }}
       
      />
    </Tab>
    </View>
    
    

          <TabView value={index} onChange={setIndex} >
            
            <TabView.Item style={{ width: '100%' }}>
            <FlatList
                    
                    
                   
                    stickyHeaderIndices={[]}
                    data={[{ subject: 'Software Engineering', key: 'item1', backgroundimage: backgroundimage, instractor:"Malcom Benza" },
                    { subject: 'Computer', key:'item2', backgroundimage: backgroundimage2, instractor:"Tanya Mhaka" },
                    { subject: 'Information technology', key:'item3', backgroundimage: backgroundimage3, instractor:"James Maponga"},
                    { subject: 'Security and Assurance', key:'item4', backgroundimage: backgroundimage4, instractor:"Melisa J"},
                    
                ]}
                    renderItem={({item}) =>(
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('Department')}
                        key={item.key}
                        style={{
                            marginTop:30, 
                            marginBottom:40,
                            width: "75%",
                            alignSelf:'center',
                            backgroundColor:'white',
                            borderRadius: Spacing,
                            borderColor:Colors.gray,
                            borderWidth:2,
                            shadowColor: Colors.primary,
                            padding:0,
                            height:175,
                            shadowOffset: {
                            width: 0,
                            height: Spacing,
                            
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: Spacing,
                        }}
                    >
                    
                    <ImageBackground
                         style={{
                            height: 170,
                            margin:0,
                            paddingVertical:30,
                            paddingLeft:15
                          }}
                         imageStyle={{
                            
                            borderRadius:Spacing,
                            
                        }}
                         resizeMode="cover"
                         source={item.backgroundimage}
                    >
                    
                    </ImageBackground>
                    <Text
                        style={{
                            paddingLeft:5,
                            paddingTop:10,
                            fontSize:FontSize.large,
                            color:Colors.darkText,
                            fontFamily:Font['poppins-semiBold']
                            
                        }}
                    >
                        {item.subject}
                    </Text>

                </TouchableOpacity>
                )}
                />
            </TabView.Item>
            <TabView.Item style={{width:'100%'}} >
              <>
                <ListItem>
              
                <ListItem.Content>
                  <ListItem.Title>Inbox</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
              <Divider orientation="horizontal" />
                <ListItem >
                  
                  <ListItem.Content>
                    <ListItem.Title>Trash</ListItem.Title>
              
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
                
                </>
            </TabView.Item>
            
          </TabView>
          <TabBottom/>
       
      </SafeAreaView>
        
    );
};

export default MainScreen;