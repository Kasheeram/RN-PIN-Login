import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


const ChatScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>ChatScreen</Text>
        </View>
    )
}

export default ChatScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f9fafd',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
});