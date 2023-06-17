// styles.jsw
import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: screenWidth > 480 ? screenWidth * 0.3 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 10,
  },
  aboutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    margin: 10,
  },
  aboutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  fadedButton: {
    opacity: 0.5,
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    width: 70,
    height: 70,
    margin: 10,
  },
  inactiveButton: {
    borderColor: 'white',
  },
  activeButton: {
    borderColor: 'green',
  },
  muteButton: {
    borderColor: 'red',
  },
  topButton: {
    padding: 10,
  },
  topButtonsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 54,
  },
  icon: {
    color: '#fff',
  },
  buttonImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    margin: 0,
  },
  noiseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  noiseTextContainer: {
    flex: 1,
  },
  noiseText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  segmentTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },


});


export default styles;
