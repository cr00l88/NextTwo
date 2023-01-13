import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Button, Icon, Text, Toggle } from "../components";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import SettingRow from "../components/SettingRow";
import ModalNavbar from "../components/ModalNavbar";
import { useThemeMode } from "../hooks/useThemeMode";
import Reanimated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const SettingsScreen: React.FC<RootStackScreenProps<"SettingsScreen">> = ({
  navigation,
}) => {
  const { onDeleteAllHabits } = useHabitsContext();
  const [isNotify, setNotify] = useState<boolean>(false);
  const { colors, sizes } = useTheme();
  const { mode, onChangeMode } = useThemeMode();

  const progress = useDerivedValue(() => {
    return mode === "dark" ? withTiming(1) : withTiming(0);
  }, [mode]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.bg, colors.dark.bg]
    );

    return { backgroundColor };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.text, colors.dark.text]
    );

    return { color };
  });

  return (
    <Reanimated.View
      style={[
        {
          flex: 1,
          backgroundColor: mode === "light" ? colors.light.bg : colors.dark.bg,
        },
        rStyle,
      ]}
    >
      <ModalNavbar title="Settings" onPressClose={() => navigation.goBack()} />
      <Block paddingHorizontal={sizes.padding}>
        <SettingRow
          title="Dark mode"
          desc={`Let your eyes restand turn it\non`}
          icon="darkMode"
        >
          <Toggle
            onPress={() => onChangeMode(mode === "dark" ? "light" : "dark")}
            initialState={mode === "dark" ? true : false}
          />
        </SettingRow>
        <SettingRow
          title="Notification"
          desc={`We will notify you to take\nthe action`}
          icon="notification"
        >
          <Toggle
            onPress={() => setNotify(!isNotify)}
            initialState={isNotify}
          />
        </SettingRow>

        <SettingRow
          title="Language"
          desc="Change language of the app"
          icon="flag"
        >
          <Block row align="center">
            <AnimatedText h4 style={rTextStyle}>
              EN
            </AnimatedText>
            {/* <Text h4>EN</Text> */}
            <Icon icon="arrowRight" color={colors.gray} />
          </Block>
        </SettingRow>

        <SettingRow
          title="Delete all habits"
          desc={`All habits will be remove\npermanently.`}
          icon="trash"
        >
          <Button
            paddingHorizontal={sizes.s}
            onPress={() => onDeleteAllHabits()}
            color={colors.error}
          >
            <Text color={colors.white}>Delete</Text>
          </Button>
        </SettingRow>
      </Block>
    </Reanimated.View>
  );
};

const AnimatedText = Reanimated.createAnimatedComponent(Text);

export default SettingsScreen;
