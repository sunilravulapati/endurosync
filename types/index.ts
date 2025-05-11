export type UserRole = 'athlete' | 'coach';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  teamId?: string;
}

export interface HealthData {
  id: string;
  userId: string;
  timestamp: number;
  heartRate: number;
  hydrationLevel: number; // 0-100%
  fatigueLevel: number; // 0-100%
  oxygenSaturation: number; // 0-100%
  steps: number;
  calories: number;
  distance: number; // in meters
  sleepHours?: number;
}

export interface Alert {
  id: string;
  userId: string;
  type: 'hydration' | 'fatigue' | 'heartRate' | 'emergency' | 'performance';
  message: string;
  timestamp: number;
  read: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface Team {
  id: string;
  name: string;
  coachId: string;
  athletes: string[]; // array of user IDs
}

export interface Workout {
  id: string;
  userId: string;
  type: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  distance?: number;
  calories?: number;
  avgHeartRate?: number;
  maxHeartRate?: number;
  notes?: string;
}

export interface PerformanceInsight {
  id: string;
  userId: string;
  timestamp: number;
  type: 'recovery' | 'training' | 'nutrition' | 'sleep';
  title: string;
  description: string;
  recommendation: string;
  priority: 'low' | 'medium' | 'high';
}

export interface HealthDevice {
  id: string;
  userId: string;
  type: 'appleWatch' | 'fitbit' | 'garmin' | 'googleFit' | 'other';
  name: string;
  connected: boolean;
  lastSynced?: number;
}