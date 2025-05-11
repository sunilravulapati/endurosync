import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Smartphone, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';
import { HealthDevice } from '../types';
import Colors from '../constants/Colors';
import Theme from '../constants/Theme';

interface DeviceConnectionCardProps {
  device: HealthDevice;
  onPress: (device: HealthDevice) => void;
}

export default function DeviceConnectionCard({ device, onPress }: DeviceConnectionCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const formatLastSynced = (timestamp?: number) => {
    if (!timestamp) return 'Never synced';
    
    const now = Date.now();
    const diff = now - timestamp;
    
    // Less than a minute
    if (diff < 60 * 1000) {
      return 'Just now';
    }
    
    // Less than an hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }
    
    // Less than a day
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // More than a day
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.card },
        colorScheme === 'dark' ? Theme.shadows.dark.medium : Theme.shadows.light.medium
      ]}
      onPress={() => onPress(device)}
    >
      <View style={styles.iconContainer}>
        <Smartphone size={24} color={colors.primary} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.deviceName, { color: colors.text }]}>{device.name}</Text>
        <Text style={[styles.syncStatus, { color: colors.gray[500] }]}>
          Last synced: {formatLastSynced(device.lastSynced)}
        </Text>
      </View>
      <View style={styles.statusContainer}>
        {device.connected ? (
          <CheckCircle size={24} color={colors.success} />
        ) : (
          <XCircle size={24} color={colors.gray[400]} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
  },
  iconContainer: {
    marginRight: Theme.spacing.md,
  },
  infoContainer: {
    flex: 1,
  },
  deviceName: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.md,
    marginBottom: Theme.spacing.xs,
  },
  syncStatus: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.xs,
  },
  statusContainer: {
    marginLeft: Theme.spacing.md,
  },
});