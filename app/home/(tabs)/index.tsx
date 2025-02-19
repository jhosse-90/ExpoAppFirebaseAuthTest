import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '@/firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signOut } from '@firebase/auth';
import { useAuth } from '@/context/auth';
import { doc, getDoc } from 'firebase/firestore';

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
      <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 20 }}>Home</Text>
      <Image source={{ uri: photoURL }} style={styles.profileImage} />
      <Text style={{ marginBottom: 5 }}>Welcome: {username}</Text>
      <Text style={{ marginBottom: 15 }}>Mail: {email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Icon name='sign-out' size={20} color="#fff" />
        <Text style={styles.buttonText}>Sign Out :)</Text>
      </TouchableOpacity>
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'yellowgreen',
    padding: 6,
    borderRadius: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#fff',
  },
});