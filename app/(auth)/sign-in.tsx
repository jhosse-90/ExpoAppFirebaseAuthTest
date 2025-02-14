import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useAuth } from '@/context/auth'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'

const signIn = () => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const {setUser} = useAuth()

  const onHandlerSignIn = async () => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    if(!response?.user){
      Alert.alert('Error', 'Something went wrong')
    }
    setUser(response.user)
  }

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 40, fontSize: 20, fontWeight: 800}}>sign-in</Text>
      <Text>Mail</Text>
      <TextInput style={styles.input} onChangeText={setEmail}
      value = {email}>
      </TextInput>
      <Text>Password</Text>
      <TextInput style={styles.input} onChangeText={setPassword}
      value={password} secureTextEntry={true}>
      </TextInput>
      <Button color={'yellowgreen'} title='Sign-in '
      onPress={() => onHandlerSignIn()}/>
      <TouchableOpacity onPress={() => router.replace('/sign-up')} > 
        <Text style={{marginTop:40, color: 'red' }}>
        Don't you have an Account ? register
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default signIn
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'  
  },
  input: { height: 40, width: 200, margin: 12, borderWidth: 1, padding: 10
  }
})