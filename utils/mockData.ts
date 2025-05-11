import { Alert, HealthData, PerformanceInsight, User, Workout, HealthDevice, Team } from '../types';

// Mock current user
export const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'athlete',
  profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  teamId: 'team1'
};

// Mock coach user
export const coachUser: User = {
  id: 'coach1',
  name: 'Coach Sarah',
  email: 'sarah@example.com',
  role: 'coach',
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  teamId: 'team1'
};

// Mock team athletes
export const teamAthletes: User[] = [
  currentUser,
  {
    id: 'user2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'athlete',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    teamId: 'team1'
  },
  {
    id: 'user3',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    role: 'athlete',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    teamId: 'team1'
  },
  {
    id: 'user4',
    name: 'James Rodriguez',
    email: 'james@example.com',
    role: 'athlete',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    teamId: 'team1'
  }
];

// Mock team
export const team: Team = {
  id: 'team1',
  name: 'Elite Runners',
  coachId: 'coach1',
  athletes: teamAthletes.map(athlete => athlete.id)
};

// Generate mock health data for the last 24 hours
export const generateMockHealthData = (userId: string, hoursCount = 24): HealthData[] => {
  const now = Date.now();
  const data: HealthData[] = [];
  
  for (let i = 0; i < hoursCount; i++) {
    const timestamp = now - (i * 60 * 60 * 1000);
    const timeOfDay = new Date(timestamp).getHours();
    
    // Simulate realistic patterns based on time of day
    let heartRate = 60 + Math.floor(Math.random() * 40); // Base heart rate between 60-100
    let hydrationLevel = 70 + Math.floor(Math.random() * 30); // Base hydration 70-100%
    let fatigueLevel = 20 + Math.floor(Math.random() * 30); // Base fatigue 20-50%
    
    // Morning hours (6-9 AM): Higher heart rate, lower fatigue
    if (timeOfDay >= 6 && timeOfDay <= 9) {
      heartRate += 10;
      fatigueLevel -= 10;
    }
    
    // Workout hours (17-19): Higher heart rate, higher fatigue, lower hydration
    if (timeOfDay >= 17 && timeOfDay <= 19) {
      heartRate += 30;
      fatigueLevel += 20;
      hydrationLevel -= 15;
    }
    
    // Night hours (22-5): Lower heart rate, higher fatigue
    if (timeOfDay >= 22 || timeOfDay <= 5) {
      heartRate -= 15;
      fatigueLevel += 10;
    }
    
    // Ensure values are within reasonable ranges
    heartRate = Math.max(55, Math.min(180, heartRate));
    hydrationLevel = Math.max(50, Math.min(100, hydrationLevel));
    fatigueLevel = Math.max(10, Math.min(90, fatigueLevel));
    
    data.push({
      id: `health-${userId}-${timestamp}`,
      userId,
      timestamp,
      heartRate,
      hydrationLevel,
      fatigueLevel,
      oxygenSaturation: 95 + Math.floor(Math.random() * 5),
      steps: 500 + Math.floor(Math.random() * 1000),
      calories: 50 + Math.floor(Math.random() * 150),
      distance: 300 + Math.floor(Math.random() * 700),
      sleepHours: timeOfDay >= 22 || timeOfDay <= 7 ? 7 + Math.random() * 2 : undefined
    });
  }
  
  return data;
};

// Mock health data for current user
export const currentUserHealthData = generateMockHealthData(currentUser.id);

// Mock health data for all team athletes
export const teamHealthData = teamAthletes.reduce((acc, athlete) => {
  acc[athlete.id] = generateMockHealthData(athlete.id);
  return acc;
}, {} as Record<string, HealthData[]>);

// Mock alerts
export const alerts: Alert[] = [
  {
    id: 'alert1',
    userId: currentUser.id,
    type: 'hydration',
    message: 'Your hydration levels are dropping. Consider drinking water soon.',
    timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
    read: false,
    severity: 'medium'
  },
  {
    id: 'alert2',
    userId: currentUser.id,
    type: 'fatigue',
    message: 'High fatigue detected. Consider reducing training intensity today.',
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    read: true,
    severity: 'high'
  },
  {
    id: 'alert3',
    userId: currentUser.id,
    type: 'heartRate',
    message: 'Your heart rate was elevated during your last workout. Take time to cool down properly.',
    timestamp: Date.now() - 5 * 60 * 60 * 1000, // 5 hours ago
    read: false,
    severity: 'low'
  },
  {
    id: 'alert4',
    userId: currentUser.id,
    type: 'performance',
    message: 'Your performance is improving! Keep up the good work.',
    timestamp: Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
    read: true,
    severity: 'low'
  }
];

// Mock workouts
export const workouts: Workout[] = [
  {
    id: 'workout1',
    userId: currentUser.id,
    type: 'Running',
    startTime: Date.now() - 25 * 60 * 60 * 1000, // Yesterday
    endTime: Date.now() - 24 * 60 * 60 * 1000,
    duration: 60 * 60 * 1000, // 1 hour
    distance: 10000, // 10km
    calories: 650,
    avgHeartRate: 145,
    maxHeartRate: 175,
    notes: 'Felt strong throughout the run. Good pace.'
  },
  {
    id: 'workout2',
    userId: currentUser.id,
    type: 'Cycling',
    startTime: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    endTime: Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
    duration: 2 * 60 * 60 * 1000, // 2 hours
    distance: 40000, // 40km
    calories: 1200,
    avgHeartRate: 135,
    maxHeartRate: 160,
    notes: 'Long steady ride. Focused on maintaining cadence.'
  },
  {
    id: 'workout3',
    userId: currentUser.id,
    type: 'Swimming',
    startTime: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    endTime: Date.now() - 5 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000,
    duration: 45 * 60 * 1000, // 45 minutes
    distance: 2000, // 2km
    calories: 450,
    avgHeartRate: 130,
    maxHeartRate: 150,
    notes: 'Technique work. Focused on stroke efficiency.'
  }
];

// Mock performance insights
export const performanceInsights: PerformanceInsight[] = [
  {
    id: 'insight1',
    userId: currentUser.id,
    timestamp: Date.now() - 12 * 60 * 60 * 1000,
    type: 'recovery',
    title: 'Recovery Optimization',
    description: 'Your recovery metrics indicate potential for overtraining. Your heart rate variability has decreased by 15% over the past week.',
    recommendation: 'Consider taking an extra rest day this week and focus on light activity and proper nutrition.',
    priority: 'high'
  },
  {
    id: 'insight2',
    userId: currentUser.id,
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    type: 'training',
    title: 'Training Zone Analysis',
    description: 'You\'ve been spending 65% of your training time in Zone 2, which is optimal for building aerobic base.',
    recommendation: 'Continue this pattern, but consider adding one high-intensity session per week to improve VO2 max.',
    priority: 'medium'
  },
  {
    id: 'insight3',
    userId: currentUser.id,
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
    type: 'nutrition',
    title: 'Hydration Strategy',
    description: 'Your hydration levels consistently drop during afternoon workouts, which may be affecting performance.',
    recommendation: 'Try increasing fluid intake by 500ml in the 2 hours before your afternoon sessions.',
    priority: 'medium'
  },
  {
    id: 'insight4',
    userId: currentUser.id,
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    type: 'sleep',
    title: 'Sleep Quality Improvement',
    description: 'Your average deep sleep duration has decreased by 30 minutes over the past two weeks.',
    recommendation: 'Consider implementing a more consistent sleep schedule and reducing screen time 1 hour before bed.',
    priority: 'high'
  }
];

// Mock connected devices
export const connectedDevices: HealthDevice[] = [
  {
    id: 'device1',
    userId: currentUser.id,
    type: 'appleWatch',
    name: 'Apple Watch Series 7',
    connected: true,
    lastSynced: Date.now() - 15 * 60 * 1000 // 15 minutes ago
  },
  {
    id: 'device2',
    userId: currentUser.id,
    type: 'garmin',
    name: 'Garmin Forerunner 945',
    connected: false,
    lastSynced: Date.now() - 3 * 24 * 60 * 60 * 1000 // 3 days ago
  }
];

// Get latest health data for a user
export const getLatestHealthData = (userId: string): HealthData => {
  const userHealthData = userId === currentUser.id 
    ? currentUserHealthData 
    : teamHealthData[userId] || [];
  
  return userHealthData[0] || {
    id: 'no-data',
    userId,
    timestamp: Date.now(),
    heartRate: 0,
    hydrationLevel: 0,
    fatigueLevel: 0,
    oxygenSaturation: 0,
    steps: 0,
    calories: 0,
    distance: 0
  };
};

// Get health data for a specific time range
export const getHealthDataForTimeRange = (
  userId: string, 
  startTime: number, 
  endTime: number = Date.now()
): HealthData[] => {
  const userHealthData = userId === currentUser.id 
    ? currentUserHealthData 
    : teamHealthData[userId] || [];
  
  return userHealthData.filter(
    data => data.timestamp >= startTime && data.timestamp <= endTime
  );
};

// Get unread alerts count
export const getUnreadAlertsCount = (): number => {
  return alerts.filter(alert => !alert.read).length;
};