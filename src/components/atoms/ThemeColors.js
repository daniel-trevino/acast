import {
  deepPurple700,
  deepPurple100,
  deepPurple500,
  purpleA200,
  grey600,
  grey400,
  purple500,
  white,
  grey900,
  fullBlack
} from "material-ui/styles/colors";
import { fade } from "material-ui/utils/colorManipulator";

export default {
  fontFamily: "Roboto, sans-serif",
  palette: {
    primary1Color: deepPurple700,
    primary2Color: deepPurple100,
    primary3Color: deepPurple500,
    accent1Color: purpleA200,
    accent2Color: grey900,
    accent3Color: grey600,
    textColor: grey900,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey400,
    disabledColor: fade(grey900, 0.3),
    pickerHeaderColor: purple500,
    clockCircleColor: fade(grey900, 0.07),
    shadowColor: fullBlack
  },
  slider: {
    trackColor: white,
    selectionColor: purpleA200,
    trackColorSelected: white,
    rippleColor: deepPurple100,
    trackSize: 10,
    handleSize: 20,
    handleColorZero: purpleA200
  }
};
