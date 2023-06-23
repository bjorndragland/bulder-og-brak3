
interface Problem {
  name: string;
  description: string;
  grade: string;
  gradeNum: number;
  createdAt: string;
  setter: string;
  image: string;
  set: string;
  updatedAt: string
}

interface Problems {
  [key: string]: Problem
}

interface ProblemSortOrder {
  problemId: string
}


interface ProblemHold {
  posX: number;
  posY: number;
  size: string;
  type: string;
}

interface ProblemHolds {
  [key: string]: ProblemHold;
}

interface HoldSizeDefault {
  id: number;
  name: string;
  radius: number;
}

export default interface State {
  lastSize: string;
  lastType: string;
  appState: string;
  selectedHoldId: string;
  selectedHoldFBId: number;
  problemsFB: Problems;
  newProblem: Problems;
  problemHoldsFB: ProblemHolds;
  problemSortOrder: ProblemSortOrder[];
  newProblemHolds: ProblemHolds;
  holdSizeDefaults: HoldSizeDefault[];
  currentSet: string;
  currentProblem: number | string;
  wallWidth: number;
  markerScale: number;
  zoomFactor: number;
  tab: string;
  isLoading: boolean;
}
