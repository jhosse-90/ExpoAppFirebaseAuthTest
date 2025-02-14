import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import {router} from 'expo-router'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../firebaseConfig'

const signUp = () => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onHandlerSignUp = async () =>{
    const response = await  createUserWithEmailAndPassword(auth, email, password)
    console.warn(response);
  }

  return (
    <View style={styles.container}> 
      <Text style={{marginBottom: 40,
        fontSize: 20,
        fontWeight: 800
      }}>Sign Up or Register</Text>
      <Text>Email</Text>
      <TextInput style={styles.input}
      value={email} onChangeText={setEmail} >
      </TextInput>
      <Text>Password</Text>
      <TextInput  style={styles.input}
       value={password} onChangeText={setPassword} 
      secureTextEntry={true}>
      </TextInput>
      <Button color={'black'} title='Sign Up!' onPress={() => onHandlerSignUp()} />
      <TouchableOpacity onPress={() => router.replace('/sign-in')}>
        <Text style={{marginTop: 40, color: '#0091f7'}}>Do you have an Account?</Text>
      </TouchableOpacity>
    </View>
  )
}
export default signUp
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input:{
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
})