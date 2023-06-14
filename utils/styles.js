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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    width: 70,
    height: 70,
    margin: 10,
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
  activeButton: {
    borderColor: 'green',
  },
  topButtonsBar: {
    position: 'absolute',
    top: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    zIndex: 10,
  },
  topButton: {
    padding: 10,
  },
  icon: {
    color: '#fff',
  },
  buttonImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
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
