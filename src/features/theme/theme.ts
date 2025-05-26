import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

// Material Design 3 color tokens for Monet integration
export interface MonetPalette {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;

    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;

    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;

    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;

    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;

    outline: string;
    outlineVariant: string;
    shadow: string;
    scrim: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
}

// Default Material Design 3 color palettes
export const defaultLightPalette: MonetPalette = {
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',

    secondary: '#625B71',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8DEF8',
    onSecondaryContainer: '#1D192B',

    tertiary: '#7D5260',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFD8E4',
    onTertiaryContainer: '#31111D',

    error: '#BA1A1A',
    onError: '#FFFFFF',
    errorContainer: '#FFDAD6',
    onErrorContainer: '#410002',

    background: '#FFFBFE',
    onBackground: '#1C1B1F',
    surface: '#FFFBFE',
    onSurface: '#1C1B1F',
    surfaceVariant: '#E7E0EC',
    onSurfaceVariant: '#49454F',

    outline: '#79747E',
    outlineVariant: '#CAC4D0',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#313033',
    inverseOnSurface: '#F4EFF4',
    inversePrimary: '#D0BCFF',
};

export const defaultDarkPalette: MonetPalette = {
    primary: '#D0BCFF',
    onPrimary: '#381E72',
    primaryContainer: '#4F378B',
    onPrimaryContainer: '#EADDFF',

    secondary: '#CCC2DC',
    onSecondary: '#332D41',
    secondaryContainer: '#4A4458',
    onSecondaryContainer: '#E8DEF8',

    tertiary: '#EFB8C8',
    onTertiary: '#492532',
    tertiaryContainer: '#633B48',
    onTertiaryContainer: '#FFD8E4',

    error: '#FFB4AB',
    onError: '#690005',
    errorContainer: '#93000A',
    onErrorContainer: '#FFDAD6',

    background: '#1C1B1F',
    onBackground: '#E6E1E5',
    surface: '#1C1B1F',
    onSurface: '#E6E1E5',
    surfaceVariant: '#49454F',
    onSurfaceVariant: '#CAC4D0',

    outline: '#938F99',
    outlineVariant: '#49454F',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#E6E1E5',
    inverseOnSurface: '#313033',
    inversePrimary: '#6750A4',
};

// Create Paper theme from Monet palette
export function createPaperTheme(palette: MonetPalette, isDark: boolean): MD3Theme {
    const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;

    return {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            primary: palette.primary,
            onPrimary: palette.onPrimary,
            primaryContainer: palette.primaryContainer,
            onPrimaryContainer: palette.onPrimaryContainer,

            secondary: palette.secondary,
            onSecondary: palette.onSecondary,
            secondaryContainer: palette.secondaryContainer,
            onSecondaryContainer: palette.onSecondaryContainer,

            tertiary: palette.tertiary,
            onTertiary: palette.onTertiary,
            tertiaryContainer: palette.tertiaryContainer,
            onTertiaryContainer: palette.onTertiaryContainer,

            error: palette.error,
            onError: palette.onError,
            errorContainer: palette.errorContainer,
            onErrorContainer: palette.onErrorContainer,

            background: palette.background,
            onBackground: palette.onBackground,
            surface: palette.surface,
            onSurface: palette.onSurface,
            surfaceVariant: palette.surfaceVariant,
            onSurfaceVariant: palette.onSurfaceVariant,

            outline: palette.outline,
            outlineVariant: palette.outlineVariant,
            shadow: palette.shadow,
            scrim: palette.scrim,
            inverseSurface: palette.inverseSurface,
            inverseOnSurface: palette.inverseOnSurface,
            inversePrimary: palette.inversePrimary,
        },
    };
}

// Get calendar theme configuration for react-native-calendars
export function getCalendarTheme(paperTheme: MD3Theme) {
    return {
        backgroundColor: paperTheme.colors.background,
        calendarBackground: paperTheme.colors.background,
        textSectionTitleColor: paperTheme.colors.onSurfaceVariant,
        selectedDayBackgroundColor: paperTheme.colors.primary,
        selectedDayTextColor: paperTheme.colors.onPrimary,
        todayTextColor: paperTheme.colors.primary,
        dayTextColor: paperTheme.colors.onSurface,
        textDisabledColor: paperTheme.colors.onSurfaceVariant,
        dotColor: paperTheme.colors.secondary,
        selectedDotColor: paperTheme.colors.onPrimary,
        arrowColor: paperTheme.colors.primary,
        disabledArrowColor: paperTheme.colors.onSurfaceVariant,
        monthTextColor: paperTheme.colors.onSurface,
        indicatorColor: paperTheme.colors.primary,
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '500',
        textDayFontSize: 16,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 13,
    };
}