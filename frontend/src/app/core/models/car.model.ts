export type F1CarData = {
  Entries: F1Entry[];
};

export type F1Entry = {
  Utc: string;
  Cars: {
    [key: string]: {
      Channels: F1CarDataChannels;
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
export type F1CarDataChannels = {
  "0": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "45": number;
};
