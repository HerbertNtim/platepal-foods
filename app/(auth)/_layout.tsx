import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'

const _LayoutAuth = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>_LayoutAuth</Text>
      </View>
      <Slot />
    </SafeAreaView>
  )
}

export default _LayoutAuth
