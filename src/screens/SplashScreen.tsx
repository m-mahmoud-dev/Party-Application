import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BrandMarkCard } from '../components/BrandMarkCard';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { RootStackParamList } from '../types/screens';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.centerGroup}>
          <BrandMarkCard />
          <Text style={styles.title}>Party Digital Platform</Text>
          <Text style={styles.subtitle}>Official Member Portal</Text>
        </View>

        <Text style={styles.bottomCaption}>Secure & Verified</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.deepBlue,
  },
  container: {
    flex: 1,
    backgroundColor: colors.deepBlue,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerGroup: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h1,
    fontWeight: '400',
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.mediumGray,
  },
  bottomCaption: {
    ...typography.bodySm,
    position: 'absolute',
    bottom: 48,
    color: colors.mediumGray,
  },
});
