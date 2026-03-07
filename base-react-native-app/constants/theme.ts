/**
 * App color tokens — emerald/green theme, light & dark.
 * Raw palette values live in `Colors.palette` for use in
 * ProfileScreen and other components that need finer-grained tokens.
 */
import { Platform } from 'react-native';

// ─── Raw palette ─────────────────────────────────────────────────────────────

export const palette = {
  // Light greens
  foam50:        '#F0FAF4',
  foam100:       '#DCFCE7',
  foam200:       '#BBF7D0',
  foam300:       '#86EFAC',
  foam400:       '#4ADE80',
  // Emerald accents
  emerald:       '#10B981', // emerald-500
  emeraldDeep:   '#059669', // emerald-600
  emeraldDark:   '#065F46', // emerald-800
  emeraldMuted:  '#6EE7B7', // emerald-300
  // Dark backgrounds
  darkBase:      '#0A1612',
  darkSurface:   '#0F2119',
  darkCard:      '#132B21',
  darkBorder:    '#1E4434',
  // Muted text
  mutedLight:    '#4B7C63',
  mutedDark:     '#6EAF8E',
};

// ─── Semantic tokens (used by ThemedView, ThemedText, hooks, etc.) ────────────

export const Colors = {
  palette, // expose raw values for components that need them

  light: {
    // Core
    text:              '#11181C',
    textSecondary:     palette.mutedLight,
    background:        palette.foam50,
    surface:           '#FFFFFF',
    surfaceAlt:        palette.foam100,
    // Borders & dividers
    border:            palette.foam200,
    divider:           palette.foam200,
    // Accent
    tint:              palette.emerald,
    accent:            palette.emerald,
    accentDeep:        palette.emeraldDeep,
    accentSoft:        '#D1FAE5',
    // Icons & tabs
    icon:              palette.mutedLight,
    tabIconDefault:    palette.mutedLight,
    tabIconSelected:   palette.emerald,
    // Avatar
    avatarRing:        palette.emeraldDeep,
    // Logout / destructive-tinted
    logoutBg:          '#ECFDF5',
    logoutText:        palette.emeraldDeep,
    logoutBorder:      palette.emerald,
    // Shadow
    shadow:            '#10B98130',
  },

  dark: {
    // Core
    text:              '#ECEDEE',
    textSecondary:     palette.mutedDark,
    background:        palette.darkBase,
    surface:           palette.darkSurface,
    surfaceAlt:        palette.darkCard,
    // Borders & dividers
    border:            palette.darkBorder,
    divider:           palette.darkBorder,
    // Accent
    tint:              '#fff',
    accent:            palette.emeraldMuted,
    accentDeep:        palette.emeraldDeep,
    accentSoft:        '#134E35',
    // Icons & tabs
    icon:              '#9BA1A6',
    tabIconDefault:    '#9BA1A6',
    tabIconSelected:   '#fff',
    // Avatar
    avatarRing:        palette.emerald,
    // Logout / destructive-tinted
    logoutBg:          '#0A2318',
    logoutText:        palette.emeraldMuted,
    logoutBorder:      palette.emeraldDeep,
    // Shadow
    shadow:            '#00000060',
  },
};

// ─── Fonts (unchanged) ────────────────────────────────────────────────────────

export const Fonts = Platform.select({
  ios: {
    sans:    'system-ui',
    serif:   'ui-serif',
    rounded: 'ui-rounded',
    mono:    'ui-monospace',
  },
  default: {
    sans:    'normal',
    serif:   'serif',
    rounded: 'normal',
    mono:    'monospace',
  },
  web: {
    sans:    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif:   "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono:    "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
