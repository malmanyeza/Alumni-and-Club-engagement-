import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView
  } from "react-native";
import React,{useState} from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import {db, auth} from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
  
  
export default function LoginScreen({navigation}) {

const [userEmail, setUserEmail] = useState("")
const [userPassword, setUserPassword] = useState('')
const [errortext, setErrortext] = useState('')
const [user, setUser] = useState(null)
const handleLoginPress = () =>{
  
  
  setErrortext('');
  if(!userEmail){
    alert ('Please fill email');
    return;
  }
  if(!userPassword){
    alert('Please fill password');
    return;
  }
  signInWithEmailAndPassword(auth,userEmail, userPassword)
  .then((user) =>{
    console.log(user);
    if(user) navigation.replace('Main')
    // const doc = getDoc(doc(db, "users",user.uid)).data()
  })
  .catch((error)=>{
    console.log(error);
    if(error.code ==="auth/invalid-email")
    alert(error.message);
    else if (error.code ==="auth/user-not-found")
    alert('No user found');
    else {
      alert("Please check your email id or password")
    }
  })

}

    return (
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <ScrollView>
        <View
          style={{
            padding: Spacing * 2,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSize.xLarge,
                color: Colors.primary,
                fontFamily: Font["poppins-bold"],
                marginVertical: Spacing * 3,
              }}
            >
              Login here
            </Text>
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                fontSize: FontSize.large,
                maxWidth: "60%",
                textAlign: "center",
              }}
            >
              Welcome back you've been missed!
            </Text>
          </View>
          <View
            style={{
              marginVertical: Spacing * 3,
            }}
          >
            <AppTextInput 
            placeholder="Email"
            onChangeText={(userEmail) =>
              setUserEmail(userEmail)
            }
            />
            <AppTextInput 
            placeholder="Password" 
            onChangeText={(userPassword)=>
              setUserPassword(userPassword)
            }
            />
          </View>
  
          <TouchableOpacity
            onPress={handleLoginPress}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 3,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{
              padding: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Create new account
            </Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
 