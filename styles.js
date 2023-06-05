// styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'purple',
      borderWidth: 2,
      borderRadius: 30,
      width: 60,
      height: 60,
    },
    fadedButton: {
      opacity: 0.5,
    },
    buttonImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      margin: 4, // Adjust the gap between the border and the image
    },
    subButtonContainer: {
      position: 'absolute',
      top: -60,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    subButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginVertical: 5,
    },
    activeButton: {
      borderColor: 'green',
  },
  });


export default styles;
