import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { colRef } from "../firebase";
  import { getDocs } from "firebase/firestore";

  const { height } = Dimensions.get("window");
  

  
  export default function WelcomeScreen({navigation}) {
    return (
      <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <View>
          <ImageBackground
            style={{
              height: height / 2.5,
            }}
            resizeMode="contain"
            source={require("../assets/images/welcome-img.png")}
          />
          <View
            style={{
              paddingHorizontal: Spacing * 4,
              paddingTop: Spacing * 4,
            }}
          >
            <Text
              style={{
                fontSize: FontSize.large,
                color: Colors.primary,
                fontFamily: Font["poppins-bold"],
                textAlign: "center",
              }}
            >
              Social Skills Builder, Alumin and Club engagement system
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: Spacing * 2,
              paddingTop: Spacing * 6,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{
                backgroundColor: Colors.primary,
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
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
                  fontSize: FontSize.large,
                  textAlign: "center",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={{
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
                borderRadius: Spacing,
              }}
            >
              <Text
                style={{
                  fontFamily: Font["poppins-bold"],
                  color: Colors.text,
                  fontSize: FontSize.large,
                  textAlign: "center",
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
