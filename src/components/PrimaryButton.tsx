import { Button, Text } from "./index";
import { useTheme } from "../hooks/useTheme";
import { StyleProp, ViewStyle } from "react-native";

interface IPrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const PrimaryButton = ({ title, onPress, style }: IPrimaryButtonProps) => {
  const { colors, sizes } = useTheme();
  return (
    <Button
      center
      marginVertical={sizes.s}
      paddingVertical={sizes.sm}
      color={colors.black}
      radius={sizes.buttonRadius}
      onPress={onPress}
      style={style}
    >
      <Text body color={colors.white}>
        {title}
      </Text>
    </Button>
  );
};

export default PrimaryButton;
