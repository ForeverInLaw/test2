// Global TypeScript type definitions

// Navigation types (re-exported for convenience)
export type { RootStackParamList } from '../navigation/AppNavigator';

// Event types (re-exported for convenience)
export type {
    Event,
    CreateEventRequest,
    UpdateEventRequest
} from '../features/events/types';

// Settings types (re-exported for convenience)
export type {
    Settings
} from '../features/settings/types';

// Theme types (re-exported for convenience)
export type {
    MonetPalette
} from '../features/theme/theme';

// Common utility types
export type ID = string;

export type Timestamp = string; // ISO 8601 string

export type HexColor = string; // Format: #RRGGBB

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// API response types (for future backend integration)
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface ApiError {
    message: string;
    code?: string;
    details?: Record<string, any>;
}

// Form validation types
export interface ValidationError {
    field: string;
    message: string;
}

export interface FormState<T> {
    data: T;
    errors: ValidationError[];
    isValid: boolean;
    isSubmitting: boolean;
}

// Calendar-specific types
export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export type WeekStartDay = 0 | 1; // 0 = Sunday, 1 = Monday

export interface DateRange {
    start: Timestamp;
    end: Timestamp;
}

// Device and system types
export type ColorScheme = 'light' | 'dark';

export type Platform = 'android' | 'ios';

// Storage types
export interface PersistedData {
    version: string;
    timestamp: Timestamp;
    data: Record<string, any>;
}