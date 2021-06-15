import React, {useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import InputOTPScreen from '../screens/InputOTPScreen';
import OtpTextViewScreen from '../screens/OtpTextViewScreen';
import ConfirmOtpScreen from '../screens/ConfirmOtpScreen';
import LoginWithPin from '../screens/LoginWithPin';

import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { cos } from 'react-native-reanimated';

const Stack = createStackNavigator();


const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [isPinSetup, setIsPinSetup] = useState(null);
    const [isLogin, setIsLogin] =  useState(null);
    let routeName = null;

  useEffect(() => {
    // AsyncStorage.getItem('alreadyLaunched').then(value => {
    //   if (value == null) {
    //     AsyncStorage.setItem('alreadyLaunched', 'true');
    //     setIsFirstLaunch(true);
    //   } else {
    //     setIsFirstLaunch(false);
    //   }
    // })

    readvalues();
    
  }, []);  

  const readvalues = async() => {
    try {
      await AsyncStorage.getItem('userToken').then(value => {
        if (value == null) {
          setUserToken(false);
        } else {
          setUserToken(true);
        }
      })
      await AsyncStorage.getItem('userPin').then(value => {
        if (value == null) {
          setIsPinSetup(false);
        } else {
          setIsPinSetup(true);
        }
      })
      await AsyncStorage.getItem('isLogedIn').then(value => {
        if (value == null) {
          setIsLogin(false);
        } else {
          setIsLogin(true);
        }
      })
    } catch(e) {
      console.log('error from reading value', e)
    }
  }

  // if (isFirstLaunch === null) {
  //   return null;
  // } else if (isFirstLaunch == true) {
  //     routeName = 'Onboarding';
  // } else 
  
  if (userToken === null) {
    return null
  } else if (userToken == false) {
    routeName = 'Login'
  }else if(isPinSetup == true && isLogin == false){
    routeName = 'LoginPin'
  } else if (isPinSetup == false && userToken == true){
    routeName = 'InputOTP'
  }

  if (routeName == null) {
    return null
  }
  

  return (
      <Stack.Navigator initialRouteName={routeName}>
        {/* <Stack.Screen 
            name="Onboarding" 
            component={OnboardingScreen}
            options={{header: () => null}} 
        /> */}
        <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{header: () => null}} 
        />
        <Stack.Screen 
            name="LoginPin" 
            component={LoginWithPin} 
            options={{header: () => null}} 
        />
        <Stack.Screen 
            name="InputOTP" 
            component={InputOTPScreen} 
            options={({navigation}) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#f9fafd',
                shadowColor: '#f9fafd',
                elevation: 0
              },
              headerLeft: () => (
                <View style={{marginLeft: 10}}>
                  <FontAwesome.Button 
                     name="long-arrow-left"
                     size={25}
                     backgroundColor="#f9fafd"
                     color="#333"
                     onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
        />

        <Stack.Screen 
            name="OtpTextView" 
            component={OtpTextViewScreen} 
            options={({navigation}) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#f9fafd',
                shadowColor: '#f9fafd',
                elevation: 0
              },
              headerLeft: () => (
                <View style={{marginLeft: 10}}>
                  <FontAwesome.Button 
                     name="long-arrow-left"
                     size={25}
                     backgroundColor="#f9fafd"
                     color="#333"
                     onPress={() => navigation.navigate('Login')}
                  />
                </View>
              ),
            })}
        />

        <Stack.Screen 
            name="ConfirmOtp" 
            component={ConfirmOtpScreen} 
            options={({navigation}) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#f9fafd',
                shadowColor: '#f9fafd',
                elevation: 0
              },
              headerLeft: () => (
                <View style={{marginLeft: 10}}>
                  <FontAwesome.Button 
                     name="long-arrow-left"
                     size={25}
                     backgroundColor="#f9fafd"
                     color="#333"
                     onPress={() => navigation.goBack()}
                  />
                </View>
              ),
            })}
        />

        <Stack.Screen 
            name="Signup" 
            component={SignupScreen}
            options={({navigation}) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#f9fafd',
                shadowColor: '#f9fafd',
                elevation: 0
              },
              headerLeft: () => (
                <View style={{marginLeft: 10}}>
                  <FontAwesome.Button 
                     name="long-arrow-left"
                     size={25}
                     backgroundColor="#f9fafd"
                     color="#333"
                     onPress={() => navigation.navigate('Login')}
                  />
                </View>
              ),
            })}
        />
      </Stack.Navigator>
  );
}

export default AuthStack;