
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


// interface setObjItem {
//   createdAt: string;
//   description: string;
//   image: string;
//   name: string;
//   updatedAt: string
// }


export default interface State {
  lastSize: string;
  lastType: string;
  appState: string;
  selectedHoldId: string;
  selectedHoldFBId: number;
  problemsFB: Problems;
  newProblem: Problems;
  // problemsLocal: Problems;
  problemHoldsFB: ProblemHolds;
  problemSortOrder: ProblemSortOrder[];
  newProblemHolds: ProblemHolds;
  // problemHoldsLocal: ProblemHolds;
  // collOfSets: any;
  holdSizeDefaults: HoldSizeDefault[];
  currentSet: string;
  currentProblem: number | string;
  wallWidth: number;
  markerScale: number;
  zoomFactor: number;
  tab: string;
}
