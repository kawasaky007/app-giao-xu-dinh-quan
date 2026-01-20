"use client";

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getNewsArticles, getCategories, NewsArticle } from '@/lib/news';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Search, Loader2, Newspaper } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const ARTICLES_PER_PAGE = 6;

export default function NewsPage() {
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [fetchedArticles, fetchedCategories] = await Promise.all([
        getNewsArticles(),
        getCategories()
      ]);
      setArticles(fetchedArticles);
      setCategories(fetchedCategories);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => 
        selectedCategory === 'all' || article.category === selectedCategory
      )
      .filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [articles, selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
    setCurrentPage(1);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  return (
    <main className="py-16 md:py-24 bg-background">
      <div className="container px-4">
        {/* Filtering and Search Controls */}
        <div className="mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Tìm kiếm theo tiêu đề..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Lọc theo chuyên mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất Cả Chuyên Mục</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        ) : paginatedArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map(article => {
              return (
                <Card key={article.id} className="overflow-hidden flex flex-col">
                  <Link href={`/news/${article.slug}`} className="block aspect-video bg-secondary">
                    {article.thumbnail ? (
                      <Image 
                        src={article.thumbnail} 
                        alt={article.title} 
                        fill
                        style={{ objectFit: 'cover' }}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Newspaper className="w-16 h-16 text-muted-foreground" />
                        </div>
                    )}
                  </Link>
                  <CardHeader>
                    <div className='mb-2'>
                        <Badge variant="secondary">{article.category}</Badge>
                    </div>
                    <CardTitle className="font-headline text-xl h-14">
                      <Link href={`/news/${article.slug}`} className="hover:text-primary transition-colors">{article.title}</Link>
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground gap-4 pt-1">
                        <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={article.date}>{format(new Date(article.date), 'dd/MM/yyyy', { locale: vi })}</time>
                        </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-foreground/80 text-sm">{article.excerpt}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0">
                      <Link href={`/news/${article.slug}`}>Đọc Thêm →</Link>
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-foreground">Không Tìm Thấy Bài Viết</h3>
                <p className="text-muted-foreground mt-2">Vui lòng thử điều chỉnh tìm kiếm hoặc bộ lọc của bạn.</p>
            </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16">
                <Button 
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                    Trang Trước
                </Button>
                <span className="text-sm text-muted-foreground">
                    Trang {currentPage} trên {totalPages}
                </span>
                <Button 
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                >
                    Trang Kế
                </Button>
            </div>
        )}
      </div>
    </main>
  );
}
