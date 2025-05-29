interface INotification {
  _id: string;
  isWatched: boolean;
  type: string;
  createdAt: string;
  data: any;
}

export { INotification };
