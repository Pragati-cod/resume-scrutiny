export interface Candidate {
  id: number;
  rank: number;
  name: string;
  avatar: string;
  score: number;
  trend: number[];
  experience: string;
  status: 'Shortlisted' | 'Under Review' | 'New';
  appliedDays: number;
}

export interface JobFit {
  role: string;
  percentage: number;
}

export interface AnalysisResult {
  score: number;
  keywords: string[];
  jobFits: JobFit[];
}
