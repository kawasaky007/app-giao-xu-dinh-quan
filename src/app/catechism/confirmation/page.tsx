import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ConfirmationPage() {
    const image = PlaceHolderImages.find(p => p.id === 'sacrament-confirmation');

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
                                alt="Thêm Sức" 
                                fill
                                style={{ objectFit: 'cover' }}
                                className="w-full h-full object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline text-primary">Bí Tích Thêm Sức</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                        <h2>Được Đầy Tràn Ơn Chúa Thánh Thần</h2>
                        <p>Bí tích Thêm Sức hoàn tất ân sủng của Bí tích Rửa Tội. Qua bí tích này, người tín hữu được liên kết chặt chẽ hơn với Hội Thánh, được đầy tràn sức mạnh của Chúa Thánh Thần, và được sai đi làm chứng cho Chúa Kitô một cách mạnh mẽ hơn bằng lời nói và việc làm.</p>
                        
                        <h3>Chương trình chuẩn bị</h3>
                        <p>Tại giáo xứ chúng ta, chương trình chuẩn bị cho Bí tích Thêm Sức thường kéo dài hai năm, dành cho các em thanh thiếu niên từ lớp 8. Chương trình bao gồm:</p>
                        <ul>
                            <li>Các buổi học giáo lý hàng tuần.</li>
                            <li>Tham gia các buổi tĩnh tâm và các hoạt động phục vụ.</li>
                            <li>Khuyến khích đời sống cầu nguyện cá nhân và tham dự các bí tích.</li>
                        </ul>

                        <h3>Thông tin Đăng ký</h3>
                        <p>Việc đăng ký cho các lớp giáo lý Thêm Sức thường diễn ra vào cuối mùa hè. Vui lòng theo dõi các thông báo của giáo xứ hoặc liên hệ văn phòng để biết thêm chi tiết về chương trình và lịch trình.</p>
                        
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
