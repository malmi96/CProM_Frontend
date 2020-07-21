export interface Stage {
  id: string;
  stageName: string;
  stageSupervisor: string;
  stageStartedDate: Date;
  stageEndingDate: Date;
  stageStatus: string;
  projectName: string;
}
