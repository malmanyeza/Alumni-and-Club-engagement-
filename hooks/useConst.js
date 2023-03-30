import React,{createContext, useContext, useState, useEffect, useMemo} from "react";
import { db,auth, usersRef } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc,doc, onSnapshot, collection, updateDoc} from 'firebase/firestore';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { registerCustomIconType } from "react-native-elements";
import { async } from "@firebase/util";

const ConstContext = createContext({});

export const ConstProvider = ({children}) =>{

    const [nav, setNav] = useState('search');
    const [userData, setUserData] = useState(null);
    const [users, setUsers] = useState([])
    const [clubs, setClubs] = useState([])
    const [admins, setAdmins] = useState([])
    const [candidates, setCandidates] = useState([])

    //The state of the Modal overlay affected by pressing a button
    const [overLay, setOverLay] =useState(true)

    //this variable stores the state of submit vote button
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [modalVisible, setModalVisible] = useState(true)

    //these variables are used for a Voting timer 
    const [startTime, setStartTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(120)// 2 minutes

    //this code listens to the value
   
    
    useEffect(()=>{
      const countdownDoc = doc(db,'votingSession','countdown') 

      //Start the timer when the start time is set 
      if(startTime>0){
        const intervalId = setInterval(()=>{
          const now = Date.now();
          const elapsed = now - startTime;
          const remaining = Math.max(0, 120000 - elapsed);// 2 minutes in milliseconds
          setRemainingTime(remaining);
        }, 1000);

        //Stop the timer after 2 minutes
        setTimeout(()=>{
          clearInterval(intervalId);
          setRemainingTime(0);
          setStartTime(0);
          
          updateDoc(countdownDoc,{
            startTime:0             //Update time in firestore
          })
        },120000)
      }
      updateDoc(countdownDoc,{
        remainingTime,
        startTime            //Update time in firestore
      })
      
    },[remainingTime,startTime])

    const handleTimer = () =>{
      const now = Date.now();
      setStartTime(now);
      setRemainingTime(120000);
      const countdownDoc = doc(db,'votingSession','countdown')

      updateDoc(countdownDoc,{
        startTime:now,
        remainingTime:120000,           //Update time in firestore
      })
    }
    
    const formatTime = (ms)=>{
      const seconds = Math.floor(ms/1000);
      const minutes = Math.floor(seconds/60);
      const secondsLeft = seconds % 60;
      return `${minutes.toString().padStart(2,'0')}:${secondsLeft.toString().padStart(2,'0')}`;
    }
   

    //getting users with a specific club name

    useEffect(
        ()=>
        onAuthStateChanged(auth,async (user)=>{
         if(user){
           console.log(user.uid)
           const userDocSnapshot = await getDoc(doc(db, "users",user.uid))
           if(userDocSnapshot.exists()){
             const userData = userDocSnapshot.data();
             setUserData(userData);
             console.log(userData.name)
           }
         }else{
           console.log("user not found");
         }
        }),[]
      )

      useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db, 'users'),(snapshot)=>{
          setUsers(snapshot.docs.map((doc) =>({
            name:doc.name,
            ...doc.data()
          }) ))
        });

        return unsubscribe;
      }, []);

      useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db, 'clubs'),(snapshot)=>{
          setClubs(snapshot.docs.map((doc) =>({
            name:doc.name,
            ...doc.data()
          }) ))
        });

        return unsubscribe;
      }, []);

      useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db, 'candidates'),(snapshot)=>{
          setCandidates(snapshot.docs.map((doc) =>({
            id:doc.id,
            ...doc.data()
          }) ))
        });

        return unsubscribe;
      }, []);

    return(
        <ConstContext.Provider
           value={{
            nav, setNav, userData, 
            users, clubs, admins,
            candidates, setIsSubmitted, isSubmitted,
            modalVisible, setModalVisible,
            remainingTime, setStartTime, setRemainingTime,
            startTime, formatTime, handleTimer,
            overLay,setOverLay
          }}
        >
            {children}
        </ConstContext.Provider>
    )
}




export default function useConst() {
    return useContext(ConstContext);
}
