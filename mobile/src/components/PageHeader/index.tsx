import React, { useCallback } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface PageHeaderProps {
  title: string;
  headerRight?: React.ReactNode; 
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children, headerRight }) => {
  const navigation = useNavigation();
  
  const handleNavigateToLanding = useCallback(() => {
    navigation.navigate('Landing');
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleNavigateToLanding}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>

        {headerRight && headerRight}
      </View>

      {children}
    </View>
  )
}

export default PageHeader;