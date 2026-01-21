import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Phone, MapPin, Calendar, Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getRecentArticles, NewsArticle } from '@/lib/news';
import { getRecentEvents, Event } from '@/lib/events';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { HeroCarousel } from '@/components/hero-carousel';


export default async function Home() {
  const recentArticles = await getRecentArticles(3);
  const recentEvents = await getRecentEvents(3);
  
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroCarousel />

        {/* Quick Info Cards Section */}
        <section id="quick-info" className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
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
                  <p className="mb-4">1 Công xã Paris, P. Bến Nghé, Q.1, TP.HCM</p>
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
                  <p className="mb-2"><strong>Điện thoại:</strong> (028) 3822 0488</p>
                  <p className="mb-4"><strong>Email:</strong> vanphong@giaoxuducba.com</p>
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
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Newspaper className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Tin Tức Mới Nhất</h2>
              <p className="text-lg text-foreground/80">
                Cập nhật những sự kiện và thông báo mới nhất từ giáo xứ.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {recentArticles.map((article: NewsArticle) => {
                return (
                  <Card key={article.id} className="overflow-hidden">
                    <Link href={`/news/${article.slug}`} className="block aspect-video bg-secondary">
                      {article.thumbnail ? (
                        <Image src={article.thumbnail} alt={article.title} width={400} height={225} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Newspaper className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                    </Link>
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
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Calendar className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Sự Kiện Sắp Tới</h2>
              <p className="text-lg text-foreground/80">
                Tham gia cùng chúng tôi để hiệp thông và sinh hoạt cộng đoàn.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {recentEvents.map((event: Event) => {
                return (
                    <Card key={event.id} className="overflow-hidden">
                        <Link href={`/events/${event.slug}`} className="block aspect-video bg-secondary">
                            {event.image ? (
                                <Image src={event.image} alt={event.title} width={400} height={250} className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 flex items-center justify-center">
                                    <Calendar className="w-12 h-12 text-muted-foreground" />
                                </div>
                            )}
                        </Link>
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
