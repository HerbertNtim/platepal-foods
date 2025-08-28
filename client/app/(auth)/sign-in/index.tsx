import { Alert, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { signIn } from '@/lib/appwrite'
import * as Sentry from '@sentry/react-native'

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const submit = async () => {
    const { email, password } = form;

    if (!email || !password) return Alert.alert('Error', 'Please enter valid email & password');

    setIsSubmitting(true)

    try {
      // Call Appwrite Sign in function
      await signIn({ email, password })
      router.replace('/');
    } catch (error: any) {
      console.error('Sign in error:', error);
      Alert.alert('Error', error.message)
      Sentry.captureEvent(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-8'>
      <CustomInput placeholder='Enter you email' value={form.email} onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))} label='Email' keyboardType='email-address' />
      <CustomInput placeholder='Enter you password' value={form.password} onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))} label='Password' secureTextEntry={true} />
      <CustomButton title='Sign in' isLoading={isSubmitting} onPress={submit} style='p-3' textStyle='font-bold text-xl' />

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
