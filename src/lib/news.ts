"use server";
import data from './news-data.json';

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: 'Parish Events' | 'Community Outreach' | 'Liturgy' | 'Education';
  image: string; // id from placeholder images
  excerpt: string;
  content: string; // HTML content
};

const newsArticles: NewsArticle[] = data.newsArticles;

export async function getNewsArticles(): Promise<NewsArticle[]> {
  // In a real app, you'd fetch this from a CMS or database
  return newsArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  return newsArticles.find(article => article.slug === slug);
}

export async function getCategories(): Promise<string[]> {
  const categories = newsArticles.map(article => article.category);
  return [...new Set(categories)];
}

export async function getRecentArticles(limit: number): Promise<NewsArticle[]> {
    const articles = await getNewsArticles();
    return articles.slice(0, limit);
}
    