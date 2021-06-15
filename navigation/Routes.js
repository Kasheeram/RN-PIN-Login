import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';
import AuthStack from './AuthStack';
import AppStack from './AppStack';


const Routes = () => {

    const {user, setUser} = useContext(AuthContext);
    // const [userToken, setUserToken] = useState(false);
    const [initializing, setInitilizing] = useState(true);

    // const onAuthStateChanged = (user) => {
    //     setUser(user);
    //     if (initializing) setInitilizing(false);
    // }

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

    const readValueFromStorage = () => {
        AsyncStorage.getItem('isLogedIn').then(token => {
             console.log('token is', token)
             setUser(token) 
             if (initializing) setInitilizing(false);
        }).catch(e => {
             console.log('token is nothing')
             setUser(null)  
             if (initializing) setInitilizing(false); 
        })
        
     }

     useEffect(() => {
        readValueFromStorage()
    }, []);

    if (initializing) return null;

    console.log('user value', user)
    return (
        <NavigationContainer>
            { user ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    );
};


export default Routes;