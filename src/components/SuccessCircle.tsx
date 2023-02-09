import React, { useEffect, memo } from "react";
import { useThemeStyles } from "../hooks/useThemeStyles";
import {
  Canvas,
  Circle,
  Path,
  runSpring,
  runTiming,
  useValue,
} from "@shopify/react-native-skia";

const SUCCESS_MARK_PATH = "M 15 27 L 23 35 L 39 19";

interface ISuccessCircleProps {
  size: number;
  ifAnimation: boolean;
}

const SuccessCircle = ({ size, ifAnimation }: ISuccessCircleProps) => {
  const { colors } = useThemeStyles();

  const endPosition = useValue(0.0);
  const opacity = useValue(0.0);

  useEffect(() => {
    runTiming(opacity, 1.0, { duration: 150 }, () => {
      runSpring(endPosition, 1.0);
    });
  }, []);

  if (ifAnimation) {
    return (
      <Canvas
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.white,
        }}
      >
        <Circle
          r={size / 2}
          cx={size / 2}
          cy={size / 2}
          color={colors.white}
          opacity={opacity}
        />
        <Path
          path={SUCCESS_MARK_PATH}
          color={colors.black}
          style="stroke"
          strokeWidth={4}
          end={endPosition}
        />
      </Canvas>
    );
  } else {
    return (
      <Canvas
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.white,
        }}
      >
        <Circle r={size / 2} cx={size / 2} cy={size / 2} color={colors.white} />
        <Path
          path={SUCCESS_MARK_PATH}
          color={colors.black}
          style="stroke"
          strokeWidth={4}
        />
      </Canvas>
    );
  }
};

export default memo(SuccessCircle);
