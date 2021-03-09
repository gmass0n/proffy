import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257E5',
    padding: 40
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },
  
  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180
  },

  description: {
    fontFamily: 'Poppins_400Regular',
    marginTop: 24,
    color: '#D4C2FF',
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 240,
  },

  button: {
    marginVertical: 40,
    backgroundColor: '#04D361',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center', 
    borderRadius: 8
  },

  buttonText: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    color: '#FFF'
  },

  rocketContainer: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center'
  },

  rocketText: {
    fontFamily: 'Poppins_400Regular',
    lineHeight: 20,
    marginLeft: 20,
    fontSize: 14,
    color: '#04D361'
  }
});

export default styles;