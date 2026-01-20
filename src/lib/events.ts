import data from './events-data.json';

export type ScheduleItem = {
  day: string;
  time: string;
};

export type SpecialScheduleItem = {
  name: string;
  date: string;
  time: string;
}

export type SpecialSchedule = {
  season: string;
  schedule: SpecialScheduleItem[];
};

export type LiturgicalSchedules = {
  weekend: ScheduleItem[];
  weekday: ScheduleItem[];
  confession: ScheduleItem[];
  adoration: ScheduleItem[];
};

export type Event = {
  id?: string; // Firestore document ID
  slug: string;
  title: string;
  date: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  location: string;
  image?: string; // URL of the image
  category: 'Sự Kiện Giáo Xứ' | 'Gây Quỹ' | 'Tăng Tiến Đời Sống Thiêng Liêng' | 'Phục Vụ Cộng Đoàn';
  excerpt: string;
  description: string; // HTML content
};

const { schedules, specialSchedules, events } = data;

// This is a mock implementation
const allEvents: Event[] = events.map((e, i) => ({ ...e, id: `event-${i}`}));


export async function getSchedules(): Promise<LiturgicalSchedules> {
  return schedules;
}

export async function getSpecialSchedules(): Promise<SpecialSchedule[]> {
  return specialSchedules;
}

// PUBLIC-FACING FUNCTIONS
export async function getEvents(): Promise<Event[]> {
  return allEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
    return allEvents.find(event => event.slug === slug);
}

export async function getRecentEvents(limit: number): Promise<Event[]> {
    const upcomingEvents = allEvents
        .filter(event => new Date(event.date) > new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return upcomingEvents.slice(0, limit);
}
