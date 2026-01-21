"use server";
import data from './resources-data.json';

export type CatechismLesson = {
  title: string;
  summary: string;
};

export type CatechismCategory = {
  category: string;
  lessons: CatechismLesson[];
};

export type SacramentDocument = {
  title: string;
  description: string;
  icon: string;
  slug: string;
};

export type Sermon = {
  id: string;
  title: string;
  date: string; // ISO 8601 format
  speaker: string;
  audioUrl: string | null;
  videoUrl: string | null;
}

export type DocumentItem = {
    title: string;
    url: string;
}

export type DocumentCategory = {
    category: 'Bản tin' | 'Biểu mẫu';
    items: DocumentItem[];
}

const { catechismLessons, sacramentDocs, sermons, documents } = data;

export async function getCatechismLessons(): Promise<CatechismCategory[]> {
  return catechismLessons;
}

export async function getSacramentDocs(): Promise<SacramentDocument[]> {
  return sacramentDocs;
}

export async function getSermons(): Promise<Sermon[]> {
  return sermons.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getDocuments(): Promise<DocumentCategory[]> {
    return documents;
}
