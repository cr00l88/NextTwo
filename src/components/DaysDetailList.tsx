import { Block, Text, Icon } from "./";
import { IDay, TDayCellType } from "../types/dayCell";
import DayBlock from "./DayBlock";

interface IDaysDetailListProps {
  days: IDay[];
  colNums?: number;
}

const DaysDetailList = ({ days, colNums = 6 }: IDaysDetailListProps) => {
  const CELL_WIDTH = `${Math.floor(100 / colNums)}%`;

  const dayBlock = (day: IDay, i: number) => (
    <DayBlock key={i.toString()} day={day} width={CELL_WIDTH} />
  );

  return (
    <Block
      paddingBottom={8}
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {days.map((day, i) => dayBlock(day, i))}
    </Block>
  );
};

export default DaysDetailList;
