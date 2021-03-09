import { StyleSheet } from "react-native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const PADDING_TOP = getStatusBarHeight() + 40;
const PADDING_BOTTOM = getStatusBarHeight() + 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7'
  },

  backgroundContainer: {
    backgroundColor: '#04D361',
    height: '40%',
    padding: 40,
    paddingTop: PADDING_TOP
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    height: 120,
    width: 120,
    resizeMode: 'contain'
  },

  content: {
    flex: 1,
    padding: 40,
    paddingBottom: PADDING_BOTTOM,
    justifyContent: 'center'
  },

  title: {
    color: '#DAD9E3',
    fontFamily: 'Archivo_500Medium',
    fontSize: 40
  },
  
  description: {
    color: '#6A617F',
    fontFamily: 'Poppins_500Medium',
    fontSize: 24,
    maxWidth: 210,
    marginTop: 40,
    marginBottom: 80,
    lineHeight: 34
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  indicatorsWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  indicator: {
    height: 5,
    width: 5,
    borderRadius: 1,
    backgroundColor: '#CCC',
    marginRight: 10
  },

  indicatorActive: {
    backgroundColor: '#04D361'
  }
})

export default styles;