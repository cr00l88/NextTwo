import { useState } from "react";
import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Button, Icon, Text, Switch } from "../components";
import Reanimated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useThemeMode } from "../hooks/useThemeMode";
import SettingRow from "../components/SettingRow";
import ModalNavbar from "../components/ModalNavbar";
import { StatusBar } from "react-native";
import Snackbar from "../components/Snackbar";

const SettingsScreen: React.FC<RootStackScreenProps<"SettingsScreen">> = ({
  navigation,
}) => {
  const { onDeleteAllHabits } = useHabitsContext();
  const [isNotify, setNotify] = useState<boolean>(false);
  const { colors, sizes } = useThemeStyles();
  const { mode, onChangeMode } = useThemeMode();

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

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
      <StatusBar barStyle="light-content" />
      <ModalNavbar title="Settings" onPressClose={() => navigation.goBack()} />
      <Block paddingHorizontal={sizes.padding}>
        <SettingRow
          title="Dark mode"
          desc={`Let your eyes restand turn it on`}
          icon="darkMode"
        >
          <Switch
            onValueChange={() =>
              onChangeMode(mode === "dark" ? "light" : "dark")
            }
            value={mode === "dark"}
          />
        </SettingRow>
        <SettingRow
          title="Notification"
          desc={`We will notify you to take the action`}
          icon="notification"
        >
          <Switch onValueChange={() => setNotify(!isNotify)} value={isNotify} />
        </SettingRow>

        <SettingRow
          title="Language"
          desc="Change language of the app"
          icon="flag"
        >
          <Button
            radius={4}
            color={colors[mode].frame}
            colorPressed={colors[mode].framePressed}
            paddingHorizontal={6}
            paddingVertical={4}
            onPress={() => navigation.navigate("SelectLangScreen")}
          >
            <Block row align="center">
              <Text animated h4 style={rTextStyle}>
                EN
              </Text>
              {/* <Text h4>EN</Text> */}
              <Icon icon="arrowRight" color={colors.gray} />
            </Block>
          </Button>
        </SettingRow>

        <SettingRow
          title="Delete all habits"
          desc={`All habits will be remove permanently.`}
          icon="trash"
        >
          <Button
            paddingHorizontal={sizes.s}
            onPress={() => {
              onDeleteAllHabits();
              setShowSnackbar(true);
            }}
            color={colors.error}
          >
            <Text color={colors.white}>Delete</Text>
          </Button>
        </SettingRow>
      </Block>

      {showSnackbar && (
        <Snackbar
          type="success"
          onDismiss={setShowSnackbar}
          message="Success. All habits deleted."
        />
      )}
    </Reanimated.View>
  );
};

export default SettingsScreen;
