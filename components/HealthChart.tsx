import React from 'react';
import { View, Text, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { HealthData } from '../types';
import Colors from '../constants/Colors';
import Theme from '../constants/Theme';

interface HealthChartProps {
  data: HealthData[];
  metric: 'heartRate' | 'hydrationLevel' | 'fatigueLevel' | 'oxygenSaturation';
  title: string;
  color?: string;
}

export default function HealthChart({ 
  data, 
  metric, 
  title,
  color
}: HealthChartProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const chartColor = color || colors.primary;
  
  // Sort data by timestamp
  const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
  
  // Extract values and labels
  const values = sortedData.map(item => item[metric]);
  const labels = sortedData.map(item => {
    const date = new Date(item.timestamp);
    return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  });
  
  // Only show a subset of labels to avoid overcrowding
  const displayLabels = labels.filter((_, i) => i % Math.ceil(labels.length / 6) === 0);
  while (displayLabels.length < 6) {
    displayLabels.push('');
  }
  
  const chartData = {
    labels: displayLabels,
    datasets: [
      {
        data: values,
        color: () => chartColor,
        strokeWidth: 2,
      },
    ],
  };
  
  const chartConfig = {
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 0,
    color: () => chartColor,
    labelColor: () => colors.gray[500],
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: chartColor,
    },
  };
  
  const screenWidth = Dimensions.get('window').width - 40; // Accounting for padding

  return (
    <View style={[
      styles.container, 
      { backgroundColor: colors.card },
      colorScheme === 'dark' ? Theme.shadows.dark.medium : Theme.shadows.light.medium
    ]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={180}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.semiBold,
    fontSize: Theme.typography.fontSize.md,
    marginBottom: Theme.spacing.md,
  },
  chart: {
    borderRadius: Theme.borderRadius.md,
    marginVertical: Theme.spacing.sm,
  },
});