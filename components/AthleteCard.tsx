import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { Heart, Droplets, Battery } from 'lucide-react-native';
import { User } from '../types';
import Colors from '../constants/Colors';
import Theme from '../constants/Theme';
import { getLatestHealthData } from '../utils/mockData';

interface AthleteCardProps {
  athlete: User;
  onPress: (athlete: User) => void;
}

export default function AthleteCard({ athlete, onPress }: AthleteCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const latestHealthData = getLatestHealthData(athlete.id);
  
  const getHeartRateStatus = (rate: number) => {
    if (rate > 160) return colors.danger;
    if (rate > 140) return colors.warning;
    return colors.success;
  };
  
  const getHydrationStatus = (level: number) => {
    if (level < 60) return colors.danger;
    if (level < 75) return colors.warning;
    return colors.success;
  };
  
  const getFatigueStatus = (level: number) => {
    if (level > 80) return colors.danger;
    if (level > 60) return colors.warning;
    return colors.success;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.card },
        colorScheme === 'dark' ? Theme.shadows.dark.medium : Theme.shadows.light.medium
      ]}
      onPress={() => onPress(athlete)}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: athlete.profileImage || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }} 
          style={styles.avatar} 
        />
        <View style={styles.nameContainer}>
          <Text style={[styles.name, { color: colors.text }]}>{athlete.name}</Text>
        </View>
      </View>
      
      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Heart size={16} color={getHeartRateStatus(latestHealthData.heartRate)} />
          <Text style={[styles.metricValue, { color: colors.text }]}>
            {latestHealthData.heartRate} <Text style={styles.metricUnit}>bpm</Text>
          </Text>
        </View>
        
        <View style={styles.metricItem}>
          <Droplets size={16} color={getHydrationStatus(latestHealthData.hydrationLevel)} />
          <Text style={[styles.metricValue, { color: colors.text }]}>
            {latestHealthData.hydrationLevel}%
          </Text>
        </View>
        
        <View style={styles.metricItem}>
          <Battery size={16} color={getFatigueStatus(latestHealthData.fatigueLevel)} />
          <Text style={[styles.metricValue, { color: colors.text }]}>
            {latestHealthData.fatigueLevel}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Theme.spacing.md,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontFamily: Theme.typography.fontFamily.semiBold,
    fontSize: Theme.typography.fontSize.md,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricValue: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
    marginLeft: Theme.spacing.xs,
  },
  metricUnit: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.xs,
    opacity: 0.7,
  },
});