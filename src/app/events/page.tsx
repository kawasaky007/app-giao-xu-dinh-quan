import { getEvents } from '@/lib/events';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => {
              const eventDate = new Date(event.date);
              const eventTime = format(eventDate, 'h:mm a');

              return (
                <Card key={event.id} className="overflow-hidden flex flex-col">
                  {event.image && (
                    <Link href={`/events/${event.slug}`}>
                      <div className="aspect-video relative bg-secondary">
                        <Image 
                          src={event.image} 
                          alt={event.title} 
                          fill
                          style={{ objectFit: 'cover' }}
                          className="w-full h-full object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </Link>
                  )}
                  <CardHeader>
                    <div className='mb-2'>
                        <Badge variant="secondary">{event.category}</Badge>
                    </div>
                    <CardTitle className="font-headline text-xl h-14">
                      <Link href={`/events/${event.slug}`} className="hover:text-primary transition-colors">{event.title}</Link>
                    </CardTitle>
                    <div className="flex flex-col text-sm text-muted-foreground gap-2 pt-2">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={event.date}>{format(eventDate, 'dd MMMM, yyyy', { locale: vi })}</time>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <time dateTime={event.date}>{eventTime}</time>
                        </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                        </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-foreground/80 text-sm line-clamp-3">{event.excerpt}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0">
                      <Link href={`/events/${event.slug}`}>Xem Chi Tiết →</Link>
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-foreground">Chưa có Sự Kiện nào</h3>
                <p className="text-muted-foreground mt-2">Vui lòng quay lại sau để biết các sự kiện trong tương lai.</p>
            </div>
        )}
      </div>
    </div>
  );
}
