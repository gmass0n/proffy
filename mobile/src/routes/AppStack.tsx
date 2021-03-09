import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import OnBoardingStack from './OnBoardingStack';
import Landing from '../pages/Landing';
import StudyTabs from './StudyTabs';
import GiveClasses from '../pages/GiveClasses';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="OnBoarding" component={OnBoardingStack} />

        <Screen name="Landing" component={Landing} />

        <Screen name="Study" component={StudyTabs} />

        <Screen name="GiveClasses" component={GiveClasses} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;