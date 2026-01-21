import Footer from '@/components/footer';
import Header from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSchedules, getSpecialSchedules } from '@/lib/events';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, Clock, Cross } from 'lucide-react';
import Image from 'next/image';

export default async function SchedulePage() {
  const schedules = await getSchedules();
  const specialSchedules = await getSpecialSchedules();
  const scheduleHeaderImage = PlaceHolderImages.find(p => p.id === 'schedule-header');

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative h-[40vh] flex items-center justify-center text-center text-white">
          {scheduleHeaderImage && <Image 
            src={scheduleHeaderImage.imageUrl}
            alt={scheduleHeaderImage.description}
            fill
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 w-full h-full -z-10 brightness-75"
            data-ai-hint={scheduleHeaderImage.imageHint}
            priority
          />}
          <div className="container mx-auto px-4 z-10">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white drop-shadow-lg">
              Lịch Phụng Vụ
            </h1>
            <p className="mt-4 text-lg md:text-xl text-neutral-200 drop-shadow-md max-w-2xl mx-auto">
              Mời cộng đoàn cùng tham dự các giờ cầu nguyện và thờ phượng.
            </p>
          </div>
        </section>

        <section id="regular-schedule" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Clock className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Lịch Thường Lệ</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Thánh Lễ Cuối Tuần</CardTitle>
                </CardHeader>
                <CardContent className="text-lg space-y-2">
                  {schedules.weekend.map(item => <p key={item.day}><strong>{item.day}:</strong> {item.time}</p>)}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Thánh Lễ Hàng Ngày</CardTitle>
                </CardHeader>
                <CardContent className="text-lg space-y-2">
                  {schedules.weekday.map(item => <p key={item.day}><strong>{item.day}:</strong> {item.time}</p>)}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Giải Tội</CardTitle>
                  <CardDescription>Bí tích Hòa giải</CardDescription>
                </CardHeader>
                <CardContent className="text-lg space-y-2">
                  {schedules.confession.map(item => <p key={item.day}><strong>{item.day}:</strong> {item.time}</p>)}
                   <p className="text-sm text-muted-foreground pt-2">Hoặc theo lịch hẹn.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section id="special-schedules" className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Calendar className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Lịch Lễ Trọng & Đặc Biệt</h2>
              <p className="text-lg text-foreground/80">
                Lịch các Thánh lễ Giáng Sinh, Tuần Thánh và các ngày lễ trọng khác sẽ được đăng tải tại đây khi gần đến.
              </p>
            </div>
             <div className="max-w-3xl mx-auto grid gap-8">
                {specialSchedules.map(season => (
                    <Card key={season.season}>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl text-primary">{season.season}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {season.schedule.map(item => (
                                    <li key={`${item.name}-${item.date}`} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-background/50 rounded-md">
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-muted-foreground">{item.date}</p>
                                        </div>
                                        <p className="font-bold text-primary text-lg">{item.time}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
