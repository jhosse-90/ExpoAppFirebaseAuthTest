import { StyleSheet, Text, View, TextInput, Button, Alert, Image, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { auth, db } from '@/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';

const UserPostCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState<string | null>(null);

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
      //aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePostCreate = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create a post.');
      return;
    }

    let imageUrl = '';
    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `postImages/${user.uid}/${Date.now()}`);
      const img = await fetch(image);
      const bytes = await img.blob();
      await uploadBytes(storageRef, bytes);
      imageUrl = await getDownloadURL(storageRef);
    }

    const postRef = doc(collection(db, 'posts')); // Generate a new document reference
    const postData = {
      title,
      description,
      status,
      imageUrl,
      userId: user.uid,
      createdAt: new Date(),
    };

    try {
      await setDoc(postRef, postData);
      console.log("POST CREATED: ", postRef.id);
      Alert.alert('Success', 'Post created successfully!');
      setTitle('');
      setDescription('');
      setStatus('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
       onPress={() => router.navigate('/home')} style={styles.back}>
        <Icon name='chevron-left' size={20} color="#000" />
        <Text>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create a New Post</Text>
      {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />}
      <Button color={'black'} title="Pick an image" onPress={pickImage} />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <Button color={'yellowgreen'} title="Create Post" onPress={handlePostCreate} />
    </View>
  );
};

export default UserPostCreate;

const styles = StyleSheet.create({
  back: {
    gap: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginTop: 10,
    height: 40,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});