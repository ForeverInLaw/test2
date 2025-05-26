// Event-related TypeScript interfaces and types

export interface Event {
    id: string;
    title: string;
    description?: string;
    startDate: string; // ISO 8601 string
    endDate: string;   // ISO 8601 string
    allDay: boolean;
    color?: string;    // HEX color code
    recurrenceRule?: string; // RFC 5545 RRULE format
    reminders?: string[];    // ISO 8601 duration strings (e.g., "PT15M" for 15 minutes)
    location?: string;
    attendees?: string[];
}

export interface CreateEventRequest {
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    allDay?: boolean;
    color?: string;
    recurrenceRule?: string;
    reminders?: string[];
    location?: string;
    attendees?: string[];
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
    id: string;
}

export interface EventsState {
    events: Event[];
    selectedDate: string;
    loading: boolean;
    error: string | null;
}

export interface EventsActions {
    // Event CRUD operations
    createEvent: (event: CreateEventRequest) => Promise<void>;
    updateEvent: (event: UpdateEventRequest) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;

    // Query operations
    getEventById: (id: string) => Event | undefined;
    getEventsForDate: (date: string) => Event[];
    getEventsForMonth: (year: number, month: number) => Event[];

    // UI state operations
    setSelectedDate: (date: string) => void;
    clearError: () => void;

    // Data operations
    loadEvents: () => Promise<void>;
    saveEvents: () => Promise<void>;
}

export type EventsStore = EventsState & EventsActions;