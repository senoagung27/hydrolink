const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // --- Warna Tambahan untuk Mode Terang ---
    screenBackground: '#F8F9FA',
    deleteButton: '#FF6347',
    cardBackground: '#FFFFFF',
    tagBackground: '#F0F0F0',
    tagText: '#687076',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // --- Warna Tambahan untuk Mode Gelap ---
    screenBackground: '#151718', // Sama dengan background untuk konsistensi
    deleteButton: '#FF8C69',     // Oranye yang sedikit lebih terang untuk dark mode
    cardBackground: '#1E2021',   // Background yang lebih gelap untuk kartu
    tagBackground: '#2C2E30',   // Background yang lebih gelap untuk tag
    tagText: '#9BA1A6',          // Teks yang lebih terang untuk tag, cocok dengan warna ikon
  },
};