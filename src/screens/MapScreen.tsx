import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { AppInput } from '../components/AppInput';
import { colors } from '../theme/colors';
import { shadows } from '../theme/shadows';
import { typography } from '../theme/typography';
import { RootStackParamList } from '../types/screens';

type Props = NativeStackScreenProps<RootStackParamList, 'Map'>;

type ViewMode = 'map' | 'list';

const headquarters = [
  {
    id: 1,
    name: 'Central Headquarters',
    region: 'North Nouakchott',
    address: '123 Tevrage Zein, Capital City',
    phone: '+222 26 74 00 01',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    distance: '2.3 km',
  },
  {
    id: 2,
    name: 'Regional Office - North',
    region: 'North Nouadhibou',
    address: '456 Le Bon Choix, North District',
    phone: '+222 26 74 00 02',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    distance: '5.8 km',
  },
  {
    id: 3,
    name: 'Branch Office - Central',
    region: 'Central Nouakchott',
    address: '789 Unity Road, Central Area',
    phone: '+222 26 74 00 03',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    distance: '8.2 km',
  },
];

export function MapScreen({ navigation }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHQ = useMemo(
    () => headquarters.filter((hq) => hq.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <AppHeader title="Headquarters" onBack={() => navigation.navigate('Home')} bottomPadding={24} />
            <View style={styles.searchWrap}>
              <View style={styles.searchIconWrap}>
                <Feather name="search" size={20} color={colors.secondaryText} />
              </View>
              <AppInput
                placeholder="Search headquarters..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInputText}
              />
            </View>
          </View>

          <View style={styles.contentWrap}>
            <View style={styles.card}>
              <View style={styles.viewToggleRow}>
                <Text style={styles.locationsFound}>{filteredHQ.length} locations found</Text>
                <View style={styles.toggleButtons}>
                  <AppButton
                    label="Map"
                    variant={viewMode === 'map' ? 'primary' : 'outline'}
                    style={styles.toggleBtn}
                    height={36}
                    onPress={() => setViewMode('map')}
                  />
                  <AppButton
                    label="List"
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    style={styles.toggleBtn}
                    height={36}
                    onPress={() => setViewMode('list')}
                  />
                </View>
              </View>

              {viewMode === 'map' ? (
                <View style={styles.mapPlaceholder}>
                  <Feather name="map-pin" size={48} color={colors.deepBlue} />
                  <Text style={styles.mapPlaceholderText}>Map view placeholder</Text>
                  <Text style={styles.mapPlaceholderSub}>Interactive map would display here</Text>
                </View>
              ) : null}

              <View style={styles.locationList}>
                {filteredHQ.map((hq) => (
                  <View key={hq.id} style={styles.locationCard}>
                    <View style={styles.locationTopRow}>
                      <View>
                        <Text style={styles.locationName}>{hq.name}</Text>
                        <Text style={styles.locationRegion}>{hq.region}</Text>
                      </View>
                      <Text style={styles.distanceTag}>{hq.distance}</Text>
                    </View>

                    <View style={styles.metaList}>
                      <View style={styles.metaItem}>
                        <Feather name="map-pin" size={16} color={colors.secondaryText} />
                        <Text style={styles.metaText}>{hq.address}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Feather name="phone" size={16} color={colors.secondaryText} />
                        <Text style={styles.metaText}>{hq.phone}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Feather name="clock" size={16} color={colors.secondaryText} />
                        <Text style={styles.metaText}>{hq.hours}</Text>
                      </View>
                    </View>

                    <View style={styles.actionsRow}>
                      <AppButton label="Get Directions" variant="outline" style={styles.actionBtn} height={32} />
                      <AppButton label="Call" style={styles.actionBtn} height={32} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  headerBlock: {
    backgroundColor: colors.deepBlue,
    paddingBottom: 20,
  },
  searchWrap: {
    marginHorizontal: 24,
    position: 'relative',
  },
  searchIconWrap: {
    position: 'absolute',
    left: 16,
    top: 14,
    zIndex: 1,
  },
  searchInputText: {
    paddingLeft: 28,
  },
  contentWrap: {
    paddingHorizontal: 24,
    marginTop: -48,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.card,
  },
  viewToggleRow: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationsFound: {
    ...typography.bodySm,
    color: colors.secondaryText,
  },
  toggleButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    minWidth: 76,
  },
  mapPlaceholder: {
    height: 256,
    backgroundColor: colors.mediumGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    ...typography.bodySm,
    color: colors.secondaryText,
    marginTop: 8,
  },
  mapPlaceholderSub: {
    ...typography.bodyXs,
    color: colors.secondaryText,
    marginTop: 4,
  },
  locationList: {
    padding: 16,
    gap: 12,
  },
  locationCard: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
  },
  locationTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  locationName: {
    ...typography.bodySm,
    color: colors.primaryText,
    marginBottom: 4,
  },
  locationRegion: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  distanceTag: {
    ...typography.bodyXs,
    color: colors.royalBlue,
    backgroundColor: '#1E4E8C15',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  metaList: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  metaText: {
    ...typography.bodyXs,
    color: colors.secondaryText,
    flex: 1,
  },
  actionsRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.mediumGray,
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
  },
});
