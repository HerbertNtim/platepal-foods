import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { CustomInputProps } from '@/type'
import cn from 'clsx'

const CustomInput = ({ placeholder, label, value, onChangeText, secureTextEntry, keyboardType }: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <View className='w-full'>
      <Text className='label'>{label}</Text>

      <TextInput autoCapitalize='none' autoCorrect={false} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} onFocus={() => setIsFocused(true)} placeholder={placeholder} onBlur={() => setIsFocused(false)} keyboardType={keyboardType} placeholderTextColor='#888' className={cn('input', isFocused ? 'border-primary' : 'border-gray-300')}/>
    </View>
  )
}

export default CustomInput
