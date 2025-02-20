import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '@/firebaseConfig';
import Icon from '@expo/vector-icons/FontAwesome6';
import { signOut } from '@firebase/auth';
import { useAuth } from '@/context/auth';
import { doc, getDoc } from 'firebase/firestore';
import { router } from 'expo-router';

const Home = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email ?? 'No Email');
        console.log("IN HOME USER DATA", user);
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username);
            setPhotoURL(userData.photoURL);
            console.log("IN HOME USER DATA DB", userData);
          } else {
            console.log("No such document!");
            //return fetchUserData() !Important !!
          }
      } else {
        setEmail('Not Authenticated');
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setEmail('Not Authenticated');
        setUser(null);
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E3DD75" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', flex: 0.5, justifyContent: 'center'}}>
        <Image source={{ uri: photoURL }} style={styles.profileImage} />
        <Text style={{ marginBottom: 5 }}>Welcome: {username}</Text>
        <Text style={{ marginBottom: 15 }}>Mail: {email}</Text>
      </View>
      <View style={{alignItems: 'center', flex: 0.5, justifyContent: 'flex-start'}}>
        <Text style={{fontWeight: 800, fontSize: 18}}>Actions</Text>
        <TouchableOpacity onPress={() => router.navigate('/home/screens/UserPostCreate')} style={styles.buttonCreatePost}>
          <Icon name='plus' size={20} color="#fff" />
          <Text style={styles.buttonText}>Create a Post :)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={styles.buttonSignOut}>
          <Icon name='arrow-right-from-bracket' size={20} color="#fff" />
          <Text style={styles.buttonText}>Sign Out :)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSignOut: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#FF4854',
    padding: 6,
    borderRadius: 10,
  },
  buttonCreatePost: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#051B2C',
    padding: 6,
    borderRadius: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 8,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#fff',
  },
});