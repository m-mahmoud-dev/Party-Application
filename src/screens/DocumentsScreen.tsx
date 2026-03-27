import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';
import { AppButton } from '../components/AppButton';
import { AppHeader } from '../components/AppHeader';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../theme/colors';
import { shadows } from '../theme/shadows';
import { typography } from '../theme/typography';
import { RootStackParamList } from '../types/screens';

type Props = NativeStackScreenProps<RootStackParamList, 'Documents'>;

type DocItem = {
  id: number;
  name: string;
  type: string;
  date: string;
  status: string;
  locked: boolean;
  content: string;
};

const documents: DocItem[] = [
  {
    id: 1,
    name: 'Membership Certificate',
    type: 'Certificate',
    date: '2024-01-15',
    status: 'Available',
    locked: false,
    content:
      'This certifies that Mohamed Mahmoud is a registered member of the Party Digital Platform with membership ID MRT-2024-1847, effective from January 15, 2024.',
  },
  {
    id: 2,
    name: 'Code of Conduct',
    type: 'Policy',
    date: '2024-01-15',
    status: 'Available',
    locked: false,
    content:
      'All members must adhere to the established code of conduct, which includes maintaining professional behavior, respecting diversity, and upholding party values.',
  },
  {
    id: 3,
    name: 'Regional Guidelines',
    type: 'Guideline',
    date: '2024-02-01',
    status: 'Available',
    locked: false,
    content:
      'Regional guidelines outline the specific operational procedures for the North Region, including meeting schedules, communication protocols, and leadership structure.',
  },
  {
    id: 4,
    name: 'Financial Records',
    type: 'Finance',
    date: '2024-03-01',
    status: 'Restricted',
    locked: true,
    content: '',
  },
  {
    id: 5,
    name: 'Election Procedures',
    type: 'Electoral',
    date: '2024-04-01',
    status: 'Restricted',
    locked: true,
    content: '',
  },
];

export function DocumentsScreen({ navigation }: Props) {
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);

  const selectedDoc = useMemo(
    () => documents.find((doc) => doc.id === selectedDocId) ?? null,
    [selectedDocId],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <AppHeader title="Documents" onBack={() => navigation.navigate('Home')} />

          <View style={styles.contentWrap}>
            <View style={styles.card}>
              <View style={styles.list}>
                {documents.map((doc) => (
                  <View key={doc.id} style={styles.docRow}>
                    <View style={styles.docMain}>
                      <View style={[styles.docIconWrap, doc.locked && styles.docIconLocked]}>
                        <Feather
                          name={doc.locked ? 'lock' : 'file-text'}
                          size={20}
                          color={doc.locked ? colors.secondaryText : colors.royalBlue}
                        />
                      </View>

                      <View style={styles.docInfo}>
                        <Text style={styles.docName}>{doc.name}</Text>
                        <View style={styles.docMetaRow}>
                          <Text style={styles.docMeta}>{doc.type}</Text>
                          <Text style={styles.dot}>•</Text>
                          <Text style={styles.docMeta}>{doc.date}</Text>
                        </View>
                      </View>
                    </View>

                    {doc.locked ? (
                      <StatusBadge outlined label={doc.status} textColor={colors.errorRed} borderColor={colors.errorRed} />
                    ) : (
                      <Pressable style={styles.viewButton} onPress={() => setSelectedDocId(doc.id)}>
                        <Feather name="eye" size={16} color={colors.royalBlue} />
                        <Text style={styles.viewText}>View</Text>
                      </Pressable>
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.noticeCard}>
                <Feather name="lock" size={16} color={colors.warningOrange} style={styles.noticeIcon} />
                <Text style={styles.noticeText}>
                  Some documents are restricted and require special authorization. Contact your regional administrator for access.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <Modal visible={Boolean(selectedDoc)} transparent animationType="fade" onRequestClose={() => setSelectedDocId(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{selectedDoc?.name}</Text>
              <Text style={styles.modalSubtitle}>{selectedDoc?.type} - {selectedDoc?.date}</Text>

              <View style={styles.modalBodyCard}>
                <Text style={styles.modalContent}>{selectedDoc?.content}</Text>
              </View>

              <View style={styles.readOnlyRow}>
                <Feather name="lock" size={12} color={colors.secondaryText} />
                <Text style={styles.readOnlyText}>Read-only document • Download disabled</Text>
              </View>

              <AppButton label="Close" variant="outline" onPress={() => setSelectedDocId(null)} style={styles.modalCloseButton} />
            </View>
          </View>
        </Modal>
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
  contentWrap: {
    paddingHorizontal: 24,
    marginTop: -48,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    ...shadows.card,
  },
  list: {
    gap: 12,
  },
  docRow: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  docMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  docIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docIconLocked: {
    backgroundColor: colors.mediumGray,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    ...typography.bodySm,
    color: colors.primaryText,
    marginBottom: 4,
  },
  docMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  docMeta: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  dot: {
    ...typography.bodyXs,
    color: colors.mediumGray,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  viewText: {
    ...typography.bodySm,
    color: colors.royalBlue,
  },
  noticeCard: {
    marginTop: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(237,108,2,0.2)',
    backgroundColor: '#ED6C0215',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noticeIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  noticeText: {
    ...typography.bodyXs,
    color: colors.secondaryText,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
    ...shadows.lg,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.primaryText,
  },
  modalSubtitle: {
    ...typography.bodySm,
    color: colors.secondaryText,
    marginTop: 4,
    marginBottom: 16,
  },
  modalBodyCard: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
  },
  modalContent: {
    ...typography.bodySm,
    color: colors.primaryText,
    lineHeight: 22,
  },
  readOnlyRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  readOnlyText: {
    ...typography.bodyXs,
    color: colors.secondaryText,
  },
  modalCloseButton: {
    marginTop: 14,
  },
});
