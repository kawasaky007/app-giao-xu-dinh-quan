import { Newspaper } from "lucide-react";

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="py-12 bg-secondary/50 border-b">
        <div className="container mx-auto px-4 text-center">
            <Newspaper className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              Tin Tức & Thông Báo
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Cập nhật những sự kiện, câu chuyện và thông báo mới nhất từ Giáo xứ.
            </p>
        </div>
      </section>
      {children}
    </>
  );
}
