import { Button, Text } from "./index";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { StyleProp, ViewStyle } from "react-native";
import { useThemeMode } from "../hooks/useThemeMode";
import { size } from "@shopify/react-native-skia";

interface IPrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const PrimaryButton = ({ title, onPress, style }: IPrimaryButtonProps) => {
  const { colors, sizes } = useThemeStyles();
  const { mode } = useThemeMode();

  return (
    <Button
      center
      marginVertical={sizes.s}
      paddingVertical={sizes.sm}
      paddingHorizontal={sizes.xl}
      color={colors[mode].text}
      colorPressed={mode === "dark" ? "#D6D6D6" : "#2B2B2B"}
      radius={sizes.buttonRadius}
      onPress={onPress}
      style={style}
    >
      <Text body color={colors[mode].bg}>
        {title}
      </Text>
    </Button>
  );
};

export default PrimaryButton;
