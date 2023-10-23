interface WallSet {
  active: boolean;
  createdAt: string;
  description: string;
  endedAt: string;
  image: string;
  imageSize: object;
  name: string;
  updatedAt: string;
}

export default interface WallSets {
  [key: string]: WallSet;
}
