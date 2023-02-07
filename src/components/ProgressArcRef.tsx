import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Dimensions } from "react-native";
import {
  Canvas,
  Path,
  runTiming,
  Skia,
  useValue,
} from "@shopify/react-native-skia";

const { width } = Dimensions.get("window");

const MARGIN_HORIZONTAL = 32;
const STROKE_WIDTH = 20;
const CENTER = width / 2;
const R = (width - STROKE_WIDTH) / 2 - MARGIN_HORIZONTAL;
const START_ANGLE = Math.PI;
const END_ANGLE = Math.PI * 2;

const X1 = CENTER - R * Math.cos(START_ANGLE);
const Y1 = -R * Math.sin(START_ANGLE) + CENTER;
const X2 = CENTER - R * Math.cos(END_ANGLE);
const Y2 = -R * Math.sin(END_ANGLE) + CENTER;

const ARC_PATH = `M ${X1} ${Y1} A ${R} ${R} 0 1 0 ${X2} ${Y2}`;
const SKIA_ARC_PATH = Skia.Path.MakeFromSVGString(ARC_PATH);

type TProgressArcProps = {
  color?: string;
  cb?: () => void;
};

export type TProgressArcRefProps = {
  reset: () => void;
  start: (time: number) => void;
};

const ProgreesArcRef = React.forwardRef<
  TProgressArcRefProps,
  TProgressArcProps
>(({ color = "white", cb }, ref) => {
  const progress = useValue(0.0);

  const reset = useCallback(() => {
    runTiming(progress, 0.0, { duration: 300 });
  }, []);

  const start = useCallback((time: number) => {
    runTiming(progress, 1.0, { duration: time }, cb);
  }, []);

  useImperativeHandle(ref, () => ({ reset, start }), [reset, reset]);

  return (
    <Canvas style={{ flex: 1 }}>
      <Path
        path={SKIA_ARC_PATH}
        strokeWidth={STROKE_WIDTH}
        style="stroke"
        strokeCap="round"
        color={color}
        start={progress}
      />
      <Path
        path={SKIA_ARC_PATH}
        strokeWidth={STROKE_WIDTH}
        style="stroke"
        strokeCap="round"
        color={color}
        opacity={0.1}
      />
    </Canvas>
  );
});

export default ProgreesArcRef;
