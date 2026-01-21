
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Building, Eye, Heart, Target, Users, Music, BookOpen, User, Landmark, Users2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const aboutHeroImage = PlaceHolderImages.find(p => p.id === 'about-hero');
  
  const priests = [
      {
        id: 'priest-main',
        name: 'Linh mục Gioan Baotixita Trần Văn Minh',
        role: 'Linh Mục Chánh Xứ',
        description: 'Được thụ phong linh mục năm 1995, Cha Gioan Baotixita đã phục vụ tại ba giáo xứ trước khi được bổ nhiệm về Giáo xứ chúng ta vào năm 2015. Với tình yêu sâu sắc dành cho Kinh Thánh và các Bí tích, ngài luôn tận tâm xây dựng một giáo xứ chào đón và sống động về mặt tâm linh.',
      },
      {
        id: 'priest-associate-1',
        name: 'Linh mục Phêrô Nguyễn Văn An',
        role: 'Linh Mục Phó Xứ',
        description: 'Chịu trách nhiệm mục vụ cho giới trẻ và các chương trình giáo lý, giúp các thế hệ tương lai lớn lên trong đức tin.',
      },
      {
        id: 'priest-associate-2',
        name: 'Linh mục Anrê Lê Hoàng Dũng',
        role: 'Linh Mục Phó Xứ',
        description: 'Phụ trách các hoạt động bác ái xã hội và thăm viếng bệnh nhân, mang tình yêu thương của Chúa đến cho những người cần giúp đỡ nhất.',
      }
  ];

  const mainPriest = priests[0];
  const associatePriests = priests.slice(1);

  const orgMembers = [
    {
      id: 'council-member-1',
      name: 'Ông Giuse Trần Văn Hùng',
      role: 'Chủ Tịch Hội Đồng Mục Vụ',
      description: 'Dẫn dắt Hội đồng Mục vụ trong việc cố vấn cho cha xứ về các nhu cầu của cộng đoàn.',
      icon: Users,
    },
    {
      id: 'ministry-lead-1',
      name: 'Bà Maria Nguyễn Thị Lan',
      role: 'Trưởng Ban Bác Ái Xã Hội',
      description: 'Điều phối các hoạt động thiện nguyện và công tác từ thiện trong cộng đoàn địa phương.',
      icon: Heart,
    },
    {
      id: 'choir-director-1',
      name: 'Anh Phêrô Lê Hoàng Anh',
      role: 'Ca Trưởng Ca Đoàn Cêcilia',
      description: 'Điều khiển ca đoàn, mang lại những bài thánh ca tuyệt vời cho mỗi buổi lễ.',
      icon: Music,
    },
    {
      id: 'catechism-teacher-1',
      name: 'Chị Têrêsa Hoàng Mai',
      role: 'Trưởng Ban Giáo Lý',
      description: 'Phụ trách các chương trình giáo lý đức tin cho thiếu nhi và tân tòng.',
      icon: BookOpen,
    },
    {
      id: 'finance-council-1',
      name: 'Ông Phaolô Đinh Quang Dũng',
      role: 'Trưởng Ban Tài Chính',
      description: 'Quản lý và giám sát tình hình tài chính của giáo xứ, đảm bảo sự minh bạch và trách nhiệm.',
      icon: Landmark,
    },
    {
      id: 'youth-lead-1',
      name: 'Chị Anna Trần Ngọc Diệp',
      role: 'Trưởng Giới Trẻ',
      description: 'Tổ chức các buổi sinh hoạt và sự kiện cho giới trẻ, giúp các em lớn lên trong đức tin.',
      icon: Users2,
    }
  ]

  const councilPresident = orgMembers[0];
  const ministryLeads = orgMembers.slice(1);

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
          <div className="container mx-auto px-4 z-10">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white drop-shadow-lg">
              Giới Thiệu Về Giáo Xứ
            </h1>
          </div>
        </section>

        {/* Parish History Section */}
        <section id="history" className="py-16 md:py-24 bg-background">
          <div className="container px-4 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Building className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Lược Sử Giáo Xứ</h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
              <p>
                Được thành lập vào năm 1954 bởi một nhóm các gia đình đạo đức di cư, Giáo xứ Các Thánh Tử Đạo Việt Nam đã đứng vững như một nền tảng đức tin trong cộng đồng suốt nhiều thập kỷ. Ngôi nhà nguyện gỗ ban đầu, được xây dựng bằng chính đôi tay của các vị tiền nhân, đã phục vụ giáo xứ trong hai mươi năm trước khi ngôi nhà thờ đá hiện tại được dựng lên vào năm 1974.
              </p>
              <p>
                Công trình kiến trúc mang phong cách hiện đại này, với trần nhà cao vút và những cửa sổ kính màu tuyệt đẹp, là thành quả của tình yêu thương và là một minh chứng cho lòng sùng kính kiên định của cha ông chúng ta. Qua những thời kỳ bình an và những giai đoạn thử thách, giáo xứ của chúng ta đã phát triển từ một nhóm nhỏ thành một cộng đoàn sôi động, đa dạng, luôn được neo giữ bởi những giá trị bền vững của Tin Mừng. Chúng ta trân trọng di sản phong phú và tiếp tục xây dựng trên nền tảng đức tin và tình huynh đệ đã được trao phó.
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values Section */}
        <section id="mission" className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <Target className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Sứ Mạng</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Trở nên dấu chỉ sống động của tình yêu Thiên Chúa, chào đón mọi người đến gặp gỡ Chúa Giêsu Kitô qua các bí tích, đời sống cộng đoàn và tinh thần phục vụ.</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <Eye className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Tầm Nhìn</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Trở thành ngọn hải đăng của hy vọng và là trung tâm nuôi dưỡng đời sống thiêng liêng, vun trồng mối tương quan cá vị và sâu sắc với Thiên Chúa cho mọi giáo dân.</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <Heart className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Giá Trị Cốt Lõi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Đức Tin, Tình Hiệp Thông, Lòng Tôn Thờ, Bác Ái và Truyền Thống là kim chỉ nam cho việc thờ phượng, hành động và đời sống chung của chúng ta.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Priests Section */}
        <section id="priests" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Users className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Ban Linh Mục</h2>
              <p className="text-lg text-foreground/80">
                Giáo xứ chúng ta được dẫn dắt bởi một đội ngũ các linh mục tận tâm, luôn hết lòng phục vụ cộng đoàn và hướng dẫn đời sống thiêng liêng cho mọi giáo dân.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-8 md:gap-12">
              {/* Main Priest */}
              {(() => {
                  const priest = mainPriest;
                  const priestImage = PlaceHolderImages.find(p => p.id === priest.id);
                  return (
                    <Card key={priest.id} className="text-center flex flex-col items-center max-w-sm shadow-lg">
                      <CardHeader className="items-center text-center">
                        <Avatar className="w-24 h-24 mb-4">
                          {priestImage && <AvatarImage src={priestImage.imageUrl} alt={priest.name} data-ai-hint={priestImage.imageHint} />}
                          <AvatarFallback>{priest.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="font-headline text-xl">{priest.name}</CardTitle>
                        <p className="text-sm font-medium text-primary">{priest.role}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/80 text-sm text-justify">{priest.description}</p>
                      </CardContent>
                    </Card>
                  );
                })()}

              {/* Connecting Line */}
              {associatePriests.length > 0 && <div className="w-px h-12 bg-border"></div>}

              {/* Associate Priests */}
              {associatePriests.length > 0 && (
                <div className="w-full max-w-5xl mx-auto">
                  <h3 className="text-center text-2xl font-headline font-bold text-primary mb-8">Các Linh Mục Phó Xứ</h3>
                  <div className="grid sm:grid-cols-2 gap-8 justify-center">
                    {associatePriests.map((priest) => {
                      const priestImage = PlaceHolderImages.find(p => p.id === priest.id);
                      return (
                        <Card key={priest.id} className="text-center flex flex-col items-center">
                          <CardHeader className="items-center text-center">
                            <Avatar className="w-24 h-24 mb-4">
                              {priestImage && <AvatarImage src={priestImage.imageUrl} alt={priest.name} data-ai-hint={priestImage.imageHint} />}
                              <AvatarFallback>{priest.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="font-headline text-xl">{priest.name}</CardTitle>
                            <p className="text-sm font-medium text-primary">{priest.role}</p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-foreground/80 text-sm">{priest.description}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Organization Chart Section */}
        <section id="organization" className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Users className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Hội Đồng Mục Vụ & Các Đoàn Thể</h2>
              <p className="text-lg text-foreground/80">
                Giáo xứ chúng ta được chúc phúc với những vị lãnh đạo giáo dân tận tụy, những người quảng đại cống hiến thời gian và tài năng để phục vụ cộng đoàn.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-8 md:gap-12">
              {/* Top Level: Parish Council President */}
              {(() => {
                const member = councilPresident;
                const memberImage = PlaceHolderImages.find(p => p.id === member.id);
                return (
                  <Card key={member.id} className="text-center flex flex-col items-center max-w-sm shadow-lg">
                    <CardHeader className="items-center text-center">
                      <Avatar className="w-24 h-24 mb-4">
                        {memberImage && <AvatarImage src={memberImage.imageUrl} alt={member.name} data-ai-hint={memberImage.imageHint} />}
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
              })()}

              {/* Connecting Line */}
              <div className="w-px h-12 bg-border"></div>

              {/* Second Level: Ministry Leads */}
              <div className="w-full max-w-5xl mx-auto">
                <h3 className="text-center text-2xl font-headline font-bold text-primary mb-8">Các Trưởng Ban Ngành & Đoàn Thể</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                  {ministryLeads.map((member) => {
                    const memberImage = PlaceHolderImages.find(p => p.id === member.id);
                    return (
                      <Card key={member.id} className="text-center flex flex-col items-center">
                        <CardHeader className="items-center text-center">
                          <Avatar className="w-24 h-24 mb-4">
                            {memberImage && <AvatarImage src={memberImage.imageUrl} alt={member.name} data-ai-hint={memberImage.imageHint} />}
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
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

