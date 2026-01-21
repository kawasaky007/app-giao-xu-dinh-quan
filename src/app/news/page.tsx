import { getNewsArticles, getCategories, NewsArticle } from '@/lib/news';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Search, Newspaper } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const ARTICLES_PER_PAGE = 6;

type NewsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const allArticles = await getNewsArticles();
  const categories = await getCategories();
  
  const searchTerm = typeof searchParams.q === 'string' ? searchParams.q : '';
  const selectedCategory = typeof searchParams.category === 'string' ? searchParams.category : 'all';
  const currentPage = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

  const filteredArticles = allArticles
      .filter(article => 
        selectedCategory === 'all' || article.category === selectedCategory
      )
      .filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <main className="py-16 md:py-24 bg-background">
      <div className="container px-4">
        {/* Filtering and Search Controls */}
        <form className="mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search"
              name="q"
              placeholder="Tìm kiếm theo tiêu đề..."
              className="pl-10"
              defaultValue={searchTerm}
            />
          </div>
          <Select name="category" defaultValue={selectedCategory}>
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
          <Button type="submit">Lọc</Button>
        </form>

        {/* Articles Grid */}
        {paginatedArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map(article => {
              return (
                <Card key={article.id} className="overflow-hidden flex flex-col">
                  <Link href={`/news/${article.slug}`} className="block aspect-video relative bg-secondary">
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
                    <p className="text-foreground/80 text-sm line-clamp-3">{article.excerpt}</p>
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
                <Button asChild variant="outline" disabled={currentPage <= 1}>
                    <Link href={`?page=${currentPage - 1}&q=${searchTerm}&category=${selectedCategory}`}>
                      Trang Trước
                    </Link>
                </Button>
                <span className="text-sm text-muted-foreground">
                    Trang {currentPage} trên {totalPages}
                </span>
                <Button asChild variant="outline" disabled={currentPage >= totalPages}>
                    <Link href={`?page=${currentPage + 1}&q=${searchTerm}&category=${selectedCategory}`}>
                      Trang Kế
                    </Link>
                </Button>
            </div>
        )}
      </div>
    </main>
  );
}
