export interface IProductInterface {
  _id: string;
  mark: string;
  model: string;
  description: string;
  date: Date;
  startBid: number;
  isDone?: boolean;
  userId?: string;
  isStarted: boolean;
  isFinished: boolean;
  activeUser: string;
  liveUsers: string[];
}
