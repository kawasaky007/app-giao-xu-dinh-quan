'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroCarousel() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const heroSlides = [
    {
      id: 'slide-1',
      image: PlaceHolderImages.find(p => p.id === 'hero-church-interior'),
      title: 'Chào Mừng đến Giáo xứ Định Quán',
      subtitle: 'Ngọn hải đăng của đức tin, hy vọng và tình yêu thương giữa lòng cộng đoàn.',
      buttonText: 'Tìm Hiểu Về Giáo Xứ',
      buttonLink: '/about',
    },
    {
        id: 'slide-2',
        image: PlaceHolderImages.find(p => p.id === 'hero-church-exterior-slide'),
        title: 'Hiệp Thông & Phục Vụ',
        subtitle: 'Khám phá các hoạt động và sự kiện đang diễn ra tại giáo xứ chúng ta.',
        buttonText: 'Xem Sự Kiện',
        buttonLink: '/events',
    },
    {
        id: 'slide-3',
        image: PlaceHolderImages.find(p => p.id === 'hero-community-slide'),
        title: 'Cùng Nhau Lớn Mạnh Trong Đức Tin',
        subtitle: 'Tham gia các nhóm học hỏi và các chương trình đào tạo để đào sâu đời sống thiêng liêng.',
        buttonText: 'Chương Trình Giáo Lý',
        buttonLink: '/catechism',
    },
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {heroSlides.map(slide => (
            slide.image && (
                <CarouselItem key={slide.id}>
                    <div className="relative h-[70vh] flex items-center justify-center text-center text-white">
                    <Image
                        src={slide.image.imageUrl}
                        alt={slide.image.description}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="absolute inset-0 w-full h-full -z-10 brightness-75"
                        data-ai-hint={slide.image.imageHint}
                        priority={slide.id === 'slide-1'}
                    />
                    <div className="container mx-auto px-4 z-10">
                        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white drop-shadow-lg mb-4">
                            {slide.title}
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 drop-shadow-md mb-8">
                            {slide.subtitle}
                        </p>
                        <Button size="lg" asChild>
                            <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                        </Button>
                    </div>
                    </div>
                </CarouselItem>
            )
        ))}
      </CarouselContent>
    </Carousel>
  );
}
