import { Alert, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { createUser } from '@/lib/appwrite'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const submit = async () => {
    const { name, email, password } = form;

    if (!name || !email || !password) return Alert.alert('Error', 'Please enter valid email & password & name');

    setIsSubmitting(true)

    try {
      // Call Appwrite Sign in function
      await createUser({ name, email, password })
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-3'>
      <CustomInput placeholder='Enter you name' value={form.name} onChangeText={(text) => setForm(prev => ({ ...prev, name: text }))} label='Name' />
      <CustomInput placeholder='Enter you email' value={form.email} onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))} label='Email' keyboardType='email-address' />
      <CustomInput placeholder='Enter you password' value={form.password} onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))} label='Password' secureTextEntry={true} />
      <CustomButton title='Sign Up' isLoading={isSubmitting} onPress={submit} textStyle='font-bold text-xl' />

      <View className='flex flex-row mt-5 gap-5 justify-center'>
        <Text className='base-regular text-gray-100'>
          Already having an account?
        </Text>
        <Link href={'/sign-in'} className='base-bold text-primary'>
          Sign in
        </Link>
      </View>
    </View>
  )
}

export default SignUp
