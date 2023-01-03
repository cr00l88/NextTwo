import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

interface IInputProps extends TextInputProps {
  children?: React.ReactNode;
  border?: boolean;
  margin?: TextStyle["margin"];
  marginTop?: TextStyle["marginTop"];
  marginBottom?: TextStyle["marginBottom"];
  marginLeft?: TextStyle["marginLeft"];
  marginRight?: TextStyle["marginRight"];
  marginHorizontal?: TextStyle["marginHorizontal"];
  marginVertical?: TextStyle["marginVertical"];
  padding?: TextStyle["padding"];
  paddingTop?: TextStyle["paddingTop"];
  paddingBottom?: TextStyle["paddingBottom"];
  paddingLeft?: TextStyle["paddingLeft"];
  paddingRight?: TextStyle["paddingRight"];
  paddingHorizontal?: TextStyle["paddingHorizontal"];
  paddingVertical?: TextStyle["paddingVertical"];
  style?: StyleProp<TextInputProps>;
}

const Input = ({
  children,
  border,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingHorizontal,
  paddingVertical,
  style,
  ...props
}: IInputProps) => {
  const { sizes } = useTheme();

  const inputStyle = StyleSheet.flatten([
    border !== undefined && {
      borderColor: "#CBC6C6",
      borderRadius: sizes.inputRadius,
      borderWidth: sizes.inputBorder,
    },
    margin !== undefined && { margin },
    marginTop !== undefined && { marginTop },
    marginBottom !== undefined && { marginBottom },
    marginLeft !== undefined && { marginLeft },
    marginRight !== undefined && { marginRight },
    marginHorizontal !== undefined && { marginHorizontal },
    marginVertical !== undefined && { marginVertical },
    padding !== undefined && { padding },
    paddingTop !== undefined && { paddingTop },
    paddingBottom !== undefined && { paddingBottom },
    paddingLeft !== undefined && { paddingLeft },
    paddingRight !== undefined && { paddingRight },
    paddingHorizontal !== undefined && { paddingHorizontal },
    paddingVertical !== undefined && { paddingVertical },
    style,
  ]);
  return (
    <TextInput style={inputStyle} {...props}>
      {children}
    </TextInput>
  );
};

export default Input;
