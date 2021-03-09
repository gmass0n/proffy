import React, { useCallback } from 'react';
import { View, ImageBackground, Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import rocketIcon from '../../assets/images/icons/rocket.png';

import styles from './styles';

const GiveClasses: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToLanding = useCallback(() => {
    navigation.goBack();
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground 
        resizeMode="contain"
        source={giveClassesBgImage} 
        style={styles.content}
      >
        <Text style={styles.title}>
          Quer ser um Proffy?
        </Text>

        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa plataforma web.
        </Text>

        <View style={styles.rocketContainer}>
          <Image source={rocketIcon} />

          <Text style={styles.rocketText}>
            Prepare-se! {'\n'} 
            Vai ser o máximo
          </Text>
        </View>
      </ImageBackground>

     

      <RectButton 
        style={styles.button} 
        onPress={handleNavigateToLanding}
      >
        <Text style={styles.buttonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;