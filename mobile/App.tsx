import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_700Bold, Archivo_500Medium, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_500Medium ,Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  })

  if(!fontsLoaded) {
    return <AppLoading />
  } 
    return (
      <>
        <AppStack />

        <StatusBar style="light" />
      </>
    );
  
}
