"use server";
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
  id: string;
  slug: string;
  title: string;
  date: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  location: string;
  image: string; // id from placeholder images
  category: 'Sự Kiện Giáo Xứ' | 'Gây Quỹ' | 'Tăng Tiến Đời Sống Thiêng Liêng' | 'Phục Vụ Cộng Đoàn';
  excerpt: string;
  description: string; // HTML content
};

const { schedules, specialSchedules, events } = data;

export async function getSchedules(): Promise<LiturgicalSchedules> {
  // In a real app, this might be fetched from a CMS
  return schedules;
}

export async function getSpecialSchedules(): Promise<SpecialSchedule[]> {
  return specialSchedules;
}

export async function getEvents(): Promise<Event[]> {
  // Sort events by date, earliest first
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  return events.find(event => event.slug === slug);
}

export async function getRecentEvents(limit: number): Promise<Event[]> {
    const allEvents = await getEvents();
    // Filter for events that are in the future
    const upcomingEvents = allEvents.filter(event => new Date(event.date) > new Date());
    return upcomingEvents.slice(0, limit);
}
