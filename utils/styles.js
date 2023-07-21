// styles.jsw
import {StyleSheet } from 'react-native';


const whiteColor = '#ffffff';
const blackColor = '#000000';
const redColor = '#ff0000';
const greenColor = '#00ff00';


const styles = StyleSheet.create({

  aboutButton: {
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    margin: 10,
    width: 60,
  },
  aboutButtonText: {
    color: whiteColor,
    fontSize: 16,
  },
  aboutText: {
    color: whiteColor,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  activeButton: {
    borderColor: greenColor,
    borderWidth: 2,
  },
  button: {
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    height: 70,
    justifyContent: 'center',
    margin: 10,
    width: 70,
  },
  buttonContainer: {
    alignItems: 'center',
    bottom: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    width: '100%',
  },
  buttonImage: {
    borderRadius: 10,
    height: 40,
    margin: 0,
    width: 40,
  },
  buttonViewStyle : {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonWrapper: {
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '20%',
  },
  buttonsContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 30,
    width: '100%',
  },
  container: {
    backgroundColor: blackColor,
    flex: 1,
  },
  fadedButton: {
    opacity: 0.5,
  },
  gradient: {
    flex: 1,
  },
  icon: {
    color: whiteColor,
  },
  inactiveButton: {
    borderColor: whiteColor,
  },
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  muteButton: {
    borderColor: redColor,
    borderWidth: 8,
  },
  noiseItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: whiteColor,
    paddingHorizontal: 20,
    paddingVertical: 50,
    flexDirection: 'column',
    alignItems: 'center',
  },
  loadingText: {
    color: whiteColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  spinnerContainer: {
    marginTop: 70,
  },
  noiseText: {
    color: whiteColor,
    fontSize: 16,
    marginLeft: 10,
  },
  noiseTextContainer: {
    flex: 1,
  },
  segmentTitle: {
    color: whiteColor,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  speakerButton: {
    padding: 10,
  },
  subButton: {
    borderRadius: 15,
    height: 30,
    marginVertical: 5,
    width: 30,
  },
  subButtonContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    top: -60,
  },
  topBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 50,
    paddingHorizontal: 16,
    width: '100%',
  },
  topButton: {
    padding: 10,
  },
  topButtonsBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
  },
});


export default styles;
