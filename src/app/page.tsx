
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Clock, Phone, MapPin, Calendar, Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-church-interior');
  const newsImages = {
    community: PlaceHolderImages.find(p => p.id === 'news-community-event'),
    bible: PlaceHolderImages.find(p => p.id === 'news-bible-study'),
    exterior: PlaceHolderImages.find(p => p.id === 'news-church-exterior'),
  }
  const eventImages = {
    concert: PlaceHolderImages.find(p => p.id === 'event-concert'),
    festival: PlaceHolderImages.find(p => p.id === 'event-festival'),
    dinner: PlaceHolderImages.find(p => p.id === 'event-dinner'),
  }

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
              <Link href="#contact">Plan Your Visit</Link>
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
                    <Link href="#events">View Full Schedule</Link>
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
                    <Link href="#contact">Get Directions</Link>
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
                    <Link href="#contact">Send a Message</Link>
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
              <Card className="overflow-hidden">
                {newsImages.community && <Image src={newsImages.community.imageUrl} alt={newsImages.community.description} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={newsImages.community.imageHint} />}
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Annual Parish Picnic</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4">A wonderful day of fellowship, food, and fun was had by all. See the photos!</p>
                  <Button variant="link" className="p-0">Read More</Button>
                </CardContent>
              </Card>
               <Card className="overflow-hidden">
                {newsImages.bible && <Image src={newsImages.bible.imageUrl} alt={newsImages.bible.description} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={newsImages.bible.imageHint} />}
                <CardHeader>
                  <CardTitle className="font-headline text-xl">New Bible Study Group</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4">Join our new study group on the Gospel of John, starting this fall.</p>
                  <Button variant="link" className="p-0">Learn More</Button>
                </CardContent>
              </Card>
               <Card className="overflow-hidden">
                {newsImages.exterior && <Image src={newsImages.exterior.imageUrl} alt={newsImages.exterior.description} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={newsImages.exterior.imageHint} />}
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Church Restoration Update</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4">The bell tower restoration is complete! Thank you for your generous donations.</p>
                  <Button variant="link" className="p-0">See Progress</Button>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-12">
              <Button size="lg">View All News</Button>
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
              <Card className="overflow-hidden">
                {eventImages.concert && <Image src={eventImages.concert.imageUrl} alt={eventImages.concert.description} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={eventImages.concert.imageHint} />}
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Christmas Choir Concert</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 mb-2"><strong>Date:</strong> December 18th, 7:00 PM</p>
                  <p className="text-foreground/80 mb-4">A beautiful evening of traditional carols and sacred music.</p>
                  <Button variant="link" className="p-0">Event Details</Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                {eventImages.festival && <Image src={eventImages.festival.imageUrl} alt={eventImages.festival.description} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={eventImages.festival.imageHint} />}
                <CardHeader>
                  <CardTitle className="font-headline text-xl">St. Francis Day Festival</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 mb-2"><strong>Date:</strong> October 4th, 12:00 PM - 4:00 PM</p>
                  <p className="text-foreground/80 mb-4">Blessing of the animals, games, and food for the whole family.</p>
                  <Button variant="link" className="p-0">Event Details</Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                {eventImages.dinner && <Image src={eventImages.dinner.imageUrl} alt={eventImages.dinner.description} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={eventImages.dinner.imageHint} />}
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Knights of Columbus Dinner</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 mb-2"><strong>Date:</strong> November 12th, 6:00 PM</p>
                  <p className="text-foreground/80 mb-4">Enjoy a delicious pasta dinner and support our local Knights.</p>
                  <Button variant="link" className="p-0">Event Details</Button>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-12">
              <Button size="lg">View Full Calendar</Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
