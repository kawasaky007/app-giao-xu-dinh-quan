import { Calendar } from "lucide-react";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="py-12 bg-secondary/50 border-b">
        <div className="container px-4 text-center">
            <Calendar className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              Sự Kiện Giáo Xứ
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Cùng chúng tôi tham gia các hoạt động hiệp thông, đức tin và niềm vui. Luôn có những điều thú vị cho mọi người trong cộng đoàn giáo xứ sống động của chúng ta.
            </p>
        </div>
      </section>
      {children}
    </>
  );
}
