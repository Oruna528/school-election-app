// 候補者の型定義
export interface Candidate {
  id: string;
  name: string;
  position: string; // 例: "会長"、"副会長"
  grade: number;
  class: number;
  platformStatement: string;
  imageUrl?: string;
  votes: number;
}

// 投票情報の型定義
export interface Vote {
  id: string;
  studentId: string;
  candidateId: string;
  position: string;
  timestamp: Date;
}

// 選挙ステータス
export type ElectionStatus = 'setup' | 'ongoing' | 'closed' | 'counting';

// 選挙情報の型定義
export interface Election {
  id: string;
  year: number;
  status: ElectionStatus;
  startTime: Date;
  endTime: Date;
  positions: Position[];
}

// ポジション情報
export interface Position {
  id: string;
  name: string;
  description: string;
  count: number; // 当選人数
}
