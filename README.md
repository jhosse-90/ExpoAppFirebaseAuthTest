# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


## Base SignUp 
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import {router} from 'expo-router'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { useAuth } from '@/context/auth'

const signUp = () => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const {setUser} = useAuth()

  const onHandlerSignUp = async () =>{
    const response = await  createUserWithEmailAndPassword(auth, email, password)
    console.warn(response);
    //
    if(response.user){
      setUser(response.user)
    }else{
      Alert.alert('An Error was ocurred')
    }

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
##

## Base Home
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
##
