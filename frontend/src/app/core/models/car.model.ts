export type CarData = {
  Entries: CarEntry[];
};

export type CarEntry = {
  Utc: string;
  Cars: {
    [key: string]: {
      Channels: CarChannels;
    };
  };
};

/**
 * @namespace
 * @property {number} 0 - RPM
 * @property {number} 2 - Speed number km/h
 * @property {number} 3 - gear number
 * @property {number} 4 - Throttle int 0-100
 * @property {number} 5 - Brake number boolean
 * @property {number} 45 - DRS
 */
export type CarChannels = {
  '0': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '45': number;
};
