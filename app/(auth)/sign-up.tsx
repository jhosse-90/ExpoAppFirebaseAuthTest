import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, Platform, Image } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { useAuth } from '@/context/auth';
//From Colection users Details
import { doc, setDoc } from 'firebase/firestore';
//From Image User
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [image, setImage] = React.useState(null);

  const { setUser } = useAuth();

  const pickImage = async () => {
    // Ask for permission to access the camera roll
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled ) {
      setImage(result.assets[0].uri);
    } 

    console.log("IMAGE TO SAVE: " + result.assets[0].uri)
  };

  const onHandlerSignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      let photoURL = '';
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePhotos/${user.uid}`);
        const img = await fetch(image);
        const bytes = await img.blob();
        await uploadBytes(storageRef, bytes);
        photoURL = await getDownloadURL(storageRef);
      }
      // Save the username and other user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
        photoURL: photoURL,
      });
      console.log('PHOTO URL: ' + photoURL)
      setUser(user);
      console.warn('User registered and username saved in Firestore:', response);
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('An error occurred', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up or Register</Text>
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 0 }} />}
      <TouchableOpacity onPress={pickImage} style={styles.photoBtn}>
        <Text style={styles.textImage}>Pick an Image</Text>
      </TouchableOpacity>
      <Text style={{marginTop: 15}}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder='username'
        onChangeText={setUsername} />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} />
      <Button color={'black'} title='Sign Up!' onPress={onHandlerSignUp} />
      <TouchableOpacity onPress={() => router.replace('/sign-in')}>
        <Text style={styles.link}>Do you have an Account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 0,
    fontSize: 20,
    fontWeight: '800',
  },
  input: {
    color: '#303030',
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    //height: 30,
    width: 200,
    margin: 10,
    borderWidth: 1,
    padding: 5,
  },
  link: {
    marginTop: 40,
    color: '#0091f7',
  },
  photoBtn: {
    backgroundColor: 'black',
    padding: 6,
    borderRadius: 10,
  }, 
  textImage: {
    color: '#fff',
    fontWeight: 500,
  }
});