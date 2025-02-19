import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '@/firebaseConfig'
import Icon from 'react-native-vector-icons/FontAwesome';
//from user data
import { doc, getDoc } from 'firebase/firestore';

const home = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    useEffect(() => {
      const fetchUserData = async () => {
        const user = auth.currentUser;
        if (user) {
          setEmail(user.email ?? 'No Email');
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username);
            setPhotoURL(userData.photoURL);
          }
        } else {
          setEmail('Not Authenticated');
        }
      };
  
      fetchUserData();
    }, [])

    const handleSignOut = () => {

    }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 28, fontWeight: 600, marginBottom: 20}}>home</Text>
      {photoURL && <Image source={{ uri: photoURL }} style={styles.profileImage} />}
      <Text style={{marginBottom: 15}}>
        Mail: {email} 
      </Text>
      <TouchableOpacity style={styles.button}>
        <Icon name='sign-out' size={20} color="#fff"/>
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
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 8,
    },
})