import { ImageIcon } from "lucide-react";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="py-12 bg-secondary/50 border-b">
        <div className="container px-4 text-center">
            <ImageIcon className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              Media Gallery
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              A collection of photos and videos capturing the life of our parish community.
            </p>
        </div>
      </section>
      {children}
    </>
  );
}
