"use server";
import { collection, getDocs, query, where, orderBy, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import staticData from './events-data.json';

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

const { schedules, specialSchedules } = staticData;

function getDb() {
    return initializeFirebase().firestore;
}

export async function getSchedules(): Promise<LiturgicalSchedules> {
  return schedules;
}

export async function getSpecialSchedules(): Promise<SpecialSchedule[]> {
  return specialSchedules;
}

// PUBLIC-FACING FUNCTIONS
export async function getEvents(): Promise<Event[]> {
  try {
    const db = getDb();
    const eventsCol = collection(db, 'events');
    const q = query(eventsCol, orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
  } catch (e) {
    console.error("Error fetching events: ", e);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  try {
    const db = getDb();
    const eventsCol = collection(db, 'events');
    const q = query(eventsCol, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return undefined;
    }
    const docData = snapshot.docs[0];
    return { id: docData.id, ...docData.data() } as Event;
  } catch (e) {
    console.error(`Error fetching event by slug ${slug}: `, e);
    return undefined;
  }
}

export async function getRecentEvents(limit: number): Promise<Event[]> {
    const allEvents = await getEvents();
    // Filter for events that are in the future and sort them ascending
    const upcomingEvents = allEvents
        .filter(event => new Date(event.date) > new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return upcomingEvents.slice(0, limit);
}


// ADMIN-FACING FUNCTIONS
export async function createEvent(event: Omit<Event, 'id'>) {
    const db = getDb();
    const eventsCol = collection(db, 'events');
    const eventData = {
        ...event,
        date: new Date(event.date).toISOString(),
        endTime: new Date(event.endTime).toISOString()
    };
    const docRef = await addDoc(eventsCol, eventData)
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: eventsCol.path,
                operation: 'create',
                requestResourceData: eventData,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw permissionError;
        });
    return docRef.id;
}

export async function updateEvent(id: string, event: Partial<Event>) {
    const db = getDb();
    const eventRef = doc(db, 'events', id);
    const eventData = {
        ...event,
        ...(event.date && { date: new Date(event.date).toISOString() }),
        ...(event.endTime && { endTime: new Date(event.endTime).toISOString() })
    };
    await updateDoc(eventRef, eventData)
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: eventRef.path,
                operation: 'update',
                requestResourceData: eventData,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw permissionError;
        });
}

export async function deleteEvent(id: string) {
    const db = getDb();
    const eventRef = doc(db, 'events', id);
    await deleteDoc(eventRef)
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: eventRef.path,
                operation: 'delete',
            });
            errorEmitter.emit('permission-error', permissionError);
            throw permissionError;
        });
}
