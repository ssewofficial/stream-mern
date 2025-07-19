import { NextFunction, Request, Response } from "express";

export type Route = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => Promise<any> | any;

export type Reaction = {
  type: string;
  userId: string;
  timestamp: Date;
};

export type User = {
  id: string;
  name: string;
  peerId: string;
};

export type Recording = {
  id: string;
  status: "recording" | "not-recording";
  startTime: Date;
  endTime?: Date;
  userId: string;
};

export type JoinRoomPayload = {
  roomId: string;
  name: string;
  users: User[];
  reactions?: Reaction[];
  recording?: Recording;
  timestamp?: Date;
};
