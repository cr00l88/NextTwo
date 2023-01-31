import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  Canvas,
  Path,
  runSpring,
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

interface IProgressArcProps {
  cb?: () => void;
}

const ProgressArc = ({ cb }: IProgressArcProps) => {
  const progress = useValue(0.0);
  useEffect(() => {
    runTiming(progress, 1.0, { duration: 3000 }, () => {
      console.log("done");
      cb();
    });
  }, []);

  return (
    <Canvas style={{ flex: 1 }}>
      <Path
        path={SKIA_ARC_PATH}
        strokeWidth={STROKE_WIDTH}
        style="stroke"
        strokeCap="round"
        color="white"
        start={progress}
      />
    </Canvas>
  );
};

export default ProgressArc;
