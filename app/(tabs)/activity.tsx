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
import { Plus, Calendar, ChartBar as BarChart } from 'lucide-react-native';
import { workouts } from '../../utils/mockData';
import Colors from '../../constants/Colors';
import Theme from '../../constants/Theme';
import WorkoutCard from '../../components/WorkoutCard';
import { Workout } from '../../types';

export default function ActivityScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const [activeTab, setActiveTab] = useState<'workouts' | 'stats'>('workouts');
  
  const handleWorkoutPress = (workout: Workout) => {
    Alert.alert(
      workout.type,
      `Date: ${new Date(workout.startTime).toLocaleDateString()}\nDuration: ${Math.floor((workout.duration || 0) / (60 * 1000))} minutes\nDistance: ${(workout.distance || 0) / 1000} km\nCalories: ${workout.calories || 0}\n\nNotes: ${workout.notes || 'No notes'}`,
      [{ text: 'OK' }]
    );
  };
  
  const handleAddWorkout = () => {
    Alert.alert(
      'Add Workout',
      'This feature will allow you to manually add a workout or start tracking a new one.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.tabBar, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'workouts' && [styles.activeTab, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('workouts')}
        >
          <Calendar 
            size={20} 
            color={activeTab === 'workouts' ? colors.primary : colors.gray[500]} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'workouts' ? colors.primary : colors.gray[500] }
            ]}
          >
            Workouts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'stats' && [styles.activeTab, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('stats')}
        >
          <BarChart 
            size={20} 
            color={activeTab === 'stats' ? colors.primary : colors.gray[500]} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'stats' ? colors.primary : colors.gray[500] }
            ]}
          >
            Statistics
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'workouts' ? (
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.headerContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Workouts</Text>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={handleAddWorkout}
            >
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {workouts.map(workout => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onPress={handleWorkoutPress}
            />
          ))}
          
          <TouchableOpacity
            style={[
              styles.viewAllButton,
              { borderColor: colors.primary }
            ]}
          >
            <Text style={[styles.viewAllText, { color: colors.primary }]}>
              View All Workouts
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Summary</Text>
          
          <View style={[
            styles.summaryCard, 
            { backgroundColor: colors.card },
            colorScheme === 'dark' ? Theme.shadows.dark.medium : Theme.shadows.light.medium
          ]}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: colors.text }]}>3</Text>
                <Text style={[styles.summaryLabel, { color: colors.gray[500] }]}>Workouts</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: colors.text }]}>52 km</Text>
                <Text style={[styles.summaryLabel, { color: colors.gray[500] }]}>Distance</Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: colors.text }]}>3h 45m</Text>
                <Text style={[styles.summaryLabel, { color: colors.gray[500] }]}>Duration</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: colors.text }]}>2,300</Text>
                <Text style={[styles.summaryLabel, { color: colors.gray[500] }]}>Calories</Text>
              </View>
            </View>
          </View>
          
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Activity Distribution</Text>
          
          <View style={[
            styles.activityCard, 
            { backgroundColor: colors.card },
            colorScheme === 'dark' ? Theme.shadows.dark.medium : Theme.shadows.light.medium
          ]}>
            <View style={styles.activityItem}>
              <View style={styles.activityBar}>
                <View 
                  style={[
                    styles.activityFill, 
                    { width: '60%', backgroundColor: colors.primary }
                  ]} 
                />
              </View>
              <View style={styles.activityLabel}>
                <Text style={[styles.activityType, { color: colors.text }]}>Running</Text>
                <Text style={[styles.activityPercent, { color: colors.gray[500] }]}>60%</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityBar}>
                <View 
                  style={[
                    styles.activityFill, 
                    { width: '30%', backgroundColor: colors.secondary }
                  ]} 
                />
              </View>
              <View style={styles.activityLabel}>
                <Text style={[styles.activityType, { color: colors.text }]}>Cycling</Text>
                <Text style={[styles.activityPercent, { color: colors.gray[500] }]}>30%</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityBar}>
                <View 
                  style={[
                    styles.activityFill, 
                    { width: '10%', backgroundColor: colors.accent }
                  ]} 
                />
              </View>
              <View style={styles.activityLabel}>
                <Text style={[styles.activityType, { color: colors.text }]}>Swimming</Text>
                <Text style={[styles.activityPercent, { color: colors.gray[500] }]}>10%</Text>
              </View>
            </View>
          </View>
          
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Training Load</Text>
          
          <View style={[
            styles.trainingCard, 
            { backgroundColor: colors.card },
            colorScheme === 'dark' ? Theme.shadows.dark.medium : Theme.shadows.light.medium
          ]}>
            <Text style={[styles.trainingStatus, { color: colors.warning }]}>
              Approaching threshold
            </Text>
            <Text style={[styles.trainingDescription, { color: colors.text }]}>
              Your current training load is 85% of your optimal threshold. Consider maintaining this level to avoid overtraining.
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
    marginLeft: Theme.spacing.xs,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Theme.spacing.md,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: Theme.typography.fontFamily.semiBold,
    fontSize: Theme.typography.fontSize.lg,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllButton: {
    borderWidth: 1,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  viewAllText: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
  },
  summaryCard: {
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize.xxl,
    marginBottom: Theme.spacing.xs,
  },
  summaryLabel: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.sm,
  },
  activityCard: {
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
  activityItem: {
    marginBottom: Theme.spacing.md,
  },
  activityBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: Theme.spacing.xs,
  },
  activityFill: {
    height: '100%',
    borderRadius: Theme.borderRadius.full,
  },
  activityLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityType: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
  },
  activityPercent: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.sm,
  },
  trainingCard: {
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
  trainingStatus: {
    fontFamily: Theme.typography.fontFamily.semiBold,
    fontSize: Theme.typography.fontSize.md,
    marginBottom: Theme.spacing.sm,
  },
  trainingDescription: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.sm,
    lineHeight: Theme.typography.lineHeight.md,
  },
});