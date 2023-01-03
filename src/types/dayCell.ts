export type TDayCellType =
  | "SUCCESS"
  | "MISS"
  | "TODAY_TODO"
  | "TODAY_SUCCESS"
  | "NEXT";

export interface IDay {
  id: number;
  status: TDayCellType;
  date: string;
}

export type IDayCellRow = Pick<IDay, "id" | "status">;

// export type  TCompareDayResult = Pick<TDayCellType,
