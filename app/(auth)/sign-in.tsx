import { Text, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

const SignIn = () => {
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
      <CustomInput placeholder='Enter you email' value='' onChangeText={() => { }} label='Email' keyboardType='email-address' />
      <CustomInput placeholder='Enter you password' value='' onChangeText={() => { }} label='Password' secureTextEntry={true} />
      <CustomButton title='Sign in' />

      <View className='flex flex-row mt-5 gap-5 justify-center'>
        <Text className='base-regular text-gray-100'>
          Don&apos;t have an account?
        </Text>
        <Link href={'/sign-up'} className='base-bold text-primary'>
          Sign Up
        </Link>
      </View>
    </View>
  )
}

export default SignIn
