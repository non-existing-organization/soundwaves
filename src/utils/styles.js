// styles.jsw
import {StyleSheet } from 'react-native';


const whiteColor = '#ffffff';
const blackColor = '#000000';
const redColor = '#ff0000';
const greenColor = '#00ff00';
const transparentColor = 'transparent';
const semiTransparentColor = 'rgba(0, 0, 0, 0.5)';


const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    borderRadius: 50, // Ensure round shape
    position: 'absolute',
    transform: [{ scale: 0.4 }], // Scale to create a reflection-like effect
  },
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
  loadingText: {
    color: whiteColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: semiTransparentColor,
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: transparentColor,
    borderColor: whiteColor,
    borderRadius: 15,
    borderWidth: 2,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  muteButton: {
    borderColor: redColor,
    borderWidth: 4,
  },
  noiseItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 6,
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
  spinnerContainer: {
    marginTop: 70,
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
  aboutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aboutLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  aboutValue: {
    fontSize: 16,
  },
  separator: {
    backgroundColor: whiteColor,
    height: 2,
    marginVertical: 20,
    width: '100%',
  },
  settingsText: {
    color: whiteColor,
    fontSize: 16,
    marginBottom: 20,
  },
  horizontalLine: {
    borderBottomColor: whiteColor,
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '100%',
  },
});




export default styles;
