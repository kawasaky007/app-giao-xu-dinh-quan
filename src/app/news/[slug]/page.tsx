import { getArticleBySlug, getNewsArticles } from '@/lib/news';
import { notFound } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar, User, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  params: { slug: string }
}

// Generate static pages for all articles at build time
export async function generateStaticParams() {
  const articles = await getNewsArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for the page
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
      images: [
        {
          url: PlaceHolderImages.find(p => p.id === article.image)?.imageUrl || '',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const articleImage = PlaceHolderImages.find(p => p.id === article.image || p.id.startsWith('news-'));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.excerpt,
    'image': articleImage?.imageUrl,
    'author': {
      '@type': 'Person',
      'name': article.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Giáo Xứ Các Thánh Tử Đạo Việt Nam',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://example.com/logo.png' // Replace with actual logo URL
      }
    },
    'datePublished': article.date,
    'dateModified': article.date
  };

  return (
    <article className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {articleImage && (
        <header className="relative h-[40vh] md:h-[50vh] w-full">
            <Image
                src={articleImage.imageUrl}
                alt={article.title}
                fill
                style={{ objectFit: 'cover' }}
                className="brightness-75"
                priority
                data-ai-hint={articleImage.imageHint}
            />
        </header>
      )}

      <div className="container px-4">
        <div className="max-w-3xl mx-auto -mt-24 md:-mt-32 relative z-10">
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
                    className="prose prose-lg max-w-none text-foreground/90 prose-p:text-justify"
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
  );
}
