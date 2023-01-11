import { memo } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  ScrollViewProps,
  StatusBar,
  ViewProps,
} from "react-native";
import { StyleProp } from "react-native";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";

interface IBlockProps extends ViewProps, ScrollViewProps {
  id?: string;
  children?: React.ReactNode;
  scroll?: boolean;
  safe?: boolean;
  border?: boolean;
  flex?: ViewStyle["flex"];
  row?: boolean;
  shadow?: boolean;
  modal?: boolean;
  color?: ViewStyle["backgroundColor"];
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  margin?: ViewStyle["margin"];
  marginTop?: ViewStyle["marginTop"];
  marginBottom?: ViewStyle["marginBottom"];
  marginLeft?: ViewStyle["marginLeft"];
  marginRight?: ViewStyle["marginRight"];
  marginHorizontal?: ViewStyle["marginHorizontal"];
  marginVertical?: ViewStyle["marginVertical"];
  padding?: ViewStyle["padding"];
  paddingTop?: ViewStyle["paddingTop"];
  paddingBottom?: ViewStyle["paddingBottom"];
  paddingLeft?: ViewStyle["paddingLeft"];
  paddingRight?: ViewStyle["paddingRight"];
  paddingHorizontal?: ViewStyle["paddingHorizontal"];
  paddingVertical?: ViewStyle["paddingVertical"];
  style?: StyleProp<ViewStyle>;
}

const Block = ({
  id = "block",
  children,
  scroll,
  safe,
  border,
  flex,
  row,
  shadow,
  modal,
  color,
  align,
  justify,
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
}: IBlockProps) => {
  const { colors } = useTheme();

  const blockStyle = StyleSheet.flatten([
    border !== undefined && {
      borderWidth: 1,
      borderColor: colors.lightGray,
      borderRadius: 6,
    },
    shadow !== undefined && {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.6,

      elevation: 4,
    },
    modal !== undefined && {
      position: "absolute",
      bottom: 0,
      backgroundColor: colors.white,
      width: "100%",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    flex !== undefined && { flex },
    row !== undefined && { flexDirection: "row" },
    color !== undefined && { backgroundColor: color },
    align !== undefined && { alignItems: align },
    justify !== undefined && { justifyContent: justify },
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
  ]) as ViewStyle;

  const blockID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  const androidStatusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;

  if (scroll) {
    return (
      <ScrollView {...blockID} {...props} style={blockStyle}>
        {children}
      </ScrollView>
    );
  }

  if (safe) {
    return (
      <SafeAreaView
        {...blockID}
        {...props}
        style={[blockStyle, { paddingTop: androidStatusBarHeight }]}
      >
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={blockStyle} {...props}>
      {children}
    </View>
  );
};

export default memo(Block);
