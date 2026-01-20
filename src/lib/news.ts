import data from './news-data.json';

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: 'Sự Kiện Giáo Xứ' | 'Phục Vụ Cộng Đoàn' | 'Phụng Vụ' | 'Giáo Dục';
  thumbnail?: string;
  excerpt: string;
  content: string;
  status: 'published' | 'draft';
};

const allArticles: NewsArticle[] = data.newsArticles as NewsArticle[];
const publishedArticles = allArticles.filter(article => article.status === 'published');

export async function getNewsArticles(): Promise<NewsArticle[]> {
  return publishedArticles;
}

export async function getAllNewsArticles(): Promise<NewsArticle[]> {
  return allArticles;
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  return publishedArticles.find(article => article.slug === slug);
}

export async function getAdminArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
    return allArticles.find(article => article.slug === slug);
}

export async function getCategories(): Promise<string[]> {
  const categories = publishedArticles.map(article => article.category);
  return [...new Set(categories)];
}

export async function getRecentArticles(limit: number): Promise<NewsArticle[]> {
  return publishedArticles.slice(0, limit);
}
