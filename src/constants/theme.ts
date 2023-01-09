import { ColorValue, StyleSheet } from "react-native";

export interface ISizes {
  base: number;
  text: number;
  padding: number;
  h5: number;
  title: number;
  buttonRadius: number;
  inputSize: number;
  inputRadius: number;
  inputBorder: number;
  modalRadius: number;
}

export interface IFontSizes {
  h3: number;
  h4: number;
  body: number;
  p: number;
}

export interface ISpacing {
  xs: number; // 4
  s: number; // 8
  sm: number; // 12
  m: number; // 16
  md: number; // 20
  l: number; // 24
  xl: number; // 28
  xxl: number; // 32
}

export interface ILineHeights {
  h3: number;
  h4: number;
  body: number;
  p: number;
  title: number;
  text: number;
}

export interface ILetterSpacing {
  title: number;
  text: number;
}

export interface IColors {
  // black: ColorValue;
  black: ColorValue;
  white: ColorValue;
  lightGray: ColorValue;
  gray: ColorValue;
  text: ColorValue;
  success: ColorValue;
  warining: ColorValue;
  error: ColorValue;
}

export interface ITheme {
  sizes: ISizes & IFontSizes & ISpacing;
  lineHeights: ILineHeights;
  letterSpacing: ILetterSpacing;
  colors: IColors;
}

const SIZES: ISizes = {
  // base size
  base: 8,
  text: 16,
  padding: 24,

  // text size
  h5: 20,
  title: 16,

  //button size
  buttonRadius: 4,

  //input size
  inputRadius: 8,
  inputSize: 40,
  inputBorder: StyleSheet.hairlineWidth,

  //modal
  modalRadius: 24,
};

const FONT_SIZES: IFontSizes = {
  h3: 24,
  h4: 20,
  body: 16,
  p: 14,
};

const SPACING: ISpacing = {
  xs: SIZES.base / 2, // 4
  s: SIZES.base, // 8
  sm: SIZES.base * 1.5, // 12
  m: SIZES.base * 2, // 16
  md: SIZES.base * 2.5, // 20
  l: SIZES.base * 3, // 24
  xl: SIZES.base * 3.5, // 28
  xxl: SIZES.base * 4, // 32
};

const LINE_HEIGHTS: ILineHeights = {
  h3: 32,
  h4: 24,
  body: 24,
  p: 20,
  title: Math.round(SIZES.title * 1.3),
  text: Math.round(SIZES.text * 1.6),
};

const LETTER_SPACING: ILetterSpacing = {
  title: -SIZES.title * 0.3,
  text: 0,
};

const COLORS: IColors = {
  black: "#090909",
  white: "#FFFFFF",
  lightGray: "#CFCCCC",
  gray: "#A3A3A3",
  text: "#000",
  success: "#5FE037",
  warining: "#FFCF51",
  error: "#FF4646",
};

export const THEME: ITheme = {
  sizes: { ...SIZES, ...FONT_SIZES, ...SPACING },
  lineHeights: LINE_HEIGHTS,
  letterSpacing: LETTER_SPACING,
  colors: COLORS,
};
