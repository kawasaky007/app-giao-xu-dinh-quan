import { Newspaper } from "lucide-react";

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="py-12 bg-secondary/50 border-b">
        <div className="container px-4 text-center">
            <Newspaper className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              News & Announcements
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Stay updated with the latest happenings, stories, and announcements from Our Sacred Place.
            </p>
        </div>
      </section>
      {children}
    </>
  );
}
    