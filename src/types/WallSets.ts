interface imageSize {
  width: number;
  height: number;
}

interface WallSet {
  active: boolean;
  createdAt: string;
  createdAtNum: number;
  description: string;
  endedAt: string;
  endedAtNum: number;
  image: string;
  imageSize: imageSize;
  name: string;
  updatedAt: string;
  updatedAtNum: number;
}

export default interface WallSets {
  [key: string]: WallSet;
}
