import { BookOpen } from "lucide-react";

export default function CatechismLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="py-12 bg-secondary/50 border-b">
        <div className="container px-4 text-center">
            <BookOpen className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              Faith Formation & Catechism
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Growing in knowledge and love of God at every stage of life.
            </p>
        </div>
      </section>
      {children}
    </>
  );
}
