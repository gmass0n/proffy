import React, { useCallback } from 'react';
import { View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';

import onBoardingBgImage from '../../assets/images/onboardingsecondary-background.png';

import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import arrowRightIcon from '../../assets/images/icons/arrow-right.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const OnBoardingTwo: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToLanding = useCallback(() => {
    navigation.navigate('Landing');
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
            source={giveClassesIcon} 
            style={styles.icon}
          />
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          02.
        </Text>

        <Text style={styles.description}>
          Ou dê aulas sobre o que você mais conhece
        </Text>

        <View style={styles.footer}>
          <View style={styles.indicatorsWrapper}>
            <View style={styles.indicator} />
            
            <View style={[styles.indicator, styles.indicatorActive]} />
          </View>

          <TouchableOpacity onPress={handleNavigateToLanding}>
            <Image source={arrowRightIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>   
  );
}

export default OnBoardingTwo;