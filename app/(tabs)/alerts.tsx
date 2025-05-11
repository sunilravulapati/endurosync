import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  useColorScheme,
  Alert as RNAlert
} from 'react-native';
import { Filter } from 'lucide-react-native';
import { alerts } from '../../utils/mockData';
import Colors from '../../constants/Colors';
import Theme from '../../constants/Theme';
import AlertItem from '../../components/AlertItem';
import { Alert as AlertType } from '../../types';

export default function AlertsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');
  const [localAlerts, setLocalAlerts] = useState<AlertType[]>(alerts);
  
  const filteredAlerts = localAlerts.filter(alert => {
    if (filter === 'unread') return !alert.read;
    if (filter === 'critical') return alert.severity === 'critical' || alert.severity === 'high';
    return true;
  });
  
  const handleAlertPress = (alert: AlertType) => {
    // Mark as read
    const updatedAlerts = localAlerts.map(a => 
      a.id === alert.id ? { ...a, read: true } : a
    );
    setLocalAlerts(updatedAlerts);
    
    // Show alert details
    RNAlert.alert(
      getAlertTitle(alert),
      alert.message,
      [{ text: 'OK' }]
    );
  };
  
  const getAlertTitle = (alert: AlertType) => {
    switch (alert.type) {
      case 'hydration':
        return 'Hydration Alert';
      case 'fatigue':
        return 'Fatigue Alert';
      case 'heartRate':
        return 'Heart Rate Alert';
      case 'emergency':
        return 'Emergency Alert';
      case 'performance':
        return 'Performance Update';
      default:
        return 'Alert';
    }
  };
  
  const markAllAsRead = () => {
    const updatedAlerts = localAlerts.map(alert => ({ ...alert, read: true }));
    setLocalAlerts(updatedAlerts);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'all' && [styles.activeFilter, { backgroundColor: colors.primary }]
            ]}
            onPress={() => setFilter('all')}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === 'all' ? '#FFFFFF' : colors.text }
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'unread' && [styles.activeFilter, { backgroundColor: colors.primary }]
            ]}
            onPress={() => setFilter('unread')}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === 'unread' ? '#FFFFFF' : colors.text }
              ]}
            >
              Unread
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'critical' && [styles.activeFilter, { backgroundColor: colors.primary }]
            ]}
            onPress={() => setFilter('critical')}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === 'critical' ? '#FFFFFF' : colors.text }
              ]}
            >
              Critical
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: `${colors.primary}20` }]}
          onPress={() => RNAlert.alert('Filter', 'Additional filtering options would appear here.')}
        >
          <Filter size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        {localAlerts.some(alert => !alert.read) && (
          <TouchableOpacity
            style={[styles.markAllButton, { borderColor: colors.primary }]}
            onPress={markAllAsRead}
          >
            <Text style={[styles.markAllText, { color: colors.primary }]}>
              Mark all as read
            </Text>
          </TouchableOpacity>
        )}
        
        {filteredAlerts.length > 0 ? (
          <FlatList
            data={filteredAlerts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <AlertItem alert={item} onPress={handleAlertPress} />
            )}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.gray[500] }]}>
              No alerts to display
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    justifyContent: 'space-between',
  },
  filterContainer: {
    flexDirection: 'row',
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  filterButton: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.full,
    marginRight: Theme.spacing.xs,
  },
  activeFilter: {
    backgroundColor: 'blue',
  },
  filterText: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  markAllButton: {
    borderWidth: 1,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.sm,
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  markAllText: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
  },
  listContent: {
    paddingBottom: Theme.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.md,
  },
});