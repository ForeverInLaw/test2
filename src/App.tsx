import React from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import { useThemeStore } from './features/theme/store';

function App(): React.JSX.Element {
    const paperTheme = useThemeStore(state => state.paperTheme);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider theme={paperTheme}>
                <StatusBar
                    barStyle={paperTheme.dark ? 'light-content' : 'dark-content'}
                    backgroundColor={paperTheme.colors.surface}
                />
                <AppNavigator />
            </PaperProvider>
        </GestureHandlerRootView>
    );
}

export default App;