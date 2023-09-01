import { StyleSheet } from 'react-native';

const whiteColor = '#ffffff';
const blackColor = '#000000';
const greyLightColor = '#cccccc';
const greyDarkColor = '#333333';
const redColor = '#ff0000';
const redLightColor = '#ffcccc';
const redDarkColor = '#800000';
const greenColor = '#00ff00';
const greenLightColor = '#ccffcc';
const greenDarkColor = '#008000';
const blueColor = '#0000ff';
const blueLightColor = '#ccccff';
const blueDarkColor = '#000080';
const transparentColor = 'transparent';
const semiTransparentColor = 'rgba(0, 0, 0, 0.9)';
const commonMargin = 10;
const commonBorderRadius = 10;

// TODO #91 Split styles.js into multiple files
// TODO #92 Validate all styles are used
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
  aboutInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  aboutLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  aboutText: {
    color: whiteColor,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  aboutValue: {
    fontSize: 16,
  },
  activeButton: {
    borderColor: greenColor,
    borderWidth: 2,
  },
  bubble: {
    borderRadius: 50,
    position: 'absolute',
    transform: [{ scale: 0.2 }],
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: commonMargin,
    width: 70,
    height: 70,
    borderRadius: commonBorderRadius,
    backgroundColor: blackColor,
    borderWidth: 1,
  },
  buttonImage: {
    borderRadius: 10,
    height: 40,
    margin: 0,
    width: 40,
  },
  buttonViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
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
    flexWrap: 'flow',
    justifyContent: 'center',
    paddingBottom: 30,
    width: '100%',
  },
  checkBox: {
    alignItems: 'center',
    borderColor: whiteColor,
    borderRadius: 9,
    borderWidth: 2,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  checkboxContainer: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  colorModalConfirmButton: {
    alignItems: 'center',
    backgroundColor: blueLightColor,
    borderRadius: 5,
    marginTop: 20,
    padding: 15,
  },
  colorModalConfirmButtonText: {
    color: whiteColor,
    fontSize: 18,
  },
  colorModalContainer: {
    backgroundColor: blackColor,
    flex: 1,
    padding: 20,
  },
  colorModalPicker: {
    flex: 1,
  },
  colorModalPickerTitle: {
    color: whiteColor,
    fontSize: 20,
    marginBottom: 20,
  },
  colorModalSlider: {
    height: 40,
  },
  colorModalSliderContainer: {
    marginVertical: 10,
  },
  colorModalSliderLabel: {
    color: whiteColor,
    fontSize: 16,
    marginBottom: 5,
  },
  colorPickerModalContainer: {
    backgroundColor: blackColor,
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  colorPickerModalLabel: {
    color: whiteColor,
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  colorPickerModalSlider: {
    height: 40,
    marginTop: 10,
  },
  componentContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  horizontalLine: {
    borderBottomColor: whiteColor,
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    color: whiteColor,
  },
  inactiveButton: {
    borderColor: whiteColor,
  },
  input: {
    borderColor: whiteColor,
    borderWidth: 1,
    color: whiteColor,
    paddingHorizontal: commonMargin,
    paddingVertical: commonMargin / 2,
    borderRadius: commonBorderRadius,
    marginBottom: commonMargin,
    height: 40,
  },
  labelContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderWidth: 3,
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
  overlay: Object.assign({}, StyleSheet.absoluteFillObject, {
    justifyContent: 'center',
    alignItems: 'center',
  }),
  scrollContentContainer: {
    flexGrow: 1,
  },
  segmentTitle: {
    color: whiteColor,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    backgroundColor: whiteColor,
    height: 2,
    marginVertical: 20,
    width: '100%',
  },
  settingRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: commonMargin,
    paddingVertical: commonMargin / 2,
    borderRadius: commonBorderRadius,
    marginBottom: commonMargin,
    backgroundColor: blackColor,
    alignSelf: 'center',
  },
  parentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  settingsText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: '500',
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
    margin: 10,
    padding: 10,
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blackColor,
  },
  colorPickerWrapper: {
    margin: commonMargin,
    padding: commonMargin,
    backgroundColor: blackColor,
    borderRadius: commonBorderRadius,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGap: {
    height: 20,
  },
  confirmColorButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blackColor,
    borderWidth: 1,
    borderColor: whiteColor,
    padding: commonMargin,
    borderRadius: commonBorderRadius,
    marginRight: commonMargin / 2,
  },
  cancelColorButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blackColor,
    borderWidth: 1,
    borderColor: whiteColor,
    padding: commonMargin,
    borderRadius: commonBorderRadius,
    marginLeft: commonMargin / 2,
  },
  confirmColorButtonText: {
    color: whiteColor,
    fontWeight: 'bold',
  },
  cancelColorButtonText: {
    color: whiteColor,
    fontWeight: 'bold',
  },
  pickColorText: {
    fontSize: 16,
    color: whiteColor,
    padding: commonMargin / 2,
    borderRadius: commonBorderRadius,
  },
  pickColorBox: {
    borderRadius: commonBorderRadius,
    borderWidth: 1,
    padding: commonMargin / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstRunContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 90,
    backgroundColor: blackColor,
  },
  firstRunText: {
    textAlign: 'center',
    fontSize: 18,
    color: whiteColor,
  },
  nextButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: blackColor,
    color: whiteColor,
    borderRadius: 50,
    padding: 10,
    margin: 20,
  },
  sliderValueText: {
    color: whiteColor,
    fontSize: 16,
    marginLeft: 10,
  },
  welcomeMessageText: {
    color: whiteColor,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: blackColor,
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: 'column',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paginationContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  dotcontainer: {
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: whiteColor,
  },
  welcomeText: {
    color: whiteColor,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  nextButtonText: {
    color: whiteColor,
    fontSize: 18,
  },
  nextButtonContainer: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  nextButtonBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 0,
    paddingBottom: 0,
    alignSelf: 'center',
  },
  animationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundColorContainer: {
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blackColor, // Set background color to black
  },
});

export default styles;
