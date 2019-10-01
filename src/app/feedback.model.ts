export interface Feedback {
  additionalWeighting?: any;
  channel: string;
  channelImportance: string;
  companySize?: any;
  date: string;
  description: string;
  featureName: string[] | string;
  maintenanceGroup?: any;
  textLength: number;
  weighting: number;
}

export type FeedbackRow = Pick<
  Feedback,
  'featureName' | 'description' | 'channel'
>;
