import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventsStore, Event, CreateEventRequest, UpdateEventRequest } from './types';
import { APP_CONFIG } from '../../config';

// Generate unique ID for events
const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useEventsStore = create<EventsStore>()(
    persist(
        (set, get) => ({
            // Initial state
            events: [],
            selectedDate: new Date().toISOString().split('T')[0], // Today's date
            loading: false,
            error: null,

            // Event CRUD operations
            createEvent: async (eventData: CreateEventRequest) => {
                set({ loading: true, error: null });

                try {
                    const newEvent: Event = {
                        ...eventData,
                        id: generateId(),
                        allDay: eventData.allDay ?? false,
                        color: eventData.color ?? APP_CONFIG.DEFAULT_EVENT_COLOR,
                    };

                    set(state => ({
                        events: [...state.events, newEvent],
                        loading: false,
                    }));

                    // Auto-save after creating event
                    await get().saveEvents();
                } catch (error) {
                    set({
                        loading: false,
                        error: 'Не удалось создать событие'
                    });
                }
            },

            updateEvent: async (eventData: UpdateEventRequest) => {
                set({ loading: true, error: null });

                try {
                    set(state => ({
                        events: state.events.map(event =>
                            event.id === eventData.id
                                ? { ...event, ...eventData }
                                : event
                        ),
                        loading: false,
                    }));

                    // Auto-save after updating event
                    await get().saveEvents();
                } catch (error) {
                    set({
                        loading: false,
                        error: 'Не удалось обновить событие'
                    });
                }
            },

            deleteEvent: async (id: string) => {
                set({ loading: true, error: null });

                try {
                    set(state => ({
                        events: state.events.filter(event => event.id !== id),
                        loading: false,
                    }));

                    // Auto-save after deleting event
                    await get().saveEvents();
                } catch (error) {
                    set({
                        loading: false,
                        error: 'Не удалось удалить событие'
                    });
                }
            },

            // Query operations
            getEventById: (id: string) => {
                const { events } = get();
                return events.find(event => event.id === id);
            },

            getEventsForDate: (date: string) => {
                const { events } = get();
                return events.filter(event => {
                    const eventStart = event.startDate.split('T')[0];
                    const eventEnd = event.endDate.split('T')[0];

                    return date >= eventStart && date <= eventEnd;
                });
            },

            getEventsForMonth: (year: number, month: number) => {
                const { events } = get();
                const monthStart = new Date(year, month - 1, 1).toISOString().split('T')[0];
                const monthEnd = new Date(year, month, 0).toISOString().split('T')[0];

                return events.filter(event => {
                    const eventStart = event.startDate.split('T')[0];
                    const eventEnd = event.endDate.split('T')[0];

                    return (eventStart <= monthEnd && eventEnd >= monthStart);
                });
            },

            // UI state operations
            setSelectedDate: (date: string) => {
                set({ selectedDate: date });
            },

            clearError: () => {
                set({ error: null });
            },

            // Data operations
            loadEvents: async () => {
                set({ loading: true, error: null });

                try {
                    // Events will be loaded automatically by persist middleware
                    set({ loading: false });
                } catch (error) {
                    set({
                        loading: false,
                        error: 'Не удалось загрузить события'
                    });
                }
            },

            saveEvents: async () => {
                // Events will be saved automatically by persist middleware
                // This method is here for explicit save operations if needed
                return Promise.resolve();
            },
        }),
        {
            name: APP_CONFIG.STORAGE_KEYS.EVENTS,
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                events: state.events,
                selectedDate: state.selectedDate,
            }),
        }
    )
);