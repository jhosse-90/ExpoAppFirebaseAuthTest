import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore Content</Text>
    </View>
  )
}

export default explore

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  text :{
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    fontSize: 28,
    fontWeight: 800,
    color: '#fff',
    borderRadius: 10
  }
})