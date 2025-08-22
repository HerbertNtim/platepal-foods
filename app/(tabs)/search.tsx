import { Button, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import seed from '@/lib/seed'

const Search = () => {
  return (
    <SafeAreaView>
      <Text>Search</Text>

      <Button title="Seed" onPress={() => seed().catch((error) => console.log('Failed to seed data', error))} />
    </SafeAreaView>
  )
}

export default Search
