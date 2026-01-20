"use client";

import { useState } from 'react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type AlbumGridProps = {
    images: ImagePlaceholder[];
}

export default function AlbumGrid({ images }: AlbumGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImageIndex(null);
  };
  
  const showNextImage = () => {
    if (selectedImageIndex === null) return;
    const nextIndex = (selectedImageIndex + 1) % images.length;
    setSelectedImageIndex(nextIndex);
  };

  const showPrevImage = () => {
    if (selectedImageIndex === null) return;
    const prevIndex = (selectedImageIndex - 1 + images.length) % images.length;
    setSelectedImageIndex(prevIndex);
  };

  const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                data-ai-hint={image.imageHint}
                loading="lazy"
              />
               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
            <DialogContent className="max-w-4xl w-full p-2 bg-transparent border-none shadow-none">
            {selectedImage && (
                <div className="relative">
                    <Image
                        src={selectedImage.imageUrl}
                        alt={selectedImage.description}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain rounded-lg max-h-[80vh]"
                    />
                    <p className="text-center text-white text-sm mt-2 bg-black/50 p-2 rounded-b-lg">{selectedImage.description}</p>

                    <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 hover:text-white" onClick={showPrevImage}>
                        <ChevronLeft className="w-8 h-8" />
                    </Button>
                    <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 hover:text-white" onClick={showNextImage}>
                        <ChevronRight className="w-8 h-8" />
                    </Button>
                </div>
            )}
            </DialogContent>
        </Dialog>
    </>
  );
}
