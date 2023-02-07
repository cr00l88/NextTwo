export interface IPomodoro {
  isActive: boolean;
  time: TPomodoroTime;
}

export type TPomodoroTime = "15" | "30" | "60" | "120";
