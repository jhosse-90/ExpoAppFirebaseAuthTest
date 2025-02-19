import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '@/firebaseConfig'
import { signOut } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const index = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
    } else {
      setEmail('Not authenticated');
    }
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setEmail('Not authenticated');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.details}>Mail:{email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Icon name="sign-out" size={20} color="#fff" />
        <Text style={styles.buttonText}>Sign Out :)</Text>
      </TouchableOpacity>
    </View> 
  );
};

export default index

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1, justifyContent: 'center', alignItems: 'center',
  }, 
  details: {
    marginBottom: 15
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'yellowgreen',
    padding: 6,
    borderRadius: 10
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#fff'
  },
})