import { Driver } from './driver.model';

export type DriverPositionBatch = {
  utc: string;
  positions: DriverPosition[];
};

export type DriverPosition = {
  driverNr: string;
  position: string;

  broadcastName: string;
  fullName: string;
  firstName: string;
  lastName: string;
  short: string;

  teamColor: string;

  // status: Driver['status'];

  x: number;
  y: number;
  z: number;
};
