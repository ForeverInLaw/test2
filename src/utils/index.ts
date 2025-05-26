// Utility functions for the Calendar App

import { Platform } from 'react-native';

// Date and time utilities
export class DateUtils {
    /**
     * Format date to display string based on locale
     */
    static formatDate(date: Date | string, format: 'short' | 'long' | 'numeric' = 'short'): string {
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        switch (format) {
            case 'short':
                return dateObj.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            case 'long':
                return dateObj.toLocaleDateString('ru-RU', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            case 'numeric':
                return dateObj.toISOString().split('T')[0];
            default:
                return dateObj.toLocaleDateString();
        }
    }

    /**
     * Format time to display string
     */
    static formatTime(date: Date | string, format24h: boolean = true): string {
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        return dateObj.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: !format24h
        });
    }

    /**
     * Get start of day timestamp
     */
    static getStartOfDay(date: Date | string): string {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const startOfDay = new Date(dateObj);
        startOfDay.setHours(0, 0, 0, 0);
        return startOfDay.toISOString();
    }

    /**
     * Get end of day timestamp
     */
    static getEndOfDay(date: Date | string): string {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const endOfDay = new Date(dateObj);
        endOfDay.setHours(23, 59, 59, 999);
        return endOfDay.toISOString();
    }

    /**
     * Check if date is today
     */
    static isToday(date: Date | string): boolean {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const today = new Date();

        return dateObj.getDate() === today.getDate() &&
            dateObj.getMonth() === today.getMonth() &&
            dateObj.getFullYear() === today.getFullYear();
    }

    /**
     * Get days between two dates
     */
    static getDaysBetween(startDate: Date | string, endDate: Date | string): number {
        const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
        const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

        const diffTime = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}

// Validation utilities
export class ValidationUtils {
    /**
     * Validate event title
     */
    static validateTitle(title: string): { isValid: boolean; message?: string } {
        if (!title.trim()) {
            return { isValid: false, message: 'Название события обязательно' };
        }

        if (title.length < 3) {
            return { isValid: false, message: 'Название должно содержать минимум 3 символа' };
        }

        if (title.length > 100) {
            return { isValid: false, message: 'Название не должно превышать 100 символов' };
        }

        return { isValid: true };
    }

    /**
     * Validate date range
     */
    static validateDateRange(startDate: string, endDate: string): { isValid: boolean; message?: string } {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return { isValid: false, message: 'Некорректный формат даты' };
        }

        if (start > end) {
            return { isValid: false, message: 'Дата окончания должна быть позже даты начала' };
        }

        return { isValid: true };
    }

    /**
     * Validate hex color
     */
    static validateHexColor(color: string): boolean {
        return /^#([A-Fa-f0-9]{6})$/.test(color);
    }
}

// Platform utilities
export class PlatformUtils {
    /**
     * Check if running on Android
     */
    static isAndroid(): boolean {
        return Platform.OS === 'android';
    }

    /**
     * Check if running on iOS
     */
    static isIOS(): boolean {
        return Platform.OS === 'ios';
    }

    /**
     * Get platform-specific value
     */
    static select<T>(options: { android?: T; ios?: T; default?: T }): T | undefined {
        if (Platform.OS === 'android' && options.android !== undefined) {
            return options.android;
        }

        if (Platform.OS === 'ios' && options.ios !== undefined) {
            return options.ios;
        }

        return options.default;
    }
}

// Color utilities
export class ColorUtils {
    /**
     * Convert hex color to rgba
     */
    static hexToRgba(hex: string, alpha: number = 1): string {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if (!result) {
            return `rgba(0, 0, 0, ${alpha})`;
        }

        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    /**
     * Get contrast color (black or white) for given background
     */
    static getContrastColor(backgroundColor: string): '#000000' | '#FFFFFF' {
        // Remove # if present
        const hex = backgroundColor.replace('#', '');

        // Convert to RGB
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        // Calculate relative luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    }
}

// Storage utilities
export class StorageUtils {
    /**
     * Generate storage key with app prefix
     */
    static createKey(key: string): string {
        return `CalendarApp_${key}`;
    }

    /**
     * Safely parse JSON from storage
     */
    static safeJsonParse<T>(jsonString: string, fallback: T): T {
        try {
            return JSON.parse(jsonString);
        } catch {
            return fallback;
        }
    }
}

// Performance utilities
export class PerformanceUtils {
    /**
     * Debounce function execution
     */
    static debounce<T extends (...args: any[]) => any>(
        func: T,
        wait: number
    ): (...args: Parameters<T>) => void {
        let timeout: NodeJS.Timeout;

        return (...args: Parameters<T>) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    /**
     * Throttle function execution
     */
    static throttle<T extends (...args: any[]) => any>(
        func: T,
        limit: number
    ): (...args: Parameters<T>) => void {
        let inThrottle: boolean;

        return (...args: Parameters<T>) => {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    }
}