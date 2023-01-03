import { Button, Text } from "./index";
import { useTheme } from "../hooks/useTheme";

interface IPrimaryButtonProps {
  title: string;
  onPress: () => void;
}

const PrimaryButton = ({ title, onPress }: IPrimaryButtonProps) => {
  const { colors, sizes } = useTheme();
  return (
    <Button
      center
      marginVertical={sizes.s}
      paddingVertical={sizes.sm}
      color={colors.black}
      radius={sizes.buttonRadius}
      onPress={onPress}
    >
      <Text body color={colors.white}>
        {title}
      </Text>
    </Button>
  );
};

export default PrimaryButton;
