import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Heart, Droplets, Battery, Activity } from 'lucide-react-native';
import Colors from '../constants/Colors';
import Theme from '../constants/Theme';

type MetricType = 'heartRate' | 'hydration' | 'fatigue' | 'oxygen';

interface HealthMetricCardProps {
  type: MetricType;
  value: number;
  unit?: string;
  title: string;
  status?: 'normal' | 'warning' | 'critical';
}

export default function HealthMetricCard({
  type,
  value,
  unit = '',
  title,
  status = 'normal',
}: HealthMetricCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const getStatusColor = () => {
    switch (status) {
      case 'warning':
        return colors.warning;
      case 'critical':
        return colors.danger;
      default:
        return colors.success;
    }
  };

  const getIcon = () => {
    const iconColor = getStatusColor();
    const size = 24;
    
    switch (type) {
      case 'heartRate':
        return <Heart size={size} color={iconColor} />;
      case 'hydration':
        return <Droplets size={size} color={iconColor} />;
      case 'fatigue':
        return <Battery size={size} color={iconColor} />;
      case 'oxygen':
        return <Activity size={size} color={iconColor} />;
      default:
        return <Activity size={size} color={iconColor} />;
    }
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: colors.card },
      colorScheme === 'dark' ? Theme.shadows.dark.medium : Theme.shadows.light.medium
    ]}>
      <View style={styles.header}>
        {getIcon()}
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: colors.text }]}>
          {value}
          <Text style={[styles.unit, { color: colors.gray[600] }]}>{unit}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    width: '48%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  title: {
    marginLeft: Theme.spacing.sm,
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
  },
  valueContainer: {
    marginTop: Theme.spacing.xs,
  },
  value: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize.xxl,
  },
  unit: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.sm,
  },
});