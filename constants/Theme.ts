import { Platform } from 'react-native';
import Colors from './Colors';

export default {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semiBold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
      heading: 'Poppins-SemiBold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 30,
      display: 36,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 28,
      xl: 32,
      xxl: 36,
      xxxl: 42,
      display: 48,
    },
  },
  shadows: {
    light: Platform.select({
      ios: {
        small: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        medium: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        large: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
      },
      android: {
        small: { elevation: 2 },
        medium: { elevation: 4 },
        large: { elevation: 8 },
      },
      web: {
        small: {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        },
        medium: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
        large: {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    }),
    dark: Platform.select({
      ios: {
        small: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
        medium: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        large: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        },
      },
      android: {
        small: { elevation: 2 },
        medium: { elevation: 4 },
        large: { elevation: 8 },
      },
      web: {
        small: {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
        },
        medium: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        },
        large: {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        },
      },
    }),
  },
};