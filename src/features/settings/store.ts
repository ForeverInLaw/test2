import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsStore, Settings, DEFAULT_SETTINGS } from './types';
import { APP_CONFIG } from '../../config';

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set, get) => ({
            // Initial state
            settings: DEFAULT_SETTINGS,
            loading: false,
            error: null,

            // Settings operations
            updateSettings: async (updates: Partial<Settings>) => {
                set({ loading: true, error: null });

                try {
                    set(state => ({
                        settings: { ...state.settings, ...updates },
                        loading: false,
                    }));

                    // Auto-save after updating settings
                    await get().saveSettings();
                } catch (error) {
                    set({
                        loading: false,
                        error: 'Не удалось обновить настройки'
                    });
                }
            },

            resetSettings: async () => {
                set({ loading: true, error: null });

                try {
                    set({
                        settings: DEFAULT_SETTINGS,
                        loading: false,
                    });

                    // Auto-save after resetting settings
                    await get().saveSettings();
                } catch (error) {
                    set({
                        loading: false,
                        error: 'Не удалось сбросить настройки'
                    });
                }
            },

            // Individual setting setters for convenience
            setTheme: (theme: Settings['theme']) => {
                get().updateSettings({ theme });
            },

            setDynamicColors: (dynamicColorsEnabled: boolean) => {
                get().updateSettings({ dynamicColorsEnabled });
            },

            setStartOfWeek: (startOfWeek: Settings['startOfWeek']) => {
                get().updateSettings({ startOfWeek });
            },

            setDefaultView: (defaultView: Settings['defaultView']) => {
                get().updateSettings({ defaultView });
            },

            setTimeFormat: (timeFormat: Settings['timeFormat']) => {
                get().updateSettings({ timeFormat });
            },

            setNotifications: (notificationsEnabled: boolean) => {
                get().updateSettings({ notificationsEnabled });
            },

            setLanguage: (language: Settings['language']) => {
                get().updateSettings({ language });
            },

            // Utility methods
            clearError: () => {
                set({ error: null });
            },

            loadSettings: async () => {
                set({ loading: true, error: null });

                try {
                    // Settings will be loaded automatically by persist middleware
                    set({ loading: false });
                } catch (error) {
                    set({
                        loading: false,
                        error: 'Не удалось загрузить настройки'
                    });
                }
            },

            saveSettings: async () => {
                // Settings will be saved automatically by persist middleware
                // This method is here for explicit save operations if needed
                return Promise.resolve();
            },
        }),
        {
            name: APP_CONFIG.STORAGE_KEYS.SETTINGS,
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                settings: state.settings,
            }),
        }
    )
);