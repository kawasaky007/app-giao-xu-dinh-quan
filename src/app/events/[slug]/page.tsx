import { getEventBySlug, getEvents } from '@/lib/events';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return { title: 'Không Tìm Thấy Sự Kiện' }
  }

  const images = event.image ? [{
    url: event.image,
    width: 1200,
    height: 630,
    alt: event.title,
  }] : [];

  return {
    title: `${event.title} | Giáo Xứ Các Thánh Tử Đạo Việt Nam`,
    description: event.excerpt,
    openGraph: {
      title: event.title,
      description: event.excerpt,
      type: 'article',
      url: `/events/${event.slug}`,
      images: images,
    },
  }
}

// Helper to format dates for Google Calendar
const formatGCalDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d{3}/g, '');
};

export default async function EventPage({ params }: Props) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const startDate = new Date(event.date);
  const endDate = new Date(event.endTime);

  const googleCalendarUrl = new URL('https://www.google.com/calendar/render');
  googleCalendarUrl.searchParams.append('action', 'TEMPLATE');
  googleCalendarUrl.searchParams.append('text', event.title);
  googleCalendarUrl.searchParams.append('dates', `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`);
  googleCalendarUrl.searchParams.append('details', event.excerpt);
  googleCalendarUrl.searchParams.append('location', event.location);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': event.title,
    'startDate': event.date,
    'endDate': event.endTime,
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'eventStatus': 'https://schema.org/EventScheduled',
    'location': {
        '@type': 'Place',
        'name': 'Giáo Xứ Các Thánh Tử Đạo Việt Nam',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': '123 Đường Đức Tin',
            'addressLocality': 'Thành Phố Tình Yêu',
            'addressCountry': 'VN'
        }
    },
    'image': event.image ? [
        event.image
     ] : [],
    'description': event.excerpt,
    'organizer': {
        '@type': 'Organization',
        'name': 'Giáo Xứ Các Thánh Tử Đạo Việt Nam',
        'url': 'https://example.com' // Replace with actual URL
    }
  };

  return (
    <article className="bg-background">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {event.image && (
        <header className="relative h-[40vh] md:h-[50vh] w-full">
            <Image
                src={event.image}
                alt={event.title}
                fill
                style={{ objectFit: 'cover' }}
                className="brightness-75"
                priority
            />
        </header>
      )}

      <div className="container px-4">
        <div className={`max-w-3xl mx-auto ${event.image ? '-mt-24 md:-mt-32' : 'pt-16'} relative z-10`}>
            <div className="bg-card shadow-xl rounded-lg p-6 md:p-10">
                <div className="mb-4">
                    <Badge variant="default">{event.category}</Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
                    {event.title}
                </h1>
                
                <div className="flex flex-col text-muted-foreground gap-4 mb-8 border-y py-6">
                    <div className="flex items-center gap-3 text-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className='font-semibold'>{format(startDate, 'EEEE, dd MMMM, yyyy', { locale: vi })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-lg">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className='font-semibold'>{`${format(startDate, 'h:mm a')} - ${format(endDate, 'h:mm a')}`}</span>
                    </div>
                     <div className="flex items-center gap-3 text-lg">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className='font-semibold'>{event.location}</span>
                    </div>
                </div>

                <div 
                    className="prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: event.description }} 
                />

                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link href={googleCalendarUrl.toString()} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Thêm vào Lịch Google
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/events">← Quay lại Sự kiện</Link>
                    </Button>
                </div>
            </div>
        </div>
      </div>
      <div className="h-24 bg-background"></div>
    </article>
  );
}
