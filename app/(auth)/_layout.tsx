import { View, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { images } from '@/constants'

const _LayoutAuth = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
      <ScrollView className="bg-white h-full" style={{ height: Dimensions.get('screen').height / 2.25 }}>
        <View>
          <ImageBackground source={images.loginGraphic} className='size-full rounded-b-lg' resizeMode='stretch' />
          <Image source={images.logo} className='self-center size-48 absolute -bottom-16 z-10' />
        </View>
      </ScrollView>
      <Slot />
    </KeyboardAvoidingView>
  )
}

export default _LayoutAuth
