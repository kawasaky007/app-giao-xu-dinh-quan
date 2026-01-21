import { getCatechismLessons, getSacramentDocs } from '@/lib/resources';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import * as lucide from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HolyOrdersIcon } from '@/components/icons/holy-orders-icon';
import { EucharistIcon } from '@/components/icons/eucharist-icon';

// A map of icon names to their components
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Baby: lucide.Baby,
  EucharistCustom: EucharistIcon,
  Wind: lucide.Wind,
  HeartHandshake: lucide.HeartHandshake,
  KeyRound: lucide.KeyRound,
  Droplets: lucide.Droplets,
  HolyOrdersCustom: HolyOrdersIcon,
};

export default async function CatechismPage() {
  const catechismLessons = await getCatechismLessons();
  const sacramentDocs = await getSacramentDocs();

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Catechism Lessons Section */}
        <section id="lessons" className="mb-16 md:mb-24">
          <div className="container px-4 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Các Lớp Giáo Lý</h2>
              <p className="text-lg text-foreground/80">Giáo xứ cung cấp các chương trình đào tạo đức tin cho mọi lứa tuổi.</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {catechismLessons.map((category, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-xl font-headline text-primary">{category.category}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-4 pl-4">
                      {category.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="border-l-2 border-primary pl-4">
                          <h4 className="font-bold text-foreground">{lesson.title}</h4>
                          <p className="text-muted-foreground">{lesson.summary}</p>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Sacrament Preparation Section */}
        <section id="sacraments">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <lucide.Cross className="w-12 h-12 mx-auto text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Chuẩn Bị Lãnh Nhận Các Bí Tích</h2>
            <p className="text-lg text-foreground/80">Thông tin và tài liệu dành cho việc lãnh nhận các bí tích tại Giáo xứ.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sacramentDocs.map((doc) => {
              const IconComponent = iconMap[doc.icon] || lucide.FileText;
              return (
                <Card key={doc.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <CardHeader>
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="font-headline text-2xl h-14 flex items-center justify-center">{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="mb-4 text-foreground/80 flex-grow">{doc.description}</p>
                    <Button asChild>
                      <Link href={`/catechism/${doc.slug}`}>Xem Chi Tiết</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
