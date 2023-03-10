import { Dimensions, StyleSheet, View } from "react-native";
import React, { useCallback, useImperativeHandle, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { Block } from "./index";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const CORNER_RADIUS = 24;

type TBottomSheetProps = {
  children?: React.ReactNode;
};

export type TBottomSheetRefProps = {
  showModal: (contentHeight: number) => void;
  closeModal: () => void;
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<TBottomSheetRefProps, TBottomSheetProps>(
  ({ children }, ref) => {
    const insets = useSafeAreaInsets();
    const { colors } = useThemeStyles();
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const [contentHeight, setContentHeight] = useState(0);

    const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + insets.top;

    const showModal = useCallback((contentHeight: number) => {
      scrollTo(-contentHeight);
      active.value = true;
    }, []);

    const closeModal = useCallback(() => {
      scrollTo(0);
      active.value = false;
    }, []);

    const scrollTo = useCallback((destination: number) => {
      "worklet";
      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(
      ref,
      () => ({ showModal, closeModal, scrollTo, isActive }),
      [scrollTo, isActive]
    );

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          scrollTo(0);
          active.value = false;
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        }

        console.log(contentHeight);
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setContentHeight(height);
          }}
          style={[
            styles.bottomSheetContainer,
            rBottomSheetStyle,
            { backgroundColor: colors.white },
          ]}
        >
          <Block color={colors.gray} marginVertical={12} style={styles.bar} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: CORNER_RADIUS,
    borderTopRightRadius: CORNER_RADIUS,
  },
  bar: {
    width: 75,
    height: 4,
    alignSelf: "center",
    borderRadius: 2,
  },
});

export default BottomSheet;
