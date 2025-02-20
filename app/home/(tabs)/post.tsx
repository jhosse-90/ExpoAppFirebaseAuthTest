import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';
import Icon from '@expo/vector-icons/FontAwesome6';


const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (querySnapshot) => {
      const postsData = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }));
      //.filter(post => post.status === "1"); // Filter posts with status '1'
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching posts:', error);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (postId, currentStatus) => {
    try {
      const newStatus = currentStatus === '1' ? '0' : '1';
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, { status: newStatus });
      setPosts(posts.map(post => post.id === postId ? { ...post, status: newStatus } : post));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="yellowgreen" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.postImage} />}
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postDescription}>{item.description}</Text>
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <Text style={styles.postStatus}>Status: {item.status}</Text>
        <TouchableOpacity onPress={() => handleUpdateStatus(item.id, item.status)} style={{}}>
          <Icon name='pen' size={15} color="#0BDBC7" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  postStatus: {
    fontSize: 15,
    color: '#000',
  },
});