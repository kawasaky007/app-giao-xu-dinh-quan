import { BookOpen } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CatechismLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 bg-secondary/50 border-b">
          <div className="container mx-auto px-4 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
                Giáo Lý & Đào Tạo Đức Tin
              </h1>
              <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
                Lớn lên trong sự hiểu biết và tình yêu mến Chúa ở mọi giai đoạn của cuộc đời.
              </p>
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}
