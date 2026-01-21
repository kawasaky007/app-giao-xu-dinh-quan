import { getAlbums, getVideos } from '@/lib/gallery';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Camera, Video } from 'lucide-react';

export default async function GalleryPage() {
  const albums = await getAlbums();
  const videos = await getVideos();

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 max-w-6xl mx-auto">
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
            <TabsTrigger value="photos">
              <Camera className="w-5 h-5 mr-2" />
              Album Ảnh
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="w-5 h-5 mr-2" />
              Thư Viện Video
            </TabsTrigger>
          </TabsList>

          {/* Photo Albums Tab */}
          <TabsContent value="photos">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => {
                const coverImage = PlaceHolderImages.find(p => p.id === album.coverImage);
                return (
                  <Card key={album.id} className="overflow-hidden flex flex-col">
                    {coverImage && (
                        <Link href={`/gallery/${album.slug}`} className="block aspect-video relative group">
                            <Image
                                src={coverImage.imageUrl}
                                alt={album.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                data-ai-hint={coverImage.imageHint}
                            />
                        </Link>
                    )}
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">
                        <Link href={`/gallery/${album.slug}`} className="hover:text-primary transition-colors">
                          {album.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-foreground/80 text-sm line-clamp-3">{album.description}</p>
                    </CardContent>
                      <div className="p-6 pt-0">
                        <Button asChild variant="link" className="p-0">
                            <Link href={`/gallery/${album.slug}`}>Xem Album →</Link>
                        </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map(video => (
                    <Card key={video.id} className="overflow-hidden flex flex-col">
                        <a href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="block aspect-video relative group">
                            <Image
                                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                                alt={video.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Video className="w-16 h-16 text-white" />
                            </div>
                        </a>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl h-14">
                                <a href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                    {video.title}
                                </a>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/80 text-sm line-clamp-3">{video.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
