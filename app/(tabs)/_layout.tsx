import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import { router, Tabs } from 'expo-router'
import { Image, Text, View } from 'react-native'
import cn from 'clsx'
import { TabBarIconProps } from '@/type'

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
  return (
    <View className='tab-icon'>
      <Image source={icon} className='size-7' resizeMode='contain' tintColor={focused ? '#FE8C00' : '#5D5F6D'} />
      <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-200')}>{title}</Text>
    </View>
  )
}

const TabLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return router.replace('/sign-in');
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, marginHorizontal: 20, height: 80, position: 'absolute', bottom: 40, backgroundColor: 'white', shadowColor: '#1a1a1a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 } }}>
      <Tabs.Screen name='index' options={{
        title: 'Home',
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.home} title='Home' />
      }} />
      <Tabs.Screen name='search/index' options={{
        title: 'Search',
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.search} title='Search' />
      }} />
      <Tabs.Screen name='cart/index' options={{
        title: 'Cart',
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.bag} title='Cart' />
      }} />
      <Tabs.Screen name='profile/index' options={{
        title: 'Profile',
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.person} title='Profile' />
      }} />
    </Tabs>
  )
}

export default TabLayout
