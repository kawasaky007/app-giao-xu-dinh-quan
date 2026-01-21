import { getFaqs } from '@/lib/faq';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
    title: 'Hỏi Đáp | Giáo Xứ Các Thánh Tử Đạo Việt Nam',
    description: 'Tìm câu trả lời cho các câu hỏi thường gặp về giáo xứ, bao gồm giờ Lễ, đăng ký giáo xứ, các bí tích, và làm thế nào để tham gia.',
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        // A plain text version of the answer is better for SEO
        'text': faq.answer.replace(/<[^>]*>?/gm, '') 
      }
    }))
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="container px-4 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-xl text-left font-headline text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
                   <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
