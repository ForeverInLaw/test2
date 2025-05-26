import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';
import type { MD3Theme } from 'react-native-paper';
import {
    MonetPalette,
    defaultLightPalette,
    defaultDarkPalette,
    createPaperTheme
} from './theme';
import { APP_CONFIG } from '../../config';

interface ThemeState {
    // Current active theme
    paperTheme: MD3Theme;
    isDark: boolean;

    // Monet integration
    monetPalette: MonetPalette | null;
    dynamicColorsAvailable: boolean;
    dynamicColorsEnabled: boolean;

    // Theme mode
    themeMode: 'light' | 'dark' | 'system';

    // State management
    loading: boolean;
    error: string | null;
}

interface ThemeActions {
    // Theme operations
    setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
    setDynamicColors: (enabled: boolean) => void;
    updateMonetPalette: (palette: MonetPalette) => void;

    // Internal methods
    initializeTheme: () => Promise<void>;
    updatePaperTheme: () => void;
    clearError: () => void;
}

type ThemeStore = ThemeState & ThemeActions;

// Helper function to determine if dark mode should be active
function shouldUseDarkMode(themeMode: 'light' | 'dark' | 'system'): boolean {
    if (themeMode === 'system') {
        return Appearance.getColorScheme() === 'dark';
    }
    return themeMode === 'dark';
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set, get) => ({
            // Initial state
            paperTheme: createPaperTheme(defaultLightPalette, false),
            isDark: false,
            monetPalette: null,
            dynamicColorsAvailable: false,
            dynamicColorsEnabled: true,
            themeMode: 'system',
            loading: false,
            error: null,

            // Theme operations
            setThemeMode: (mode: 'light' | 'dark' | 'system') => {
                set({ themeMode: mode });
                get().updatePaperTheme();
            },

            setDynamicColors: (enabled: boolean) => {
                set({ dynamicColorsEnabled: enabled });
                get().updatePaperTheme();
            },

            updateMonetPalette: (palette: MonetPalette) => {
                set({
                    monetPalette: palette,
                    dynamicColorsAvailable: true
                });
                get().updatePaperTheme();
            },

            // Internal methods
            initializeTheme: async () => {
                set({ loading: true, error: null });

                try {
                    // TODO: Initialize native Monet module here
                    // const monetSupported = await checkMonetSupport();
                    // if (monetSupported) {
                    //   const palette = await getDynamicColors();
                    //   get().updateMonetPalette(palette);
                    // }

                    // For now, just update the theme based on current settings
                    get().updatePaperTheme();

                    // Listen to system theme changes
                    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
                        const { themeMode } = get();
                        if (themeMode === 'system') {
                            get().updatePaperTheme();
                        }
                    });

                    set({ loading: false });

                    // Store subscription cleanup (would need to be handled in a useEffect in real app)
                    return () => subscription?.remove();
                } catch (error) {
                    set({
                        loading: false,
                        error: 'Не удалось инициализировать тему'
                    });
                }
            },

            updatePaperTheme: () => {
                const {
                    themeMode,
                    dynamicColorsEnabled,
                    dynamicColorsAvailable,
                    monetPalette
                } = get();

                const isDark = shouldUseDarkMode(themeMode);

                // Choose palette: Monet if available and enabled, otherwise default
                const shouldUseMonet = dynamicColorsEnabled && dynamicColorsAvailable && monetPalette;
                const palette = shouldUseMonet
                    ? monetPalette
                    : isDark
                        ? defaultDarkPalette
                        : defaultLightPalette;

                const paperTheme = createPaperTheme(palette, isDark);

                set({
                    paperTheme,
                    isDark
                });
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: APP_CONFIG.STORAGE_KEYS.THEME,
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                themeMode: state.themeMode,
                dynamicColorsEnabled: state.dynamicColorsEnabled,
                monetPalette: state.monetPalette,
            }),
            onRehydrateStorage: () => (state) => {
                // Update theme after rehydration
                state?.updatePaperTheme();
            },
        }
    )
);