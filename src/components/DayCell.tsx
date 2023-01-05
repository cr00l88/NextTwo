import React from "react";
import { StyleSheet } from "react-native";
import { Block, Icon } from "./index";
import { TDayCellType } from "../types/dayCell";
import { useTheme } from "../hooks/useTheme";

interface IDayCellProps {
  status: TDayCellType;
  size?: number;
}

const DayCell = ({ status, size = 18 }: IDayCellProps) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    cell: {
      width: size,
      height: size,
      borderRadius: 3,
    },
  });

  if (status === "TODAY_SUCCESS") {
    return (
      <Block color={colors.lightGray} style={styles.cell}>
        <Icon icon="dayCell_success" color={colors.black} />
      </Block>
    );
  } else if (status === "TODAY_TODO") {
    return (
      <Block color={colors.lightGray} style={styles.cell}>
        <Icon icon="dayCell_todo" color={colors.black} />
      </Block>
    );
  } else if (status === "SUCCESS") {
    return (
      <Block color={colors.black} style={styles.cell}>
        <Icon icon="dayCell_success" color={colors.white} />
      </Block>
    );
  } else if (status === "MISS") {
    return (
      <Block color={colors.black} style={styles.cell}>
        <Icon icon="dayCell_miss" color={colors.white} />
      </Block>
    );
  } else {
    return <Block color={colors.lightGray} style={styles.cell}></Block>;
  }
};

export default DayCell;
