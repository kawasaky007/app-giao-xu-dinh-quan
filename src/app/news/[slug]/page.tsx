import { getArticleBySlug } from '@/lib/news';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Không Tìm Thấy Bài Viết'
    }
  }

  return {
    title: `${article.title} | Giáo Xứ Các Thánh Tử Đạo Việt Nam`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      url: `/news/${article.slug}`,
      images: article.thumbnail ? [
        {
          url: article.thumbnail,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ] : [],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.excerpt,
    'image': article.thumbnail || '',
    'author': {
      '@type': 'Person',
      'name': article.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Giáo Xứ Các Thánh Tử Đạo Việt Nam',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://giaoxu-demo.web.app/logo.png' // Replace with actual logo URL
      }
    },
    'datePublished': article.date,
    'dateModified': article.date
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <article className="bg-background">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          
          {article.thumbnail && (
            <header className="relative h-[40vh] md:h-[50vh] w-full">
                <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="brightness-75"
                    priority
                />
            </header>
          )}

          <div className="container mx-auto px-4">
            <div className={`max-w-3xl mx-auto ${article.thumbnail ? '-mt-24 md:-mt-32' : 'pt-16'} relative z-10`}>
                <div className="bg-card shadow-xl rounded-lg p-6 md:p-10">
                    <div className="mb-4">
                        <Badge variant="default">
                            <Link href={`/news?category=${article.category}`}>{article.category}</Link>
                        </Badge>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
                        {article.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-6 gap-y-2 mb-8">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={article.date}>{format(new Date(article.date), 'dd MMMM, yyyy', { locale: vi })}</time>
                        </div>
                    </div>

                    <div 
                        className="prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }} 
                    />

                    <div className="mt-12 text-center">
                        <Button asChild>
                            <Link href="/news">← Quay lại trang Tin Tức</Link>
                        </Button>
                    </div>
                </div>
            </div>
          </div>
          <div className="h-24 bg-background"></div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
