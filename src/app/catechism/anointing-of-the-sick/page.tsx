import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AnointingOfTheSickPage() {
    const image = PlaceHolderImages.find(p => p.id === 'sacrament-anointing');

    return (
        <div className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-3xl">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/catechism"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang Giáo lý</Link>
                </Button>
                
                <Card className="overflow-hidden">
                    {image && (
                        <div className="relative h-64 w-full bg-secondary">
                            <Image 
                                src={image.imageUrl} 
                                alt="Xức Dầu Bệnh Nhân" 
                                fill
                                style={{ objectFit: 'cover' }}
                                className="w-full h-full object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline text-primary">Bí Tích Xức Dầu Bệnh Nhân</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                        <h2>Ơn An Ủi và Chữa Lành</h2>
                        <p>Bí tích Xức Dầu Bệnh Nhân không phải là bí tích chỉ dành cho những người hấp hối, mà còn dành cho tất cả những ai đang phải đối mặt với bệnh tật nặng nề hoặc tuổi già. Qua bí tích này, Hội Thánh phó thác các bệnh nhân cho Chúa Kitô, xin Ngài an ủi và cứu độ họ.</p>
                        
                        <h3>Ai có thể lãnh nhận?</h3>
                        <ul>
                            <li>Bất kỳ tín hữu nào bắt đầu gặp nguy hiểm do bệnh tật hoặc tuổi già.</li>
                            <li>Tín hữu sắp trải qua một cuộc phẫu thuật nghiêm trọng.</li>
                            <li>Người lớn tuổi có sức khỏe suy yếu.</li>
                        </ul>

                        <h3>Sắp xếp việc lãnh nhận Bí tích</h3>
                        <p>Nếu bạn hoặc một người thân muốn lãnh nhận bí tích này, xin đừng ngần ngại liên hệ với văn phòng giáo xứ. Các linh mục của chúng tôi luôn sẵn sàng đến thăm tại nhà, bệnh viện hoặc các cơ sở chăm sóc để ban bí tích, mang lại sự bình an và sức mạnh thiêng liêng cho người bệnh.</p>
                        
                        <div className="mt-8 not-prose">
                            <Button asChild>
                                <Link href="/contact">Liên hệ Văn phòng Giáo xứ</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
