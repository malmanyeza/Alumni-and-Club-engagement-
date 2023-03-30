import {
    SafeAreaView,
    Text,
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
  
  
export default function RegisterScreen({navigation}) {

const [userName, setUserName] = useState("")
const [userEmail, setUserEmail] = useState('')
const [userPassword, setUserPassword] =useState('')
const [errortext, setErrortext] = useState('')

const handleRegister =()=>{
  setErrortext("")
  if(!userEmail) return alert ("Please fill email")
  if(!userPassword) return alert ("Please fill password")

  createUserWithEmailAndPassword(
    auth,
    userEmail,
    userPassword
  )
  .then((cred) =>{
    setDoc(doc(db,"users", cred.user.uid),{
      name: userName
    })
    console.log("Registration Successful. Please login to success");
    console.log(cred);
    navigation.replace("Main")
  })
  .catch((error) =>{
    console.log(error);
    if (error.code === "auth/email-already-in-use"){
      setErrortext("That email is already in use!")
    }else{
      setErrortext(error.message);
    }
  })
}

    return (
      <SafeAreaView>
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
              Create account
            </Text>
            <Text
              style={{
                fontFamily: Font["poppins-regular"],
                fontSize: FontSize.small,
                maxWidth: "80%",
                textAlign: "center",
              }}
            >
              Create an account to start learning
            </Text>
          </View>
          <View
            style={{
              marginVertical: Spacing * 3,
            }}
          > 
           <AppTextInput 
            placeholder="UserName"
            onChangeText={(userName)=>
              setUserName(userName)
            } 
            />
            <AppTextInput 
            placeholder="Email"
            onChangeText={(userEmail)=>
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
            onPress={handleRegister}
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
              Sign up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
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
              Already have an account
            </Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  