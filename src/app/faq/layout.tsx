import { HelpCircle } from "lucide-react";

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="py-12 bg-secondary/50 border-b">
        <div className="container px-4 text-center">
            <HelpCircle className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              Các Câu Hỏi Thường Gặp
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Tìm câu trả lời cho các câu hỏi phổ biến về giáo xứ của chúng ta.
            </p>
        </div>
      </section>
      {children}
    </>
  );
}
