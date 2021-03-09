import { StyleSheet } from "react-native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const STATUS_BAR_HEIGHT = getStatusBarHeight();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257E5',
    paddingTop: STATUS_BAR_HEIGHT
  },
  
  content: {
    flex: 1,
    backgroundColor: '#F0F0F7'
  },

  teacherList: {
    marginTop: -40,
  },

  searchForm: {
    marginBottom: 40,
  },

  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular'
  },

  input: {
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16
  },

  inputPlaceholder: {
    color: '#aaa'
  },

  inputText: {
    color: '#444'
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputPrimary: {
    flex: 1,
    marginRight: 16
  },

  inputSecondary: {
    width: 132
  },

  submitButton: {
    height: 54,
    backgroundColor: '#04D361',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  
  submitButtonText: {
    color: '#fff',
    fontFamily: "Archivo_700Bold",
    fontSize: 16
  },

  filterButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: -14
  }
})

export default styles;