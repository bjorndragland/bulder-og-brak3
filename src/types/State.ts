import type WallSets from "./WallSets";
import type Problem from "./Problem";

// interface Problem {
//   problemId: string;
//   name: string;
//   description: string;
//   grade: string;
//   gradeNum: number;
//   createdAt: string;
//   createdAtNum: number;
//   setter: string;
//   image: string;
//   set: string;
//   updatedAt: string;
//   updatedAtNum: number;
//   userId: string;
//   problemHolds: ProblemHolds;
// }

interface Problems {
  [key: string]: Problem;
}

interface ProblemSortOrder {
  problemId: string;
}

interface setImageUrls {
  [key: string]: string;
}

interface ProblemHold {
  posX: number;
  posY: number;
  sizeNum: number;
  typeNum: number;
}

interface ProblemHolds {
  [key: string]: ProblemHold;
}

export default interface State {
  preferredSortFromFB: string;
  currentSetFromFB: string;
  lastSizeNum: number;
  lastTypeNum: number;
  appState: string;
  selectedHoldFBId: string;
  problemsLocal: Problems;
  problemsFB: Problems;
  newProblem: Problems;
  setsFB: WallSets;
  problemSortOrder: ProblemSortOrder[];
  currentSet: string;
  showSet: string;
  currentProblem: string;
  wallWidth: number;
  markerScale: number;
  zoomFactor: number;
  tab: string;
  isLoading: boolean;
  newSetImageUrl: string;
  setImageUrls: setImageUrls;
  problemImageUrl: string;
  addSetDialog: boolean;
}
