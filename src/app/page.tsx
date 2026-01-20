import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
          <Image 
            src="https://picsum.photos/seed/church-hero/1200/800"
            alt="Inside of a classic church"
            fill
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 w-full h-full -z-10 brightness-75"
            data-ai-hint="church interior"
          />
          <div className="container px-4 z-10">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white drop-shadow-lg mb-4">
              Welcome to Our Sacred Place
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-md mb-8">
              A community of faith, hope, and love. Join us for worship and fellowship.
            </p>
            <Button size="lg">Visit Us</Button>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">About Our Parish</h2>
              <p className="text-lg text-foreground/80">
                For generations, Our Sacred Place has been a spiritual home for our community. We are rooted in tradition, yet welcoming to all who seek a connection with God.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Image 
                  src="https://picsum.photos/seed/worship/400/300"
                  alt="Worship service"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg shadow-lg mb-4"
                  data-ai-hint="worship church"
                />
                <h3 className="text-xl font-headline font-bold text-primary mb-2">Worship With Us</h3>
                <p className="text-foreground/80">Join our weekly services and experience the joy of communal prayer and song.</p>
              </div>
              <div className="flex flex-col items-center">
                <Image 
                  src="https://picsum.photos/seed/community/400/300"
                  alt="Community gathering"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg shadow-lg mb-4"
                  data-ai-hint="community people"
                />
                <h3 className="text-xl font-headline font-bold text-primary mb-2">Our Community</h3>
                <p className="text-foreground/80">Discover our vibrant parish life through various ministries and community events.</p>
              </div>
              <div className="flex flex-col items-center">
                <Image 
                  src="https://picsum.photos/seed/service/400/300"
                  alt="Volunteers working"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg shadow-lg mb-4"
                  data-ai-hint="charity volunteer"
                />
                <h3 className="text-xl font-headline font-bold text-primary mb-2">Serve Others</h3>
                <p className="text-foreground/80">Put your faith into action by participating in our outreach and service programs.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
