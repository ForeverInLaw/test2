// Configuration constants and settings
export const APP_CONFIG = {
    // App metadata
    VERSION: '1.0.0',
    BUILD_NUMBER: '1',

    // Calendar settings
    DEFAULT_START_OF_WEEK: 1, // Monday
    DEFAULT_VIEW: 'month' as const,

    // Theme settings
    DYNAMIC_COLORS_AVAILABLE: true, // Will be determined at runtime

    // Event settings
    DEFAULT_EVENT_COLOR: '#2196F3',
    MAX_EVENTS_PER_DAY: 50,

    // Storage keys
    STORAGE_KEYS: {
        EVENTS: 'calendar_events',
        SETTINGS: 'user_settings',
        THEME: 'theme_preferences',
    },
} as const;

export const CALENDAR_THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
} as const;

export type CalendarTheme = typeof CALENDAR_THEMES[keyof typeof CALENDAR_THEMES];