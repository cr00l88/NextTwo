import { Button, Text } from "./index";
import { useTheme } from "../hooks/useTheme";
import { StyleProp, ViewStyle } from "react-native";
import { useThemeMode } from "../hooks/useThemeMode";

interface IPrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const PrimaryButton = ({ title, onPress, style }: IPrimaryButtonProps) => {
  const { colors, sizes } = useTheme();
  const { mode } = useThemeMode();

  return (
    <Button
      center
      marginVertical={sizes.s}
      paddingVertical={sizes.sm}
      color={mode === "dark" ? colors.white : colors.black}
      radius={sizes.buttonRadius}
      onPress={onPress}
      style={style}
    >
      <Text body color={mode === "dark" ? colors.dark : colors.white}>
        {title}
      </Text>
    </Button>
  );
};

export default PrimaryButton;
