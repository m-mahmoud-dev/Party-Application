import { Platform, ViewStyle } from 'react-native';

export const shadows = {
  none: {} as ViewStyle,
  sm: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000000',
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
    },
    android: {
      elevation: 1,
    },
    default: {},
  }) as ViewStyle,
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000000',
      shadowOpacity: 0.12,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    },
    android: {
      elevation: 4,
    },
    default: {},
  }) as ViewStyle,
  lg: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000000',
      shadowOpacity: 0.16,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
    },
    android: {
      elevation: 6,
    },
    default: {},
  }) as ViewStyle,
};
