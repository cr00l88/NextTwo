import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Button, Icon, Text, Toggle } from "../components";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import SettingRow from "../components/SettingRow";
import ModalNavbar from "../components/ModalNavbar";

const SettingsScreen: React.FC<RootStackScreenProps<"SettingsScreen">> = ({
  navigation,
}) => {
  const { onDeleteAllHabits } = useHabitsContext();
  const [isNotify, setNotify] = useState<boolean>(false);
  const { colors, sizes } = useTheme();

  return (
    <Block flex={1} color="white">
      <ModalNavbar title="Settings" onPressClose={() => navigation.goBack()} />
      <Block paddingHorizontal={sizes.padding}>
        <SettingRow
          title="Dark mode"
          desc={`Let your eyes restand turn it\non`}
          icon="darkMode"
        >
          <Toggle
            onPress={() => setNotify(!isNotify)}
            initialState={isNotify}
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
            <Text h4>EN</Text>
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
    </Block>
  );
};

export default SettingsScreen;
