import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Timer, Flame, Route } from 'lucide-react-native';
import { Workout } from '../types';
import Colors from '../constants/Colors';
import Theme from '../constants/Theme';

interface WorkoutCardProps {
  workout: Workout;
  onPress: (workout: Workout) => void;
}

export default function WorkoutCard({ workout, onPress }: WorkoutCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  const formatDuration = (duration: number = 0) => {
    const minutes = Math.floor(duration / (60 * 1000));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };
  
  const formatDistance = (distance: number = 0) => {
    const km = distance / 1000;
    return km.toFixed(1) + ' km';
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.card },
        colorScheme === 'dark' ? Theme.shadows.dark.medium : Theme.shadows.light.medium
      ]}
      onPress={() => onPress(workout)}
    >
      <View style={styles.header}>
        <Text style={[styles.type, { color: colors.primary }]}>{workout.type}</Text>
        <Text style={[styles.date, { color: colors.gray[500] }]}>{formatDate(workout.startTime)}</Text>
      </View>
      
      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Timer size={16} color={colors.text} />
          <Text style={[styles.metricValue, { color: colors.text }]}>
            {formatDuration(workout.duration)}
          </Text>
        </View>
        
        <View style={styles.metricItem}>
          <Route size={16} color={colors.text} />
          <Text style={[styles.metricValue, { color: colors.text }]}>
            {formatDistance(workout.distance)}
          </Text>
        </View>
        
        <View style={styles.metricItem}>
          <Flame size={16} color={colors.text} />
          <Text style={[styles.metricValue, { color: colors.text }]}>
            {workout.calories || 0} cal
          </Text>
        </View>
      </View>
      
      {workout.notes && (
        <Text style={[styles.notes, { color: colors.gray[600] }]} numberOfLines={2}>
          {workout.notes}
        </Text>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  type: {
    fontFamily: Theme.typography.fontFamily.semiBold,
    fontSize: Theme.typography.fontSize.md,
  },
  date: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.xs,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: workout => workout.notes ? Theme.spacing.md : 0,
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
  notes: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.xs,
    lineHeight: Theme.typography.lineHeight.sm,
  },
});