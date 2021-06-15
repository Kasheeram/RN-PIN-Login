import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const ConfirmOtpScreen = ({navigation, route}) => {
    let textInput = useRef(null);
    let userPin = route.params.userPin;
    console.log('user pin from first screen', userPin);
    let clockCall = null
    const lengthInput = 4;
    const defaultCountdown = 30;
    const [internalVal, setInternalVal] = useState("");
    const [countdown, setCountdown] = useState(defaultCountdown);
    const [enableResend, setEnableResend] = useState(false);

    const { login } = useContext(AuthContext);

    const onChangeText = (val) => {
        setInternalVal(val)
        if (val.length === lengthInput){
            console.log('Move to Dashboard')
        }
    }

    // useEffect(() => {
    //     AsyncStorage.getItem('userToken').then(value => {
    //       if (value == null) {
    //         console.log('Logen in userToken is2', value);
    //         // AsyncStorage.setItem('alreadyLaunched', 'true');
    //         // setIsFirstLaunch(true);
    //       } else {
    //         // setIsFirstLaunch(false);
    //       }
    //     })
    //   }, []);  

    // useEffect(() => {
    //     clockCall = setInterval(() => {
    //         decrementClock();
    //     }, 1000)
    //     return () => {
    //         clearInterval(clockCall)
    //     }
    //     // textInput.focus();
    // });


    // const decrementClock = () => {
    //     if (countdown === 0) {
    //         setEnableResend(true);
    //         setCountdown(0);
    //         clearInterval(clockCall)
    //     } else {
    //         setCountdown(countdown - 1)
    //     }
        
    // }

    const handleSubmitButtonAction = async() => {
        if (userPin != internalVal) {
            Alert.alert('Wrong input', 'Confirm pin is different from the pin.', [
                {text: 'Okay'}
            ])
            return
        }
       
        try {
            await AsyncStorage.setItem('userPin', internalVal);
            login('true')
            // await AsyncStorage.setItem('isLogedIn', 'true');
          } catch(e) {
              console.log(e);
          }
        
        // AsyncStorage.getItem('userToken').then(value => {
        //     if (value == null) {
              
        //       // AsyncStorage.setItem('alreadyLaunched', 'true');
        //       // setIsFirstLaunch(true);
        //     } else {
        //       // setIsFirstLaunch(false);
        //       console.log('Logen in userToken is2', value);
        //       login(internalVal)
        //     }
        // })
        
    }

    // const onResendOTP = () => {
    //     if (enableResend) {
    //         setCountdown(defaultCountdown);
    //         setEnableResend(false);
    //         clearInterval(clockCall);
    //         clockCall = setInterval(() => {
    //             decrementClock()
    //         }, 1000)
    //     }
    // }

    // const onChangeNumber = () => {
    //     setInternalVal("")
    // }

    useEffect(() => {
        textInput.focus();
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'padding'}
                style={styles.containerAvoidingView}
            >
                <Text style={styles.textTitle}>{"Confirm your 4 digit PIN"}</Text>
                <View>
                    <TextInput
                        ref={(input) => textInput = input}
                        onChangeText={onChangeText}
                        style={{width: 0, height: 0}}
                        value={internalVal}
                        maxLength={lengthInput}
                        // returnKeyType="done"
                        keyboardType="numeric"
                    />
                    <View style={styles.containerInput}>
                        {
                            Array(lengthInput).fill().map((data, index) => (
                                <View
                                    key={index} 
                                    style={[
                                        styles.cellView,
                                        {
                                            borderBottomColor: index === internalVal.length ? '#FB6C6A' : '#234DB7'
                                        }
                                    ]}
                                >
                                    <Text 
                                        style={styles.cellText}
                                        onPress={() => textInput.focus()}
                                    >
                                        {internalVal && internalVal.length > 0 ? internalVal[index] : ""}
                                    </Text>
                                </View>
                            ))
                        }
                        
                    </View>
                    
                </View>
                <View style={styles.bottomView}>
                <FormButton
                        buttonTitle="Submit"
                        onPress={() => handleSubmitButtonAction()}
                    />
                    {/* <TouchableOpacity onPress={onChangeNumber}>
                        <View style={styles.btnChangeNumber}>
                            <Text style={styles.textChange}>Change number</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onResendOTP}>
                        <View style={styles.btnResend}>
                            <Text style={[
                                styles.textResend,
                                {
                                    color: enableResend ? '#234DB7' : 'gray'
                                }
                                ]}>Resend OTP ({countdown})</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

export default ConfirmOtpScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerAvoidingView: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    textTitle: {
        marginTop: 50,
        marginBottom: 50,
        fontSize: 16
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cellView: {
        paddingVertical: 11,
        width: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1.5,
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16
    },
    bottomView: {
        flexDirection: 'row',
        flex: 1,
        // justifyContent: 'flex-end',
        // marginBottom: 50,
        marginTop: 50
        // alignItems: 'flex-end'
    },
    btnChangeNumber: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems:'flex-start',
        justifyContent: 'center',
    },
    textChange: {
        color: '#234DB7',
        alignItems:'center',
        fontSize: 15
    },
    btnResend: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    textResend: {
        alignItems: 'center',
        fontSize: 15
    }

});