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
  }
})

export default styles;