
import { Timestamp } from 'firebase/firestore';

export interface PeriodCycle {
  userId: string;
  startDate: Timestamp;
  cycleLength: number;
  periodLength: number;
  notes?: string;
  createdAt: Timestamp;
}

export interface Prediction {
  userId: string;
  cycleId: string;
  predictedStartDate: Timestamp;
  ovulationDate: Timestamp;
  fertileWindowStart: Timestamp;
  fertileWindowEnd: Timestamp;
  createdAt: Timestamp;
}

export interface Symptom {
  userId: string;
  cycleId: string;
  date: Timestamp;
  mood?: string;
  pain?: number;
  flow?: string;
  createdAt: Timestamp;
}