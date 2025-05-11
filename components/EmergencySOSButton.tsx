import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  useColorScheme,
  Animated,
  Easing
} from 'react-native';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Colors from '../constants/Colors';
import Theme from '../constants/Theme';

interface EmergencySOSButtonProps {
  onPress: () => void;
}

export default function EmergencySOSButton({ onPress }: EmergencySOSButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const [pulseAnim] = useState(new Animated.Value(1));
  
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.danger },
        colorScheme === 'dark' ? Theme.shadows.dark.large : Theme.shadows.light.large
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.pulseCircle,
          {
            backgroundColor: `${colors.danger}50`,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />
      <View style={styles.content}>
        <AlertTriangle size={24} color="#FFFFFF" />
        <Text style={styles.text}>Emergency SOS</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.full,
    padding: Theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  pulseCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: Theme.borderRadius.full,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.fontSize.md,
    marginLeft: Theme.spacing.sm,
  },
});