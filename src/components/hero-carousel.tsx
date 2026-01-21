'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroCarousel() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

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
    {
      id: 'slide-4',
      image: PlaceHolderImages.find(p => p.id === 'worship-service'),
      title: 'Cùng Nhau Thờ Phượng Chúa',
      subtitle: 'Tham dự các Thánh lễ và giờ phụng vụ để nuôi dưỡng đời sống thiêng liêng.',
      buttonText: 'Xem Lịch Phụng Vụ',
      buttonLink: '/schedule',
    },
    {
      id: 'slide-5',
      image: PlaceHolderImages.find(p => p.id === 'volunteer-service'),
      title: 'Phục Vụ Cộng Đoàn',
      subtitle: 'Chung tay xây dựng giáo xứ và giúp đỡ những người xung quanh qua các hoạt động bác ái.',
      buttonText: 'Tìm hiểu các Đoàn thể',
      buttonLink: '/about#organization',
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
            <CarouselItem key={slide.id}>
                <div className="relative h-[70vh] flex items-center justify-center text-center bg-gray-800 text-white">
                {slide.image && (
                    <Image
                        src={slide.image.imageUrl}
                        alt={slide.image.description}
                        fill
                        className="absolute inset-0 w-full h-full object-cover brightness-75"
                        data-ai-hint={slide.image.imageHint}
                        priority={slide.id === 'slide-1'}
                    />
                )}
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight drop-shadow-lg mb-4">
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
        ))}
      </CarouselContent>
    </Carousel>
  );
}
