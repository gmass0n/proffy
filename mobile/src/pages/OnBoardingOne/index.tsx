import React, { useCallback } from 'react';
import { View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';

import onBoardingBgImage from '../../assets/images/onboardingprimary-background.png';

import studyIcon from '../../assets/images/icons/study.png';
import arrowRightIcon from '../../assets/images/icons/arrow-right.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const OnBoardingOne: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToOnboardingTwo = useCallback(() => {
    navigation.navigate('OnBoardingTwo');
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground 
          style={styles.background}
          resizeMode='contain'
          source={onBoardingBgImage}
        >
          <Image 
            source={studyIcon} 
            style={styles.icon}
          />
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          01.
        </Text>

        <Text style={styles.description}>
          Encontre vários professores para ensinar você
        </Text>

        <View style={styles.footer}>
          <View style={styles.indicatorsWrapper}>
            <View style={[styles.indicator, styles.indicatorActive]} />
            
            <View style={styles.indicator} />
          </View>

          <TouchableOpacity onPress={handleNavigateToOnboardingTwo}>
            <Image source={arrowRightIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>   
  );
}

export default OnBoardingOne;