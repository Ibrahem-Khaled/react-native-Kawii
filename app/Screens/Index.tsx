import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './taps/Taps';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
const Index = () => {
    return (
        <NavigationContainer>
            <StatusBar style='light' backgroundColor='#000' translucent  />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="taps" component={MyTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Index;