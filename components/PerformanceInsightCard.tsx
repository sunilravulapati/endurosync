import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Brain, Dumbbell, Apple, Moon } from 'lucide-react-native';
import { PerformanceInsight } from '../types';
import Colors from '../constants/Colors';
import Theme from '../constants/Theme';

interface PerformanceInsightCardProps {
  insight: PerformanceInsight;
  onPress: (insight: PerformanceInsight) => void;
}

export default function PerformanceInsightCard({ insight, onPress }: PerformanceInsightCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const getInsightIcon = () => {
    const size = 24;
    const color = getPriorityColor();
    
    switch (insight.type) {
      case 'recovery':
        return <Brain size={size} color={color} />;
      case 'training':
        return <Dumbbell size={size} color={color} />;
      case 'nutrition':
        return <Apple size={size} color={color} />;
      case 'sleep':
        return <Moon size={size} color={color} />;
      default:
        return <Brain size={size} color={color} />;
    }
  };
  
  const getPriorityColor = () => {
    switch (insight.priority) {
      case 'high':
        return colors.warning;
      case 'medium':
        return colors.info;
      default:
        return colors.success;
    }
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.card },
        colorScheme === 'dark' ? Theme.shadows.dark.medium : Theme.shadows.light.medium
      ]}
      onPress={() => onPress(insight)}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${getPriorityColor()}20` }]}>
          {getInsightIcon()}
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{insight.title}</Text>
          <Text style={[styles.date, { color: colors.gray[500] }]}>{formatDate(insight.timestamp)}</Text>
        </View>
      </View>
      <Text style={[styles.description, { color: colors.text }]} numberOfLines={2}>
        {insight.description}
      </Text>
      <View style={[styles.recommendationContainer, { backgroundColor: `${getPriorityColor()}10` }]}>
        <Text style={[styles.recommendation, { color: getPriorityColor() }]}>
          {insight.recommendation}
        </Text>
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
    marginBottom: Theme.spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.semiBold,
    fontSize: Theme.typography.fontSize.md,
    marginBottom: Theme.spacing.xs,
  },
  date: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.xs,
  },
  description: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.sm,
    marginBottom: Theme.spacing.md,
    lineHeight: Theme.typography.lineHeight.sm,
  },
  recommendationContainer: {
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.sm,
  },
  recommendation: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
    lineHeight: Theme.typography.lineHeight.sm,
  },
});