import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Placeholder screen imports - will be implemented later
// import HomeScreen from '../features/events/screens/HomeScreen';
// import EventDetailScreen from '../features/events/screens/EventDetailScreen';
// import EventEditScreen from '../features/events/screens/EventEditScreen';
// import SettingsScreen from '../features/settings/screens/SettingsScreen';

// Temporary placeholder screen component
import { View, Text } from 'react-native';
const PlaceholderScreen = ({ title }: { title: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{title} - В разработке</Text>
    </View>
);

// Navigation parameter types
export type RootStackParamList = {
    Home: undefined;
    EventDetail: { eventId: string };
    EventEdit: { eventId?: string };
    Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#6200ee', // Material Design primary color
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={() => <PlaceholderScreen title="Главный экран календаря" />}
                    options={{
                        headerShown: false // Custom header will be implemented in HomeScreen
                    }}
                />
                <Stack.Screen
                    name="EventDetail"
                    component={() => <PlaceholderScreen title="Детали события" />}
                    options={{ title: 'Событие' }}
                />
                <Stack.Screen
                    name="EventEdit"
                    component={() => <PlaceholderScreen title="Редактирование события" />}
                    options={({ route }) => ({
                        title: route.params?.eventId ? 'Редактировать событие' : 'Новое событие',
                    })}
                />
                <Stack.Screen
                    name="Settings"
                    component={() => <PlaceholderScreen title="Настройки" />}
                    options={{ title: 'Настройки' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;