import { StyleSheet, Platform } from 'react-native';

export const profileStyles = StyleSheet.create({
  root: { flex: 1 },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 48,
  },

  // Header
  header: { marginBottom: 36 },
  headerNav: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  navButton: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 18, lineHeight: 20 },
  headerTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 3, marginBottom: 8 },
  headerRule: { width: 28, height: 2, borderRadius: 1 },

  // Hero / avatar
  heroSection: { alignItems: 'center', marginBottom: 32 },
  avatarWrapper: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 2,
    padding: 4,
    marginBottom: 20,
  },
  avatarRingInner: {
    flex: 1,
    borderRadius: 50,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%', borderRadius: 50 },
  avatarFallback: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { fontSize: 30, fontWeight: '600', letterSpacing: 1 },
  cameraBadge: {
    position: 'absolute',
    bottom: 18,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: { fontSize: 24, fontWeight: '700', letterSpacing: 0.3, marginBottom: 4, textAlign: 'center' },
  userEmail: { fontSize: 14, letterSpacing: 0.2, textAlign: 'center', marginBottom: 16 },
  dotRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { borderRadius: 4 },

  // Card
  card: {
    borderRadius: 16,
    borderWidth: 1,
    paddingTop: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  cardLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2.5, marginBottom: 12, marginTop: 4 },

  // Form fields (edit screen)
  fieldRow: { paddingVertical: 12 },
  fieldLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5, marginBottom: 4 },
  fieldInput: { fontSize: 15, fontWeight: '500', paddingVertical: 2 },
  fieldError: { fontSize: 11, marginTop: 3 },

  // Logout / action button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  logoutIcon: { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  logoutText: { fontSize: 15, fontWeight: '600', letterSpacing: 0.2 },

  // Footer
  footerStamp: { textAlign: 'center', fontSize: 10, letterSpacing: 2, fontWeight: '500' },
});
