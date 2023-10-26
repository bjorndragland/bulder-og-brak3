interface WallSet {
  active: boolean;
  createdAt: string;
  createdAtNum: number;
  description: string;
  endedAt: string;
  endedAtNum: number;
  image: string;
  imageSize: object;
  name: string;
  updatedAt: string;
  updatedAtNum: number;
}

export default interface WallSets {
  [key: string]: WallSet;
}
