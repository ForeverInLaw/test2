// Settings-related TypeScript interfaces and types

export interface Settings {
    // Theme settings
    theme: 'light' | 'dark' | 'system';
    dynamicColorsEnabled: boolean;

    // Calendar settings
    startOfWeek: 0 | 1; // 0 for Sunday, 1 for Monday
    defaultView: 'month' | 'week' | 'day' | 'agenda';

    // Time and date formatting
    timeFormat: '12h' | '24h';
    dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';

    // Notifications
    notificationsEnabled: boolean;
    defaultReminderTime: string; // ISO 8601 duration (e.g., "PT15M" for 15 minutes)

    // Language and localization
    language: 'ru' | 'en';

    // Privacy and data
    analyticsEnabled: boolean;
}

export interface SettingsState {
    settings: Settings;
    loading: boolean;
    error: string | null;
}

export interface SettingsActions {
    // Settings operations
    updateSettings: (updates: Partial<Settings>) => Promise<void>;
    resetSettings: () => Promise<void>;

    // Individual setting setters for convenience
    setTheme: (theme: Settings['theme']) => void;
    setDynamicColors: (enabled: boolean) => void;
    setStartOfWeek: (startOfWeek: Settings['startOfWeek']) => void;
    setDefaultView: (view: Settings['defaultView']) => void;
    setTimeFormat: (format: Settings['timeFormat']) => void;
    setNotifications: (enabled: boolean) => void;
    setLanguage: (language: Settings['language']) => void;

    // Utility methods
    clearError: () => void;
    loadSettings: () => Promise<void>;
    saveSettings: () => Promise<void>;
}

export type SettingsStore = SettingsState & SettingsActions;

// Default settings
export const DEFAULT_SETTINGS: Settings = {
    theme: 'system',
    dynamicColorsEnabled: true,
    startOfWeek: 1, // Monday
    defaultView: 'month',
    timeFormat: '24h',
    dateFormat: 'DD/MM/YYYY',
    notificationsEnabled: true,
    defaultReminderTime: 'PT15M', // 15 minutes before
    language: 'ru',
    analyticsEnabled: false,
};