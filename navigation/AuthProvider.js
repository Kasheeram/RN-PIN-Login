import React, { useState, createContext } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';



export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async(isLogedIn) => {
                    console.log('is user logged in', isLogedIn);
                    try {
                        setUser(isLogedIn);
                        await AsyncStorage.setItem('isLogedIn', isLogedIn);
                        // await AsyncStorage.setItem('userPin', userPin);
                        // await auth().signInWithEmailAndPassword(email, password);
                    } catch(e) {
                        console.log(e);
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch(e) {
                        console.log(e);
                    }  
                },
                logout: async () => {
                    try {
                        await AsyncStorage.removeItem('isLogedIn')
                        setUser(null);
                    } catch(e) {
                        console.log(e);
                    }
                } 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}