import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'
import { Host } from 'react-native-portalize';

import TeachersList from '../pages/TeachersList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

const StudyTabs: React.FC = () => {
  return (
    <Host>
      <Navigator 
        tabBarOptions={{
          labelPosition: 'beside-icon',
          inactiveTintColor: '#D4C2FF',
          activeTintColor: '#9871F5',
        }}
      >
        <Screen 
          name="TeachersList" 
          component={TeachersList} 
          options={{
            tabBarLabel: 'Proffys',
            tabBarIcon: ({ color }) => <Ionicons name="ios-easel" size={20} color={color} />
          }}
        />

        <Screen 
          name="Favorites" 
          component={Favorites} 
          options={{
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({ color }) => <Ionicons name="ios-heart" size={20} color={color} />
          }}
        />
      </Navigator>
    </Host>
  );
}

export default StudyTabs;