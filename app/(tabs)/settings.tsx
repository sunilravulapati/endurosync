import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Image,
  useColorScheme,
  Alert
} from 'react-native';
import { ChevronRight, Smartphone, Bell, Shield, CircleHelp as HelpCircle, LogOut, Moon, Sun } from 'lucide-react-native';
import { currentUser, connectedDevices } from '../../utils/mockData';
import Colors from '../../constants/Colors';
import Theme from '../../constants/Theme';
import DeviceConnectionCard from '../../components/DeviceConnectionCard';
import { HealthDevice } from '../../types';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const [darkMode, setDarkMode] = React.useState(colorScheme === 'dark');
  const [emergencyAlerts, setEmergencyAlerts] = React.useState(true);
  const [dataSync, setDataSync] = React.useState(true);
  
  const handleDevicePress = (device: HealthDevice) => {
    Alert.alert(
      device.name,
      `Type: ${device.type}\nConnected: ${device.connected ? 'Yes' : 'No'}\nLast Synced: ${device.lastSynced ? new Date(device.lastSynced).toLocaleString() : 'Never'}`,
      [
        { text: 'Cancel' },
        { 
          text: device.connected ? 'Disconnect' : 'Connect',
          onPress: () => {
            Alert.alert(
              device.connected ? 'Device Disconnected' : 'Device Connected',
              `${device.name} has been ${device.connected ? 'disconnected' : 'connected'} successfully.`
            );
          }
        }
      ]
    );
  };
  
  const handleAddDevice = () => {
    Alert.alert(
      'Add Device',
      'Connect a new smartwatch or fitness tracker to sync your health data.',
      [{ text: 'OK' }]
    );
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive' }
      ]
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: currentUser.profileImage }} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: colors.text }]}>{currentUser.name}</Text>
          <Text style={[styles.profileEmail, { color: colors.gray[500] }]}>{currentUser.email}</Text>
          <Text style={[styles.profileRole, { color: colors.primary }]}>
            {currentUser.role === 'athlete' ? 'Athlete' : 'Coach'}
          </Text>
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            {darkMode ? (
              <Moon size={20} color={colors.text} style={styles.settingIcon} />
            ) : (
              <Sun size={20} color={colors.text} style={styles.settingIcon} />
            )}
            <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: colors.gray[300], true: `${colors.primary}80` }}
            thumbColor={darkMode ? colors.primary : colors.gray[100]}
          />
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Connected Devices</Text>
        {connectedDevices.map(device => (
          <DeviceConnectionCard
            key={device.id}
            device={device}
            onPress={handleDevicePress}
          />
        ))}
        <TouchableOpacity
          style={[styles.addDeviceButton, { borderColor: colors.primary }]}
          onPress={handleAddDevice}
        >
          <Text style={[styles.addDeviceText, { color: colors.primary }]}>
            Connect New Device
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Bell size={20} color={colors.text} style={styles.settingIcon} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Emergency Alerts</Text>
          </View>
          <Switch
            value={emergencyAlerts}
            onValueChange={setEmergencyAlerts}
            trackColor={{ false: colors.gray[300], true: `${colors.primary}80` }}
            thumbColor={emergencyAlerts ? colors.primary : colors.gray[100]}
          />
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Data & Privacy</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Smartphone size={20} color={colors.text} style={styles.settingIcon} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Automatic Data Sync</Text>
          </View>
          <Switch
            value={dataSync}
            onValueChange={setDataSync}
            trackColor={{ false: colors.gray[300], true: `${colors.primary}80` }}
            thumbColor={dataSync ? colors.primary : colors.gray[100]}
          />
        </View>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <Shield size={20} color={colors.text} style={styles.settingIcon} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Privacy Settings</Text>
          </View>
          <ChevronRight size={20} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLabelContainer}>
            <HelpCircle size={20} color={colors.text} style={styles.settingIcon} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Help & Support</Text>
          </View>
          <ChevronRight size={20} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: colors.danger }]}
        onPress={handleLogout}
      >
        <LogOut size={20} color="#FFFFFF" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
      <Text style={[styles.versionText, { color: colors.gray[500] }]}>
        EnduroSync v1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Theme.spacing.md,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: Theme.spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize.xl,
    marginBottom: Theme.spacing.xs,
  },
  profileEmail: {
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.sm,
    marginBottom: Theme.spacing.xs,
  },
  profileRole: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
  },
  section: {
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: Theme.typography.fontFamily.semiBold,
    fontSize: Theme.typography.fontSize.md,
    marginBottom: Theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: Theme.spacing.sm,
  },
  settingLabel: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.md,
  },
  addDeviceButton: {
    borderWidth: 1,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  addDeviceText: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.sm,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    marginVertical: Theme.spacing.lg,
  },
  logoutIcon: {
    marginRight: Theme.spacing.sm,
  },
  logoutText: {
    color: '#FFFFFF',
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.fontSize.md,
  },
  versionText: {
    textAlign: 'center',
    fontFamily: Theme.typography.fontFamily.regular,
    fontSize: Theme.typography.fontSize.xs,
    marginBottom: Theme.spacing.xl,
  },
});