import { getAlbumBySlug, getAlbumImages, getAlbums } from '@/lib/gallery';
import { notFound } from 'next/navigation';
import AlbumGrid from './album-grid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

type Props = {
  params: { albumSlug: string }
}

export async function generateStaticParams() {
    const albums = await getAlbums();
    return albums.map((album) => ({
      albumSlug: album.slug,
    }));
}

export default async function AlbumPage({ params }: Props) {
    const album = await getAlbumBySlug(params.albumSlug);
    if (!album) {
        notFound();
    }
    const images = await getAlbumImages(params.albumSlug);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto mb-12">
                        <Button asChild variant="ghost" className="mb-4">
                            <Link href="/gallery"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại Thư viện</Link>
                        </Button>
                        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
                            {album.title}
                        </h1>
                        <p className="text-lg text-foreground/80">{album.description}</p>
                    </div>
                    <AlbumGrid images={images} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
