import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  useColorScheme,
  Alert,
  TextInput
} from 'react-native';
import { Search, Users, UserPlus } from 'lucide-react-native';
import { teamAthletes } from '../../utils/mockData';
import Colors from '../../constants/Colors';
import Theme from '../../constants/Theme';
import AthleteCard from '../../components/AthleteCard';
import { User } from '../../types';

export default function CoachScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'alerts'>('all');
  
  const filteredAthletes = teamAthletes.filter(athlete => 
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAthletePress = (athlete: User) => {
    Alert.alert(
      athlete.name,
      'View detailed health data and performance metrics for this athlete.',
      [{ text: 'OK' }]
    );
  };
  
  const handleAddAthlete = () => {
    Alert.alert(
      'Add Athlete',
      'Send an invitation to a new athlete to join your team.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Search size={20} color={colors.gray[500]} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search athletes..."
          placeholderTextColor={colors.gray[500]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'all' && [styles.activeTab, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('all')}
        >
          <Users 
            size={20} 
            color={activeTab === 'all' ? colors.primary : colors.gray[500]} 
          />
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'all' ? colors.primary : colors.gray[500] }
            ]}
          >
            All Athletes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'alerts' && [styles.activeTab, { borderBottomColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('alerts')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'alerts' ? colors.primary : colors.gray[500] }
            ]}
          >
            Needs Attention
          </Text>
          <View style={[styles.badge, { backgroundColor: colors.danger }]}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {activeTab === 'all' ? 'Team Athletes' : 'Athletes Needing Attention'}
          </Text>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={handleAddAthlete}
          >
            <UserPlus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {filteredAthletes.length > 0 ? (
          <FlatList
            data={filteredAthletes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <AthleteCard athlete={item} onPress={handleAthletePress} />
            )}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.gray[500] }]}>
              No athletes found
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.full,
    height: 48,
  },
  searchIcon: {
    marginRight: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.md,
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
  badge: {
    marginLeft: Theme.spacing.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: Theme.typography.fontFamily.medium,
  },
  content: {
    flex: 1,
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