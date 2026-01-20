
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Clock, Phone, MapPin, Calendar, Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getRecentArticles, NewsArticle } from '@/lib/news';
import { getRecentEvents, Event } from '@/lib/events';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';


export default async function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-church-interior');
  const recentArticles = await getRecentArticles(3);
  const recentEvents = await getRecentEvents(3);
  
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
          {heroImage && <Image 
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 w-full h-full -z-10 brightness-75"
            data-ai-hint={heroImage.imageHint}
            priority
          />}
          <div className="container px-4 z-10">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white drop-shadow-lg mb-4">
              Chào Mừng đến Giáo Xứ Các Thánh Tử Đạo Việt Nam
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-md mb-8">
              Ngọn hải đăng của đức tin, hy vọng và tình yêu thương giữa lòng cộng đoàn.
            </p>
            <Button size="lg" asChild>
              <Link href="/about">Tìm Hiểu Về Giáo Xứ</Link>
            </Button>
          </div>
        </section>

        {/* Quick Info Cards Section */}
        <section id="quick-info" className="py-16 md:py-24 bg-secondary/50">
          <div className="container px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <Clock className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Giờ Lễ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2"><strong>Chúa Nhật:</strong> 8:00, 10:30</p>
                  <p className="mb-4"><strong>Ngày thường:</strong> 7:00 (Nhà nguyện)</p>
                  <Button variant="outline" asChild>
                    <Link href="/schedule">Xem Lịch Phụng Vụ</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Văn Phòng Giáo Xứ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2"><strong>Giờ làm việc:</strong> T2-T6, 9:00 - 16:00</p>
                  <p className="mb-4">123 Đường Đức Tin, TP. Tình Yêu</p>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Xem Bản Đồ</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <Phone className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Liên Hệ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2"><strong>Điện thoại:</strong> (028) 3456-7890</p>
                  <p className="mb-4"><strong>Email:</strong> lienhe@giaoxu.com</p>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Gửi Tin Nhắn</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section id="news" className="py-16 md:py-24 bg-background">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Newspaper className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Tin Tức Mới Nhất</h2>
              <p className="text-lg text-foreground/80">
                Cập nhật những sự kiện và thông báo mới nhất từ giáo xứ.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {recentArticles.map((article: NewsArticle) => {
                const articleImage = PlaceHolderImages.find(p => p.id === article.image);
                return (
                  <Card key={article.id} className="overflow-hidden">
                    {articleImage && (
                      <Link href={`/news/${article.slug}`}>
                        <Image src={articleImage.imageUrl} alt={article.title} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={articleImage.imageHint} />
                      </Link>
                    )}
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">
                        <Link href={`/news/${article.slug}`} className="hover:text-primary transition-colors">{article.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 mb-4 line-clamp-3">{article.excerpt}</p>
                      <Button variant="link" className="p-0" asChild>
                        <Link href={`/news/${article.slug}`}>Đọc Thêm</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/news">Xem Tất Cả Tin Tức</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section id="events" className="py-16 md:py-24 bg-secondary/50">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Calendar className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Sự Kiện Sắp Tới</h2>
              <p className="text-lg text-foreground/80">
                Tham gia cùng chúng tôi để hiệp thông và sinh hoạt cộng đoàn.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {recentEvents.map((event: Event) => {
                const eventImage = PlaceHolderImages.find(p => p.id === event.image);
                return (
                    <Card key={event.id} className="overflow-hidden">
                        {eventImage && (
                            <Link href={`/events/${event.slug}`}>
                                <Image src={eventImage.imageUrl} alt={event.title} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={eventImage.imageHint} />
                            </Link>
                        )}
                        <CardHeader>
                        <CardTitle className="font-headline text-xl">
                            <Link href={`/events/${event.slug}`} className="hover:text-primary transition-colors">{event.title}</Link>
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-foreground/80 mb-2"><strong>Thời gian:</strong> {format(new Date(event.date), 'dd MMMM, yyyy', { locale: vi })}</p>
                            <p className="text-foreground/80 mb-4 line-clamp-3">{event.excerpt}</p>
                            <Button variant="link" className="p-0" asChild>
                                <Link href={`/events/${event.slug}`}>Chi Tiết Sự Kiện</Link>
                            </Button>
                        </CardContent>
                    </Card>
                );
              })}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/events">Xem Lịch Sự Kiện</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
