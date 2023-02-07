import React, { useEffect } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types/rootNavigator";
import { Block, Text, Button, Icon } from "../components";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import ModalNavbar from "../components/ModalNavbar";
import { ILang, LANG_LIST } from "../assets/lang/langList";

const SelectLangScreen: React.FC<RootStackScreenProps<"SelectLangScreen">> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { colors, sizes } = useThemeStyles();
  const SELECTED = "en";

  const fade = useSharedValue(0.0);

  const rFadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fade.value,
    };
  });

  useEffect(() => {
    fade.value = withDelay(250, withSpring(0.2));
  }, []);

  const closeModal = () => {
    fade.value = withSpring(0.0);
    setTimeout(() => {
      navigation.goBack();
    }, 200);
  };

  const renderItem = ({ item }: { item: ILang }) => (
    <Block
      row
      justify="space-between"
      marginVertical={3}
      paddingVertical={8}
      paddingHorizontal={12}
      color={colors.light.framePressed}
    >
      <Text>{item.flag + " " + item.full}</Text>
      {SELECTED === item.short && (
        <Icon icon="dayCell_success" color={colors.black} />
      )}
    </Block>
  );

  return (
    <Block flex={1}>
      <Pressable onPress={closeModal} style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "black" },
            rFadeStyle,
          ]}
        />
      </Pressable>
      <Block modal color={colors.white} paddingBottom={insets.bottom}>
        <ModalNavbar
          showSeperator
          title="Select language"
          onPressClose={() => navigation.goBack()}
        />
        <FlatList
          style={{ padding: 16 }}
          data={LANG_LIST}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Block>
    </Block>
  );
};

export default SelectLangScreen;
