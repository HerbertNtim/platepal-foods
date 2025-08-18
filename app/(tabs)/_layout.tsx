import useAuthStore from '@/store/auth.store'
import { Redirect, Tabs } from 'expo-router'

const TabLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href={'/sign-in'} />
  return (
    <Tabs>
      <Tabs.Screen name='index' options={{
        title: 'Home'
      }} />
    </Tabs>
  )
}

export default TabLayout
