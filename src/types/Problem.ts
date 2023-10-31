
interface ProblemHold {
  posX: number;
  posY: number;
  sizeNum: number;
  typeNum: number;
}

interface ProblemHolds {
  [key: string]: ProblemHold;
}

export default interface Problem {
  problemId: string;
  name: string;
  description: string;
  grade: string;
  gradeNum: number;
  createdAt: string;
  createdAtNum: number;
  setter: string;
  image: string;
  set: string;
  updatedAt: string;
  updatedAtNum: number;
  userId: string;
  problemHolds: ProblemHolds;
}