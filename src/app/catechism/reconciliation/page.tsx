import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ReconciliationPage() {
    const image = PlaceHolderImages.find(p => p.id === 'sacrament-reconciliation');

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
                                alt="Hòa Giải" 
                                fill
                                style={{ objectFit: 'cover' }}
                                className="w-full h-full object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline text-primary">Bí Tích Hòa Giải (Giải Tội)</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                        <h2>Lòng Thương Xót Vô Bờ của Thiên Chúa</h2>
                        <p>Bí tích Hòa Giải là một món quà tuyệt vời của lòng thương xót Chúa. Qua bí tích này, chúng ta được tha thứ tội lỗi đã phạm sau khi Rửa Tội, được giao hòa với Thiên Chúa và với Hội Thánh. Đây là một bí tích chữa lành, mang lại bình an cho tâm hồn.</p>
                        
                        <h3>Làm thế nào để chuẩn bị?</h3>
                        <p>Một cuộc xét mình tốt là điều cần thiết. Bạn có thể dựa trên Mười Điều Răn, các Mối Phúc Thật, hoặc các tội chính để suy ngẫm về những lần bạn đã thất bại trong việc yêu mến Chúa và tha nhân. Điều quan trọng là có lòng ăn năn thật sự và quyết tâm sửa đổi.</p>
                        
                        <h3>Lịch giải tội</h3>
                        <p>Giáo xứ có lịch giải tội cố định hàng tuần. Bạn có thể tìm thấy thời gian cụ thể trên trang <Link href="/schedule">Lịch Phụng Vụ</Link>. Ngoài ra, bạn luôn có thể đặt lịch hẹn riêng với một linh mục để được giải tội.</p>
                        
                        <div className="mt-8 not-prose">
                            <Button asChild variant="outline">
                                <Link href="/schedule">Xem Lịch Giải Tội</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
