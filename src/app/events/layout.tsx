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
              Parish Events
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Join us for fellowship, faith, and fun. There's something for everyone in our vibrant parish community.
            </p>
        </div>
      </section>
      {children}
    </>
  );
}
    