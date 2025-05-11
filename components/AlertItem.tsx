import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { TriangleAlert as AlertTriangle, Heart, Droplets, Battery, Bell } from 'lucide-react-native';
import { Alert } from '../types';
import Colors from '../constants/Colors';
import Theme from '../constants/Theme';

interface AlertItemProps {
  alert: Alert;
  onPress: (alert: Alert) => void;
}

export default function AlertItem({ alert, onPress }: AlertItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const getAlertIcon = () => {
    const size = 20;
    const color = getSeverityColor();
    
    switch (alert.type) {
      case 'hydration':
        return <Droplets size={size} color={color} />;
      case 'fatigue':
        return <Battery size={size} color={color} />;
      case 'heartRate':
        return <Heart size={size} color={color} />;
      case 'emergency':
        return <AlertTriangle size={size} color={color} />;
      default:
        return <Bell size={size} color={color} />;
    }
  };
  
  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'critical':
        return colors.danger;
      case 'high':
        return colors.warning;
      case 'medium':
        return colors.info;
      default:
        return colors.success;
    }
  };
  
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.card },
        !alert.read && styles.unread,
        colorScheme === 'dark' ? Theme.shadows.dark.small : Theme.shadows.light.small
      ]}
      onPress={() => onPress(alert)}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${getSeverityColor()}20` }]}>
        {getAlertIcon()}
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.message, { color: colors.text }]}>{alert.message}</Text>
        <Text style={[styles.time, { color: colors.gray[500] }]}>{formatTime(alert.timestamp)}</Text>
      </View>
      {!alert.read && <View style={[styles.unreadIndicator, { backgroundColor: getSeverityColor() }]} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    alignItems: 'center',
  },
  unread: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.light.primary,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  contentContainer: {
    flex: 1,
  },
  message: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
    marginBottom: Theme.spacing.xs,
  },
  time: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.xs,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: Theme.spacing.sm,
  },
});