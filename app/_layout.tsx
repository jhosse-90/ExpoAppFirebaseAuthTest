import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from '@/context/auth'
import {Slot} from 'expo-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const _layout = () => {

  return (
    <Provider>
      <Slot/>
    </Provider>
  )
}

export default _layout

const styles = StyleSheet.create({})