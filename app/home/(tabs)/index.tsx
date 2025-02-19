import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '@/firebaseConfig'
import Icon from 'react-native-vector-icons/FontAwesome';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { router } from 'expo-router';
import {useAuth} from '@/context/auth'

const home = () => {
    const [email, setEmail] = useState('')

    const {setUser} = useAuth()

    useEffect(() => {
        const user = auth.currentUser;
        if(user){
            setEmail(user.email)
        }else{
            setEmail('Not Authenticated')
        }
    }, [])

    const handleSignOut = () => {
      signOut(auth)
      .then(() => {
        setEmail('Not Authentiqued')
        setUser(null)
      })
      .catch((error) => {
        console.error('Error SignOut: ', error)
      })
    }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 32}}>home</Text>
      <Text style={{marginTop: 15, marginBottom: 15}}>
        Mail: {email}
      </Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Icon name='sign-out' size={20} color="#fff"/>
        <Text style={styles.buttonText}>Singn Out :)</Text>
      </TouchableOpacity>
    </View>
  )
}
export default home
const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    button: {
      flexDirection: 'row', alignItems: 'center', 
      marginTop: 20, backgroundColor: 'yellowgreen',
      padding: 6, borderRadius: 10
    }, 
    buttonText: {
      marginLeft: 10,
      fontSize: 14,
      color: '#fff'
    }
})