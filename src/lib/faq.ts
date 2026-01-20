"use server";
import data from './faq-data.json';

export type FAQ = {
  question: string;
  answer: string;
};

const { faqs } = data;

export async function getFaqs(): Promise<FAQ[]> {
  return faqs;
}
