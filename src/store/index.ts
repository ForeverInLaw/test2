import { create } from 'zustand';
import { useEventsStore } from '../features/events/store';
import { useSettingsStore } from '../features/settings/store';
import { useThemeStore } from '../features/theme/store';

// Root store that combines all feature stores
interface RootStore {
    // Store references
    events: typeof useEventsStore;
    settings: typeof useSettingsStore;
    theme: typeof useThemeStore;

    // Global app state
    isInitialized: boolean;
    isLoading: boolean;
    error: string | null;

    // Global actions
    initializeApp: () => Promise<void>;
    clearAllData: () => Promise<void>;
    setGlobalError: (error: string | null) => void;
}

export const useRootStore = create<RootStore>((set, get) => ({
    // Store references
    events: useEventsStore,
    settings: useSettingsStore,
    theme: useThemeStore,

    // Global app state
    isInitialized: false,
    isLoading: false,
    error: null,

    // Global actions
    initializeApp: async () => {
        set({ isLoading: true, error: null });

        try {
            // Initialize all feature stores
            await Promise.all([
                useEventsStore.getState().loadEvents(),
                useSettingsStore.getState().loadSettings(),
                useThemeStore.getState().initializeTheme(),
            ]);

            set({
                isInitialized: true,
                isLoading: false
            });
        } catch (error) {
            set({
                isLoading: false,
                error: 'Не удалось инициализировать приложение'
            });
        }
    },

    clearAllData: async () => {
        set({ isLoading: true, error: null });

        try {
            // Reset all stores to their default state
            await Promise.all([
                useSettingsStore.getState().resetSettings(),
                // Events store doesn't have reset method, so we clear manually
                useEventsStore.setState({ events: [] }),
            ]);

            set({ isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: 'Не удалось очистить данные'
            });
        }
    },

    setGlobalError: (error: string | null) => {
        set({ error });
    },
}));

// Export individual store hooks for convenience
export { useEventsStore } from '../features/events/store';
export { useSettingsStore } from '../features/settings/store';
export { useThemeStore } from '../features/theme/store';

// Global store selectors
export const useAppInitialization = () => useRootStore(state => ({
    isInitialized: state.isInitialized,
    isLoading: state.isLoading,
    error: state.error,
    initializeApp: state.initializeApp,
}));