import { getCatechismLessons, getSacramentDocs } from '@/lib/resources';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import * as lucide from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// A map of icon names to their components
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Baby: lucide.Baby,
  Cross: lucide.Cross,
  Wind: lucide.Wind,
  HeartHandshake: lucide.HeartHandshake,
};

export default async function CatechismPage() {
  const catechismLessons = await getCatechismLessons();
  const sacramentDocs = await getSacramentDocs();

  return (
    <>
      {/* Catechism Lessons Section */}
      <section id="lessons" className="py-16 md:py-24">
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
      <section id="sacraments" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <lucide.Cross className="w-12 h-12 mx-auto text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Chuẩn Bị Lãnh Nhận Các Bí Tích</h2>
            <p className="text-lg text-foreground/80">Thông tin và tài liệu dành cho việc lãnh nhận các bí tích tại Giáo xứ.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sacramentDocs.map((doc) => {
              const IconComponent = iconMap[doc.icon] || lucide.FileText;
              return (
                <Card key={doc.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="font-headline text-2xl">{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-foreground/80">{doc.description}</p>
                    <Button asChild variant="link">
                      <Link href="#">Tìm Hiểu Thêm</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
