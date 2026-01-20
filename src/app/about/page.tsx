
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Building, Eye, Heart, Target, Users, Music, BookOpen, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const aboutHeroImage = PlaceHolderImages.find(p => p.id === 'about-hero');
  const priestImage = PlaceHolderImages.find(p => p.id === 'priest-portrait');
  
  const orgMembers = [
    {
      id: 'council-member-1',
      name: 'Theresa Augustin',
      role: 'Parish Council President',
      description: 'Leads the parish council in advising the pastor on the needs of the community.',
      icon: Users,
    },
    {
      id: 'ministry-lead-1',
      name: 'Markus Fischer',
      role: 'Head of Community Outreach',
      description: 'Coordinates all volunteer efforts and charity work within our local community.',
      icon: Heart,
    },
    {
      id: 'choir-director-1',
      name: 'Sophia Dubois',
      role: 'Choir Director',
      description: 'Directs our parish choir, bringing beautiful sacred music to every liturgy.',
      icon: Music,
    },
    {
      id: 'catechism-teacher-1',
      name: 'David Chen',
      role: 'Lead Catechist',
      description: 'Oversees the religious education programs for children and new members.',
      icon: BookOpen,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center justify-center text-center text-white">
          {aboutHeroImage && <Image 
            src={aboutHeroImage.imageUrl}
            alt={aboutHeroImage.description}
            fill
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 w-full h-full -z-10 brightness-75"
            data-ai-hint={aboutHeroImage.imageHint}
            priority
          />}
          <div className="container px-4 z-10">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white drop-shadow-lg">
              About Our Sacred Place
            </h1>
          </div>
        </section>

        {/* Parish History Section */}
        <section id="history" className="py-16 md:py-24 bg-background">
          <div className="container px-4 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Building className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Our History</h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/80 text-justify">
              <p>
                Founded in 1888 by a group of devout families, Our Sacred Place has stood as a cornerstone of faith in the community for over a century. The original wooden chapel, built with the hands of our founders, served our parish for fifty years before the current stone church was erected in 1938. 
              </p>
              <p>
                This magnificent Gothic-style structure, with its soaring ceilings and breathtaking stained-glass windows, was a labor of love and a testament to the unwavering devotion of our ancestors. Through times of peace and periods of trial, our parish has grown from a small gathering into a vibrant, diverse community, always anchored by the enduring values of the Gospel. We cherish our rich heritage and continue to build upon the legacy of faith and fellowship entrusted to us.
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values Section */}
        <section id="mission" className="py-16 md:py-24 bg-secondary/50">
          <div className="container px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <Target className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>To be a living sign of God's love, welcoming all to encounter Jesus Christ through the sacraments, community, and service.</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <Eye className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>To be a beacon of hope and a center of spiritual nourishment, fostering a deep, personal relationship with God for all parishioners.</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <Heart className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Faith, Community, Reverence, Charity, and Tradition guide our worship, our actions, and our life together.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Parish Priest Section */}
        <section id="priest" className="py-16 md:py-24 bg-background">
          <div className="container px-4 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <User className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Our Parish Priest</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {priestImage && <Image src={priestImage.imageUrl} alt={priestImage.description} width={300} height={300} className="rounded-full shadow-lg w-48 h-48 md:w-60 md:h-60 object-cover" data-ai-hint={priestImage.imageHint} />}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-headline font-bold text-primary">Father Michael O'Connell</h3>
                <p className="text-foreground/80 mt-4 prose prose-lg">
                  Ordained in 1995, Father Michael has served three parishes before being assigned to Our Sacred Place in 2015. He is a passionate teacher of the faith with a deep love for scripture and the sacraments. His homilies are known for being both profound and relatable. Father Michael is dedicated to fostering a welcoming and spiritually vibrant parish for all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Organization Chart Section */}
        <section id="organization" className="py-16 md:py-24 bg-secondary/50">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Users className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Our Parish Leadership</h2>
              <p className="text-lg text-foreground/80">
                Our parish is blessed with dedicated lay leaders who generously give their time and talent to serve our community.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {orgMembers.map((member) => {
                const memberImage = PlaceHolderImages.find(p => p.id === member.id);
                return (
                  <Card key={member.id} className="text-center flex flex-col items-center">
                    <CardHeader>
                      <Avatar className="w-24 h-24 mb-4">
                        {memberImage && <AvatarImage src={memberImage.imageUrl} alt={member.name} data-ai-hint={memberImage.imageHint}/>}
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
                      <p className="text-sm font-medium text-primary">{member.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 text-sm">{member.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
