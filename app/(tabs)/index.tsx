import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useColorScheme,
  Alert
} from 'react-native';
import { 
  currentUser, 
  currentUserHealthData, 
  performanceInsights, 
  connectedDevices 
} from '../../utils/mockData';
import Colors from '../../constants/Colors';
import Theme from '../../constants/Theme';
import HealthMetricCard from '../../components/HealthMetricCard';
import HealthChart from '../../components/HealthChart';
import PerformanceInsightCard from '../../components/PerformanceInsightCard';
import EmergencySOSButton from '../../components/EmergencySOSButton';
import { PerformanceInsight } from '../../types';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const [selectedTimeRange, setSelectedTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  
  // Get latest health data
  const latestHealthData = currentUserHealthData[0];
  
  // Determine health status
  const getHeartRateStatus = (rate: number) => {
    if (rate > 160) return 'critical';
    if (rate > 140) return 'warning';
    return 'normal';
  };
  
  const getHydrationStatus = (level: number) => {
    if (level < 60) return 'critical';
    if (level < 75) return 'warning';
    return 'normal';
  };
  
  const getFatigueStatus = (level: number) => {
    if (level > 80) return 'critical';
    if (level > 60) return 'warning';
    return 'normal';
  };
  
  const getOxygenStatus = (level: number) => {
    if (level < 90) return 'critical';
    if (level < 95) return 'warning';
    return 'normal';
  };
  
  const handleInsightPress = (insight: PerformanceInsight) => {
    Alert.alert(
      insight.title,
      `${insight.description}\n\nRecommendation: ${insight.recommendation}`,
      [{ text: 'OK' }]
    );
  };
  
  const handleEmergencySOS = () => {
    Alert.alert(
      'Emergency SOS',
      'This will alert your emergency contacts and share your location. Do you want to proceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send SOS', 
          style: 'destructive',
          onPress: () => {
            // In a real app, this would trigger emergency protocols
            Alert.alert('SOS Sent', 'Emergency contacts have been notified.');
          }
        }
      ]
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          Hello, {currentUser.name.split(' ')[0]}
        </Text>
        <Text style={[styles.date, { color: colors.gray[600] }]}>
          {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>
      </View>
      
      <View style={styles.timeRangeSelector}>
        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            selectedTimeRange === '24h' && [styles.selectedTimeRange, { backgroundColor: colors.primary }]
          ]}
          onPress={() => setSelectedTimeRange('24h')}
        >
          <Text
            style={[
              styles.timeRangeText,
              { color: selectedTimeRange === '24h' ? '#FFFFFF' : colors.text }
            ]}
          >
            24h
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            selectedTimeRange === '7d' && [styles.selectedTimeRange, { backgroundColor: colors.primary }]
          ]}
          onPress={() => setSelectedTimeRange('7d')}
        >
          <Text
            style={[
              styles.timeRangeText,
              { color: selectedTimeRange === '7d' ? '#FFFFFF' : colors.text }
            ]}
          >
            7d
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            selectedTimeRange === '30d' && [styles.selectedTimeRange, { backgroundColor: colors.primary }]
          ]}
          onPress={() => setSelectedTimeRange('30d')}
        >
          <Text
            style={[
              styles.timeRangeText,
              { color: selectedTimeRange === '30d' ? '#FFFFFF' : colors.text }
            ]}
          >
            30d
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Live Health Metrics</Text>
      
      <View style={styles.metricsGrid}>
        <HealthMetricCard
          type="heartRate"
          value={latestHealthData.heartRate}
          unit="bpm"
          title="Heart Rate"
          status={getHeartRateStatus(latestHealthData.heartRate)}
        />
        <HealthMetricCard
          type="hydration"
          value={latestHealthData.hydrationLevel}
          unit="%"
          title="Hydration"
          status={getHydrationStatus(latestHealthData.hydrationLevel)}
        />
        <HealthMetricCard
          type="fatigue"
          value={latestHealthData.fatigueLevel}
          unit="%"
          title="Fatigue"
          status={getFatigueStatus(latestHealthData.fatigueLevel)}
        />
        <HealthMetricCard
          type="oxygen"
          value={latestHealthData.oxygenSaturation}
          unit="%"
          title="Oxygen"
          status={getOxygenStatus(latestHealthData.oxygenSaturation)}
        />
      </View>
      
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance Trends</Text>
      
      <HealthChart
        data={currentUserHealthData}
        metric="heartRate"
        title="Heart Rate"
        color={colors.danger}
      />
      
      <HealthChart
        data={currentUserHealthData}
        metric="hydrationLevel"
        title="Hydration Level"
        color={colors.info}
      />
      
      <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Insights</Text>
      
      {performanceInsights.slice(0, 2).map(insight => (
        <PerformanceInsightCard
          key={insight.id}
          insight={insight}
          onPress={handleInsightPress}
        />
      ))}
      
      <View style={styles.emergencyContainer}>
        <EmergencySOSButton onPress={handleEmergencySOS} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Theme.spacing.md,
  },
  header: {
    marginBottom: Theme.spacing.lg,
  },
  greeting: {
    fontFamily: Theme.typography.fontFamily.heading,
    fontSize: Theme.typography.fontSize.xxl,
    marginBottom: Theme.spacing.xs,
  },
  date: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.sm,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  timeRangeButton: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.full,
  },
  selectedTimeRange: {
    backgroundColor: 'blue',
  },
  timeRangeText: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
  },
  sectionTitle: {
    fontFamily: Theme.typography.fontFamily.semiBold,
    fontSize: Theme.typography.fontSize.lg,
    marginBottom: Theme.spacing.md,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  emergencyContainer: {
    marginVertical: Theme.spacing.xl,
  },
});