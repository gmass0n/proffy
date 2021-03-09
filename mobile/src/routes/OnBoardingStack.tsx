import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoardingOne from '../pages/OnBoardingOne';
import OnBoardingTwo from '../pages/OnBoardingTwo';

const { Navigator, Screen } = createStackNavigator();

const OnBoardingStack: React.FC = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="OnBoardingOne" component={OnBoardingOne} />

      <Screen name="OnBoardingTwo" component={OnBoardingTwo} />
    </Navigator>
  )
}

export default OnBoardingStack;