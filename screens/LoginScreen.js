import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import Users from '../model/Users';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const { login } = useContext(AuthContext);

    const handleSignInAction = async(username, password) => {
      const foundUser = Users.filter(item => {
          return item.email == username && item.password == password;
      });
      if (username.length == 0 || password.length == 0) {
          Alert.alert('Wrong input', 'Username field can not be empty.', [
              {text: 'Okay'}
          ])
          return
      }
      if (foundUser.length == 0) {
          Alert.alert('Invalid user', 'Username or password is incorrect', [
              {text: 'Okay'}
          ])
          return
      }
      // login(foundUser[0].userToken)
      const userToken = foundUser[0].userToken
      if (userToken != null) {
        moveToSetPINScreen(userToken);
      }
      // signIn(foundUser)
      
    } 

    const moveToSetPINScreen = async(userToken) => {
      try {
        await AsyncStorage.setItem('userToken', userToken);
        navigation.navigate('InputOTP', {userToken});
      } catch(e) {
          console.log(e);
      }
        
    }

    return(
       <View style={styles.container}>
           <Image style={styles.logo}
                source={require('../assets/rn-social-logo.png')}
            />
            <Text style={styles.text}>RN Social App</Text>
            <FontInput 
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType='email-address'
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FontInput 
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormButton
                buttonTitle="Sign In"
                onPress={() => handleSignInAction(email, password)}
            />
            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
                <Text style={styles.navButtonText}>Forget Password?</Text>
            </TouchableOpacity>
            {/* <SocialButton
                buttonTitle="Sign In with Facebook"
                buttonType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => navigation.navigate('InputOTP')}
                // onPress={() => navigation.navigate('OtpTextView')}
            />
            <SocialButton
                buttonTitle="Sign In with Google"
                buttonType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => {}}
            />
            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>Don't have an account? Create here</Text>
            </TouchableOpacity> */}
       </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f9fafd',
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 65,
      padding: 20,
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
    },
    text: {
    //   fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
    //   fontFamily: 'Lato-Regular',
    },
  });
