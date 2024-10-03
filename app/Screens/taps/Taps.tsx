import React from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons'; // Import additional icons
import HomeScreen from './Home';
import DiscoverScreen from './DiscoverScreen';
import Add from './Add';
import CheckIsAuth from '../../Components/CheckIsAuth';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'الرئيسية') {
                        iconName = 'home';
                        return <AntDesign name={iconName} size={size} color={color} />;
                    } else if (route.name === 'استكشاف') {
                        iconName = 'search1';
                        return <AntDesign name={iconName} size={size} color={color} />;
                    } else if (route.name === 'إضافة') {
                        iconName = 'add-circle';
                        return <Ionicons name={iconName} size={33} color={color} />;
                    } else if (route.name === 'الإشعارات') {
                        iconName = 'bells';
                        return <AntDesign name={iconName} size={size} color={color} />;
                    } else if (route.name === 'الملف الشخصي') {
                        iconName = 'user';
                        return <AntDesign name={iconName} size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#ccc',
                headerShown: false,
                tabBarLabelStyle: { fontFamily: 'Cairo-SemiBold' },
                tabBarStyle: { backgroundColor: '#000' },
            })}
        >
            <Tab.Screen name="الرئيسية" component={HomeScreen} options={{ tabBarLabel: 'الرئيسية' }} />
            <Tab.Screen name="استكشاف" component={DiscoverScreen} options={{ tabBarLabel: 'استكشاف' }} />
            <Tab.Screen name="إضافة" component={Add} options={{ tabBarLabel: 'إضافة' }} />
            <Tab.Screen name="الإشعارات" component={CheckIsAuth} options={{ tabBarLabel: 'الإشعارات' }} />
            <Tab.Screen name="الملف الشخصي" component={CheckIsAuth} options={{ tabBarLabel: 'الملف الشخصي' }} />
        </Tab.Navigator>
    );
}
