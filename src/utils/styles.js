// styles.jsw
import { StyleSheet } from "react-native";

const whiteColor = "#ffffff";
const blackColor = "#000000";
const greyLightColor = "#cccccc";
const greyDarkColor = "#333333";
const redColor = "#ff0000";
const redLightColor = "#ffcccc";
const redDarkColor = "#800000";
const greenColor = "#00ff00";
const greenLightColor = "#ccffcc";
const greenDarkColor = "#008000";
const blueColor = "#0000ff";
const blueLightColor = "#ccccff";
const blueDarkColor = "#000080";
const transparentColor = "transparent";
const semiTransparentColor = "rgba(0, 0, 0, 0.9)";

const styles = StyleSheet.create({
  aboutButton: {
    alignItems: "center",
    height: 60,
    justifyContent: "center",
    margin: 10,
    width: 60,
  },
  aboutButtonText: {
    color: whiteColor,
    fontSize: 16,
  },
  aboutInfo: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  aboutLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  aboutText: {
    color: whiteColor,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  aboutValue: {
    fontSize: 16,
  },
  activeButton: {
    borderColor: greenLightColor,
    borderWidth: 2,
  },
  bubble: {
    borderRadius: 50,
    position: "absolute",
    transform: [{ scale: 0.2 }],
  },
  button: {
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 2,
    height: 70,
    justifyContent: "center",
    margin: 10,
    width: 70,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonGap: {
    height: 20,
  },
  buttonImage: {
    borderRadius: 10,
    height: 40,
    margin: 0,
    width: 40,
  },
  buttonViewStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    width: "20%",
  },
  buttonsContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "flow",
    justifyContent: "center",
    paddingBottom: 30,
    width: "100%",
  },
  cancelColorButton: {
    alignItems: "center",
    backgroundColor: redDarkColor,
    borderColor: whiteColor,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
    padding: 15,
  },
  cancelColorButtonText: {
    color: whiteColor,
    fontWeight: "bold",
  },
  checkBox: {
    alignItems: "center",
    borderColor: whiteColor,
    borderRadius: 9,
    borderWidth: 2,
    height: 18,
    justifyContent: "center",
    width: 18,
  },
  checkboxContainer: {
    alignItems: "center",
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  colorModalConfirmButton: {
    alignItems: "center",
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
    justifyContent: "space-between",
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
  colorPickerWrapper: {
    backgroundColor: blackColor,
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },
  componentContainer: {
    flex: 0.5,
    justifyContent: "center",
  },
  confirmColorButton: {
    alignItems: "center",
    backgroundColor: greenDarkColor,
    borderColor: whiteColor,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
    padding: 15,
  },
  confirmColorButtonText: {
    color: whiteColor,
    fontWeight: "bold",
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
    width: "100%",
  },
  icon: {
    color: whiteColor,
  },
  inactiveButton: {
    borderColor: whiteColor,
  },
  input: {
    borderColor: whiteColor,
    borderRadius: 5,
    borderWidth: 1,
    color: whiteColor,
    marginBottom: 10,
    marginTop: 5,
    padding: 10,
    textAlign: "center",
  },
  labelContainer: {
    flex: 0.5,
    justifyContent: "center",
  },
  loadingText: {
    color: whiteColor,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  mainContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  modalBackground: {
    alignItems: "center",
    backgroundColor: blackColor,
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: semiTransparentColor,
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: transparentColor,
    borderColor: whiteColor,
    borderRadius: 15,
    borderWidth: 2,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  muteButton: {
    borderColor: redColor,
    borderWidth: 4,
  },
  noiseItem: {
    alignItems: "center",
    flexDirection: "row",
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
    justifyContent: "center",
    alignItems: "center",
  }),
  scrollContentContainer: {
    flexGrow: 1,
  },
  segmentTitle: {
    color: whiteColor,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  separator: {
    backgroundColor: whiteColor,
    height: 2,
    marginVertical: 20,
    width: "100%",
  },
  settingRow: {
    flexDirection: "row",
    padding: 16,
  },
  settingsText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
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
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
  },
  topBarContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 50,
    paddingHorizontal: 16,
    width: "100%",
  },
  topButton: {
    padding: 10,
  },
  topButtonsBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 54,
  },
});

export default styles;
