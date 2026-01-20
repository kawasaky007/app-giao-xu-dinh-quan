
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
              Welcome to Our Sacred Place
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-md mb-8">
              A beacon of faith, hope, and love in the heart of the community.
            </p>
            <Button size="lg" asChild>
              <Link href="/about">Learn More About Us</Link>
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
                  <CardTitle className="font-headline text-2xl">Mass Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2"><strong>Sunday:</strong> 8:00 AM, 10:30 AM</p>
                  <p className="mb-4"><strong>Weekdays:</strong> 7:00 AM (Chapel)</p>
                  <Button variant="outline" asChild>
                    <Link href="/schedule">View Full Schedule</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Parish Office</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2"><strong>Hours:</strong> Mon-Fri, 9 AM - 4 PM</p>
                  <p className="mb-4">123 Faith Street, Devotion, USA</p>
                  <Button variant="outline" asChild>
                    <Link href="/#contact">Get Directions</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <Phone className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
                  <p className="mb-4"><strong>Email:</strong> contact@oursacredplace.com</p>
                  <Button variant="outline" asChild>
                    <Link href="/#contact">Send a Message</Link>
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
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Latest News</h2>
              <p className="text-lg text-foreground/80">
                Stay updated with the latest happenings and announcements from our parish.
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
                        <Link href={`/news/${article.slug}`}>Read More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/news">View All News</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section id="events" className="py-16 md:py-24 bg-secondary/50">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Calendar className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Upcoming Events</h2>
              <p className="text-lg text-foreground/80">
                Join us for fellowship and community. There's something for everyone.
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
                            <p className="text-sm text-foreground/80 mb-2"><strong>Date:</strong> {format(new Date(event.date), 'MMMM d, yyyy')}</p>
                            <p className="text-foreground/80 mb-4 line-clamp-3">{event.excerpt}</p>
                            <Button variant="link" className="p-0" asChild>
                                <Link href={`/events/${event.slug}`}>Event Details</Link>
                            </Button>
                        </CardContent>
                    </Card>
                );
              })}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/events">View Full Calendar</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
